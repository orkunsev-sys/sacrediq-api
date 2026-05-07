// Paul Schlyter yöntemi — ~1° doğruluk — dış bağımlılık yok

function rad(d) { return d * Math.PI / 180 }
function deg(r) { return r * 180 / Math.PI }
function norm(x) { return ((x % 360) + 360) % 360 }

function keplerCoz(M, e) {
  let E = M
  for (let i = 0; i < 30; i++) {
    const dE = (M - E + deg(e * Math.sin(rad(E)))) / (1 - e * Math.cos(rad(E)))
    E += dE
    if (Math.abs(dE) < 0.0001) break
  }
  return E
}

function gunSayisi(yil, ay, gun, saat = 12, dakika = 0) {
  let y = yil, m = ay
  if (m <= 2) { y -= 1; m += 12 }
  const A = Math.floor(y / 100)
  const B = 2 - A + Math.floor(A / 4)
  const JD = Math.floor(365.25 * (y + 4716))
           + Math.floor(30.6001 * (m + 1))
           + gun + (saat + dakika / 60) / 24
           + B - 1524.5
  return JD - 2451545.0
}

function ayHesapla(D) {
  const N = norm(125.1228 - 0.0529538083 * D)
  const i = 5.1454
  const w = norm(318.0634 + 0.1643573223 * D)
  const e = 0.054900
  const M = norm(115.3654 + 13.0649929509 * D)
  const E = keplerCoz(M, e)
  const a = 60.2666
  const xv = a * (Math.cos(rad(E)) - e)
  const yv = a * (Math.sqrt(1 - e * e) * Math.sin(rad(E)))
  const v   = deg(Math.atan2(yv, xv))
  const r_  = Math.sqrt(xv * xv + yv * yv)
  const xh  = r_ * (Math.cos(rad(N)) * Math.cos(rad(v + w)) - Math.sin(rad(N)) * Math.sin(rad(v + w)) * Math.cos(rad(i)))
  const yh  = r_ * (Math.sin(rad(N)) * Math.cos(rad(v + w)) + Math.cos(rad(N)) * Math.sin(rad(v + w)) * Math.cos(rad(i)))
  return norm(deg(Math.atan2(yh, xh)))
}

export function ayEkliptikLon(yil, ay, gun, saat = 12, dakika = 0) {
  const D = gunSayisi(yil, ay, gun, saat, dakika)
  return ayHesapla(D)
}
