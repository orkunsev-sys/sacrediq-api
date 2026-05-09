/**
 * POST /api/v1/wisdom
 *
 * Body:
 *   {
 *     "topic":      string,          // required — hesaplama sonucu / konu
 *     "tradition"?: string,          // optional — "sufizm" | "kabbalah" | "hermetizm" | ...
 *     "context"?:   string           // optional — ek bağlam metni
 *   }
 *
 * Headers:
 *   x-api-key: kh_xxx_xxx
 *
 * Ancient Arch Python backend üzerinden RAG destekli hikmet yorumu alır.
 * Env: ANCIENT_ARCH_API_URL — örn. https://ancient-arch.fly.dev
 */

import { authenticate } from '../../middleware/auth.js'

const WISDOM_KREDI = 2

export default async function handler(req, res) {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // Auth + rate limit
  const auth = await authenticate(req, res)
  if (!auth) return // yanıt auth içinde gönderildi

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: { code: 'METHOD_NOT_ALLOWED', message: 'POST metodu gerekli.' },
    })
  }

  const { topic, tradition = null, context = null } = req.body ?? {}

  if (!topic || typeof topic !== 'string' || !topic.trim()) {
    return res.status(400).json({
      success: false,
      error: {
        code:    'MISSING_PARAM',
        message: '"topic" parametresi gerekli ve boş olamaz.',
        ornek: {
          topic:     'Ebced değeri 786 olan ismin anlamı',
          tradition: 'sufizm',
          context:   'Hesaplama sonucu: Kebir=786, Sagir=33',
        },
      },
    })
  }

  if (topic.trim().length > 500) {
    return res.status(400).json({
      success: false,
      error: {
        code:    'TOPIC_TOO_LONG',
        message: '"topic" en fazla 500 karakter olabilir.',
      },
    })
  }

  const ancientArchUrl = process.env.ANCIENT_ARCH_API_URL
  if (!ancientArchUrl) {
    console.error('[wisdom] ANCIENT_ARCH_API_URL env değişkeni tanımlı değil.')
    return res.status(503).json({
      success: false,
      error: {
        code:    'SERVICE_UNAVAILABLE',
        message: 'Hikmet servisi şu an kullanılamıyor.',
      },
    })
  }

  const payload = {
    message:   topic.trim(),
    tradition: tradition ?? undefined,
    context:   context   ?? undefined,
  }

  try {
    const upstream = await fetch(`${ancientArchUrl}/api/chat`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
      signal:  AbortSignal.timeout(15_000), // 15 s hard limit
    })

    if (!upstream.ok) {
      const errBody = await upstream.text().catch(() => '')
      console.error(`[wisdom] Upstream hata ${upstream.status}:`, errBody)
      return res.status(502).json({
        success: false,
        error: {
          code:    'UPSTREAM_ERROR',
          message: 'Hikmet servisi geçersiz yanıt döndürdü.',
          status:  upstream.status,
        },
      })
    }

    const upstreamData = await upstream.json()

    return res.status(200).json({
      success: true,
      data: {
        wisdom:    upstreamData.response ?? upstreamData.message ?? upstreamData,
        tradition: tradition ?? null,
        sources:   upstreamData.sources ?? [],
      },
      meta: {
        sistem:    'wisdom',
        versiyon:  '1.0',
        girdi:     { topic: topic.trim(), tradition, context: context ? true : false },
        kredi:     WISDOM_KREDI,
        kalan:     auth.usage.kalan,
        limit:     auth.usage.limit,
        tier:      auth.tier,
      },
    })
  } catch (err) {
    if (err.name === 'TimeoutError') {
      console.error('[wisdom] Upstream zaman aşımı.')
      return res.status(504).json({
        success: false,
        error: {
          code:    'UPSTREAM_TIMEOUT',
          message: 'Hikmet servisi yanıt vermedi (zaman aşımı).',
        },
      })
    }

    console.error('[wisdom] Beklenmedik hata:', err)
    return res.status(500).json({
      success: false,
      error: {
        code:    'INTERNAL_ERROR',
        message: 'Hikmet sorgusu sırasında beklenmedik bir hata oluştu.',
      },
    })
  }
}
