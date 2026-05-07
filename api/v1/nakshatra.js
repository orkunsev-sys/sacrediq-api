/**
 * POST /api/v1/nakshatra
 *
 * Body:
 *   {
 *     "yil": number,
 *     "ay": number,    // 1-12
 *     "gun": number,
 *     "saat"?: number,    // 0-23, varsayılan 12
 *     "dakika"?: number   // 0-59, varsayılan 0
 *   }
 *
 * Vedik astroloji — Ay'ın hangi Nakshatra'da olduğunu hesaplar.
 * Lahiri Ayanamsha kullanır, 27 Nakshatra döner.
 */

import { authenticate } from '../../middleware/auth.js'
import { nakshatraHesapla } from '../../lib/hesaplamalar/nakshatra.js'

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

  const { yil, ay, gun, saat = 12, dakika = 0 } = req.body ?? {}

  // Doğrulama
  if (!yil || !ay || !gun) {
    return res.status(400).json({
      success: false,
      error: {
        code:    'MISSING_PARAM',
        message: '"yil", "ay" ve "gun" parametreleri gerekli.',
        ornek:   { yil: 1990, ay: 5, gun: 15, saat: 14, dakika: 30 },
      },
    })
  }

  if (ay < 1 || ay > 12) {
    return res.status(400).json({
      success: false,
      error: { code: 'INVALID_PARAM', message: '"ay" 1-12 arasında olmalı.' },
    })
  }

  if (gun < 1 || gun > 31) {
    return res.status(400).json({
      success: false,
      error: { code: 'INVALID_PARAM', message: '"gun" 1-31 arasında olmalı.' },
    })
  }

  try {
    const sonuc = nakshatraHesapla(
      Number(yil),
      Number(ay),
      Number(gun),
      Number(saat),
      Number(dakika)
    )

    return res.status(200).json({
      success: true,
      data: sonuc,
      meta: {
        sistem:   'nakshatra',
        versiyon: '1.0',
        girdi:    { yil, ay, gun, saat, dakika },
        kredi:    1,
        kalan:    auth.usage.kalan,
        limit:    auth.usage.limit,
        tier:     auth.tier,
      },
    })
  } catch (err) {
    console.error('[nakshatra] Hata:', err)
    return res.status(500).json({
      success: false,
      error: { code: 'HESAPLAMA_HATASI', message: 'Nakshatra hesaplaması sırasında hata oluştu.' },
    })
  }
}
