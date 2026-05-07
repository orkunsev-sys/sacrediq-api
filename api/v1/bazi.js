/**
 * POST /api/v1/bazi
 *
 * Body:
 *   {
 *     "yil": number,
 *     "ay": number,    // 1-12
 *     "gun": number,
 *     "saat": number   // 0-23
 *   }
 *
 * Çin metafiziği BaZi (Sekiz Hane) — 4 pillar haritası hesaplar.
 * Göksel Gövdeler, Yer Yüzü Dalları, 5 element dengesi döner.
 */

import { authenticate } from '../../middleware/auth.js'
import { hesaplaBaZi } from '../../lib/hesaplamalar/bazi.js'

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

  const { yil, ay, gun, saat } = req.body ?? {}

  if (!yil || !ay || !gun || saat === undefined) {
    return res.status(400).json({
      success: false,
      error: {
        code:    'MISSING_PARAM',
        message: '"yil", "ay", "gun" ve "saat" parametreleri gerekli.',
        ornek:   { yil: 1990, ay: 5, gun: 15, saat: 14 },
      },
    })
  }

  const saatNum = Number(saat)
  if (saatNum < 0 || saatNum > 23) {
    return res.status(400).json({
      success: false,
      error: { code: 'INVALID_PARAM', message: '"saat" 0-23 arasında olmalı.' },
    })
  }

  try {
    const sonuc = hesaplaBaZi(Number(yil), Number(ay), Number(gun), saatNum)

    return res.status(200).json({
      success: true,
      data: sonuc,
      meta: {
        sistem:   'bazi',
        versiyon: '1.0',
        girdi:    { yil, ay, gun, saat },
        kredi:    1,
        kalan:    auth.usage.kalan,
        limit:    auth.usage.limit,
        tier:     auth.tier,
      },
    })
  } catch (err) {
    console.error('[bazi] Hata:', err)
    return res.status(500).json({
      success: false,
      error: { code: 'HESAPLAMA_HATASI', message: 'BaZi hesaplaması sırasında hata oluştu.' },
    })
  }
}
