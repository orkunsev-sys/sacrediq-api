// Ebced-i Ahar — Bektaşi / Mağribi Varyantı
// Kebir'den farklı olarak bazı harflerin değerleri yer değiştirir:
// sin(س)=300, sad(ص)=60, dad(ض)=90, şın(ش)=1000

import { ARABIC_KEBIR, ARABIC_HARF_ADI } from './kebir.js'
import { cevirLatinToArapca, isArapca } from './transliterate.js'

export const ARABIC_AHAR = {
  ...ARABIC_KEBIR,
  'س': 300,   // Sin  — Kebir'de 60
  'ص': 60,    // Sad  — Kebir'de 90
  'ض': 90,    // Dad  — Kebir'de 800
  'ش': 1000,  // Şın  — Kebir'de 300
  'غ': 800,   // Ğayn — Kebir'de 1000
}

export function ahar(metin) {
  const arapcaMetin = isArapca(metin) ? metin : cevirLatinToArapca(metin)
  const temiz = arapcaMetin.replace(/[ً-ٟؐ-ؚ‌‍]/g, '')

  let toplam = 0
  const detaylar = []

  for (const harf of temiz) {
    if (harf === ' ') continue
    const deger = ARABIC_AHAR[harf]
    if (deger !== undefined) {
      toplam += deger
      detaylar.push({ harf, harfAdi: ARABIC_HARF_ADI[harf] ?? harf, deger })
    }
  }

  return { sistem: 'ahar', toplam, detaylar, arapcaMetin: temiz }
}
