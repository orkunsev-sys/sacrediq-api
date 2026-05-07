// Ebced-i Kebir — Standart Doğu (Maşrık / Osmanlı) Sistemi
// Abjad sırası: ابجد هوز حطي كلمن سعفص قرشت ثخذ ضظغ

import { cevirLatinToArapca, isArapca } from './transliterate.js'

export const ARABIC_KEBIR = {
  'ا': 1,  'أ': 1,  'إ': 1,  'آ': 1,  'ء': 1,  'ئ': 1,
  'ب': 2,
  'ج': 3,
  'د': 4,
  'ه': 5,  'ة': 5,   // tâ merbûta = He
  'و': 6,  'ؤ': 6,
  'ز': 7,
  'ح': 8,
  'ط': 9,
  'ي': 10, 'ى': 10,
  'ك': 20,
  'ل': 30,
  'م': 40,
  'ن': 50,
  'س': 60,
  'ع': 70,
  'ف': 80,
  'ص': 90,
  'ق': 100,
  'ر': 200,
  'ش': 300,
  'ت': 400,
  'ث': 500,
  'خ': 600,
  'ذ': 700,
  'ض': 800,
  'ظ': 900,
  'غ': 1000,
}

export const ARABIC_HARF_ADI = {
  'ا': 'Elif', 'أ': 'Elif', 'إ': 'Elif', 'آ': 'Elif', 'ء': 'Hemze',
  'ب': 'Be',
  'ج': 'Cim',
  'د': 'Dal',
  'ه': 'He',  'ة': 'He',
  'و': 'Vav', 'ؤ': 'Vav',
  'ز': 'Ze',
  'ح': 'Ha',
  'ط': 'Tı',
  'ي': 'Ye', 'ى': 'Ye', 'ئ': 'Ye',
  'ك': 'Kef',
  'ل': 'Lam',
  'م': 'Mim',
  'ن': 'Nun',
  'س': 'Sin',
  'ع': 'Ayn',
  'ف': 'Fe',
  'ص': 'Sad',
  'ق': 'Kaf',
  'ر': 'Re',
  'ش': 'Şın',
  'ت': 'Te',
  'ث': 'Se',
  'خ': 'Hı',
  'ذ': 'Zel',
  'ض': 'Dad',
  'ظ': 'Zı',
  'غ': 'Ğayn',
}

// Hareke / diyakritik işaretleri temizle
const HAREKE_RE = /[ً-ٟؐ-ؚې-ۭ‌‍]/g

function temizleArapca(metin) {
  return metin.replace(HAREKE_RE, '')
}

export function kebir(metin) {
  const arapcaMetin = isArapca(metin) ? metin : cevirLatinToArapca(metin)
  const temiz = temizleArapca(arapcaMetin)

  let toplam = 0
  const detaylar = []

  for (const harf of temiz) {
    if (harf === ' ') continue
    const deger = ARABIC_KEBIR[harf]
    if (deger !== undefined) {
      toplam += deger
      detaylar.push({ harf, harfAdi: ARABIC_HARF_ADI[harf] ?? harf, deger })
    }
  }

  return { sistem: 'kebir', toplam, detaylar, arapcaMetin: temiz }
}
