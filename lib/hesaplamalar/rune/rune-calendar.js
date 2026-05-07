// Rune Takvimi — 24 yarım-aylık dönem
// Berkano, Imbolc geleneğine göre 28 Ocak–13 Şubat dönemine yerleştirilmiştir.

import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const kalenderData = require('../../veri/rune-calendar.json')
import { ELDER_FUTHARK, ELDER_TRANSLIT, runeByCode } from './elder-futhark.js'

// Yıl-bağımsız karşılaştırma: Haziran–Aralık (600-1231) ve Ocak–Mayıs (1300-1729)
function ayGunToSayi(ay, gun) {
  return ay >= 6 ? ay * 100 + gun : (ay + 12) * 100 + gun
}

export function getBirthRune(birthDate) {
  const ay  = birthDate.getMonth() + 1
  const gun = birthDate.getDate()
  const deger = ayGunToSayi(ay, gun)

  for (const donem of kalenderData) {
    const bas   = ayGunToSayi(donem.baslangicAy, donem.baslangicGun)
    const bitis = ayGunToSayi(donem.bitisAy, donem.bitisGun)
    if (deger >= bas && deger < bitis) {
      return ELDER_FUTHARK.find(r => r.code === donem.rune) ?? null
    }
  }

  return ELDER_FUTHARK.find(r => r.code === 'othala') ?? null
}

export function getNameRunes(name) {
  const kucuk = name.toLocaleLowerCase('tr')
  const gorulmus = new Set()
  const sonuc = []

  for (const harf of kucuk) {
    if (harf === ' ') continue
    const kod = ELDER_TRANSLIT[harf]
    if (kod && !gorulmus.has(kod)) {
      gorulmus.add(kod)
      const rune = runeByCode(kod)
      if (rune) sonuc.push({ harf, ...rune })
    }
  }

  return sonuc
}

// Takvim dönemlerini rune verisiyle birlikte döndür (UI için)
export function getCalendarPeriods() {
  return kalenderData.map(d => ({
    ...d,
    runeData: ELDER_FUTHARK.find(r => r.code === d.rune),
  }))
}
