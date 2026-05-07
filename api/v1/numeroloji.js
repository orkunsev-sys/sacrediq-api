/**
 * POST /api/v1/numeroloji
 *
 * Body:
 *   { "metin": string, "dogumTarihi"?: "YYYY-MM-DD" }
 *
 * Sistemler: Pisagor, Kaldean, Gematria, Tantrik
 */

import { authenticate } from '../../middleware/auth.js'
import { numerolojiBul } from '../../lib/hesaplamalar/numeroloji.js'

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

  const { metin, dogumTarihi } = req.body ?? {}

  if (!metin || typeof metin !== 'string' || !metin.trim()) {
    return res.status(400).json({
      success: false,
      error: {
        code:    'MISSING_PARAM',
        message: '"metin" parametresi gerekli.',
        ornek:   { metin: 'Ahmet Yilmaz', dogumTarihi: '1990-05-15' },
      },
    })
  }

  // dogumTarihi format doğrulama
  if (dogumTarihi && !/^\d{4}-\d{2}-\d{2}$/.test(dogumTarihi)) {
    return res.status(400).json({
      success: false,
      error: {
        code:    'INVALID_DATE',
        message: '"dogumTarihi" YYYY-MM-DD formatında olmalı.',
      },
    })
  }

  try {
    const sonuc = numerolojiBul(metin.trim(), dogumTarihi ?? null)

    return res.status(200).json({
      success: true,
      data: sonuc,
      meta: {
        sistem:      'numeroloji',
        versiyon:    '1.0',
        girdi:       metin.trim(),
        dogumTarihi: dogumTarihi ?? null,
        kredi:       1,
        kalan:       auth.usage.kalan,
        limit:       auth.usage.limit,
        tier:        auth.tier,
      },
    })
  } catch (err) {
    console.error('[numeroloji] Hata:', err)
    return res.status(500).json({
      success: false,
      error: { code: 'HESAPLAMA_HATASI', message: 'Numeroloji hesaplaması sırasında hata oluştu.' },
    })
  }
}
