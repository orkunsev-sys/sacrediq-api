// Latin → Arapça dönüştürücü — Osmanlı Ebced-i Kebir sistemi

export function isArapca(metin) {
  return /[؀-ۿ]/.test(metin)
}

// Yaygın İslami ve Osmanlı-Türk isimleri — doğru Arapça yazımlarıyla
// Fonetik çevirim bu isimler için yanlış sonuç verir, bu nedenle sabit eşleme kullanılır
const BILINEN_KELIMELER = {
  // ── Tevhid & Dualar ────────────────────────────────────────────────────────
  'allah':                    'الله',
  'bismillah':                'بسم الله',
  'bismillahirrahmanirrahim': 'بسم الله الرحمن الرحيم',
  'rahman':                   'الرحمن',
  'rahim':                    'الرحيم',
  'fatiha':                   'الفاتحة',
  'kuran':                    'قران',
  'quran':                    'قران',
  'koran':                    'قران',

  // ── Peygamberler ──────────────────────────────────────────────────────────
  'muhammed':   'محمد',   'muhammad':  'محمد',
  'mehmed':     'محمد',   'mehmet':    'محمد',   'muhammet': 'محمد',
  'ahmed':      'احمد',   'ahmet':     'احمد',
  'mustafa':    'مصطفى',
  'ibrahim':    'ابراهيم','ibrahim':   'ابراهيم',
  'ismail':     'اسماعيل',
  'ishak':      'اسحاق',
  'yakup':      'يعقوب',  'yakub':     'يعقوب',
  'yusuf':      'يوسف',
  'musa':       'موسى',
  'harun':      'هارون',
  'davut':      'داود',   'davud':     'داود',
  'suleyman':   'سليمان', 'süleyman':  'سليمان',
  'yunus':      'يونس',
  'isa':        'عيسى',
  'yahya':      'يحيى',
  'zekeriya':   'زكريا',  'zekeriyya': 'زكريا',
  'ilyas':      'الياس',  'ilyâs':     'الياس',
  'elyesa':     'اليسع',
  'idris':      'ادريس',
  'hud':        'هود',
  'salih':      'صالح',   'saleh':     'صالح',
  'lut':        'لوط',
  'zulkifl':    'ذو الكفل',
  'lokman':     'لقمان',
  'adem':       'آدم',    'âdem':      'آدم',
  'nuh':        'نوح',
  'şuayb':      'شعيب',   'şuayip':    'شعيب',   'şuayip': 'شعيب',

  // ── Erkek Sahabe & Klasik İsimler ─────────────────────────────────────────
  'ali':        'علي',
  'hasan':      'حسن',
  'huseyin':    'حسين',   'hüseyin':   'حسين',
  'omer':       'عمر',    'ömer':      'عمر',
  'osman':      'عثمان',
  'ebubekir':   'ابوبكر', 'abubekir':  'ابوبكر',
  'hamza':      'حمزة',
  'bilal':      'بلال',
  'talha':      'طلحة',
  'zubeyr':     'زبير',   'zübeyr':    'زبير',
  'enes':       'انس',    'anas':      'انس',
  'abdurrahman':'عبدالرحمن','abdurrehman':'عبدالرحمن',
  'abdullah':   'عبدالله',
  'abdulkadir': 'عبدالقادر',
  'abdulaziz':  'عبدالعزيز',
  'abdulhamid': 'عبدالحميد',
  'bekir':      'بكر',    'bakr':      'بكر',
  'said':       'سعيد',   'sait':      'سعيد',   'saîd': 'سعيد',
  'mahmut':     'محمود',  'mahmud':    'محمود',   'mahmûd': 'محمود',
  'hamid':      'حامد',   'hamit':     'حامد',
  'faruk':      'فاروق',
  'celal':      'جلال',   'jalal':     'جلال',
  'cemal':      'جمال',   'jamal':     'جمال',
  'kemal':      'كمال',   'kamal':     'كمال',
  'halil':      'خليل',   'khalil':    'خليل',
  'numan':      'نعمان',
  'nuh':        'نوح',
  'selim':      'سليم',
  'ramazan':    'رمضان',  'ramadan':   'رمضان',
  'furkan':     'فرقان',
  'lokman':     'لقمان',
  'luqman':     'لقمان',
  'naim':       'نعيم',   'naim':      'نعيم',
  'kasim':      'قاسم',   'kâsım':     'قاسم',
  'talip':      'طالب',   'tâlip':     'طالب',
  'arif':       'عارف',
  'asim':       'عاصم',   'âsım':      'عاصم',
  'davud':      'داود',
  'fehim':      'فهيم',
  'hikmet':     'حكمت',
  'irfan':      'عرفان',
  'ismet':      'عصمت',
  'kamil':      'كامل',   'kâmil':     'كامل',
  'latif':      'لطيف',
  'munir':      'منير',   'münir':     'منير',
  'nazim':      'ناظم',   'nâzım':     'ناظم',
  'necip':      'نجيب',
  'niyazi':     'نيازي',
  'rasim':      'راسم',   'râsim':     'راسم',
  'refik':      'رفيق',
  'sabri':      'صبري',
  'sadik':      'صادق',   'sâdık':     'صادق',
  'tahir':      'طاهر',   'tâhir':     'طاهر',
  'taha':       'طه',
  'tarik':      'طارق',   'târık':     'طارق',
  'tevfik':     'توفيق',
  'veli':       'ولي',
  'yasin':      'يس',
  'zeki':       'ذكي',
  'ziya':       'ضياء',   'ziyâ':      'ضياء',
  'enver':      'انور',

  // ── Kadın Sahabe & Klasik İsimler ─────────────────────────────────────────
  'fatima':     'فاطمة',  'fatma':     'فاطمة',
  'hatice':     'خديجة',  'khadija':   'خديجة',
  'ayse':       'عائشة',  'aisha':     'عائشة',  'ayşe': 'عائشة',
  'meryem':     'مريم',   'maryam':    'مريم',
  'zeynep':     'زينب',   'zainab':    'زينب',
  'asiye':      'آسية',
  'hacer':      'هاجر',
  'rabia':      'رابعة',  'rabiye':    'رابعة',
  'zuleyha':    'زليخا',  'züleyha':   'زليخا',
  'sumeyye':    'سمية',   'sümeyye':   'سمية',
  'selma':      'سلمى',
  'safiye':     'صفية',
  'reyhane':    'ريحانة', 'reyhan':    'ريحان',
  'nur':        'نور',
  'merve':      'مروة',
  'esra':       'إسراء',
  'leyla':      'ليلى',
  'havva':      'حواء',
  'hilal':      'هلال',
  'nura':       'نورا',
  'hasene':     'حسنة',
  'cemile':     'جميلة',  'jamila':    'جميلة',
  'rahime':     'راحمة',
  'raziye':     'راضية',
  'safiye':     'صفية',
  'sadiye':     'سعيدة',
  'meliha':     'مليحة',
  'munire':     'منيرة',  'münire':    'منيرة',
  'nadire':     'نادرة',  'nâdire':    'نادرة',
  'nazli':      'نازلي',  'nâzli':     'نازلي',
  'rukiye':     'رقية',
}

// Harf bazlı fonetik dönüşüm tablosu — Osmanlı Ebced sistemi
// Türkçe'ye özgü sesler en yakın Arapça harfe eşlenir
export const LATIN_ARAPCA = {
  'a': 'ا', 'â': 'ا', 'e': 'ا',
  'b': 'ب',
  'c': 'ج', 'ç': 'ج',
  'd': 'د',
  'f': 'ف',
  'g': 'غ', 'ğ': 'غ',
  'h': 'ه',
  'i': 'ي', 'ı': 'ي',
  'j': 'ج',
  'k': 'ك',
  'l': 'ل',
  'm': 'م',
  'n': 'ن',
  'o': 'و', 'ö': 'و',
  'p': 'ب',   // Osmanlı'da Pe(پ) = Be(2) değerindedir
  'q': 'ق',
  'r': 'ر',
  's': 'س',
  'ş': 'ش',
  't': 'ت',   // Türkçe t = Te(400); Tı(ط=9) yalnızca Arapça köklü kelimelerde
  'u': 'و', 'ü': 'و',
  'v': 'و',
  'w': 'و',
  'x': 'ك',
  'y': 'ي',
  'z': 'ز',
}

function fonetikCevir(metin) {
  let sonuc = ''
  for (const harf of metin) {
    if (harf === ' ') { sonuc += ' '; continue }
    sonuc += LATIN_ARAPCA[harf] ?? ''
  }
  return sonuc
}

export function cevirLatinToArapca(metin) {
  const kucuk = metin.toLocaleLowerCase('tr').trim()

  if (isArapca(metin)) return metin

  // Tam kelime eşleşmesi
  if (BILINEN_KELIMELER[kucuk]) return BILINEN_KELIMELER[kucuk]

  // Çok kelimeli girişlerde her kelimeyi ayrı kontrol et
  if (kucuk.includes(' ')) {
    return kucuk.split(' ')
      .map(k => k ? (BILINEN_KELIMELER[k] ?? fonetikCevir(k)) : '')
      .join(' ')
  }

  return fonetikCevir(kucuk)
}
