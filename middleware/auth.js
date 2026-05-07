/**
 * Kadim API — Auth Middleware
 * API key doğrulama + tier bazlı rate limit uygulama
 *
 * Key format: kh_{tier}_{random}
 *   kh_free_xxxxx
 *   kh_starter_xxxxx
 *   kh_pro_xxxxx
 *   kh_ent_xxxxx
 */

export const TIERS = {
  free:       { rpm: 10,   rph: 100,   rpd: 500,    label: 'Free'       },
  starter:    { rpm: 60,   rph: 1000,  rpd: 10000,  label: 'Starter'    },
  pro:        { rpm: 300,  rph: 5000,  rpd: 100000, label: 'Pro'        },
  enterprise: { rpm: 1000, rph: 20000, rpd: null,   label: 'Enterprise' },
}

// In-memory rate limit store — production'da Redis ile değiştir
const rateLimitStore = new Map()

function getRateLimitKey(apiKey, window) {
  const now = Date.now()
  let windowMs
  switch (window) {
    case 'minute': windowMs = 60 * 1000; break
    case 'hour':   windowMs = 60 * 60 * 1000; break
    case 'day':    windowMs = 24 * 60 * 60 * 1000; break
  }
  const slot = Math.floor(now / windowMs)
  return `${apiKey}:${window}:${slot}`
}

function checkRateLimit(apiKey, tier) {
  const limits = TIERS[tier]
  const windows = [
    { name: 'minute', max: limits.rpm },
    { name: 'hour',   max: limits.rph },
    { name: 'day',    max: limits.rpd },
  ]

  for (const { name, max } of windows) {
    if (max === null) continue // unlimited (enterprise)
    const key = getRateLimitKey(apiKey, name)
    const count = rateLimitStore.get(key) || 0
    if (count >= max) {
      return { allowed: false, window: name, limit: max, current: count }
    }
  }
  return { allowed: true }
}

function incrementCounters(apiKey, tier) {
  for (const window of ['minute', 'hour', 'day']) {
    const key = getRateLimitKey(apiKey, window)
    rateLimitStore.set(key, (rateLimitStore.get(key) || 0) + 1)
  }

  // Stale key temizleme — her 10k işlemde bir çalışır
  if (Math.random() < 0.0001) {
    const now = Date.now()
    for (const [k] of rateLimitStore) {
      const parts = k.split(':')
      const slot = parseInt(parts[2])
      // day slot'tan eski kayıtları sil
      if (slot < Math.floor(now / (24 * 60 * 60 * 1000)) - 2) {
        rateLimitStore.delete(k)
      }
    }
  }
}

/**
 * parseApiKey — key'den tier bilgisini çıkar
 * @param {string} key
 * @returns {{ valid: boolean, tier: string|null }}
 */
export function parseApiKey(key) {
  if (!key || typeof key !== 'string') return { valid: false, tier: null }

  const parts = key.split('_')
  // Format: kh_{tier}_{random} — en az 3 parça
  if (parts.length < 3 || parts[0] !== 'kh') return { valid: false, tier: null }

  const tierCode = parts[1]
  const tierMap = { free: 'free', starter: 'starter', pro: 'pro', ent: 'enterprise' }
  const tier = tierMap[tierCode]
  if (!tier) return { valid: false, tier: null }

  // random kısmı en az 8 karakter olmalı
  const random = parts.slice(2).join('_')
  if (random.length < 8) return { valid: false, tier: null }

  return { valid: true, tier }
}

/**
 * getDailyUsage — tier'a göre kalan istek sayısını döner
 */
function getDailyUsage(apiKey, tier) {
  const limits = TIERS[tier]
  if (limits.rpd === null) return { kalan: null, limit: null }
  const key = getRateLimitKey(apiKey, 'day')
  const used = rateLimitStore.get(key) || 0
  return { kalan: limits.rpd - used, limit: limits.rpd }
}

/**
 * authenticate — req/res üzerinde API key doğrulaması ve rate limit uygular
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {{ ok: boolean, tier: string, apiKey: string }} | undefined (yanıt zaten gönderildi)
 */
export async function authenticate(req, res) {
  // OPTIONS preflight — her zaman geçir
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return null
  }

  const apiKey = req.headers['x-api-key']

  if (!apiKey) {
    res.status(401).json({
      success: false,
      error: {
        code: 'MISSING_API_KEY',
        message: 'x-api-key header gerekli. https://kadim-api.vercel.app/docs adresinden ücretsiz key alın.',
      },
    })
    return null
  }

  const { valid, tier } = parseApiKey(apiKey)

  if (!valid) {
    res.status(401).json({
      success: false,
      error: {
        code: 'INVALID_API_KEY',
        message: 'Geçersiz API key formatı. Beklenen format: kh_{tier}_{random}',
      },
    })
    return null
  }

  // Rate limit kontrolü
  const rlResult = checkRateLimit(apiKey, tier)
  if (!rlResult.allowed) {
    const tierInfo = TIERS[tier]
    const retryAfter = rlResult.window === 'minute' ? 60 : rlResult.window === 'hour' ? 3600 : 86400
    res.status(429).json({
      success: false,
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: `${rlResult.window} başına istek limiti (${rlResult.limit}) aşıldı.`,
        window: rlResult.window,
        limit: rlResult.limit,
        current: rlResult.current,
        retryAfterSeconds: retryAfter,
        upgradeUrl: 'https://kadim-api.vercel.app/#fiyatlar',
      },
    })
    return null
  }

  // Sayaçları artır
  incrementCounters(apiKey, tier)

  const usage = getDailyUsage(apiKey, tier)
  return { ok: true, tier, apiKey, usage }
}
