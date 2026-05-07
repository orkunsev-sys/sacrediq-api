// Ebced-i Sagir — Her harfin Kebir değeri tek basamağa indirgenir, sonra toplanır
// Örn: ل=30 → 3, ق=100 → 1, غ=1000 → 1

import { kebir, ARABIC_KEBIR } from './kebir.js'
import { cevirLatinToArapca, isArapca } from './transliterate.js'

// Tek basamağa indirgeme
export function sagirDeger(kebiriDeger) {
  let v = kebiriDeger
  while (v >= 10) {
    v = String(v).split('').reduce((s, d) => s + Number(d), 0)
  }
  return v
}

export function sagir(metin) {
  const arapcaMetin = isArapca(metin) ? metin : cevirLatinToArapca(metin)

  // Kebir detaylarını al, her değeri indirge
  const sonuc = kebir(arapcaMetin)
  let toplam = 0
  const detaylar = sonuc.detaylar.map(d => {
    const kucukDeger = sagirDeger(d.deger)
    toplam += kucukDeger
    return { ...d, deger: kucukDeger, kebir: d.deger }
  })

  return { sistem: 'sagir', toplam, detaylar, arapcaMetin: sonuc.arapcaMetin }
}
