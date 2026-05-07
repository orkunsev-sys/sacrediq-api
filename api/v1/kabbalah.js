/**
 * POST /api/v1/kabbalah
 *
 * Body:
 *   { "metin": string }
 *
 * Kabbalah — Sefirot sistemi.
 * Her harfi Kabbalah tablosuna göre değerlendirir,
 * dijital kök üzerinden Sefirot eşleşmesi yapar.
 */

import { authenticate } from '../../middleware/auth.js'
import { kabbalahHesapla } from '../../lib/hesaplamalar/kabbalah.js'

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).end()

  const auth = await authenticate(req, res)
  if (!auth) return

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
        code:    'MISSING_PARAM',
        message: '"metin" parametresi gerekli.',
        ornek:   { metin: 'Adamah' },
      },
    })
  }

  try {
    const sonuc = kabbalahHesapla(metin.trim())

    if (!sonuc) {
      return res.status(400).json({
        success: false,
        error: {
          code:    'HESAPLAMA_HATASI',
          message: 'Metin Kabbalah tablosunda karşılık bulamadı. Harf karakterleri kullandığınızdan emin olun.',
        },
      })
    }

    return res.status(200).json({
      success: true,
      data: sonuc,
      meta: {
        sistem:   'kabbalah',
        versiyon: '1.0',
        girdi:    metin.trim(),
        kredi:    1,
        kalan:    auth.usage.kalan,
        limit:    auth.usage.limit,
        tier:     auth.tier,
      },
    })
  } catch (err) {
    console.error('[kabbalah] Hata:', err)
    return res.status(500).json({
      success: false,
      error: { code: 'HESAPLAMA_HATASI', message: 'Kabbalah hesaplaması sırasında hata oluştu.' },
    })
  }
}
