// Elder Futhark — 24 rune, ~150–800 CE, Cermen runik alfabesinin ilk formu
import runeVeri from '../../../veri/runes.json'

export const ELDER_FUTHARK = runeVeri

// Abjad'a benzer transliterasyon haritası: Latin harf → Elder Futhark kodu
export const ELDER_TRANSLIT = {
  a: 'ansuz',
  b: 'berkano',
  c: 'kenaz',
  ç: 'kenaz',
  d: 'dagaz',
  e: 'ehwaz',
  f: 'fehu',
  g: 'gebo',
  ğ: 'gebo',
  h: 'hagalaz',
  i: 'isa',
  ı: 'isa',
  j: 'jera',
  k: 'kenaz',
  l: 'laguz',
  m: 'mannaz',
  n: 'naudhiz',
  o: 'othala',
  ö: 'othala',
  p: 'perthro',
  q: 'kenaz',
  r: 'raidho',
  s: 'sowilo',
  ş: 'sowilo',
  t: 'tiwaz',
  u: 'uruz',
  ü: 'uruz',
  v: 'wunjo',
  w: 'wunjo',
  x: 'algiz',
  y: 'jera',
  z: 'algiz',
}

export function runeByCode(code) {
  return ELDER_FUTHARK.find(r => r.code === code) ?? null
}
