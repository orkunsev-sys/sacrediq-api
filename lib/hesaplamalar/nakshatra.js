import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const NAKSHATRA_DATA = require('../veri/nakshatra.json')
import { ayEkliptikLon } from './ay-pozisyon.js'

const norm = (d) => ((d % 360) + 360) % 360

export function lahiriAyanamsha(jd) {
  const ayanamsha = 23.85 + (50.2772 / 3600) * (jd - 2415021.0) / 365.25
  return norm(ayanamsha)
}

export function dateToJD(year, month, day, hour, minute) {
  const h = hour + minute / 60
  const a = Math.floor((14 - month) / 12)
  const y = year + 4800 - a
  const m = month + 12 * a - 3
  const jdn = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4)
            - Math.floor(y / 100) + Math.floor(y / 400) - 32045
  return jdn + (h - 12) / 24
}

export function tropicalToSidereal(tropicalLon, jd) {
  return norm(tropicalLon - lahiriAyanamsha(jd))
}

export function getNakshatra(siderealMoonLon) {
  const n = norm(siderealMoonLon)
  const size = 360 / 27
  const idx = Math.floor(n / size)
  const pada = Math.floor((n % size) / (size / 4)) + 1
  const posIcinde = n % size
  const posYuzde  = (posIcinde / size) * 100
  const nk = NAKSHATRA_DATA[idx]
  return {
    ...nk,
    idx,
    pada,
    posYuzde: +posYuzde.toFixed(1),
    siderealLon: +n.toFixed(4),
    bitisi: nk.bitis,
  }
}

export function nakshatraHesapla(yil, ay, gun, saat = 12, dakika = 0) {
  const tropicalMoon = ayEkliptikLon(yil, ay, gun, saat, dakika)
  const jd = dateToJD(yil, ay, gun, saat, dakika)
  const siderealMoon = tropicalToSidereal(tropicalMoon, jd)
  return getNakshatra(siderealMoon)
}
