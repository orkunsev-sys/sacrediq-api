// Rune Çekilişleri — Kripto-güvenli rastgele seçim
// Her pozisyon %50 ihtimalle ters (merkstave) gelebilir.

import { ELDER_FUTHARK } from './elder-futhark.js'

// Kripto-güvenli [0,1) rastgele sayı
function cryptoFloat() {
  const arr = new Uint32Array(1)
  globalThis.crypto.getRandomValues(arr)
  return arr[0] / 0x100000000
}

function cryptoBool() { return cryptoFloat() >= 0.5 }

// Kesişmeyen N rune seç ve her birine rastgele ters/düz ata
function secRuneler(n) {
  const pool = [...ELDER_FUTHARK]
  const secilen = []
  while (secilen.length < n && pool.length > 0) {
    const idx = Math.floor(cryptoFloat() * pool.length)
    const rune = pool.splice(idx, 1)[0]
    secilen.push({
      ...rune,
      ters: rune.can_reverse ? cryptoBool() : false,
    })
  }
  return secilen
}

// ── Çekiliş Tipleri ───────────────────────────────────────────────────────────

export function singleRune(intent = '') {
  const [rune] = secRuneler(1)
  return {
    tip: 'single',
    niyet: intent,
    pozisyonlar: [{ pozisyon: 'Yanıt', rune }],
  }
}

export function threeRune(intent = '') {
  const runeler = secRuneler(3)
  const pozisyonlar = ['Geçmiş', 'Şimdi', 'Gelecek']
  return {
    tip: 'three-rune',
    niyet: intent,
    pozisyonlar: runeler.map((rune, i) => ({ pozisyon: pozisyonlar[i], rune })),
  }
}

export function fiveRune(intent = '') {
  const runeler = secRuneler(5)
  const pozisyonlar = ['Doğu', 'Güney', 'Batı', 'Kuzey', 'Merkez']
  return {
    tip: 'five-rune',
    niyet: intent,
    pozisyonlar: runeler.map((rune, i) => ({ pozisyon: pozisyonlar[i], rune })),
  }
}

export function nineRune(intent = '') {
  // 3 Norn × 3 zaman katmanı
  const runeler = secRuneler(9)
  const pozisyonlar = [
    'Urd — Geçmişin Geçmişi', 'Urd — Şimdinin Geçmişi', 'Urd — Geleceğin Geçmişi',
    'Verdandi — Geçmişin Şimdisi', 'Verdandi — Şimdiki An', 'Verdandi — Geleceğin Şimdisi',
    'Skuld — Geçmişin Geleceği', 'Skuld — Şimdinin Geleceği', 'Skuld — Kaderin Ucu',
  ]
  return {
    tip: 'nine-rune',
    niyet: intent,
    pozisyonlar: runeler.map((rune, i) => ({ pozisyon: pozisyonlar[i], rune })),
  }
}

export function yggdrasil(intent = '') {
  // 9 dünya, Dünya Ağacı yayılımı
  const runeler = secRuneler(9)
  const pozisyonlar = [
    'Asgard — Tanrılar Âlemi',
    'Midgard — İnsan Âlemi',
    'Jotunheim — Devler Âlemi',
    'Alfheim — Işık Cinleri Âlemi',
    'Svartalfheim — Karanlık Cinler Âlemi',
    'Nidavellir — Cüceler Âlemi',
    'Niflheim — Buz ve Sis Âlemi',
    'Muspelheim — Ateş Âlemi',
    'Vanaheim — Vanir Tanrıları Âlemi',
  ]
  return {
    tip: 'yggdrasil',
    niyet: intent,
    pozisyonlar: runeler.map((rune, i) => ({ pozisyon: pozisyonlar[i], rune })),
  }
}
