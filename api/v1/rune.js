/**
 * POST /api/v1/rune
 *
 * Body:
 *   { "metin": string }
 *
 * Her harfi Elder Futhark rune sistemine dönüştürür.
 * element, chakra, mitolojik tanrı, psikolojik/mistik anlamları döner.
 */

import { authenticate } from '../../middleware/auth.js'
import { runeHesapla } from '../../lib/hesaplamalar/rune.js'

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
        ornek:   { metin: 'Orkun' },
      },
    })
  }

  try {
    const detaylar = runeHesapla(metin.trim())

    return res.status(200).json({
      success: true,
      data: {
        metin:    metin.trim(),
        detaylar,
        harfSayisi: detaylar.length,
      },
      meta: {
        sistem:   'rune',
        versiyon: '1.0',
        girdi:    metin.trim(),
        kredi:    1,
        kalan:    auth.usage.kalan,
        limit:    auth.usage.limit,
        tier:     auth.tier,
      },
    })
  } catch (err) {
    console.error('[rune] Hata:', err)
    return res.status(500).json({
      success: false,
      error: { code: 'HESAPLAMA_HATASI', message: 'Rune hesaplaması sırasında hata oluştu.' },
    })
  }
}
