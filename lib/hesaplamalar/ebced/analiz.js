// Ebced Analiz Fonksiyonları
// Asal çarpanlar · 19 katları · Mukaddes sayılar · Eşdeğer Esma araması

import { kebir } from './kebir.js'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const esmaListesi = require('../../../veri/esma.json')

// Önemli/mukaddes sayılar (İslami gelenekte)
const MUKADDES_SAYILAR = new Set([
  3, 4, 5, 7, 9, 12, 19, 40, 66, 70, 99, 100, 110, 201, 786, 1000,
])

export function asalCarpanlara(sayi) {
  if (sayi < 2) return []
  const carpanlar = []
  let n = sayi
  for (let i = 2; i * i <= n; i++) {
    while (n % i === 0) { carpanlar.push(i); n = Math.floor(n / i) }
  }
  if (n > 1) carpanlar.push(n)
  return carpanlar
}

export function on19Katlari(sayi) {
  const sonuclar = []
  for (let k = 1; k * 19 <= sayi; k++) sonuclar.push(k * 19)
  return sonuclar
}

export function mukaddesKontrol(sayi) {
  return MUKADDES_SAYILAR.has(sayi)
}

// Esma-ül Hüsna içinde Kebir değeri verilen sayıya eşit olan isimleri döndürür
export function ekvivalentEsma(kebiriDeger) {
  return esmaListesi.filter(esma => {
    const sonuc = kebir(esma.ar)
    return sonuc.toplam === kebiriDeger
  })
}

// Verilen Ebced değerini kapsamlı analiz eder
export function tamAnalizEt(kebiriDeger) {
  return {
    deger:       kebiriDeger,
    asal:        asalCarpanlara(kebiriDeger),
    on19:        on19Katlari(kebiriDeger),
    mukaddes:    mukaddesKontrol(kebiriDeger),
    esmaEslenik: ekvivalentEsma(kebiriDeger),
  }
}
