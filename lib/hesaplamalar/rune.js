// Geriye dönük uyumluluk katmanı — App.jsx ve RuneSonuc bu dosyayı import eder
// Genişletilmiş modüller: src/hesaplamalar/rune/ klasöründe

import runeTablosu from '../../veri/rune-tablosu.json'
import runesVeri   from '../../veri/runes.json'

const RUNES_BY_CODE = Object.fromEntries(runesVeri.map(r => [r.code, r]))

export function runeHesapla(metin) {
  const normalized = metin.toLocaleLowerCase('tr').trim()
  const detaylar = []

  for (const harf of normalized) {
    if (harf === ' ') continue
    const eslesen = runeTablosu[harf]
    if (!eslesen) continue

    const zengin = RUNES_BY_CODE[eslesen.ad.toLowerCase()] ?? null

    detaylar.push({
      harf,
      rune:       eslesen.rune,
      ad:         eslesen.ad,
      anlam:      eslesen.anlam,
      element:    zengin?.element   ?? null,
      chakra:     zengin?.chakra    ?? null,
      deity:      zengin?.deity     ?? eslesen.tanri ?? null,
      aett:       zengin?.aett      ?? null,
      color:      zengin?.color     ?? null,
      literal:    zengin?.meaning_literal?.tr      ?? null,
      psikolojik: zengin?.meaning_psychological?.tr ?? null,
      mistik:     zengin?.meaning_mystical?.tr      ?? null,
      golge:      zengin?.meaning_shadow?.tr        ?? null,
      kadim:      zengin?.kadim                     ?? null,
      kristal:    eslesen.kristal   ?? null,
      bitki:      eslesen.bitki     ?? null,
    })
  }

  return detaylar
}
