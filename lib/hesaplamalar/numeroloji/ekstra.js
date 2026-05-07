// Ekstra Numeroloji Hesapları
// Personal Year/Month/Day · Karmic Debt · Pinnacles · Challenges

import { indirge, KARMIK_BORCLAR, USTAT_SAYILAR } from './pisagor.js'

// Tüm rakamları toplar (master sayı korumaz)
function toplamRakam(sayi) {
  if (sayi < 10) return sayi
  return toplamRakam(String(sayi).split('').reduce((t, d) => t + parseInt(d), 0))
}

// ---- Kişisel Döngüler ----

export function kisiselYil(dogumGun, dogumAy, hedefYil) {
  const ham = toplamRakam(dogumGun) + toplamRakam(dogumAy) + toplamRakam(hedefYil)
  return indirge(ham, false) // master sayı korunmaz (geleneksel yorum)
}

export function kisiselAy(kisiselYilSayisi, hedefAy) {
  return indirge(kisiselYilSayisi + hedefAy, false)
}

export function kisiselGun(kisiselAySayisi, hedefGun) {
  return indirge(kisiselAySayisi + hedefGun, false)
}

// ---- Karmik Borç ----

/**
 * Hesaplama öncesindeki ara toplamları kontrol eder.
 * @param {{ gun: number, ay: number, yil: number }} dogum
 * @returns {number[]} Bulunan karmik borç sayıları
 */
export function karmikBorclar(dogum) {
  const { gun, ay, yil } = dogum
  const gunHam = gun
  const ayHam = ay
  const yilHam = toplamRakam(yil)
  const toplamHam = gunHam + ayHam + yilHam

  // İndirgeme zincirini izle
  const araValues = [gunHam, ayHam, yilHam, toplamHam]
  let v = toplamHam
  while (v >= 10 && !USTAT_SAYILAR.has(v)) {
    v = String(v).split('').reduce((t, d) => t + parseInt(d), 0)
    araValues.push(v)
  }

  return [...new Set(araValues.filter(n => KARMIK_BORCLAR.has(n)))]
}

// ---- Pinnacles (4 Doruk Dönemi) ----

/**
 * @param {{ gun: number, ay: number, yil: number }} dogum
 * @param {number} yolSayisi — Life Path sayısı
 * @returns {{ sayi: number, baslangic: number, bitis: number|null }[]}
 */
export function pinnacles(dogum, yolSayisi) {
  const gun = toplamRakam(dogum.gun)
  const ay  = toplamRakam(dogum.ay)
  const yil = toplamRakam(dogum.yil)

  const p1 = indirge(ay + gun)
  const p2 = indirge(gun + yil)
  const p3 = indirge(p1 + p2)
  const p4 = indirge(ay + yil)

  // 1. dönem süresi: 36 - Life Path
  const bitis1 = 36 - indirge(yolSayisi, false)

  return [
    { sayi: p1, baslangic: 0,        bitis: bitis1 },
    { sayi: p2, baslangic: bitis1,   bitis: bitis1 + 9 },
    { sayi: p3, baslangic: bitis1+9, bitis: bitis1 + 18 },
    { sayi: p4, baslangic: bitis1+18, bitis: null }, // ömrün geri kalanı
  ]
}

// ---- Challenges (4 Zorluk) ----

/**
 * @param {{ gun: number, ay: number, yil: number }} dogum
 * @returns {number[]} 4 zorluk sayısı
 */
export function challenges(dogum) {
  const gun = toplamRakam(dogum.gun)
  const ay  = toplamRakam(dogum.ay)
  const yil = toplamRakam(dogum.yil)

  const c1 = Math.abs(ay - gun)
  const c2 = Math.abs(gun - yil)
  const c3 = Math.abs(c1 - c2)
  const c4 = Math.abs(ay - yil)

  return [c1, c2, c3, c4].map(n => indirge(n, false))
}

// ---- Life Path (Yaşam Yolu) — Standart Yöntem ----
// Gün + Ay + Yıl ayrı ayrı indirgenir, sonra toplanır

export function yasamYolu(dogum) {
  const { gun, ay, yil } = dogum
  const g = indirge(gun)
  const a = indirge(ay)
  const y = indirge(yil)

  const ham = g + a + y
  // Karmik borç kontrolü
  const karmik = KARMIK_BORCLAR.has(ham) ? [ham] : []
  // Master sayı veya tek rakama indir
  const sonuc = indirge(ham)
  // Eğer indirgenmiş değer karmik değilse ham'ı da kontrol et
  const tumKarmik = [...new Set([...karmik, ...(KARMIK_BORCLAR.has(indirge(ham,false)) ? [indirge(ham,false)] : [])])]

  return {
    yasamYolu: sonuc,
    karmikBorclar: tumKarmik,
    hammadde: { gun: g, ay: a, yil: y, toplam: ham },
  }
}
