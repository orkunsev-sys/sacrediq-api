// Pisagor (Pythagorean) Numeroloji Sistemi — Türkçe genişletilmiş

export const PISAGOR_TABLO = {
  'a':1, 'b':2, 'c':3, 'ç':3, 'd':4, 'e':5, 'f':6, 'g':7, 'ğ':7,
  'h':8, 'ı':9, 'i':9, 'j':1, 'k':2, 'l':3, 'm':4, 'n':5, 'o':6,
  'ö':6, 'p':7, 'q':8, 'r':9, 's':1, 'ş':1, 't':2, 'u':3, 'ü':3,
  'v':4, 'w':5, 'x':6, 'y':7, 'z':8
}

export const SESLI_HARFLER = new Set(['a','e','ı','i','o','ö','u','ü'])
export const USTAT_SAYILAR = new Set([11, 22, 33])

// Karmik borç tetikleyicileri (indirgeme öncesi değerler)
export const KARMIK_BORCLAR = new Set([13, 14, 16, 19])

export function indirge(sayi, masterKoru = true) {
  if (masterKoru && USTAT_SAYILAR.has(sayi)) return sayi
  if (sayi < 10) return sayi
  const toplam = String(sayi).split('').reduce((t, d) => t + parseInt(d), 0)
  return indirge(toplam, masterKoru)
}

// Karmik borç var mı kontrol et
export function karmikBorcKontrol(araToplamlar) {
  return araToplamlar.filter(t => KARMIK_BORCLAR.has(t))
}

export function pisagorHesapla(isimSoyisim) {
  const normalized = isimSoyisim.toLocaleLowerCase('tr').trim()
  let toplamToplam = 0, sesliToplam = 0, sessizToplam = 0
  const detaylar = []
  const eksikSayilar = []

  for (const harf of normalized) {
    if (harf === ' ') continue
    const deger = PISAGOR_TABLO[harf]
    if (!deger) continue
    toplamToplam += deger
    detaylar.push({ harf, deger })
    if (SESLI_HARFLER.has(harf)) sesliToplam += deger
    else sessizToplam += deger
  }

  // Karmik dersler: 1-9 arasında isimde hiç çıkmayan sayılar
  const cikanSayilar = new Set(detaylar.map(d => d.deger))
  for (let i = 1; i <= 9; i++) {
    if (!cikanSayilar.has(i)) eksikSayilar.push(i)
  }

  return {
    sistem: 'pisagor',
    ifade: indirge(toplamToplam),
    ruhSayisi: indirge(sesliToplam),
    kisilik: indirge(sessizToplam),
    karmikDersler: eksikSayilar,
    hammadde: { ifade: toplamToplam, ruh: sesliToplam, kisilik: sessizToplam },
    detaylar,
  }
}
