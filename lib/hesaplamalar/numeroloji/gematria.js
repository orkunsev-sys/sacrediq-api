// İbrani Gematria — Latin/Türkçe → İbrani harf ses eşleşmesi
// Mispar Hechrachi (standart), Mispar Gadol, Mispar Katan
// Kaynak: geleneksel Kabala metinleri ve Sefer Yetzirah

// ─────────────────────────────────────────────
// 1. İBRANİCE ALFABE — HAM GEMATRIA DEĞERLERİ
// ─────────────────────────────────────────────
// Standart (Mispar Hechrachi) sistemde her harfin değeri
export const IVRIT_GEMATRIA = {
  'א': 1,   // Aleph  — Öküz, İlk Neden, Hava
  'ב': 2,   // Bet    — Ev, Sığınak
  'ג': 3,   // Gimel  — Deve, Hareket
  'ד': 4,   // Dalet  — Kapı, Giriş
  'ה': 5,   // He     — Pencere, Nefes, İlahi İfade
  'ו': 6,   // Vav    — Çivi, Bağlantı, And
  'ז': 7,   // Zayin  — Kılıç, Zaman
  'ח': 8,   // Het    — Çit, Yaşam Enerjisi
  'ט': 9,   // Tet    — Yılan, Gizli İyilik
  'י': 10,  // Yod    — El, Nokta, Tohumluk
  'כ': 20,  // Kaf    — Avuç, Tutma
  'ל': 30,  // Lamed  — Öküz İğnesi, Öğrenme
  'מ': 40,  // Mem    — Su, Bilinçaltı
  'נ': 50,  // Nun    — Balık, Ruh Derinliği
  'ס': 60,  // Samekh — Destek, Çember
  'ע': 70,  // Ayin   — Göz, Görüş, Kaynak
  'פ': 80,  // Pe     — Ağız, Söz, İfade
  'צ': 90,  // Tsadi  — Olta, Adalet
  'ק': 100, // Qof    — Kafanın Arkası, Döngü
  'ר': 200, // Resh   — Kafa, Baş, Liderlik
  'ש': 300, // Shin   — Diş, Ateş, Dönüşüm
  'ת': 400, // Tav    — Haç, İşaret, Mühür

  // Sofit (kelime sonu) formlar — Mispar Gadol için
  'ך': 500, // Kaf Sofit
  'ם': 600, // Mem Sofit
  'ן': 700, // Nun Sofit
  'ף': 800, // Pe Sofit
  'ץ': 900, // Tsadi Sofit
}

// ─────────────────────────────────────────────
// 2. LATİN → İBRANİCE FONETİK KÖPRÜ
// ─────────────────────────────────────────────
// Türkçe ve Latin harflerin İbranice ses karşılıkları
// Kaynak: geleneksel transliterasyon kuralları
export const LATIN_IVRIT = {
  // Sessiz harfler
  b: 'ב', g: 'ג', d: 'ד', h: 'ה', v: 'ו', z: 'ז',
  k: 'כ', l: 'ל', m: 'מ', n: 'נ', s: 'ס', r: 'ר',
  p: 'פ', f: 'פ', q: 'ק', w: 'ו', j: 'י', x: 'כ',

  // Sesliler → en yakın İbranice karşılık
  a: 'א', e: 'א', i: 'י', o: 'ו', u: 'ו',

  // Çift seslem kombinasyonları (önce kontrol edilmeli)
  sh: 'ש', ch: 'ח', ts: 'צ', tz: 'צ', kh: 'ח', ph: 'פ',

  // Türkçe özel karakterler
  'ş': 'ש', // sh sesi
  'ç': 'צ', // ts/ch sesi
  'ğ': 'ג', // yumuşak g
  'ı': 'י', // Türkçe ı → Yod
  'ö': 'ו', // yuvarlak o → Vav
  'ü': 'ו', // yuvarlak u → Vav

  // İlave ses eşleşmeleri
  c: 'כ',  // c → Kaf (Türkçe'de k sesi)
  t: 'ט',  // Tet (alternatif t için kullanılır)
  y: 'י',  // Yod
}

// Çift harfli kombinasyonlar (önce bakılacak)
const CIFT_SESLEM = ['sh', 'ch', 'ts', 'tz', 'kh', 'ph']

// ─────────────────────────────────────────────
// 3. STANDART GEMATRIA TABLOSU (Latin → Değer)
// ─────────────────────────────────────────────
// Aleph=1, Bet=2, Gimel=3, Dalet=4, He=5, Vav=6, Zayin=7,
// Het=8, Tet=9, Yod=10, Kaf=20, Lamed=30, Mem=40, Nun=50,
// Samekh=60, Ayin=70, Pe=80, Tsadi=90, Qof=100,
// Resh=200, Shin=300, Tav=400
export const GEMATRIA_HECHRACHI = {
  a: 1,   b: 2,   c: 20,  ç: 90,  d: 4,   e: 1,
  f: 80,  g: 3,   ğ: 3,   h: 5,   ı: 10,  i: 10,
  j: 10,  k: 20,  l: 30,  m: 40,  n: 50,  o: 70,
  ö: 70,  p: 80,  q: 100, r: 200, s: 60,  ş: 300,
  t: 400, u: 6,   ü: 6,   v: 6,   w: 6,   x: 60,
  y: 10,  z: 7,
}

// ─────────────────────────────────────────────
// 4. ALTERNATİF SİSTEMLER
// ─────────────────────────────────────────────

// Mispar Gadol — Sofit formlar dahil, son harf ×10
// Latin'de sofit ayrımı olmadığından son harf çarpanla simüle edilir
export const GEMATRIA_GADOL = { ...GEMATRIA_HECHRACHI }

// Atbash — Ayna şifresi: Aleph↔Tav, Bet↔Shin vb.
// Her harfin değeri, alfabede tam karşısındaki harfin değerine eşlenir
export const GEMATRIA_ATBASH = {
  a: 400, b: 300, c: 200, ç: 80,  d: 100, e: 400,
  f: 70,  g: 90,  ğ: 90,  h: 50,  ı: 40,  i: 40,
  j: 40,  k: 30,  l: 20,  m: 10,  n: 6,   o: 5,
  ö: 5,   p: 4,   q: 3,   r: 2,   s: 1,   ş: 1,
  t: 1,   u: 6,   ü: 6,   v: 6,   w: 6,   x: 1,
  y: 40,  z: 7,
}

// ─────────────────────────────────────────────
// 5. YARDIMCI FONKSİYONLAR
// ─────────────────────────────────────────────

// Tek basamağa indirgeme (Mispar Katan)
function indirgeKatan(sayi) {
  if (sayi < 10) return sayi
  return indirgeKatan(
    String(sayi)
      .split('')
      .reduce((t, d) => t + parseInt(d, 10), 0)
  )
}

// Master sayıları koru (11, 22, 33)
function indirgeMaster(sayi) {
  if ([11, 22, 33].includes(sayi)) return sayi
  if (sayi < 10) return sayi
  const ara = String(sayi)
    .split('')
    .reduce((t, d) => t + parseInt(d, 10), 0)
  return indirgeMaster(ara)
}

// Standart toplama fonksiyonu
function topla(metin, tablo) {
  let toplam = 0
  const detaylar = []
  const normalized = metin.toLocaleLowerCase('tr').trim()

  for (const harf of normalized) {
    if (harf === ' ') continue
    const deger = tablo[harf]
    if (deger == null) continue
    toplam += deger
    detaylar.push({ harf, deger })
  }
  return { toplam, detaylar }
}

// ─────────────────────────────────────────────
// 6. LATİN → İBRANİCE ÇEVİRİ
// ─────────────────────────────────────────────
export function latindenIvrite(metin) {
  const normalized = metin.toLocaleLowerCase('tr').trim()
  let ivritStr = ''
  let i = 0

  while (i < normalized.length) {
    if (normalized[i] === ' ') {
      ivritStr += ' '
      i++
      continue
    }

    // Önce çift harflere bak
    let eslesti = false
    for (const cift of CIFT_SESLEM) {
      if (normalized.startsWith(cift, i)) {
        const ivritHarf = LATIN_IVRIT[cift]
        if (ivritHarf) {
          ivritStr += ivritHarf
          i += cift.length
          eslesti = true
          break
        }
      }
    }
    if (eslesti) continue

    // Tek harfe bak
    const harf = normalized[i]
    const ivritHarf = LATIN_IVRIT[harf]
    if (ivritHarf) {
      ivritStr += ivritHarf
    }
    i++
  }

  return ivritStr
}

// ─────────────────────────────────────────────
// 7. ANA HESAPLAMA FONKSİYONU
// ─────────────────────────────────────────────
export function gematriaHesapla(metin) {
  // Hechrachi (standart)
  const { toplam: hechrachi, detaylar } = topla(metin, GEMATRIA_HECHRACHI)

  // Gadol: son harfin ×10 (sofit simülasyonu)
  const normalized = metin.toLocaleLowerCase('tr').trim().replace(/\s+/g, ' ').split(' ')
  let gadolToplam = 0
  for (const kelime of normalized) {
    for (let idx = 0; idx < kelime.length; idx++) {
      const harf = kelime[idx]
      const deger = GEMATRIA_HECHRACHI[harf]
      if (deger == null) continue
      gadolToplam += idx === kelime.length - 1 ? deger * 10 : deger
    }
  }

  // Atbash
  const { toplam: atbash } = topla(metin, GEMATRIA_ATBASH)

  // Katan (tek basamak)
  const katan = indirgeKatan(hechrachi)

  // Master (11/22/33 korunur)
  const master = indirgeMaster(hechrachi)

  // İbranice transliterasyon
  const ivritTranslit = latindenIvrite(metin)

  return {
    sistem: 'gematria',
    metin,
    ivritTranslit,
    misparHechrachi: hechrachi,
    misparGadol: gadolToplam,
    misparKatan: katan,
    misparMaster: master,
    misparAtbash: atbash,
    detaylar,
  }
}

// ─────────────────────────────────────────────
// 8. KABALİSTİK YORUM FONKSİYONLARI
// ─────────────────────────────────────────────

// Sefirot eşleşmesi: hangi Sefirot numarasına karşılık gelir?
export function sefirotEslestir(deger) {
  // Önce tek basamağa indir, ardından 1-9 arası doğrudan Sefirot
  const katan = indirgeKatan(deger)

  // 10'a inmiş ise Malkuth
  if (deger === 10 || katan === 10) return 10

  // 11, 22, 33 → üst sefirot
  if (deger === 11) return 2 // Chokmah
  if (deger === 22) return 6 // Tiphareth
  if (deger === 33) return 3 // Binah

  // Standart indirgeme
  return katan === 0 ? 10 : katan
}

// Sayının Kabala anlamı
export function kabalaYorum(deger, ivritStr = '') {
  const katan = indirgeKatan(deger)
  const sefirotNo = sefirotEslestir(deger)

  const yorumlar = {
    1: {
      kavram: 'Keter — Taç',
      aciklama: 'İlahi taç ve tüm varlığın kaynağı. Saf bilinç, birlik ve ilahi irade. Ego-ötesi farkındalık, sonsuz potansiyel.',
    },
    2: {
      kavram: 'Chokmah — Hikmet',
      aciklama: 'İlahi hikmet ve yaratıcı güç. Maskülen ilke, özgün bilgelik, ilk yaratıcı ışık. Sezgisel kavrayış.',
    },
    3: {
      kavram: 'Binah — Anlayış',
      aciklama: 'Derin anlayış ve form. Feminen ilke, zaman, karma ve sınır. Yapıyı ve şekli veren ilahi ana.',
    },
    4: {
      kavram: 'Chesed — Merhamet',
      aciklama: 'Sonsuz sevgi ve bolluğun enerjisi. Genişleme, cömertlik ve koruma. İlahi merhametin açılımı.',
    },
    5: {
      kavram: 'Geburah — Güç',
      aciklama: 'Disiplin, yargı ve güç. Gerekli sınırlar, cesaret ve kararlılık. Gücün ve savaşın ilkesi.',
    },
    6: {
      kavram: 'Tiphareth — Güzellik',
      aciklama: 'Denge, güzellik ve uyum. Kalbin merkezi, bütünleşme ve öz. Güneş bilinciyle aydınlanma.',
    },
    7: {
      kavram: 'Netzach — Zafer',
      aciklama: 'Duygu, arzu ve doğanın enerjisi. Zevk, sezgi ve güzellik anlayışı. Venus\'un etkisi.',
    },
    8: {
      kavram: 'Hod — İhtişam',
      aciklama: 'Zihin, iletişim ve mantık. Analiz, dil ve form. Mercüry\'nin akılcı enerjisi.',
    },
    9: {
      kavram: 'Yesod — Temel',
      aciklama: 'Bilinçaltı, hayal gücü ve yaratıcılık. Astral alan, cinsel güç ve psişik algı.',
    },
    10: {
      kavram: 'Malkuth — Krallık',
      aciklama: 'Fiziksel dünya ve madde. Tüm üst enerjilerin toprak oluşu. Somut gerçeklik ve beden.',
    },
  }

  return {
    deger,
    katan,
    sefirotNo,
    ivritStr,
    ...(yorumlar[sefirotNo] || yorumlar[10]),
  }
}

// ─────────────────────────────────────────────
// 9. TAM ANALİZ FONKSİYONU (dışa aktarılan ana API)
// ─────────────────────────────────────────────
export function gematriaTamAnaliz(metin) {
  if (!metin || metin.trim() === '') {
    return null
  }

  const hesap = gematriaHesapla(metin)
  const yorum = kabalaYorum(hesap.misparHechrachi, hesap.ivritTranslit)

  return {
    ...hesap,
    yorum,
    sefirotNo: yorum.sefirotNo,
  }
}
