import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const menzillerVeri = require('../veri/ay-menzilleri.json')
import { ayEkliptikLon } from './ay-pozisyon.js'

export function ayMenziliniBul(ayDerecesi) {
  const deg = ((ayDerecesi % 360) + 360) % 360
  for (const m of menzillerVeri) {
    const { baslangic, bitis } = m.derece ?? {}
    if (baslangic == null || bitis == null) continue
    if (bitis > baslangic) {
      if (deg >= baslangic && deg < bitis) return m
    } else {
      if (deg >= baslangic || deg < bitis) return m
    }
  }
  return null
}

export function ayMenziliHesapla(yil, ay, gun, saat = 12, dakika = 0) {
  const ayLon = ayEkliptikLon(yil, ay, gun, saat, dakika)
  return ayMenziliniBul(ayLon)
}

export { menzillerVeri }
