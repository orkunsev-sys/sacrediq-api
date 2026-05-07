// Younger Futhark — 16 rune, ~800–1100 CE, Viking Çağı
// Elder Futhark'ın 24'ten 16'ya indirgenmiş Viking versiyonu

export const YOUNGER_FUTHARK = [
  { code: 'fe',    symbol: 'ᚠ', translit: 'F',  anlam: 'Servet, sığır',        elder: 'fehu' },
  { code: 'ur',    symbol: 'ᚢ', translit: 'U',  anlam: 'Yaban öküzü, güç',    elder: 'uruz' },
  { code: 'thurs', symbol: 'ᚦ', translit: 'Th', anlam: 'Dev, diken',           elder: 'thurisaz' },
  { code: 'oss',   symbol: 'ᚬ', translit: 'A',  anlam: 'Odin, ilahi kelam',   elder: 'ansuz' },
  { code: 'reid',  symbol: 'ᚱ', translit: 'R',  anlam: 'Yolculuk, ritim',      elder: 'raidho' },
  { code: 'kaun',  symbol: 'ᚴ', translit: 'K',  anlam: 'Ülser, yara, ateş',   elder: 'kenaz' },
  { code: 'hagall',symbol: 'ᚼ', translit: 'H',  anlam: 'Dolu, yıkım',          elder: 'hagalaz' },
  { code: 'naudhr',symbol: 'ᚾ', translit: 'N',  anlam: 'İhtiyaç, zorunluluk', elder: 'naudhiz' },
  { code: 'is',    symbol: 'ᛁ', translit: 'I',  anlam: 'Buz, durgunluk',       elder: 'isa' },
  { code: 'ar',    symbol: 'ᛅ', translit: 'A',  anlam: 'Yıl, hasat, bereket',  elder: 'jera' },
  { code: 'sol',   symbol: 'ᛋ', translit: 'S',  anlam: 'Güneş, zafer',         elder: 'sowilo' },
  { code: 'tyr',   symbol: 'ᛏ', translit: 'T',  anlam: 'Tyr, adalet, zafer',   elder: 'tiwaz' },
  { code: 'bjork', symbol: 'ᛒ', translit: 'B',  anlam: 'Huş, doğum, yenilik', elder: 'berkano' },
  { code: 'mathr', symbol: 'ᛘ', translit: 'M',  anlam: 'İnsan, topluluk',      elder: 'mannaz' },
  { code: 'logr',  symbol: 'ᛚ', translit: 'L',  anlam: 'Su, göl, sezgi',       elder: 'laguz' },
  { code: 'yr',    symbol: 'ᛦ', translit: 'Y',  anlam: 'Porsuk, ölüm-yeniden doğuş', elder: 'eihwaz' },
]

// Latin harf → Younger Futhark kodu
export const YOUNGER_TRANSLIT = {
  a: 'oss', â: 'oss', e: 'oss', æ: 'ar',
  b: 'bjork', p: 'bjork',
  c: 'kaun', ç: 'kaun', k: 'kaun', g: 'kaun', ğ: 'kaun',
  d: 'tyr',
  f: 'fe', v: 'fe',
  h: 'hagall',
  i: 'is', ı: 'is',
  j: 'ar', y: 'yr',
  l: 'logr',
  m: 'mathr',
  n: 'naudhr',
  o: 'ur', ö: 'ur', u: 'ur', ü: 'ur',
  r: 'reid',
  s: 'sol', ş: 'sol', z: 'sol',
  t: 'tyr',
  w: 'ur',
  th: 'thurs',
}
