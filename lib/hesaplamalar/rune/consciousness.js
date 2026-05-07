// Bilinç Kodu Sekansı — 9 runelik kişisel dizi
// Doğum tarihi + isim birleşiminden deterministik seçim (seeded LCG)

import { ELDER_FUTHARK } from './elder-futhark.js'
import { getBirthRune } from './rune-calendar.js'

// Lineer eş döngüsel üreteci — tekrarlanabilir sıra için
function lcg(seed) {
  let s = seed >>> 0
  return function () {
    s = Math.imul(s, 1664525) + 1013904223
    s = s >>> 0
    return s / 0x100000000
  }
}

function isimHash(isim) {
  let h = 0
  for (let i = 0; i < isim.length; i++) {
    h = (Math.imul(31, h) + isim.charCodeAt(i)) >>> 0
  }
  return h
}

/**
 * Kişisel bilinç kodu — her zaman aynı giriş için aynı 9 runeyi üretir.
 *
 * @param {{ dogumGun: number, dogumAy: number, dogumYil: number, isim: string, niyet?: string }} profil
 * @returns {{ runeler: object[], dogumRunu: object, tohum: number }}
 */
export function generateConsciousnessCode(profil) {
  const { dogumGun, dogumAy, dogumYil, isim, niyet = '' } = profil

  const tohum = (dogumGun * 31 + dogumAy * 37 + dogumYil + isimHash(isim + niyet)) >>> 0
  const rand = lcg(tohum)

  // 24 rune'dan 9 benzersiz seç
  const pool = [...Array(24).keys()]
  const secilen = []
  for (let i = 0; i < 9; i++) {
    const idx = Math.floor(rand() * pool.length)
    const runeIdx = pool.splice(idx, 1)[0]
    const rune = ELDER_FUTHARK[runeIdx]
    secilen.push({
      ...rune,
      ters: rune.can_reverse ? rand() >= 0.5 : false,
    })
  }

  const dogumRunu = getBirthRune(new Date(dogumYil, dogumAy - 1, dogumGun))

  return { runeler: secilen, dogumRunu, tohum }
}
