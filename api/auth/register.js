/**
 * POST /api/auth/register
 *
 * Body:
 *   {
 *     "email": string,
 *     "tier"?: "free" | "starter" | "pro" | "enterprise",
 *     "masterKey"?: string   // enterprise için KADIM_MASTER_KEY gerekir
 *   }
 *
 * Yeni API key üretir ve döner.
 * Production'da: Supabase'e kaydet, e-posta gönder.
 */

import { TIERS } from '../../middleware/auth.js'

const RANDOM_CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789'

function generateRandom(length = 24) {
  let result = ''
  for (let i = 0; i < length; i++) {
    result += RANDOM_CHARS[Math.floor(Math.random() * RANDOM_CHARS.length)]
  }
  return result
}

const TIER_CODE_MAP = {
  free:       'free',
  starter:    'starter',
  pro:        'pro',
  enterprise: 'ent',
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).end()

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: { code: 'METHOD_NOT_ALLOWED', message: 'POST metodu gerekli.' },
    })
  }

  const { email, tier = 'free', masterKey } = req.body ?? {}

  // Email doğrulama
  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({
      success: false,
      error: {
        code:    'INVALID_EMAIL',
        message: 'Geçerli bir e-posta adresi gerekli.',
      },
    })
  }

  // Tier doğrulama
  if (!TIERS[tier]) {
    return res.status(400).json({
      success: false,
      error: {
        code:    'INVALID_TIER',
        message: `Geçersiz tier. Seçenekler: ${Object.keys(TIERS).join(', ')}`,
      },
    })
  }

  // Enterprise için master key kontrolü
  if ((tier === 'enterprise' || tier === 'pro') && masterKey !== process.env.KADIM_MASTER_KEY) {
    // Ücretli tier'lar için ödeme entegrasyonu gerekir
    // Bu demo'da sadece free otomatik üretilir, diğerleri master key ile
    if (!masterKey || masterKey !== process.env.KADIM_MASTER_KEY) {
      return res.status(403).json({
        success: false,
        error: {
          code:    'PAYMENT_REQUIRED',
          message: `${tier} tier için ödeme gerekli. Detaylar: https://kadim-api.vercel.app/#fiyatlar`,
          fiyat: {
            starter:    '$19/ay',
            pro:        '$99/ay',
            enterprise: 'Özel fiyat',
          }[tier],
        },
      })
    }
  }

  const tierCode = TIER_CODE_MAP[tier]
  const random   = generateRandom(24)
  const apiKey   = `kh_${tierCode}_${random}`

  // TODO: Supabase'e kaydet
  // const { error } = await supabase
  //   .from('api_keys')
  //   .insert({ email, tier, api_key: apiKey, created_at: new Date().toISOString() })

  const tierLimits = TIERS[tier]

  return res.status(201).json({
    success: true,
    data: {
      apiKey,
      tier,
      email,
      limits: {
        rpm:  tierLimits.rpm,
        rph:  tierLimits.rph,
        rpd:  tierLimits.rpd,
      },
      mesaj: `API key'iniz hazır! x-api-key header'ı ile kullanın.`,
      docs:  'https://kadim-api.vercel.app/docs',
    },
    meta: {
      versiyon: '1.0',
      uyari: tier === 'free'
        ? 'Free tier: 500 istek/gün. Upgrade için https://kadim-api.vercel.app/#fiyatlar'
        : undefined,
    },
  })
}
