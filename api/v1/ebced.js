/**
 * POST /api/v1/ebced
 *
 * Body:
 *   { "metin": string }
 *
 * Headers:
 *   x-api-key: kh_xxx_xxx
 *
 * Ebced hesaplama sistemleri:
 *   Kebir, Sagir, Vusta, Ahar + Vefk büyüsü
 */

import { authenticate } from '../../middleware/auth.js'
import { ebcedHesapla } from '../../lib/hesaplamalar/ebced.js'

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

  const { metin } = req.body ?? {}

  if (!metin || typeof metin !== 'string' || !metin.trim()) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'MISSING_PARAM',
        message: '"metin" parametresi gerekli ve boş olamaz.',
        ornek: { metin: 'Bismillah' },
      },
    })
  }

  if (metin.trim().length > 500) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'METIN_TOO_LONG',
        message: 'Metin en fazla 500 karakter olabilir.',
      },
    })
  }

  try {
    const sonuc = ebcedHesapla(metin.trim())

    return res.status(200).json({
      success: true,
      data: sonuc,
      meta: {
        sistem:   'ebced',
        versiyon: '1.0',
        girdi:    metin.trim(),
        kredi:    1,
        kalan:    auth.usage.kalan,
        limit:    auth.usage.limit,
        tier:     auth.tier,
      },
    })
  } catch (err) {
    console.error('[ebced] Hata:', err)
    return res.status(500).json({
      success: false,
      error: {
        code:    'HESAPLAMA_HATASI',
        message: 'Ebced hesaplaması sırasında bir hata oluştu.',
      },
    })
  }
}
