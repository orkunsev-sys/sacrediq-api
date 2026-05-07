/**
 * POST /api/v1/ay-menzili
 *
 * Body:
 *   {
 *     "yil": number,
 *     "ay": number,
 *     "gun": number,
 *     "saat"?: number,   // varsayılan 12
 *     "dakika"?: number  // varsayılan 0
 *   }
 *
 * Ay'ın o andaki mansionunu (menzilini) hesaplar.
 * 28 Ay Menzili / Lunar Mansions sistemi.
 * İslami, Hint, Batı ezoterik geleneklerinin kesişimi.
 */

import { authenticate } from '../../middleware/auth.js'
import { ayMenziliHesapla } from '../../lib/hesaplamalar/ay-menzili.js'

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

  if (!yil || !ay || !gun) {
    return res.status(400).json({
      success: false,
      error: {
        code:    'MISSING_PARAM',
        message: '"yil", "ay" ve "gun" parametreleri gerekli.',
        ornek:   { yil: 2024, ay: 5, gun: 15, saat: 20, dakika: 0 },
      },
    })
  }

  try {
    const sonuc = ayMenziliHesapla(
      Number(yil),
      Number(ay),
      Number(gun),
      Number(saat),
      Number(dakika)
    )

    if (!sonuc) {
      return res.status(500).json({
        success: false,
        error: { code: 'HESAPLAMA_HATASI', message: 'Ay menzili bulunamadı.' },
      })
    }

    return res.status(200).json({
      success: true,
      data: sonuc,
      meta: {
        sistem:   'ay-menzili',
        versiyon: '1.0',
        girdi:    { yil, ay, gun, saat, dakika },
        kredi:    1,
        kalan:    auth.usage.kalan,
        limit:    auth.usage.limit,
        tier:     auth.tier,
      },
    })
  } catch (err) {
    console.error('[ay-menzili] Hata:', err)
    return res.status(500).json({
      success: false,
      error: { code: 'HESAPLAMA_HATASI', message: 'Ay menzili hesaplaması sırasında hata oluştu.' },
    })
  }
}
