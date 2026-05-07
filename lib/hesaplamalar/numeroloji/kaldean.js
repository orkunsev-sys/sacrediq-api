// Kaldeyan (Chaldean) Numeroloji — 9 sayısı son değer olarak kullanılmaz

// Kaldeyan ses tabanlı harf-sayı eşleşmesi (Türkçe genişletilmiş)
export const KALDEAN_TABLO = {
  'a':1, 'b':2, 'c':3, 'ç':3, 'd':4, 'e':5, 'f':8, 'g':3, 'ğ':3,
  'h':5, 'ı':1, 'i':1, 'j':1, 'k':2, 'l':3, 'm':4, 'n':5, 'o':7,
  'ö':7, 'p':8, 'q':1, 'r':2, 's':3, 'ş':3, 't':4, 'u':6, 'ü':6,
  'v':6, 'w':6, 'x':5, 'y':1, 'z':7
}

export const SESLI_HARFLER = new Set(['a','e','ı','i','o','ö','u','ü'])

// Kaldeyan'da 9 final değer olarak dönmez; 9 gelirse tekrar indirgenir
function indirgeKaldean(sayi) {
  if (sayi === 9) return 9 // tek basamak 9 kabul edilir
  if (sayi < 10) return sayi
  const toplam = String(sayi).split('').reduce((t, d) => t + parseInt(d), 0)
  // 9 çıkarsa yeniden indirgeme yapmaya devam et
  if (toplam === 9) return 9
  if (toplam < 10) return toplam
  return indirgeKaldean(toplam)
}

export function kaldeanHesapla(isimSoyisim) {
  const normalized = isimSoyisim.toLocaleLowerCase('tr').trim()
  let toplamToplam = 0, sesliToplam = 0, sessizToplam = 0
  const detaylar = []

  for (const harf of normalized) {
    if (harf === ' ') continue
    const deger = KALDEAN_TABLO[harf]
    if (!deger) continue
    toplamToplam += deger
    detaylar.push({ harf, deger })
    if (SESLI_HARFLER.has(harf)) sesliToplam += deger
    else sessizToplam += deger
  }

  return {
    sistem: 'kaldean',
    // Kaldeyan çift basamak değerleri genellikle gösterilir (örn: 23/5)
    ifadeHam: toplamToplam,
    ifade: indirgeKaldean(toplamToplam),
    ruhSayisi: indirgeKaldean(sesliToplam),
    kisilik: indirgeKaldean(sessizToplam),
    detaylar,
  }
}
