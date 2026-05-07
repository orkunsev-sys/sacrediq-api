// Geriye dönük uyumluluk katmanı — App.jsx ve EbcedSonuc bu dosyayı import eder
// Genişletilmiş modüller: src/hesaplamalar/ebced/ klasöründe

import { kebir } from './ebced/kebir.js'
import { sagir } from './ebced/sagir.js'
import { vusta } from './ebced/vusta.js'
import { ahar } from './ebced/ahar.js'
import { vefk } from './ebced/vefk.js'
import { LATIN_ARAPCA } from './ebced/transliterate.js'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const esmaListesi = require('../../veri/esma-listesi.json')

export function ebcedHesapla(metin) {
  const kebirSonuc = kebir(metin)
  const sagirSonuc = sagir(metin)
  const vustaSonuc = vusta(metin)
  const aharSonuc = ahar(metin)

  // Vefk için boyut belirleme — toplama göre uygun boyut seçelim
  let vefkBoyut = 3
  if (kebirSonuc.toplam > 500) vefkBoyut = 5
  if (kebirSonuc.toplam > 2000) vefkBoyut = 7

  let vefkSonuc
  try {
    vefkSonuc = vefk(vefkBoyut, kebirSonuc.toplam)
  } catch {
    vefkSonuc = null
  }

  // Fonetik dönüşüm yolunda 1:1 eşleme var — orijinal Latin harfleri koru
  const latinHarfler = []
  for (const ch of metin.toLocaleLowerCase('tr').trim()) {
    if (ch === ' ') continue
    if (LATIN_ARAPCA[ch]) latinHarfler.push(ch.toLocaleUpperCase('tr'))
  }
  const latinKullan = latinHarfler.length === kebirSonuc.detaylar.length

  return {
    toplam:   kebirSonuc.toplam,
    detaylar: kebirSonuc.detaylar.map((d, i) => ({
      harf:      latinKullan ? latinHarfler[i] : d.harf,
      arapcaHarf: d.harf,
      ebcedHarf: d.harfAdi,
      deger:     d.deger,
    })),
    // Tüm sistemler
    sistemler: {
      kebir: kebirSonuc,
      sagir: sagirSonuc,
      vusta: vustaSonuc,
      ahar:  aharSonuc,
      vefk:  vefkSonuc,
    },
  }
}

// Tek geçiş rakam toplamı (görüntüleme için — 786→21)
export function rakamTopla(sayi) {
  const str = String(sayi)
  return str.split('').reduce((acc, d) => acc + parseInt(d), 0)
}

// Tam indirgeme tek basamağa (esma eşleşmesi için — 786→21→3)
function rakamKok(sayi) {
  let n = Math.abs(sayi)
  while (n > 9) n = String(n).split('').reduce((a, d) => a + parseInt(d), 0)
  return n
}

// Ebced değerine göre eşleşen Esmaları döndürür
export function esmaEsles(deger) {
  if (!deger || deger <= 0) return null

  // 1) Tam eşleşme
  const tam = esmaListesi.filter(e => e.ebced === deger)
  if (tam.length > 0) return { tip: 'tam', esmalar: tam }

  // 2) En yakın 3 esma (fark bilgisiyle, sadece referans amaçlı)
  const sirali = esmaListesi
    .map(e => ({ ...e, fark: Math.abs(e.ebced - deger) }))
    .sort((a, b) => a.fark - b.fark)
    .slice(0, 3)
  return { tip: 'yakin', esmalar: sirali }
}
