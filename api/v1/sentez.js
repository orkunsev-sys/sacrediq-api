/**
 * POST /api/v1/sentez
 *
 * Pro + Enterprise tier gerektirir.
 *
 * Body:
 *   {
 *     "metin": string,
 *     "dogumTarihi": "YYYY-MM-DD",
 *     "dogumSaati"?: number,   // 0-23
 *     "sistemler"?: string[]   // filtreleme: ["ebced","numeroloji","rune","kabbalah","iching"]
 *   }
 *
 * Tüm metin bazlı hesaplama motorlarını tek sorguda çalıştırır.
 * Doğum bilgisi ile BaZi + Nakshatra + Ay Menzili de dahil edilir.
 * Kredi maliyeti: 5 (5 sistem birleşimi)
 */

import { authenticate, TIERS } from '../../middleware/auth.js'
import { ebcedHesapla }        from '../../lib/hesaplamalar/ebced.js'
import { numerolojiBul }       from '../../lib/hesaplamalar/numeroloji.js'
import { runeHesapla }         from '../../lib/hesaplamalar/rune.js'
import { kabbalahHesapla }     from '../../lib/hesaplamalar/kabbalah.js'
import { ichingHesapla }       from '../../lib/hesaplamalar/iching.js'
import { nakshatraHesapla }    from '../../lib/hesaplamalar/nakshatra.js'
import { hesaplaBaZi }         from '../../lib/hesaplamalar/bazi.js'
import { ayMenziliHesapla }    from '../../lib/hesaplamalar/ay-menzili.js'

const SENTEZ_KREDI = 5

const IZINLI_TIER = ['pro', 'enterprise']

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).end()

  const auth = await authenticate(req, res)
  if (!auth) return

  // Tier kontrolü
  if (!IZINLI_TIER.includes(auth.tier)) {
    return res.status(403).json({
      success: false,
      error: {
        code:       'TIER_REQUIRED',
        message:    'Sentez endpoint sadece Pro ve Enterprise tier için kullanılabilir.',
        mevcutTier: auth.tier,
        gerekliTier: 'pro veya enterprise',
        upgradeUrl: 'https://kadim-api.vercel.app/#fiyatlar',
      },
    })
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: { code: 'METHOD_NOT_ALLOWED', message: 'POST metodu gerekli.' },
    })
  }

  const {
    metin,
    dogumTarihi,
    dogumSaati = 12,
    sistemler = ['ebced', 'numeroloji', 'rune', 'kabbalah', 'iching'],
  } = req.body ?? {}

  if (!metin || typeof metin !== 'string' || !metin.trim()) {
    return res.status(400).json({
      success: false,
      error: {
        code:    'MISSING_PARAM',
        message: '"metin" parametresi gerekli.',
        ornek: {
          metin:       'Orkun',
          dogumTarihi: '1990-05-15',
          dogumSaati:  14,
          sistemler:   ['ebced', 'numeroloji', 'rune', 'kabbalah', 'iching'],
        },
      },
    })
  }

  if (dogumTarihi && !/^\d{4}-\d{2}-\d{2}$/.test(dogumTarihi)) {
    return res.status(400).json({
      success: false,
      error: { code: 'INVALID_DATE', message: '"dogumTarihi" YYYY-MM-DD formatında olmalı.' },
    })
  }

  const temiz = metin.trim()
  const sonuclar = {}
  const hatalar  = {}

  // Paralel hesaplama — her motor bağımsız çalışır
  const gorevler = []

  if (sistemler.includes('ebced')) {
    gorevler.push(
      Promise.resolve()
        .then(() => { sonuclar.ebced = ebcedHesapla(temiz) })
        .catch(e => { hatalar.ebced = e.message })
    )
  }

  if (sistemler.includes('numeroloji')) {
    gorevler.push(
      Promise.resolve()
        .then(() => { sonuclar.numeroloji = numerolojiBul(temiz, dogumTarihi ?? null) })
        .catch(e => { hatalar.numeroloji = e.message })
    )
  }

  if (sistemler.includes('rune')) {
    gorevler.push(
      Promise.resolve()
        .then(() => { sonuclar.rune = runeHesapla(temiz) })
        .catch(e => { hatalar.rune = e.message })
    )
  }

  if (sistemler.includes('kabbalah')) {
    gorevler.push(
      Promise.resolve()
        .then(() => { sonuclar.kabbalah = kabbalahHesapla(temiz) })
        .catch(e => { hatalar.kabbalah = e.message })
    )
  }

  if (sistemler.includes('iching')) {
    gorevler.push(
      Promise.resolve()
        .then(() => { sonuclar.iching = ichingHesapla(temiz, dogumTarihi ?? null) })
        .catch(e => { hatalar.iching = e.message })
    )
  }

  // Tarih-bağımlı sistemler
  if (dogumTarihi) {
    const [yil, ay, gun] = dogumTarihi.split('-').map(Number)
    const saat = Number(dogumSaati)

    if (sistemler.includes('nakshatra') || !sistemler.length) {
      gorevler.push(
        Promise.resolve()
          .then(() => { sonuclar.nakshatra = nakshatraHesapla(yil, ay, gun, saat, 0) })
          .catch(e => { hatalar.nakshatra = e.message })
      )
    }

    if (sistemler.includes('bazi') || !sistemler.length) {
      gorevler.push(
        Promise.resolve()
          .then(() => { sonuclar.bazi = hesaplaBaZi(yil, ay, gun, saat) })
          .catch(e => { hatalar.bazi = e.message })
      )
    }

    if (sistemler.includes('ay-menzili') || !sistemler.length) {
      gorevler.push(
        Promise.resolve()
          .then(() => { sonuclar['ay-menzili'] = ayMenziliHesapla(yil, ay, gun, saat, 0) })
          .catch(e => { hatalar['ay-menzili'] = e.message })
      )
    }
  }

  await Promise.all(gorevler)

  return res.status(200).json({
    success: true,
    data:    sonuclar,
    hatalar: Object.keys(hatalar).length > 0 ? hatalar : undefined,
    meta: {
      sistem:      'sentez',
      versiyon:    '1.0',
      girdi:       { metin: temiz, dogumTarihi: dogumTarihi ?? null, dogumSaati },
      sistemler:   Object.keys(sonuclar),
      kredi:       SENTEZ_KREDI,
      kalan:       auth.usage.kalan,
      limit:       auth.usage.limit,
      tier:        auth.tier,
    },
  })
}
