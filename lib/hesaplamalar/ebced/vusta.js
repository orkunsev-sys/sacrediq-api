// Ebced-i Vusta — Her harfin Abjad sırasındaki sıra numarasını kullanır (1-28)
// Harfin sayısal değeri yerine alfabetik pozisyonu esas alınır

import { cevirLatinToArapca, isArapca } from './transliterate.js'
import { ARABIC_HARF_ADI } from './kebir.js'

// 28 harfin Abjad sıralanışı
const ABJAD_SIRASI = [
  'ا', 'ب', 'ج', 'د', 'ه', 'و', 'ز', 'ح', 'ط', 'ي',
  'ك', 'ل', 'م', 'ن', 'س', 'ع', 'ف', 'ص', 'ق', 'ر',
  'ش', 'ت', 'ث', 'خ', 'ذ', 'ض', 'ظ', 'غ',
]

export const ARABIC_VUSTA = {}
ABJAD_SIRASI.forEach((harf, i) => { ARABIC_VUSTA[harf] = i + 1 })

// Varyant harfler ana harf ile eşleştirilir
Object.assign(ARABIC_VUSTA, {
  'أ': 1, 'إ': 1, 'آ': 1, 'ء': 1,
  'ة': 5,
  'ؤ': 6,
  'ى': 10, 'ئ': 10,
})

export function vusta(metin) {
  const arapcaMetin = isArapca(metin) ? metin : cevirLatinToArapca(metin)
  const temiz = arapcaMetin.replace(/[ً-ٟؐ-ؚ‌‍]/g, '')

  let toplam = 0
  const detaylar = []

  for (const harf of temiz) {
    if (harf === ' ') continue
    const deger = ARABIC_VUSTA[harf]
    if (deger !== undefined) {
      toplam += deger
      detaylar.push({ harf, harfAdi: ARABIC_HARF_ADI[harf] ?? harf, deger })
    }
  }

  return { sistem: 'vusta', toplam, detaylar, arapcaMetin: temiz }
}
