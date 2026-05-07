// Anglo-Saxon Futhorc — 29 rune (~600–1100 CE)
// Elder Futhark'ın 5 ek rune ile genişletilmiş İngiliz versiyonu

import { ELDER_FUTHARK } from './elder-futhark.js'

// 5 ek Anglo-Saxon rune
const FUTHORC_EKLER = [
  {
    code: 'ac', symbol: 'ᚪ', translit: 'A',
    anlam_tr: 'Meşe ağacı — güç, dayanıklılık, köklü büyüme',
    anlam_en: 'Oak tree — strength, durability, rooted growth',
    aett: 0, position: 25,
  },
  {
    code: 'aesc', symbol: 'ᚫ', translit: 'Æ',
    anlam_tr: 'Dişbudak ağacı — Yggdrasil, köprü, iyileşme',
    anlam_en: 'Ash tree — Yggdrasil, bridging worlds, healing',
    aett: 0, position: 26,
  },
  {
    code: 'yr_futhorc', symbol: 'ᚣ', translit: 'Y',
    anlam_tr: 'Yay — beceri, gerilim, hassas niyet',
    anlam_en: 'Bow — skill, tension, precise intent',
    aett: 0, position: 27,
  },
  {
    code: 'ior', symbol: 'ᛡ', translit: 'Io',
    anlam_tr: 'Yılan balığı/yılan — dönüşüm, sualtı bilgeliği',
    anlam_en: 'Eel/serpent — transformation, submerged wisdom',
    aett: 0, position: 28,
  },
  {
    code: 'ear', symbol: 'ᛠ', translit: 'Ea',
    anlam_tr: 'Mezar, toprak, ölüm — kaçınılmaz bitiş, ata toprağı',
    anlam_en: 'Grave, earth, death — the inevitable end, ancestral ground',
    aett: 0, position: 29,
  },
]

export const ANGLO_SAXON_FUTHORC = [
  ...ELDER_FUTHARK,
  ...FUTHORC_EKLER,
]

// Latin harf → Futhorc kodu (24 Elder + 5 ek için öncelik tablosu)
export const FUTHORC_TRANSLIT = {
  a: 'ac',          // Meşe ağacı Futhorc'ta 'a'yı karşılar
  æ: 'aesc',
  y: 'yr_futhorc',
  b: 'berkano',
  c: 'kenaz', ç: 'kenaz',
  d: 'dagaz',
  e: 'ehwaz',
  f: 'fehu',
  g: 'gebo', ğ: 'gebo',
  h: 'hagalaz',
  i: 'isa', ı: 'isa',
  j: 'jera',
  k: 'kenaz',
  l: 'laguz',
  m: 'mannaz',
  n: 'naudhiz',
  o: 'othala', ö: 'othala',
  p: 'perthro',
  r: 'raidho',
  s: 'sowilo', ş: 'sowilo',
  t: 'tiwaz',
  u: 'uruz', ü: 'uruz',
  v: 'wunjo', w: 'wunjo',
  x: 'algiz',
  z: 'algiz',
}
