// Trigram tanımları — 8 temel trigram
const TRIGRAMLAR = {
  qian: { isim: 'Gök',            sembol: '☰', element: 'Metal', yon: 'Kuzeybatı',  enerji: 'yang', sayi: 1 },
  dui:  { isim: 'Göl',            sembol: '☱', element: 'Metal', yon: 'Batı',        enerji: 'yin',  sayi: 2 },
  li:   { isim: 'Ateş',           sembol: '☲', element: 'Ateş',  yon: 'Güney',       enerji: 'yang', sayi: 3 },
  zhen: { isim: 'Gök Gürültüsü',  sembol: '☳', element: 'Ahşap', yon: 'Doğu',        enerji: 'yang', sayi: 4 },
  xun:  { isim: 'Rüzgar',         sembol: '☴', element: 'Ahşap', yon: 'Güneydoğu',   enerji: 'yin',  sayi: 5 },
  kan:  { isim: 'Su',             sembol: '☵', element: 'Su',    yon: 'Kuzey',       enerji: 'yin',  sayi: 6 },
  gen:  { isim: 'Dağ',            sembol: '☶', element: 'Toprak',yon: 'Kuzeydoğu',   enerji: 'yin',  sayi: 7 },
  kun:  { isim: 'Toprak',         sembol: '☷', element: 'Toprak',yon: 'Güneybatı',   enerji: 'yin',  sayi: 8 },
}

// 64 Hexagram — eksiksiz veri
export const HEXAGRAMLAR = [
  {
    no: 1, ad: 'Yaratıcı Güç', ad_cin: 'Qian', sembol: '䷀',
    ust: 'qian', alt: 'qian',
    anlam: 'Saf yaratıcı enerji, gök kuvvetinin en yüce tezahürü. İrade, güç ve yaratıcılığın doruğunu simgeler. Bu hexagram değişmez bir kararlılık ve ileri atılış çağrısıdır.',
    karar: 'Büyük başarı gelir. Sabit kalarak ilerle.',
    imge: 'Gök kendi içinde dönüşür — güçlü eylem zamanı.',
    element: 'metal', chakra: 'crown', archetype: 'ruler', polarity: 'yang',
    hatlar: ['Gizli ejderha — henüz eylem zamanı değil.', 'Ejderha ovada görünür — önemli biriyle görüş.', 'Gündüzleri çalış, geceleri uyanık kal — hata yok.', 'Ejderha uçmaya hazır — tercih et.', 'Ejderha gökyüzünde uçuyor — büyük kişiyle görüş.', 'Kibir getiren ejderha — pişmanlık.'],
  },
  {
    no: 2, ad: 'Alıcı Toprak', ad_cin: 'Kun', sembol: '䷁',
    ust: 'kun', alt: 'kun',
    anlam: 'Sonsuz alıcılık ve besleyici yin enerjisi. Toprak gibi her şeyi kucaklar, büyütür ve tamamlar. Sabır ve itaatin zaferi olan bu hexagram, aktif çabayı değil kabulü öğütler.',
    karar: 'Büyük başarı. Kısrak gibi sabırlı kal; güneyde arkadaş bul.',
    imge: 'Toprak her şeyi taşır — kabulle güçlen.',
    element: 'earth', chakra: 'root', archetype: 'caregiver', polarity: 'yin',
    hatlar: ['Ayak bileğinde buz — yaklaşan tehlikeye dikkat et.', 'Dümdüz, kare, büyük — çaba olmadan başarı.', 'Parlaklığını gizle — hizmet yolunda devam et.', 'Bağlanmış torba — hata yok, şan da yok.', 'Sarı eteklik — merkezi iyilik, büyük şans.', 'Ejderhalar düzlükte savaşır — kanlı, tehlikeli.'],
  },
  {
    no: 3, ad: 'Başlangıcın Zorluğu', ad_cin: 'Zhun', sembol: '䷂',
    ust: 'kan', alt: 'zhen',
    anlam: 'Kaos içinden doğan yeni başlangıç. Tıpkı tohumun toprağı yarması gibi, ilk adım çaba ve sabır gerektirir. Zorluğa rağmen pes etme; bu geçici bir engel.',
    karar: 'Büyük başarı ile ilerleme. Lider ol, ama yalnız gitme.',
    imge: 'Su üzerinde gök gürültüsü — kökleri kazan.',
    element: 'water', chakra: 'sacral', archetype: 'innocent', polarity: 'yang',
    hatlar: ['Taşlar arasında tökezleme — vazgeçme, devam et.', 'İlerleme zorlaşır — vazgeçme, yardım gelecek.', 'Geyik avcısız ormana gider — yön seç.', 'At ve araba ayrılır — yardım kabul et.', 'Küçük şeylerde cömertlik — büyük şeylerde dikkat.', 'At ve araba ağlar — tehlike devam eder.'],
  },
  {
    no: 4, ad: 'Gençlik Cehaleti', ad_cin: 'Meng', sembol: '䷃',
    ust: 'gen', alt: 'kan',
    anlam: 'Öğrenme yolculuğunun başında saf ve ham bir zihin. Öğrencinin görevi sormak, öğretmenin görevi rehberlik etmektir. Bilgelik cehaletin kabulüyle başlar.',
    karar: 'Başarı. Öğretmen sormaz, öğrenci sorar. İlk kehanet doğru, tekrar edilen bozulur.',
    imge: 'Dağın altında kaynak — öğrenmeyi özümsemek.',
    element: 'water', chakra: 'throat', archetype: 'innocent', polarity: 'yin',
    hatlar: ['Cehilden kurulmak — disiplin faydalıdır.', 'Cehili kabul et — iyi. Çalışmak iyi.', 'Güçlüyle evlenme — kendin ol.', 'Aptalca cehalet — utanç.', 'Çocukça cehalet — iyi şans.', 'Cehile çarpmak — saldırı değil, savunma.'],
  },
  {
    no: 5, ad: 'Bekleme', ad_cin: 'Xu', sembol: '䷄',
    ust: 'kan', alt: 'qian',
    anlam: 'Doğru zamanı beklemenin erdemi. Her şeyin bir zamanı vardır; sabırla bekleyenin önüne kapılar açılır. Endişesiz bir bekleyiş, kararlı bir gönülle.',
    karar: 'Doğrulukla bekle — büyük nehri geçmek iyi.',
    imge: 'Gökyüzünde bulutlar, yağmur beklemesi — sabır ve güven.',
    element: 'water', chakra: 'solar_plexus', archetype: 'sage', polarity: 'yang',
    hatlar: ['Ovada bekleme — sabit kal, sorun yok.', 'Kumda bekleme — biraz söylenti.', 'Çamurda bekleme — düşmanlar yaklaşır.', 'Kanda bekleme — mağaradan çık.', 'Şarapla bekle — doğruluk, şans.', 'Mağaraya gir — beklenmedik misafirler gelir.'],
  },
  {
    no: 6, ad: 'Çatışma', ad_cin: 'Song', sembol: '䷅',
    ust: 'qian', alt: 'kan',
    anlam: 'İçsel ya da dışsal çatışma döneminde uzlaşma arayışı. Savaşmak yerine anlaşmak, kazanmak yerine çözmek öğütlenir. Sert çatışmalar yorgunluk getirir.',
    karar: 'İçtenlikle, engelle karşılaşırsın. Orta noktada dur, büyük nehri geçme.',
    imge: 'Gök ve su ters yönde — çatışma kaçınılmaz.',
    element: 'metal', chakra: 'throat', archetype: 'warrior', polarity: 'yang',
    hatlar: ['Dava bırakılır — söylenti olsa da şans.', 'Davada gerileme — kaç, güvende kalırsın.', 'Eski erdemde yaşa — tehlike, son zafer.', 'Davada gerileme — kadere dön, değiş, şans.', 'Davada büyük şans — iyi.', 'Deri kemer verilir — sabah üç kez alınır.'],
  },
  {
    no: 7, ad: 'Ordu', ad_cin: 'Shi', sembol: '䷆',
    ust: 'kun', alt: 'kan',
    anlam: 'Disiplinli güç ve kolektif hareketin önemi. Ordunun gücü organizasyonundan gelir; her birey kendi rolünü bilmeli. Liderlik erdemi taşımalıdır.',
    karar: 'Ordu ilerler — deneyimli usta, hata yok.',
    imge: 'Toprak içinde su — halkın derinliğindeki güç.',
    element: 'earth', chakra: 'root', archetype: 'warrior', polarity: 'yin',
    hatlar: ['Ordu disiplinle ilerler — aksini yapmak kötü.', 'Ordunun ortasında — şans, hata yok.', 'Ordu belki cesetler taşır — kötü.', 'Ordu geri çekilir — hata yok.', 'Av ordusunda oyun — avcıyı tutmak iyi.', 'Büyük prens emirler verir — küçüklere liderlik verme.'],
  },
  {
    no: 8, ad: 'Birlik', ad_cin: 'Bi', sembol: '䷇',
    ust: 'kan', alt: 'kun',
    anlam: 'Güven ve dayanışmanın inşası. Birlikte büyümek, birbirini desteklemek ve ortak bir amaç etrafında kenetlenmek mutluluk getirir. Yalnız kalmaya direnç göster.',
    karar: 'İyi şans. Orijinal kahinliği sorgula. Uzun vadeli doğruluk — hata yok.',
    imge: 'Toprak üstünde su — yakınlık ve birleşme.',
    element: 'water', chakra: 'heart', archetype: 'lover', polarity: 'yin',
    hatlar: ['Doğruluğa güven — hata yok.', 'İçten birleşme — doğruluk, şans.', 'Yanlış insanlarla birleşme — tehlike.', 'Dışarıdan birleşme — doğruluk, şans.', 'Birliğin tezahürü — kral ava çıkar, şans.', 'Başsız birleşme — kötü.'],
  },
  {
    no: 9, ad: 'Küçük Besleme', ad_cin: 'Xiao Xu', sembol: '䷈',
    ust: 'xun', alt: 'qian',
    anlam: 'Küçük adımlarla büyük şeylere hazırlık. Sabırlı birikim ve ince ayarlamalarla gücünü topla; büyük eylem henüz zamanı değil. Rüzgar gibi nazikçe etki et.',
    karar: 'Başarı. Batıdan yoğun bulutlar, yağmur yok.',
    imge: 'Rüzgar gökyüzünde hareket eder — küçük şeyleri biriktirir.',
    element: 'wood', chakra: 'throat', archetype: 'sage', polarity: 'yin',
    hatlar: ['Yoldan dönmek — hata ne olsun? İyi.', 'Geri çekilmeye zorlanmak — şans.', 'Arabanın tekerlekleri çıkar — karı koca tartışır.', 'Doğruluk — kan yok, korku kalkar.', 'Doğruluğa bağlanmak — zenginlik.', 'Yağmur yağdı, dinlendi — erdem gider. Ay neredeyse dolunay.'],
  },
  {
    no: 10, ad: 'Yürüyüş / Davranış', ad_cin: 'Lü', sembol: '䷉',
    ust: 'qian', alt: 'dui',
    anlam: 'Güçlünün yanında nazik yürüyüş; tehlikeli zemin üzerinde doğru davranış. Kaplanın kuyruğuna basmak ama ısırılmamak — cesaret ile hikmet bir arada.',
    karar: 'Kaplanın kuyruğuna basıyorsun, ısırmıyor. Başarı.',
    imge: 'Gök ve göl — üst ve alt arasındaki uyum.',
    element: 'metal', chakra: 'throat', archetype: 'sage', polarity: 'yang',
    hatlar: ['Sade yürüyüş — ilerleme, hata yok.', 'Düz, kayalık yolu — münzevi şansı.', 'Tek gözlü görür, topal yürür — kaplanın kuyruğuna basar.', 'Kaplanın kuyruğuna basar — nihayet şans.', 'Sert yürüyüş — doğrulukla tehlike.', 'Yürüyüşü incele — mükemmellik dönerse büyük şans.'],
  },
  {
    no: 11, ad: 'Barış', ad_cin: 'Tai', sembol: '䷊',
    ust: 'kun', alt: 'qian',
    anlam: 'Gök ve yerin uyumu, yin ve yang\'ın dengesinde altın çağ. İçeride güçlü, dışarıda açık; tüm ilişkiler uyum içinde. Bereketli dönemdir.',
    karar: 'Küçük gider, büyük gelir — şans ve büyüme.',
    imge: 'Gök ve toprak birleşir — büyük barış.',
    element: 'earth', chakra: 'heart', archetype: 'ruler', polarity: 'balanced',
    hatlar: ['Saz kökü çeker birbirini — ilerleme, şans.', 'Kabalığı kucakla, ortayı bul, uzağı kaybetme.', 'Düzlük olmadan eğim yok — sıkıntıda doğruluğa dön.', 'Sallanarak gider — zengin olmak için komşuya güven.', 'Kral kızını evlendirir — şans.', 'Duvar hendeğe düşer — ordu kullanma.'],
  },
  {
    no: 12, ad: 'Durgunluk', ad_cin: 'Pi', sembol: '䷋',
    ust: 'qian', alt: 'kun',
    anlam: 'Gök ve toprak ayrışır; iletişim kesilir, ilerleyiş durur. Güçlerin birbirinden koptuğu bu dönemde içine çekil, küçük şeyleri özenle koru.',
    karar: 'Kötü insanlar gelir — büyük olmaz, küçük olur.',
    imge: 'Gök ve toprak iletişimsiz — stagnasyon.',
    element: 'metal', chakra: 'root', archetype: 'rebel', polarity: 'yin',
    hatlar: ['Saz kökü çeker — doğrulukla şans.', 'Büyük insanlar durgunluğu kabullenirse şans.', 'Utanç gizlenir.', 'İlahi buyruğa sahip çık — hata yok.', 'Durgunluk sona erer — büyük insanlar için şans.', 'Durgunluk devrilir — önce durgunluk, sonra sevinç.'],
  },
  {
    no: 13, ad: 'Birlikte İnsanlık', ad_cin: 'Tong Ren', sembol: '䷌',
    ust: 'qian', alt: 'li',
    anlam: 'Açık alanda insanlarla buluşmak, topluluk ve dayanışma. Gizli ajandalarsız şeffaf birlik, paylaşılan hedefler etrafında güç toplar.',
    karar: 'Açık alanda insanlık — başarı. Büyük nehri geçmek iyi.',
    imge: 'Gök altında ateş — toplumu bir araya getirir.',
    element: 'fire', chakra: 'heart', archetype: 'lover', polarity: 'yang',
    hatlar: ['Kapıda insanlık — hata yok.', 'Klanlarda insanlık — utanç.', 'Ordusunu çalılıklara saklar — üç yıl yükselemez.', 'Duvarın üstüne çıkar, saldıramaz — şans.', 'İnsanlık önce ağlar, sonra güler.', 'Açıkta insanlık — pişmanlık yok.'],
  },
  {
    no: 14, ad: 'Büyük Sahiplik', ad_cin: 'Da You', sembol: '䷍',
    ust: 'li', alt: 'qian',
    anlam: 'Bol lütuf, zenginlik ve bereketin yönetimi. Güneş gibi parlayan gök enerjisi tüm varlıkları aydınlatır. Sahiplendiğini iyi yönet, paylaş ve büyüt.',
    karar: 'Büyük başarı.',
    imge: 'Gökyüzünde güneş — her yeri aydınlatır.',
    element: 'fire', chakra: 'crown', archetype: 'ruler', polarity: 'yang',
    hatlar: ['Hiçbir yanlış eylem yok — tehlike olmadan kaçınmak iyi.', 'Büyük araba yüklenebilir — devam et, hata yok.', 'Prens için uygun — küçük kişi yapamaz.', 'Abartıdan kaçın — hata yok.', 'Doğruluk ile birbirine bağlanma.', 'Gökten kutsanmış — şans, desteksiz iyi.'],
  },
  {
    no: 15, ad: 'Alçakgönüllülük', ad_cin: 'Qian', sembol: '䷎',
    ust: 'kun', alt: 'gen',
    anlam: 'Gerçek büyüklüğün gizli erdemi. Dağ toprağın altında — güçlü olan kendini gizler. Alçakgönüllülük her zaman ödüllendirilir.',
    karar: 'Başarı — alçakgönüllü sona kadar ilerler.',
    imge: 'Toprak içinde dağ — alçakgönüllülüğün gücü.',
    element: 'earth', chakra: 'heart', archetype: 'sage', polarity: 'yin',
    hatlar: ['Alçakgönüllü — büyük nehri geçmek iyi, şans.', 'Seslenen alçakgönüllülük — doğruluk şans getirir.', 'Emekçi alçakgönüllü — büyük insanlar için şans.', 'Bütün faydalı alçakgönüllülük — hiçbir şey faydalı değil.', 'Zenginlik olmadan komşulara saldırma.', 'Seslenen alçakgönüllülük — ordu kullan, şehri fethet.'],
  },
  {
    no: 16, ad: 'Coşku / Hazırlık', ad_cin: 'Yu', sembol: '䷏',
    ust: 'zhen', alt: 'kun',
    anlam: 'Müzik ve ritmin getirdiği ilham; harekete geçiren coşku enerjisi. Doğayla uyum içinde akan bu güç seferberlik ve kutlama zamanını işaret eder.',
    karar: 'Lider tayin et, orduyu harekete geçir.',
    imge: 'Toprak üzerinde gök gürültüsü — güçlü coşku.',
    element: 'wood', chakra: 'sacral', archetype: 'creator', polarity: 'yang',
    hatlar: ['Coşku seslenir — kötü.', 'Kayayı sert — bir gün sürmez, doğruluk şans.', 'Coşkuya bakma — pişmanlık gelir.', 'Coşkunun kaynağı — büyük şeyler elde edilir.', 'Doğrulukta coşku — ölümcül hastalık devam eder.', 'Karanlık coşku — değişmeyle tamamlanmaz.'],
  },
  {
    no: 17, ad: 'Takip', ad_cin: 'Sui', sembol: '䷐',
    ust: 'dui', alt: 'zhen',
    anlam: 'Doğru olanı takip etmek, zamanın ruhuna uymak. Dayatmadan değil doğallıktan gelen liderlik; akışa katılarak büyümek.',
    karar: 'Büyük başarı. Doğruluk şans getirir — hata yok.',
    imge: 'Göl içinde gök gürültüsü — sevinçle uyum.',
    element: 'metal', chakra: 'sacral', archetype: 'seeker', polarity: 'yang',
    hatlar: ['Standart değişir — doğruluk şans. Dışarı çık, iyi.', 'Küçüğe bağlan, büyüğü kaybet.', 'Büyüğe bağlan, küçüğü kaybet — neye istersen.', 'Takipte ele geçirmek — doğrulukla tehlike, doğrulukta yol.', 'Doğruluk iyilikte — şans.', 'Bağlanmak ve kovalamak — kral dağa sunar.'],
  },
  {
    no: 18, ad: 'İşin Düzeltilmesi', ad_cin: 'Gu', sembol: '䷑',
    ust: 'gen', alt: 'xun',
    anlam: 'Köklü bozuklukları onarmak, geçmişin yüklerini temizlemek. Ata mirasının karanlık yönleriyle yüzleşmek ve yenilemek.',
    karar: 'Büyük başarı — büyük nehri geçmek iyi.',
    imge: 'Dağ altında rüzgar — bozuklukların onarımı.',
    element: 'wood', chakra: 'root', archetype: 'healer', polarity: 'yin',
    hatlar: ['Babanın bozukluğunu onar — oğul varsa, hayalet yok.', 'Annenin bozukluğunu onar — orta yol bul.', 'Babanın bozukluğunu onar — küçük pişmanlık, büyük hata yok.', 'Babanın bozukluğunu tolere etmek — devam edince utanç.', 'Babanın bozukluğunu onar — övgüyü kullan.', 'Kral ve prense hizmet etme — yüksek ereği koru.'],
  },
  {
    no: 19, ad: 'Yaklaşım', ad_cin: 'Lin', sembol: '䷒',
    ust: 'kun', alt: 'dui',
    anlam: 'Büyük güç yaklaşır; olumlu değişim ve büyüme dönemi. Hem lider hem halk için yaklaşım enerjisi akar.',
    karar: 'Büyük başarı, doğruluk iyi. Sekizinci ayda kötü.',
    imge: 'Toprak üstünde göl — yaklaşım ve bütünleşme.',
    element: 'earth', chakra: 'heart', archetype: 'ruler', polarity: 'yang',
    hatlar: ['Birlikte yaklaşmak — doğruluk şans.', 'Birlikte yaklaşmak — şans, faydalı.', 'Tatlı yaklaşım — hiçbir şey faydalı değil ama pişmanlık yok.', 'Eksiksiz yaklaşım — hata yok.', 'Bilgece yaklaşım — büyük prense layık.', 'Dürüstçe yaklaşmak — şans, hata yok.'],
  },
  {
    no: 20, ad: 'Seyir / Bakış', ad_cin: 'Guan', sembol: '䷓',
    ust: 'xun', alt: 'kun',
    anlam: 'Derinlemesine gözlem ve seyir. Hem izlemek hem de görülmek — derin bakışın gücü. Rüzgar toprağın üzerinde döner, her yere ulaşır.',
    karar: 'El yıkandı, henüz sunulmadı — saygıyla bekle.',
    imge: 'Rüzgar toprak üzerinde — seyir ve gözlem.',
    element: 'wood', chakra: 'third_eye', archetype: 'sage', polarity: 'yin',
    hatlar: ['Çocukça bakış — küçük insana iyi, büyüğe utanç.', 'Kapıdan bakış — kadın için iyi.', 'Benim hayatımı izle — ileri ya da geri.', 'Krallığın ihtişamını izle — konuk olmaya değer.', 'Benim hayatımı izle — büyük kişi için hata yok.', 'Onun hayatını izle — büyük kişi için hata yok.'],
  },
  {
    no: 21, ad: 'Isırmak Geçmek', ad_cin: 'Shi He', sembol: '䷔',
    ust: 'li', alt: 'zhen',
    anlam: 'Engeli aşmak için kararlı bir eylem gerekir. Hukuki ya da ahlaki bir mesele yargılanmalı; adaleti tesis etmek için açık biçimde davranılmalı.',
    karar: 'Başarı — yargıyı uygulamak faydalı.',
    imge: 'Gök gürültüsü ve şimşek — adalet.',
    element: 'fire', chakra: 'throat', archetype: 'warrior', polarity: 'yang',
    hatlar: ['Parmak kapana sıkışmış — hata yok.', 'Yumuşak tene ısırmak — burnu kaybeder, hata yok.', 'Tuzlu ete ısırmak — hafif zehir, küçük utanç, hata yok.', 'Kemikli ete ısırmak — metal oklar, zorluk ama şans.', 'Kurumuş ete ısırmak — sarı altın, doğrulukla tehlike, şans.', 'Boynu demir tasmayla kapatmak — kulakları kayber, kötü.'],
  },
  {
    no: 22, ad: 'Güzellik / Süsleme', ad_cin: 'Bi', sembol: '䷕',
    ust: 'gen', alt: 'li',
    anlam: 'Dışsal güzellik ve biçimin sınırlı ama gerçek değeri. Süsleme öze hizmet etmelidir; görsellik içeriği destekler ama onun yerine geçemez.',
    karar: 'Başarı — küçük şeylerde ilerlemek faydalı.',
    imge: 'Dağın altında ateş — süsleme ve güzellik.',
    element: 'fire', chakra: 'throat', archetype: 'creator', polarity: 'yang',
    hatlar: ['Ayaklarını süsle, arabayı bırak, yürü.', 'Sakalını süslemek.', 'Islak ve parlak — sonsuz doğruluk şans.', 'Sade ve beyaz süsleme — beyaz at uçar, evlilik değil soyguncu.', 'Bahçe ve tepedeki süsleme — küçük bez, utanç ama şans.', 'Sade süsleme — hata yok.'],
  },
  {
    no: 23, ad: 'Parçalanma', ad_cin: 'Bo', sembol: '䷖',
    ust: 'gen', alt: 'kun',
    anlam: 'Zemin kayıyor, yapılar çöküyor. Bu zorunlu bir dönüşüm evresidir; direnmek yerine olayların akışına bırak. Her çöküş yeni başlangıcın habercisidir.',
    karar: 'Ilerlemek uygun değil.',
    imge: 'Dağ toprak üzerinde — parçalanma.',
    element: 'earth', chakra: 'root', archetype: 'rebel', polarity: 'yin',
    hatlar: ['Yatak bacağı yıkılır — doğruluk kötü.', 'Yatak çerçevesi yıkılır — doğruluk kötü.', 'Yıkılmış — hata yok.', 'Yatak ve deri yıkılır — kötü.', 'Saray halkı lütuf görür — bütün şeylerde şans.', 'Büyük meyve yenmemiş — büyük kişi araba alır, küçük adam şahsiyetini kaybeder.'],
  },
  {
    no: 24, ad: 'Geri Dönüş', ad_cin: 'Fu', sembol: '䷗',
    ust: 'kun', alt: 'zhen',
    anlam: 'Uzun karanlıktan sonra ışığın yeniden doğuşu. Dönüş doğallıkla gelir; zorlamak gerekmez. Kış geçer, yeni döngü başlar.',
    karar: 'Başarı. Gelip geçme — arkadaş gelir, hata yok.',
    imge: 'Toprak içinde gök gürültüsü — dönüş.',
    element: 'earth', chakra: 'root', archetype: 'innocent', polarity: 'yang',
    hatlar: ['Kısa mesafeden geri dön — pişmanlık yok, büyük şans.', 'Sakin dönüş — şans.', 'Sık sık dönüş — tehlike, hata yok.', 'Yolun ortasında yürümek — tek başına dönmek.', 'Soylu dönüş — pişmanlık yok.', 'Yanılgıyla geri dönüş — kötü, doğal afet savaş.'],
  },
  {
    no: 25, ad: 'Masumluğun Beklenmedik', ad_cin: 'Wu Wang', sembol: '䷘',
    ust: 'qian', alt: 'zhen',
    anlam: 'İçtenlik ve saflıkla hareket etmek, beklentisiz eylem. Gizli amaçlardan arınmış saf niyet en büyük güçtür.',
    karar: 'Büyük başarı — doğruluk şans. Doğru olmayan kötü.',
    imge: 'Gök altında gök gürültüsü — masumiyet.',
    element: 'metal', chakra: 'heart', archetype: 'innocent', polarity: 'yang',
    hatlar: ['Masum ilerleme — şans.', 'Biçmeden ek — toplamadan tarla.', 'Beklenmedik felaket — bağlı öküz, yabancı şans.', 'Doğruluk sürdürülebilir — hata yok.', 'Beklenmedik hastalık — ilaç kullanma.', 'Masumiyet eylemi — tehlike — fayda yok.'],
  },
  {
    no: 26, ad: 'Büyük Besleme Gücü', ad_cin: 'Da Xu', sembol: '䷙',
    ust: 'gen', alt: 'qian',
    anlam: 'Büyük güçlerin kontrol ve birikimi. Eski bilgelerin öğretilerinden ders almak; güçlü gücü yönlendirmek ve denetlemek.',
    karar: 'Doğruluk iyi — yemek evde yeme, büyük nehri geçmek iyi.',
    imge: 'Gök dağın içinde — büyük besleme.',
    element: 'earth', chakra: 'crown', archetype: 'sage', polarity: 'yang',
    hatlar: ['Tehlike var — geri çekil.', 'Araba oku çözülmüş.', 'Atlarla yarışa gir — tehlikede doğruluk ile ilerle.', 'Genç boğanın koruyucu tahtası — büyük şans.', 'Iğdır edilmiş domuzun dişleri — şans.', 'Hangi gök yolu.'],
  },
  {
    no: 27, ad: 'Beslenme', ad_cin: 'Yi', sembol: '䷚',
    ust: 'gen', alt: 'zhen',
    anlam: 'Neyi beslediğin, neyle beslendiğin. Beden, zihin ve ruhun doğru gıdayla güçlenmesi. Dikkatli seçimler ve öz disiplin.',
    karar: 'Doğruluk şans — dudaklara bak, neyin peşinde?',
    imge: 'Dağ altında gök gürültüsü — beslenme.',
    element: 'wood', chakra: 'sacral', archetype: 'caregiver', polarity: 'yin',
    hatlar: ['Sihirli kaplumbağayı bırak — dudaklara bak, kötü.', 'Beslenme için tepeye vur — doğruluktan sapan kötü.', 'Beslenmeye karşı çıkmak — kötü.', 'Yukarı için beslenmeye bak — kaplan gibi gözlerle şans.', 'Doğruluktan sapma — sabit kalmak şans.', 'Beslenmenin kaynağı — tehlike şans.'],
  },
  {
    no: 28, ad: 'Büyük Aşım', ad_cin: 'Da Guo', sembol: '䷛',
    ust: 'dui', alt: 'xun',
    anlam: 'Kiriş ortasında çöküyor — yük çok ağır. Olağanüstü dönemlerde olağanüstü tedbirler gerekir. Cesur eylem vakti.',
    karar: 'Kirişin ortası çöküyor — ilerlemek faydalı.',
    imge: 'Göl rüzgarın üstünde — büyük aşım.',
    element: 'metal', chakra: 'solar_plexus', archetype: 'warrior', polarity: 'yang',
    hatlar: ['Çarşafın altını sarı sazla örtmek — hata yok.', 'Kuru söğüt yeni sürgün verir — yaşlı adam genç eş alır, faydalı.', 'Kirişin çökmesi — kötü.', 'Kirişin yükselmesi — şans, başka şey olsa utanç.', 'Kuru söğüt çiçek açıyor — yaşlı kadın genç koca alır, hata yok, şan da yok.', 'Suya kadar geçmek — kötü ama hata yok.'],
  },
  {
    no: 29, ad: 'Uçurum / Tehlike', ad_cin: 'Kan', sembol: '䷜',
    ust: 'kan', alt: 'kan',
    anlam: 'Tekrarlayan tehlikeler ve derin uçurumlar arasında yürümek. Su gibi engellerin etrafından dolaşan ama asla durmayan güç.',
    karar: 'Doğruluk, kalbi bağla, eylem şans.',
    imge: 'Su üstüne su — tehlikeli derinlik.',
    element: 'water', chakra: 'sacral', archetype: 'warrior', polarity: 'yin',
    hatlar: ['Uçuruma alışmak — kötü.', 'Uçurum tehlike — küçük şeyler elde et.', 'İleri geri tehlike — tehlike çukurunda rest.', 'Şişe, şarap, toprak kap ikinci kullanılır — sonunda hata yok.', 'Uçurum dolmadı — ufak.', 'İplerle bağlanmak — üç yıl kurtuluş yok.'],
  },
  {
    no: 30, ad: 'Tutunma / Parlaklık', ad_cin: 'Li', sembol: '䷝',
    ust: 'li', alt: 'li',
    anlam: 'Ateş parlıyor ama tutunmak için bir nesneye ihtiyacı var. Berraklık, aydınlanma ve bağlılık — güneş ve ay gibi büyük ışık veren şeyler.',
    karar: 'Doğruluk şans — ineği besle, şans.',
    imge: 'Ateş üstüne ateş — aydınlanma.',
    element: 'fire', chakra: 'crown', archetype: 'magician', polarity: 'yang',
    hatlar: ['Karmaşık adımlar — ona saygıyla yaklaş, hata yok.', 'Sarı ışık — büyük şans.', 'Alacakaranlık güneşi — toprak testi çalma, yaşlıların acısı, kötü.', 'Ani geliş — yanarak ölmek, terk etmek, terkedilmek.', 'Gözyaşları akar, acı gelir — şans.', 'Kral seferber olsun — baş vurmak şan, kral ele geçirir.'],
  },
  {
    no: 31, ad: 'Etki / Çekim', ad_cin: 'Xian', sembol: '䷞',
    ust: 'dui', alt: 'gen',
    anlam: 'Karşıtların çekimi, doğal etki. Duygu ve sezginin yönlendirdiği ilişki enerjisi; gençlik ve açıklık, karşılıklı çekim.',
    karar: 'Başarı, doğruluk şans — kadın almak iyi.',
    imge: 'Dağ üstünde göl — çekim ve etki.',
    element: 'metal', chakra: 'heart', archetype: 'lover', polarity: 'yang',
    hatlar: ['Ayak başparmağına etki.', 'Baldıra etki — kötü, kalırsan şans.', 'Uyluğa etki — tutunulanı takip et — ilerleme utanç.', 'Doğruluk şans — pişmanlık kalkar — sallanmak, sallanmak.', 'Arka omuzlara etki — pişmanlık yok.', 'Yanaklar ve dillerden etki.'],
  },
  {
    no: 32, ad: 'Süreklilik', ad_cin: 'Heng', sembol: '䷟',
    ust: 'zhen', alt: 'xun',
    anlam: 'Kalıcı ilişki ve durumların erdemi. Değişmeyen bir merkez etrafında sürekli dönüşüm; uzun süreli bağlılık ve sağlamlık.',
    karar: 'Başarı, hata yok, doğruluk şans — ilerlemek faydalı.',
    imge: 'Gök gürültüsü ve rüzgar — kalıcılık.',
    element: 'wood', chakra: 'root', archetype: 'ruler', polarity: 'yang',
    hatlar: ['Süreklilik için derinlemesine kazma — doğruluk kötü.', 'Pişmanlık kalkar.', 'Erdemle sürekli olmamak — utanç, devam.', 'Avda av yok.', 'Erdemde süreklilik — kadın için şans, erkek için kötü.', 'Sürekliliğin çalkalanması — kötü.'],
  },
  {
    no: 33, ad: 'Geri Çekilme', ad_cin: 'Dun', sembol: '䷠',
    ust: 'qian', alt: 'gen',
    anlam: 'Stratejik geri çekilmenin bilgeliği. Savaşmak yerine geri adım atmak; güçlenip geri dönmek için. Zafer geri çekilmede saklıdır.',
    karar: 'Başarı — küçük şeylerde doğruluk şans.',
    imge: 'Gök altında dağ — stratejik geri çekilme.',
    element: 'metal', chakra: 'solar_plexus', archetype: 'sage', polarity: 'yang',
    hatlar: ['Geri çekilmenin kuyruğu — tehlike, gitme.', 'Sarı öküz derisiyle bağlanmış — kimse onu çözemez.', 'Bağlı geri çekilme — tehlike ve hastalık, hizmetçi ve cariye iyi.', 'Gönüllü geri çekilme — büyük için şans, küçük için değil.', 'Güzelce geri çekilme — doğruluk şans.', 'Gönençli geri çekilme — her şey faydalı.'],
  },
  {
    no: 34, ad: 'Büyük Güç', ad_cin: 'Da Zhuang', sembol: '䷡',
    ust: 'zhen', alt: 'qian',
    anlam: 'Gücün zirvesinde sorumluluk. Büyük güç erdem ve doğrulukla kullanılmalı; aksi halde yıkım getirir. Yengeç gibi geriye değil, güçlü öküz gibi ileri.',
    karar: 'Doğruluk şans.',
    imge: 'Gök gürültüsü gökyüzünde — büyük güç.',
    element: 'wood', chakra: 'solar_plexus', archetype: 'warrior', polarity: 'yang',
    hatlar: ['Ayakta güç — ilerleme kötü, doğruluk.', 'Doğruluk şans.', 'Küçük kişi güce güvenir, büyük kişi kullanmaz — keçinin çite bakması.', 'Doğruluk şans, pişmanlık kalkar — çit kırılır, engel yok — büyük arabanın gücü.', 'Keçi kolayca kaybeder — pişmanlık yok.', 'Keçi çite çarpar — ne ilerleyemez ne geri çekilir.'],
  },
  {
    no: 35, ad: 'İlerleme', ad_cin: 'Jin', sembol: '䷢',
    ust: 'li', alt: 'kun',
    anlam: 'Savaşan prensin şanlı yükselişi. Güneşin doğuşu gibi sürekli ilerleme ve tanınma. Herkes önünde açık kapılar.',
    karar: 'Güçlü prens ilerler — günde üç kez hediyeyle kabul edilir.',
    imge: 'Toprak üstünde güneş — ilerleme.',
    element: 'fire', chakra: 'crown', archetype: 'ruler', polarity: 'yang',
    hatlar: ['İlerleme ve geri çekilme — doğruluk şans, güven yok, büyük hata yok.', 'İlerlemede acı — doğruluk şans, büyük mutluluk alır.', 'Herkes güvenirse — pişmanlık kalkar.', 'Sıçan gibi ilerleme — doğruluk tehlike.', 'Pişmanlık kalkar — kaybetme kaygısı yapma.', 'Boynuzu ilerletme — yalnızca kentleri fethet, tehlike şans, hata yok.'],
  },
  {
    no: 36, ad: 'Işığın Kararmesi', ad_cin: 'Ming Yi', sembol: '䷣',
    ust: 'kun', alt: 'li',
    anlam: 'Karanlık dönemde bilgeliği gizlemek. Tıpkı İ-yi\'nin Shang hanedanlığında hizmet etmesi gibi; güçlü içte, zayıf dışta kalmalı.',
    karar: 'Zorlukta doğruluk faydalı.',
    imge: 'Toprak içinde güneş — ışık karardı.',
    element: 'fire', chakra: 'third_eye', archetype: 'magician', polarity: 'yin',
    hatlar: ['Işığın kararması uçuşta — kanatlar düşer, üç gün yemek yok, gittiğinde ev sahibi konuşur.', 'Işığın kararması sol uyluğu yaralar — güçlü at kurtuluşu getirir, şans.', 'Güneyde avlanırken büyük başı ele geçirmek — pişmanlık olmamalı.', 'Sol karın girdi — ışığın yok olma kalbi ele geçirilir, kapı ve avluyu terk et.', 'Bek prensi gibi — doğruluk faydalı.', 'Işık yok, karanlık — gökyüzüne tırmanmak, sonra toprağa inmek.'],
  },
  {
    no: 37, ad: 'Aile', ad_cin: 'Jia Ren', sembol: '䷤',
    ust: 'xun', alt: 'li',
    anlam: 'Evin içindeki düzen ve uyum. Her bireyin rolü; anne, baba, çocuk — herbiri kendi yerinde huzur bulur. Aile düzeni toplumun temelidir.',
    karar: 'Kadın için doğruluk şans.',
    imge: 'Dağın üstünde rüzgar — aile bütünlüğü.',
    element: 'wood', chakra: 'heart', archetype: 'caregiver', polarity: 'yin',
    hatlar: ['Ev sınırları belirlenir — pişmanlık kalkar.', 'Hiçbiri peşine düşme — evde yemek, doğruluk şans.', 'Aile sertlikle yönetilir — tehlike şans; kadın ve çocuklar gülüyorsa kötü.', 'Aile zenginleştirilir — büyük şans.', 'Kral aileye ulaşır — kaygı yok, şans.', 'Güvenilir, saygın — sonunda şans.'],
  },
  {
    no: 38, ad: 'Muhalefet', ad_cin: 'Kui', sembol: '䷥',
    ust: 'li', alt: 'dui',
    anlam: 'Karşıtlık içinde küçük anlaşmalar bulmak. Ayrılık evrensel bir gerçektir; ancak ayrılıkta bile temas noktaları vardır. Küçük adımlarla ilerle.',
    karar: 'Küçük şeylerde şans.',
    imge: 'Göl üstünde ateş — muhalefet.',
    element: 'fire', chakra: 'throat', archetype: 'rebel', polarity: 'yang',
    hatlar: ['Pişmanlık kalkar — at kaçar, aramak gerekmez, kendisi döner.', 'Efendiye sokakta rastlamak — hata yok.', 'Arabanın geriye çekildiğini görüyoruz — öküzü durduruluyor — saçı kesilmiş ve burnu kesik — başlangıç yok, son var.', 'Muhalefetle yalnız, güçlü adamla buluşma — ortak çalışma, tehlike yok.', 'Pişmanlık kalkar — örnek kişi ısırır, ilerleme hata olmaz.', 'Yalnız muhalefetle — domuz ve kerli kirli, araba yük taşıyor.'],
  },
  {
    no: 39, ad: 'Engel', ad_cin: 'Jian', sembol: '䷦',
    ust: 'kan', alt: 'gen',
    anlam: 'Dağın önündeki su — ilerlemeyi zorlaştıran engel. Geri çekilmek cesaret, yardım istemek akıldır. Büyük adamla görüş.',
    karar: 'Güneybatı faydalı, kuzeydoğu değil — büyük adamla görüş, şans.',
    imge: 'Dağ üstünde su — engel.',
    element: 'water', chakra: 'root', archetype: 'sage', polarity: 'yin',
    hatlar: ['İlerlemek tehlike — gelmek övgü.', 'Kral hizmetkarı engelle mücadele eder — kendi suçu değil.', 'İlerlemek tehlike — geri dön.', 'İlerlemek tehlike — gelmek birleşme.', 'Büyük engelde arkadaşlar gelir.', 'İlerlemek tehlike — gelmek büyük, şans, büyük adamla görüş.'],
  },
  {
    no: 40, ad: 'Kurtuluş', ad_cin: 'Jie', sembol: '䷧',
    ust: 'zhen', alt: 'kan',
    anlam: 'Baskı ve gerilimin çözülmesi. Gök gürültüsü yağmur getirir, havayı temizler — kurtuluş gelir. Eski düğümler çözülür, yeni başlangıç için zemin hazır.',
    karar: 'Güneybatı faydalı — gitme yok, geri dön. Gidecek yerin varsa hızlı git, şans.',
    imge: 'Gök gürültüsü ve yağmur — çözülme.',
    element: 'wood', chakra: 'sacral', archetype: 'innocent', polarity: 'yang',
    hatlar: ['Hata yok.', 'Avda üç tilki, sarı ok alınır, doğruluk şans.', 'Yük ve arabada da yük — soygunculara yol açar, doğruluk utanç.', 'Ayak başparmağını çöz — arkadaş gelir, güven.', 'Büyük adam kurtuluş sağlar — şans, sıradan insanlar güvende.', 'Prens yüksek duvarda şahin vurur — faydalı.'],
  },
  {
    no: 41, ad: 'Azalma', ad_cin: 'Sun', sembol: '䷨',
    ust: 'gen', alt: 'dui',
    anlam: 'Azaltmanın bilgeliği. Altta azaltmak üstte artırmak demektir. Fedakarlık ve sadelik döneminde sadakat büyük kazanım sağlar.',
    karar: 'Doğruluk şans, hata yok, devam edilebilir — ilerlemek faydalı.',
    imge: 'Dağ altında göl — azalma.',
    element: 'earth', chakra: 'root', archetype: 'caregiver', polarity: 'yin',
    hatlar: ['Kendi işini terk et, hızla git — hata yok, ne kadar azaltırsın?', 'Doğruluk şans — ilerlemek kötü.', 'Üç kişi yürür, bir azalır; bir kişi yürür, arkadaş bulur.', 'Hastalığını azalt — hemen sevin — hata yok.', 'On kaplumbağası olan — karşı çıkamaz, büyük şans.', 'Azaltma olmaksızın artırma — hata yok, doğruluk şans, büyük nehri geçmek iyi.'],
  },
  {
    no: 42, ad: 'Artırma', ad_cin: 'Yi', sembol: '䷩',
    ust: 'xun', alt: 'zhen',
    anlam: 'Yukarıdan aşağıya akan bereket. Azaltılan üst, alttakileri zenginleştirir. İyilik yayılır, büyük işler başlatılabilir.',
    karar: 'Büyük nehri geçmek faydalı — ilerlemek faydalı.',
    imge: 'Rüzgar ve gök gürültüsü — artırma.',
    element: 'wood', chakra: 'crown', archetype: 'ruler', polarity: 'yang',
    hatlar: ['Büyük eylem yapmak faydalı — büyük şans, hata yok.', 'On kaplumbağa artırır — karşı çıkamaz, sonsuz doğruluk şans — kral Tanrı\'ya sunar, şans.', 'Kötü olaylarda artırma — hata yok, doğruluk yürür, bildirir.', 'Doğrulukla yürür — prens için lütuf, sermaye taşınsın.', 'Doğru kalple artırma — soru yok, büyük şans, doğruluk bende.', 'Kimse artırmıyor, kimi vuracak — kalp sabit değil, kötü.'],
  },
  {
    no: 43, ad: 'Atılım / Kararlılık', ad_cin: 'Guai', sembol: '䷪',
    ust: 'dui', alt: 'qian',
    anlam: 'Kararlı atılımla kötülüğün aşılması. Kraliyet sarayında duyurunun yapılması — tehlikeli ama gerekli. Güç ve kararlılıkla ilerle.',
    karar: 'Kraliyet mahkemesinde duyur — doğrulukla çağır, tehlike var.',
    imge: 'Gökyüzünde göl — büyük kararlılık.',
    element: 'metal', chakra: 'throat', archetype: 'warrior', polarity: 'yang',
    hatlar: ['Kalkışan ayakta güç — ilerlemek iyi olmaz, hata.', 'Tetikte olmak — geç gece silah taşı, kaygı yok.', 'Güçlü yüz yüze bak — kötü; büyük kişi kararlıdır, yalnız yürür, ıslanır, kızar, hata yok.', 'Kalçada et — zor yürüyüş; koyun gibi sürüklenmek, pişmanlık kalkar.', 'Merkez damarıyla kararlı yürüyüş — pişmanlık yok.', 'Çığlık yok — sonunda kötü.'],
  },
  {
    no: 44, ad: 'Buluşma', ad_cin: 'Gou', sembol: '䷫',
    ust: 'qian', alt: 'xun',
    anlam: 'Beklenmedik karşılaşma ve etki. Tek bir yin hat tüm yang\'ları etkiler — güçlü bir dişil enerji ya da tesadüf. Dikkatli ol.',
    karar: 'Kadın güçlüdür — böyle kadınla evlenme.',
    imge: 'Rüzgar gökyüzünde — beklenmedik buluşma.',
    element: 'metal', chakra: 'sacral', archetype: 'rebel', polarity: 'yin',
    hatlar: ['Metal fren uygulanmalı — doğruluk şans, ilerlemek kötü.', 'Çantada balık — hata yok, konuğa iyi olmaz.', 'Kalçada et — zor yürüyüş, tehlike, büyük hata yok.', 'Çantada balık yok — kötü.', 'Kavak çalısıyla kapla — cennet kapsar — büyük kişi gelir.', 'Boynuzlarıyla buluşma — utanç, hata yok.'],
  },
  {
    no: 45, ad: 'Toplanma', ad_cin: 'Cui', sembol: '䷬',
    ust: 'dui', alt: 'kun',
    anlam: 'Büyük bir amaca doğru toplanmak. Kral tapınağını inşa eder; toplum birleşir. Kolektif güç yaratılır.',
    karar: 'Başarı — kral tapınağa gider, büyük adamla görüş.',
    imge: 'Toprak üstünde göl — toplanma.',
    element: 'earth', chakra: 'heart', archetype: 'ruler', polarity: 'yin',
    hatlar: ['Doğruluk olmadan karışıklık — çağırılırsan gül, üzülme, ilerlemek hata yok.', 'İyi kader ile toplanma — hata yok.', 'Toplanma acıyla — ilerlemek, hata yok.', 'Büyük şans — hata yok.', 'Toplanma konumunda — hata yok; güvensizin söylentisi.', 'Ağlayarak inleyen — hata yok.'],
  },
  {
    no: 46, ad: 'İtişme Yukarı', ad_cin: 'Sheng', sembol: '䷭',
    ust: 'kun', alt: 'xun',
    anlam: 'Kök salan ağacın yavaş ama kararlı yükselişi. Gayret ve kalıcı çalışmayla yukarı doğru ilerleme. Güney yönünde büyüme var.',
    karar: 'Büyük başarı — büyük adamla görüş, kaygı yok, güneye git.',
    imge: 'Toprak içinde ağaç — yavaş yükseliş.',
    element: 'wood', chakra: 'crown', archetype: 'seeker', polarity: 'yang',
    hatlar: ['İtilenmiş, büyük şans.', 'Doğrulukla sunmak — hata yok.', 'Boş bir şehre girmek.', 'Kral Mt. Qi\'ye arzetti — şans, hata yok.', 'Doğruluk şans — merdiveni çık.', 'Karanlıkta yükselmek — kesintisiz doğruluk faydalı.'],
  },
  {
    no: 47, ad: 'Baskı / Tükenme', ad_cin: 'Kun', sembol: '䷮',
    ust: 'dui', alt: 'kan',
    anlam: 'Suyun boşaldığı göl — tükenme. Büyük kişi baskı altında dahi karakterini korur; sözler dinlenmese de zaman geçecek.',
    karar: 'Başarı — doğrulukta büyük şans, hata yok, konuşmak inandırılmaz.',
    imge: 'Göl içinde su — tükenme.',
    element: 'water', chakra: 'root', archetype: 'warrior', polarity: 'yin',
    hatlar: ['Muz ağacı dibinde otur — karanlık vadiye gir, üç yıl görünmez.', 'Şarap ve yemekte baskı — kırmızı ceketli geliyor — kurban etmek faydalı — ilerlemek kötü, hata yok.', 'Taşa baskı — dikene tutunma — eve gir, karısını göremez, kötü.', 'Çok yavaş gel — altın arabada baskı — utanç, son var.', 'Burnundan ve ayağından kesik — kırmızı ceketli baskı — yavaş yavaş sevin, kurban sunmak faydalı.', 'Uzun otlarda baskı — sallanmak sıkıntı — ilerlemek pişmanlık — doğruluk şans.'],
  },
  {
    no: 48, ad: 'Kuyu', ad_cin: 'Jing', sembol: '䷯',
    ust: 'kan', alt: 'xun',
    anlam: 'Kasabanın değişmesi ama kuyunun değişmemesi — ebedi kaynak. İnsanlar gelir geçer, bilgelik kaynağı değişmez; derinliğe ulaşmak için çaba gerekir.',
    karar: 'Kasaba değişir, kuyu değişmez — kayıp yok, kazanç yok.',
    imge: 'Su üstünde ağaç — kuyu.',
    element: 'water', chakra: 'crown', archetype: 'sage', polarity: 'yin',
    hatlar: ['Kuyuyu çamurla doldurmak — içilmez, eski bir kuyu hayvan yok.', 'Kuyudan ok çıkar — küçük balıklara atış.', 'Kuyu temizlendi ama içilmiyor — kalbi acıtır, su içilebilir — kral aydınlanırsa hep beraber şans.', 'Kuyuyu çinilerle kaplama — hata yok.', 'Kuyunun kaynağı — soğuk, içilir.', 'Kuyuyu içmek — örtme — doğruluk büyük şans.'],
  },
  {
    no: 49, ad: 'Devrim', ad_cin: 'Ge', sembol: '䷰',
    ust: 'dui', alt: 'li',
    anlam: 'Kökten değişim ve dönüşüm. Eski sona erer, yeni başlar. Devrim doğru zamanda, doğru şekilde yapılırsa büyük başarı getirir.',
    karar: 'Kendi gününde inanılır — büyük başarı, doğruluk şans.',
    imge: 'Ateş üstünde göl — devrim.',
    element: 'fire', chakra: 'crown', archetype: 'rebel', polarity: 'yang',
    hatlar: ['Sarı öküz derisiyle bağlanmış.', 'Kendi gününde devrim — ilerleme şans, hata yok.', 'İlerlemek kötü, doğruluk tehlike — devrim söylendi üç kez — güven.', 'Pişmanlık kalkar — inanılır, kaderi değiştirmek şans.', 'Büyük kişi kaplan gibi değişir — kehanete başvurmadan güven.', 'Büyük kişi leopar gibi değişir — küçük kişi yüzünü değiştirir.'],
  },
  {
    no: 50, ad: 'Kazan', ad_cin: 'Ding', sembol: '䷱',
    ust: 'li', alt: 'xun',
    anlam: 'Kutsal kazan — dönüşümün sembolü. Ham madde pişirilir, olgunlaşır, kültür yaratılır. Bilgeliği beslemek ve korumak.',
    karar: 'Büyük şans — başarı.',
    imge: 'Ateş üstünde rüzgar — kazanda pişirme.',
    element: 'fire', chakra: 'crown', archetype: 'magician', polarity: 'yang',
    hatlar: ['Kazanın ayakları ters — dibe bakmak faydalı, istikrar.', 'Kazanda yemek — dostlarım kıskanır, bana gelemez, şans.', 'Kazanın sapı değişti — ilerleme engellenir, yağ kuşu yenmez.', 'Kazanın ayakları kırık — prens yemeği döküldü, biçimi mahvoldu, kötü.', 'Sarı kulplu kazan, altın boru — doğruluk şans.', 'Kazanın cam kulpları — şans, faydalı.'],
  },
  {
    no: 51, ad: 'Gök Gürültüsü / Sarsıntı', ad_cin: 'Zhen', sembol: '䷲',
    ust: 'zhen', alt: 'zhen',
    anlam: 'Ani sarsıntı uyanış getirir. Gök gürültüsü korkutur ama ardından hava temizlenir. Dehşet içinde sakin ol — sonunda şenlik.',
    karar: 'Başarı — gök gürültüsü gelir, korkudan sonra gülüş.',
    imge: 'Gök gürültüsü üstüne gök gürültüsü — uyandırıcı sarsıntı.',
    element: 'wood', chakra: 'root', archetype: 'warrior', polarity: 'yang',
    hatlar: ['Gök gürültüsü gelir — korku sonra gülüş, şans.', 'Gök gürültüsü tehlikeye geliyor — servetini kaybeder, dağlara çık, kovulma, yedi gün sonra al.', 'Gök gürültüsü canlandırıcı — gök gürültüsü eyleme geçer — hata yok.', 'Gök gürültüsü çamurda bataklık.', 'Gök gürültüsü gelip gider — tehlike — hata yok.', 'Gök gürültüsü dönüp dolaşır — korku sonra söylenti, ilerlemek kötü.'],
  },
  {
    no: 52, ad: 'Sakinlik / Dağ', ad_cin: 'Gen', sembol: '䷳',
    ust: 'gen', alt: 'gen',
    anlam: 'Hareketsiz oturma meditasyonu. Dağ gibi sabit durmak — ne ileri ne geri. İçsel huzur ve tefekkür.',
    karar: 'Sırtına sakinlik — bedenini hissetmez — avluda yürür, insanı görmez — hata yok.',
    imge: 'Dağ üstüne dağ — sakinlik ve meditasyon.',
    element: 'earth', chakra: 'crown', archetype: 'sage', polarity: 'yin',
    hatlar: ['Ayağını sakinleştir — hata yok, uzun doğruluk faydalı.', 'Baldırını sakinleştir — kurtaramazsın, kalp üzgün.', 'Belinle sakinleştir — sırtı tehlikeye sokma — kalp boğulur.', 'Bedenini sakinleştir — hata yok.', 'Çeneni sakinleştir — sözcükler sıralı — pişmanlık kalkar.', 'Sakin sakinlik — şans.'],
  },
  {
    no: 53, ad: 'Kademeli Gelişim', ad_cin: 'Jian', sembol: '䷴',
    ust: 'xun', alt: 'gen',
    anlam: 'Kuzların göç yolculuğu gibi kademeli ve kararlı ilerleme. Acele etmek hata; her adım sağlam atılmalı.',
    karar: 'Kadın evlenir, şans — doğruluk şans.',
    imge: 'Dağ üstünde rüzgar — kademeli gelişim.',
    element: 'wood', chakra: 'throat', archetype: 'seeker', polarity: 'yang',
    hatlar: ['Kuzgun ilerler kıyıya — küçük oğlan tehlike, söylenti.', 'Kuzgun ilerler kayaya — yemek içmek, şans.', 'Kuzgun ilerler kara toprağa — koca savaşa gider dönmez, kadın gebe kalır doğurmaz, kötü — soygunculara karşı savaş.', 'Kuzgun ilerler ağaca — belki bir kol bulurum, hata yok.', 'Kuzgun ilerler tepesine — üç yıl çocuk yok, nihayetinde gelemez, şans.', 'Kuzgun ilerler bulutlu dağa — tüyleri ayin için kullanılabilir, şans.'],
  },
  {
    no: 54, ad: 'Nikah Kızı', ad_cin: 'Gui Mei', sembol: '䷵',
    ust: 'zhen', alt: 'dui',
    anlam: 'Eksik konumda güçle ilişki. Küçük karı ya da ikinci pozisyon — kaderin kabul edilmesi. Sabır ve doğruluk.',
    karar: 'İlerlemek kötü — faydası yok.',
    imge: 'Gök gürültüsü ve göl — başarılı birleşme.',
    element: 'wood', chakra: 'sacral', archetype: 'lover', polarity: 'yin',
    hatlar: ['Topal evlenebilir — ilerlemek şans — tek bacaklı yürüyebilir.', 'Tek gözlü görebilir — münzevi doğruluk şans.', 'Küçük karı bekler — geri döner, dolu olarak bekler.', 'Nikah kızı zamanı geciktiriyor — geç evleniyor.', 'Dük kız kardeşini evlendirirken — süslemeleri büyük kız kadar değil, ay neredeyse dolu, şans.', 'Kadın sepeti taşır, içerik yok; erkek koyun keser, kan yok.'],
  },
  {
    no: 55, ad: 'Bolluk', ad_cin: 'Feng', sembol: '䷶',
    ust: 'zhen', alt: 'li',
    anlam: 'Yüksek öğle güneşi gibi büyük bolluk ve şan. Kaygı değil — dolunay zamanı. Bol enerjiyi iyi yönet.',
    karar: 'Başarı — kral bolluk içinde, kaygı yok — öğle gibi ol.',
    imge: 'Gök gürültüsü ve şimşek — bolluk.',
    element: 'fire', chakra: 'crown', archetype: 'ruler', polarity: 'yang',
    hatlar: ['Efendini on gün bul — hata yok, devam.', 'Kapasitesini örtmek — kuzey yıldız öğleden görünür — ilerlemek şüphe olsa şans.', 'Kapasitesini genişletmek — küçük yıldızlar öğleden görünür — sağ kolu kırar — hata yok.', 'Kapasitesini örtmek — kuzey yıldızı öğleden görünür — efendine eş bul — şans.', 'Kapasiteye gelme — şan ve ödül gelir — şans.', 'Evini büyüt — ailesini perdeyle ört — kapıyı gözetle — üç yıl kimseyi görmez — kötü.'],
  },
  {
    no: 56, ad: 'Yolcu', ad_cin: 'Lü', sembol: '䷷',
    ust: 'li', alt: 'gen',
    anlam: 'Yabancı diyarlarda nazik ve temkinli yürüyüş. Yolcunun saygısı ve alçakgönüllülüğü güvenliğini sağlar.',
    karar: 'Küçük işlerde başarı — yolcu için doğruluk şans.',
    imge: 'Dağ üstünde ateş — yolculuk.',
    element: 'fire', chakra: 'throat', archetype: 'seeker', polarity: 'yang',
    hatlar: ['Yolcu küçük şeylerde — tehlike getirir.', 'Yolcu konağa gelir — servetini taşır, genç hizmetkar alır.', 'Yolcunun konağı yanar — genç hizmetkarı kaybeder — tehlike.', 'Yolcu bir sığınak bulur — servetini ve baltasını alır — kalbim rahat değil.', 'Turaç avlar — tek bir ok — sonunda övgü ve hizmet.', 'Kuş yuvası yakar — yolcu önce güler sonra ağlar, öküzü kaybeder.'],
  },
  {
    no: 57, ad: 'Hafif Rüzgar', ad_cin: 'Xun', sembol: '䷸',
    ust: 'xun', alt: 'xun',
    anlam: 'Nazik ve tekrarlayan penetrasyon. Rüzgar gibi sessizce ilerleyerek etki yaratmak. Küçük adımlar büyük değişim getirir.',
    karar: 'Küçük başarı — ilerlemek faydalı — büyük adamla görüş.',
    imge: 'Rüzgar üstüne rüzgar — sürekli nazik etki.',
    element: 'wood', chakra: 'throat', archetype: 'magician', polarity: 'yin',
    hatlar: ['İleri geri gitmek — savaşçının doğruluğu faydalı.', 'Yatakın altında büyücülük — yazarları ve tarih uzmanlarını kullan — şans, hata yok.', 'Tekrarlayan penetrasyon — utanç.', 'Pişmanlık kalkar — avda üç türlü yakalar.', 'Doğruluk şans — pişmanlık kalkar — faydalı olmayan — ilk yok son var.', 'Yatağın altında büyücülük — servetini ve baltasını kaybetmek — doğruluk kötü.'],
  },
  {
    no: 58, ad: 'Sevinç / Göl', ad_cin: 'Dui', sembol: '䷹',
    ust: 'dui', alt: 'dui',
    anlam: 'Paylaşılan sevinç ikiye katlanır. Gölün açık yüzeyi gibi neşe ve coşku yayılır. Topluluk ve dostluktan güç al.',
    karar: 'Başarı — doğruluk şans.',
    imge: 'Göl üstüne göl — neşe ve sevinç.',
    element: 'metal', chakra: 'heart', archetype: 'jester', polarity: 'yin',
    hatlar: ['Uyumlu sevinç — şans.', 'Doğrulukta sevinç — şans, pişmanlık kalkar.', 'Gelen sevinç — kötü.', 'Sürtüşmede sevinç — henüz rahat değil — hastalık, şenlik.', 'Soyulmakta güven — tehlike.', 'Sevinç içinde çekme.'],
  },
  {
    no: 59, ad: 'Dağılma', ad_cin: 'Huan', sembol: '䷺',
    ust: 'xun', alt: 'kan',
    anlam: 'Katılaşan bencilliğin çözülmesi. Rüzgar suyu dağıtır — köklü engeller aşılır, insanlar bir araya gelir. Manevi yenilenme.',
    karar: 'Başarı — kral tapınağa gider, büyük nehri geçmek iyi, doğruluk şans.',
    imge: 'Su üstünde rüzgar — dağılma.',
    element: 'water', chakra: 'heart', archetype: 'healer', polarity: 'yin',
    hatlar: ['Kurtarma güçlü atla — şans.', 'Dağılmada fırlat — pişmanlık kalkar.', 'Kişiliği dağıt — hata yok.', 'Grubunu dağıt — büyük şans — dağılmada doğal yükseklik — sıradan insanların düşünmediği.', 'Büyük çığlıkta dağılma — kral sarayda kalır — hata yok.', 'Kanlı dağılma — gitme, uzaklaş — hata yok.'],
  },
  {
    no: 60, ad: 'Sınır / Kısıtlama', ad_cin: 'Jie', sembol: '䷻',
    ust: 'kan', alt: 'dui',
    anlam: 'Sınırların erdemi. Hesap sınır gerektirir; nehir kıyıları olmazsa taşar. Doğru sınırlar özgürlük yaratır.',
    karar: 'Başarı — acı veren kısıtlama sürdürülemez.',
    imge: 'Göl üstünde su — sınır.',
    element: 'water', chakra: 'root', archetype: 'ruler', polarity: 'yin',
    hatlar: ['Avluya çıkmama — hata yok.', 'Kapıdan dışarı çıkmama — kötü.', 'Kısıtlanmayan — acı ağlamak — hata yok.', 'Sakin kısıtlama — başarı.', 'Tatlı kısıtlama — şans, ilerlemek övgü.', 'Acı kısıtlama — doğruluk kötü — pişmanlık kalkar.'],
  },
  {
    no: 61, ad: 'İçsel Doğruluk', ad_cin: 'Zhong Fu', sembol: '䷼',
    ust: 'xun', alt: 'dui',
    anlam: 'Kalbin derinliğindeki gerçek güven. Sözler olmadan bile içsel doğruluk etkisini yayar — domuzlar ve balıklar bile etkilenir.',
    karar: 'Domuzlar ve balıklar — şans, büyük nehri geçmek iyi, doğruluk şans.',
    imge: 'Göl üstünde rüzgar — içsel güven.',
    element: 'wood', chakra: 'heart', archetype: 'lover', polarity: 'yang',
    hatlar: ['Hazırlık — şans; başkası varsa rahatsız.', 'Balığın sesini duymak — şans — içki yok.', 'Düşman ele geçirildi — davul çalınır, durur, ağlar, şarkı söylenir.', 'Ay neredeyse dolu — at çift kaybetti — hata yok.', 'Doğruluk bağlayıcı — hata yok.', 'Horoz gökyüzüne uçar — doğruluk kötü.'],
  },
  {
    no: 62, ad: 'Küçük Aşım', ad_cin: 'Xiao Guo', sembol: '䷽',
    ust: 'zhen', alt: 'gen',
    anlam: 'Küçük şeylerde alçakgönüllü aşım. Kanat gürültüsü — aşağı git, yukarı değil. Büyük şeylere değil küçük şeylere odaklan.',
    karar: 'Başarı — doğruluk şans — küçük şeylerde yapılabilir, büyük şeylerde değil.',
    imge: 'Dağ üstünde gök gürültüsü — küçük aşım.',
    element: 'wood', chakra: 'throat', archetype: 'caregiver', polarity: 'yin',
    hatlar: ['Geçen kuş — kötü.', 'Büyükanneyi geçmek — büyükbabanın ulaşması — prense ulaşmak — hizmetkar ulaşmak — hata yok.', 'Geçmeden korumamak — kimileri saldırır, kötü.', 'Hata yok — ilerlemeden geçme — gitme, uyar, tehlike, hareket etme.', 'Yoğun bulutlar, batıdan yağmur yok — prens okunu atmak, mağaradaki alır.', 'Geçmeden buluşmama — geçen kuş ayrılır, kötü.'],
  },
  {
    no: 63, ad: 'Tamamlanma Sonrası', ad_cin: 'Ji Ji', sembol: '䷾',
    ust: 'kan', alt: 'li',
    anlam: 'Her şey yerli yerinde — başarı tamamlanmış. Ama tamamlanma yeni bir başlangıcın eşiğidir. Dikkatli ol, kazanılanı kaybetme.',
    karar: 'Başarı küçük şeylerde — doğruluk şans — başlangıç şans, son karmaşa.',
    imge: 'Su üstünde ateş — denge ve tamamlanma.',
    element: 'water', chakra: 'crown', archetype: 'ruler', polarity: 'balanced',
    hatlar: ['Frenini çek, kuyruğunu ıslatmak — hata yok.', 'Kadının arabasını kaybetmek — aramak gerekmez, yedi gün içinde alınır.', 'Yin prens ülkesini savaştı — sıradan insanlar yok, büyük kişi kullanır.', 'Kıyafet delik — gün boyu dikkatli ol.', 'Doğu komşunun öküzünü kurban etmek — batı komşunun basit sunumu, gerçek kutsama alır.', 'Kafasını ıslatmak — tehlike.'],
  },
  {
    no: 64, ad: 'Tamamlanma Öncesi', ad_cin: 'Wei Ji', sembol: '䷿',
    ust: 'li', alt: 'kan',
    anlam: 'Geçiş eşiğinde durmak — henüz tamamlanmamış. Tilki nehri neredeyse geçiyor ama kuyruğunu ıslatıyor. Son adımda dikkat.',
    karar: 'Başarı — küçük tilki neredeyse geçiyor, kuyruğunu ıslatıyor — faydalı yok.',
    imge: 'Ateş üstünde su — tamamlanma öncesi.',
    element: 'fire', chakra: 'crown', archetype: 'seeker', polarity: 'yang',
    hatlar: ['Kuyruğunu ıslatmak — utanç.', 'Frenini çek — doğruluk şans.', 'Henüz tamamlanmadı — ilerlemek kötü — büyük nehri geçmek faydalı.', 'Doğruluk şans — pişmanlık kalkar — sarsıntı sefer — üç yılda büyük ülkeye ödül.', 'Doğruluk şans — pişmanlık yok — büyük kişinin parlaklığı — doğruluk şans.', 'Doğrulukla içmek — hata yok — kafasını ıslatmak — doğruluk kaybedilir.'],
  },
]

// İsim ve tarihe göre I Ching hexagramı hesapla
export function ichingHesapla(isim, tarih = null) {
  if (!isim || !isim.trim()) return null

  const temizIsim = isim.trim().toLocaleLowerCase('tr')

  // Harf değerleri — A=1, B=2, ... Z=26, Türkçe karakterler dahil
  const harfDegerleri = {
    a:1,b:2,c:3,ç:4,d:5,e:6,f:7,g:8,ğ:9,h:10,ı:11,i:12,j:13,k:14,l:15,
    m:16,n:17,o:18,ö:19,p:20,r:21,s:22,ş:23,t:24,u:25,ü:26,v:27,y:28,z:29,
  }

  // Boşluk ve özel karakterleri filtrele
  const harfler = temizIsim.split('').filter(h => harfDegerleri[h])
  const toplam  = harfler.reduce((acc, h) => acc + (harfDegerleri[h] || 0), 0)

  // 1-64 aralığına mod al
  let hexNo = ((toplam - 1) % 64) + 1
  const hexagram = HEXAGRAMLAR.find(h => h.no === hexNo)

  if (!hexagram) return null

  // Dönüşüm hexagramı — toplamın rakam köküne göre
  let donusumNo = null
  let donusumHex = null
  if (harfler.length >= 3) {
    // Tek basamağa indir
    let kok = toplam
    while (kok > 9) kok = String(kok).split('').reduce((a, d) => a + parseInt(d), 0)
    donusumNo = ((toplam + kok - 1) % 64) + 1
    if (donusumNo !== hexNo) {
      donusumHex = HEXAGRAMLAR.find(h => h.no === donusumNo)
    }
  }

  // Aktif hatlar — isim uzunluğundan türet
  const aktifHatlar = []
  for (let i = 0; i < 6; i++) {
    const harfIndex = i % harfler.length
    const deger = harfDegerleri[harfler[harfIndex]] || 1
    // Tek deger = yang değişiyor, çift = yin değişiyor
    if (deger % 3 === 0) aktifHatlar.push(i + 1)
  }

  // Doğum hexagramı
  let dogumHex = null
  if (tarih) {
    const d = new Date(tarih)
    if (!isNaN(d.getTime())) {
      const gun   = d.getDate()
      const ay    = d.getMonth() + 1
      const yilKok = String(d.getFullYear()).split('').reduce((a, x) => a + parseInt(x), 0)
      const dogumToplam = gun + ay + yilKok
      const dogumNo = ((dogumToplam - 1) % 64) + 1
      if (dogumNo !== hexNo) {
        dogumHex = HEXAGRAMLAR.find(h => h.no === dogumNo)
      }
    }
  }

  const ust = TRIGRAMLAR[hexagram.ust]
  const alt = TRIGRAMLAR[hexagram.alt]

  return {
    toplam,
    hexagram: {
      ...hexagram,
      ust_trigram: ust,
      alt_trigram: alt,
      sembol_goster: `${ust?.sembol ?? ''}${alt?.sembol ?? ''}`,
    },
    aktifHatlar,
    donusumHex: donusumHex ? {
      ...donusumHex,
      ust_trigram: TRIGRAMLAR[donusumHex.ust],
      alt_trigram: TRIGRAMLAR[donusumHex.alt],
    } : null,
    dogumHex: dogumHex ? {
      ...dogumHex,
      ust_trigram: TRIGRAMLAR[dogumHex.ust],
      alt_trigram: TRIGRAMLAR[dogumHex.alt],
    } : null,
  }
}
