import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const kabbalahTablosu = require('../../veri/kabbalah-tablosu.json')
const sefirotListesi  = require('../../veri/sefirot.json')

// Dijital kök — tekli basamağa inene kadar topla (1–9 arası)
function dijitalKokBul(sayi) {
  let n = sayi
  while (n > 9) {
    n = String(n).split('').reduce((t, d) => t + Number(d), 0)
  }
  return n
}

// Dijital kök yöntemi: toplamı 1-10'a indir (10 = Malkuth)
// Dion Fortune, Mistik Kabala: "On Kutsal Sefirot, yirmi iki Yol"
// Sefirot numarası dijital köke (1-10) karşılık gelir: 1=Keter … 9=Yesod, 10=Malkuth
function sefirotBul(toplam) {
  let n = toplam
  while (n > 10) {
    n = String(n).split('').reduce((t, d) => t + Number(d), 0)
  }
  const no = n === 0 ? 10 : n
  return sefirotListesi.find(s => s.no === no) || sefirotListesi[9]
}

export function kabbalahHesapla(metin) {
  if (!metin || !metin.trim()) return null

  const normalized = metin.toLocaleLowerCase('tr').trim()
  const harfler    = []
  let   toplam     = 0

  for (const harf of normalized) {
    if (harf === ' ') continue
    const eslesen = kabbalahTablosu[harf]
    if (eslesen) {
      harfler.push({ harf, ...eslesen })
      toplam += eslesen.deger
    }
  }

  if (harfler.length === 0) return null

  const dijitalKok   = dijitalKokBul(toplam)
  const anaSefirot   = sefirotBul(toplam)

  // Her harfin sefirot'unu da çöz
  const harfSefirotlari = harfler.map(h => ({
    ...h,
    sefirotVeri: sefirotListesi.find(s => s.isim === h.sefirot) || null,
  }))

  // Toplam değere göre ek anlam
  const sayisalAnlam = anaSefirot
    ? `${toplam} değeri dijital köke indirgenerek ${dijitalKok} elde edilir. Bu sayı ${anaSefirot.isim_tr} (${anaSefirot.isim}) Sefirot'uyla rezonans kurar: ${anaSefirot.enerji}.`
    : `${toplam} değeri ${dijitalKok} dijital köküne karşılık gelir.`

  return {
    toplam,
    dijitalKok,
    harfler:      harfSefirotlari,
    sefirot:      anaSefirot,
    tumSefirotlar: sefirotListesi,
    sayisalAnlam,
    harfSayisi:   harfler.length,
  }
}
