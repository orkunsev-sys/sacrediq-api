// Tantrik/Yogik Numeroloji — 5 Temel Sayı
// Soul · Karma · Gift · Destiny · Path

import { PISAGOR_TABLO, SESLI_HARFLER, indirge } from './pisagor.js'

function harf2sayi(metin) {
  let sesli = 0, sessiz = 0
  const detaylar = []
  for (const harf of metin.toLocaleLowerCase('tr').trim()) {
    if (harf === ' ') continue
    const deger = PISAGOR_TABLO[harf]
    if (!deger) continue
    detaylar.push({ harf, deger })
    if (SESLI_HARFLER.has(harf)) sesli += deger
    else sessiz += deger
  }
  return { sesli, sessiz, detaylar }
}

function dogumSayisi(gunAy, yil) {
  const tüm = String(gunAy).padStart(4, '0').split('').concat(String(yil).split(''))
  return tüm.reduce((t, d) => t + parseInt(d), 0)
}

/**
 * @param {string} isimSoyisim
 * @param {{ gun: number, ay: number, yil: number }} dogum — opsiyonel
 */
export function tantrikHesapla(isimSoyisim, dogum = null) {
  const { sesli, sessiz, detaylar } = harf2sayi(isimSoyisim)

  // Soul (Ruh) — sesli harfler
  const soul = indirge(sesli)

  // Karma — sessiz harfler (kişilik gölgesi)
  const karma = indirge(sessiz)

  // Destiny — tüm isim ifade sayısı
  const destiny = indirge(sesli + sessiz)

  // Gift (Armağan) — doğum günü (sadece gün), opsiyonel
  const gift = dogum ? indirge(dogum.gun) : null

  // Path (Yol) — doğum tarihi tam, opsiyonel
  let path = null
  if (dogum) {
    const ham = dogumSayisi(
      String(dogum.gun).padStart(2,'0') + String(dogum.ay).padStart(2,'0'),
      dogum.yil
    )
    path = indirge(ham)
  }

  return {
    sistem: 'tantrik',
    soul,       // Ruh / içsel arzular
    karma,      // Karma / dışa yansıyan
    destiny,    // Kader / yaşam amacı
    gift,       // Armağan / doğal yetenek (doğum günü)
    path,       // Yol / yaşam yolu (doğum tarihi)
    detaylar,
  }
}
