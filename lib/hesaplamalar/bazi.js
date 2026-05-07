const GOKSEL_GOVDELER = [
  { id:'Jia',  tr:'Jiǎ',  element:'Ağaç',   yin_yang:'Yang', sayı:0 },
  { id:'Yi',   tr:'Yǐ',   element:'Ağaç',   yin_yang:'Yin',  sayı:1 },
  { id:'Bing', tr:'Bǐng', element:'Ateş',   yin_yang:'Yang', sayı:2 },
  { id:'Ding', tr:'Dīng', element:'Ateş',   yin_yang:'Yin',  sayı:3 },
  { id:'Wu',   tr:'Wù',   element:'Toprak', yin_yang:'Yang', sayı:4 },
  { id:'Ji',   tr:'Jǐ',   element:'Toprak', yin_yang:'Yin',  sayı:5 },
  { id:'Geng', tr:'Gēng', element:'Metal',  yin_yang:'Yang', sayı:6 },
  { id:'Xin',  tr:'Xīn',  element:'Metal',  yin_yang:'Yin',  sayı:7 },
  { id:'Ren',  tr:'Rén',  element:'Su',     yin_yang:'Yang', sayı:8 },
  { id:'Gui',  tr:'Guǐ',  element:'Su',     yin_yang:'Yin',  sayı:9 },
]

const YERYUZU_DALLARI = [
  { id:'Zi',   tr:'Zǐ',   hayvan:'Sıçan',  element:'Su',     yin_yang:'Yang', ay:11, saat:'23-01', sayı:0  },
  { id:'Chou', tr:'Chǒu', hayvan:'Öküz',   element:'Toprak', yin_yang:'Yin',  ay:12, saat:'01-03', sayı:1  },
  { id:'Yin',  tr:'Yín',  hayvan:'Kaplan', element:'Ağaç',   yin_yang:'Yang', ay:1,  saat:'03-05', sayı:2  },
  { id:'Mao',  tr:'Mǎo',  hayvan:'Tavşan', element:'Ağaç',   yin_yang:'Yin',  ay:2,  saat:'05-07', sayı:3  },
  { id:'Chen', tr:'Chén', hayvan:'Ejder',  element:'Toprak', yin_yang:'Yang', ay:3,  saat:'07-09', sayı:4  },
  { id:'Si',   tr:'Sì',   hayvan:'Yılan',  element:'Ateş',   yin_yang:'Yin',  ay:4,  saat:'09-11', sayı:5  },
  { id:'Wu',   tr:'Wǔ',   hayvan:'At',     element:'Ateş',   yin_yang:'Yang', ay:5,  saat:'11-13', sayı:6  },
  { id:'Wei',  tr:'Wèi',  hayvan:'Keçi',   element:'Toprak', yin_yang:'Yin',  ay:6,  saat:'13-15', sayı:7  },
  { id:'Shen', tr:'Shēn', hayvan:'Maymun', element:'Metal',  yin_yang:'Yang', ay:7,  saat:'15-17', sayı:8  },
  { id:'You',  tr:'Yǒu',  hayvan:'Horoz',  element:'Metal',  yin_yang:'Yin',  ay:8,  saat:'17-19', sayı:9  },
  { id:'Xu',   tr:'Xū',   hayvan:'Köpek',  element:'Toprak', yin_yang:'Yang', ay:9,  saat:'19-21', sayı:10 },
  { id:'Hai',  tr:'Hài',  hayvan:'Domuz',  element:'Su',     yin_yang:'Yin',  ay:10, saat:'21-23', sayı:11 },
]

function yilSutunu(yil) {
  const stemIdx   = ((yil - 4) % 10 + 10) % 10
  const branchIdx = ((yil - 4) % 12 + 12) % 12
  return { stem: GOKSEL_GOVDELER[stemIdx], branch: YERYUZU_DALLARI[branchIdx] }
}

function aySutunu(yil, ay) {
  const chinaMonth = ay < 2 ? ay + 10 : ay - 2
  const stemBase   = ((yil - 4) % 5 + 5) % 5
  const stemIdx    = (stemBase * 2 + chinaMonth) % 10
  const branchIdx  = (chinaMonth + 2) % 12
  return { stem: GOKSEL_GOVDELER[stemIdx], branch: YERYUZU_DALLARI[branchIdx] }
}

function gunSutunu(jd) {
  const stemIdx   = ((Math.floor(jd) - 11) % 10 + 10) % 10
  const branchIdx = ((Math.floor(jd) + 1) % 12 + 12) % 12
  return { stem: GOKSEL_GOVDELER[stemIdx], branch: YERYUZU_DALLARI[branchIdx] }
}

function saatSutunu(saat, gunStem) {
  const branchIdx = Math.floor(((saat + 1) % 24) / 2)
  const stemBase  = (gunStem.sayı % 5) * 2
  const stemIdx   = (stemBase + branchIdx) % 10
  return { stem: GOKSEL_GOVDELER[stemIdx], branch: YERYUZU_DALLARI[branchIdx] }
}

function jdFromDate(yil, ay, gun) {
  const a = Math.floor((14 - ay) / 12)
  const y = yil + 4800 - a
  const m = ay + 12 * a - 3
  return gun + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4)
       - Math.floor(y / 100) + Math.floor(y / 400) - 32045
}

const ELEMENT_ILISKI = {
  'Ağaç':   { uretiyor:'Ateş',   kontrol_eder:'Toprak', uretiliyor:'Su',    kontrol_edilir:'Metal'  },
  'Ateş':   { uretiyor:'Toprak', kontrol_eder:'Metal',  uretiliyor:'Ağaç',  kontrol_edilir:'Su'     },
  'Toprak': { uretiyor:'Metal',  kontrol_eder:'Su',     uretiliyor:'Ateş',  kontrol_edilir:'Ağaç'   },
  'Metal':  { uretiyor:'Su',     kontrol_eder:'Ağaç',   uretiliyor:'Toprak',kontrol_edilir:'Ateş'   },
  'Su':     { uretiyor:'Ağaç',   kontrol_eder:'Ateş',   uretiliyor:'Metal', kontrol_edilir:'Toprak' },
}

export function hesaplaBaZi(yil, ay, gun, saat) {
  const jd = jdFromDate(yil, ay, gun)

  const yilS  = yilSutunu(yil)
  const ayS   = aySutunu(yil, ay)
  const gunS  = gunSutunu(jd)
  const saatS = saatSutunu(saat, gunS.stem)

  const sutunlar = [
    { ad:'Yıl',  ...yilS,  simge:'年' },
    { ad:'Ay',   ...ayS,   simge:'月' },
    { ad:'Gün',  ...gunS,  simge:'日' },
    { ad:'Saat', ...saatS, simge:'時' },
  ]

  const elementSayim = { 'Ağaç':0, 'Ateş':0, 'Toprak':0, 'Metal':0, 'Su':0 }
  for (const s of sutunlar) {
    elementSayim[s.stem.element]++
    elementSayim[s.branch.element]++
  }

  const dominant = Object.entries(elementSayim).sort((a, b) => b[1] - a[1])[0][0]
  const eksik    = Object.entries(elementSayim).filter(([, v]) => v === 0).map(([k]) => k)

  return {
    sutunlar,
    elementSayim,
    dominant,
    eksik,
    daymaster: gunS.stem,
    iliskiler: ELEMENT_ILISKI[gunS.stem.element],
    ozet: `Gün Yöneticisi: ${gunS.stem.id} (${gunS.stem.element}-${gunS.stem.yin_yang}). Dominant element: ${dominant}.`,
  }
}
