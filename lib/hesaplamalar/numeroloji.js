// Numeroloji — tüm sistemleri birleştirir
import { pisagorHesapla } from './numeroloji/pisagor.js'
import { kaldeanHesapla } from './numeroloji/kaldean.js'
import { gematriaHesapla } from './numeroloji/gematria.js'
import { tantrikHesapla  } from './numeroloji/tantrik.js'

// dogumTarihi: "YYYY-MM-DD" string ya da null
export function numerolojiBul(metin, dogumTarihi = null) {
  const pisagor  = pisagorHesapla(metin)
  const kaldean  = kaldeanHesapla(metin)
  const gematria = gematriaHesapla(metin)

  let dogumObj = null
  if (dogumTarihi) {
    const [yil, ay, gun] = dogumTarihi.split('-').map(Number)
    if (yil && ay && gun) dogumObj = { gun, ay, yil }
  }
  const tantrik = tantrikHesapla(metin, dogumObj)

  return {
    // Geriye dönük uyumluluk (ProfilScreen ConsciousnessCode vb.)
    ifade:         pisagor.ifade,
    ruhSayisi:     pisagor.ruhSayisi,
    kisilik:       pisagor.kisilik,
    detaylar:      pisagor.detaylar,
    hammadde:      pisagor.hammadde,
    karmikDersler: pisagor.karmikDersler,
    // Tüm sistemler
    pisagor,
    kaldean,
    gematria,
    tantrik,
  }
}
