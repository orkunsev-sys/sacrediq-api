/**
 * POST /api/v1/iching
 *
 * Body:
 *   {
 *     "isim": string,
 *     "tarih"?: "YYYY-MM-DD"   // dogum tarihi — dönüşüm hexagramı için
 *   }
 *
 * I Ching — 64 Hexagram sistemi.
 * İsimden sayısal değer üretir, hexagram, dönüşüm hexagramı ve aktif hatları döner.
 */

import { authenticate } from '../../middleware/auth.js'
import { ichingHesapla } from '../../lib/hesaplamalar/iching.js'

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

  const { isim, tarih } = req.body ?? {}

  if (!isim || typeof isim !== 'string' || !isim.trim()) {
    return res.status(400).json({
      success: false,
      error: {
        code:    'MISSING_PARAM',
        message: '"isim" parametresi gerekli.',
        ornek:   { isim: 'Orkun', tarih: '1990-05-15' },
      },
    })
  }

  if (tarih && !/^\d{4}-\d{2}-\d{2}$/.test(tarih)) {
    return res.status(400).json({
      success: false,
      error: {
        code:    'INVALID_DATE',
        message: '"tarih" YYYY-MM-DD formatında olmalı.',
      },
    })
  }

  try {
    const sonuc = ichingHesapla(isim.trim(), tarih ?? null)

    if (!sonuc) {
      return res.status(400).json({
        success: false,
        error: { code: 'HESAPLAMA_HATASI', message: 'Hexagram hesaplanamadı. Geçerli bir isim girin.' },
      })
    }

    return res.status(200).json({
      success: true,
      data: sonuc,
      meta: {
        sistem:   'iching',
        versiyon: '1.0',
        girdi:    { isim: isim.trim(), tarih: tarih ?? null },
        kredi:    1,
        kalan:    auth.usage.kalan,
        limit:    auth.usage.limit,
        tier:     auth.tier,
      },
    })
  } catch (err) {
    console.error('[iching] Hata:', err)
    return res.status(500).json({
      success: false,
      error: { code: 'HESAPLAMA_HATASI', message: 'I Ching hesaplaması sırasında hata oluştu.' },
    })
  }
}
