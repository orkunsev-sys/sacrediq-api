# Kadim Hesap API

Ebced, Numeroloji, Rune, BaZi, Nakshatra, Ay Menzili, I Ching ve Kabbalah
hesaplama motorlarını dışarıya sunan REST API marketplace.

**Canlı:** https://kadim-api.vercel.app
**Docs:** https://kadim-api.vercel.app/api/docs (OpenAPI JSON)

---

## Kurulum (Lokal)

```bash
git clone https://github.com/orkunsev/kadim-api
cd kadim-api
npm install
cp .env.example .env
# .env dosyasını düzenle
npx vercel dev
```

Uygulama `http://localhost:3000` adresinde çalışır.

---

## API Key Alma

### Ücretsiz Key (anında)

```bash
curl -X POST https://kadim-api.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{ "email": "sen@ornek.com", "tier": "free" }'
```

Yanıt:
```json
{
  "success": true,
  "data": {
    "apiKey": "kh_free_abcdefgh12345678901234",
    "tier": "free",
    "limits": { "rpm": 10, "rph": 100, "rpd": 500 }
  }
}
```

### Key Formatı

| Tier       | Format              |
|------------|---------------------|
| Free       | `kh_free_xxx`       |
| Starter    | `kh_starter_xxx`    |
| Pro        | `kh_pro_xxx`        |
| Enterprise | `kh_ent_xxx`        |

---

## Endpoint Listesi

| Endpoint                | Method | Açıklama                          | Min. Tier |
|-------------------------|--------|-----------------------------------|-----------|
| `/api/v1/ebced`         | POST   | Ebced hesaplama (4 sistem)        | Free      |
| `/api/v1/numeroloji`    | POST   | Numeroloji (4 sistem)             | Free      |
| `/api/v1/rune`          | POST   | Rune analizi                      | Free      |
| `/api/v1/nakshatra`     | POST   | Vedik Nakshatra                   | Free      |
| `/api/v1/bazi`          | POST   | BaZi (Sekiz Hane)                 | Free      |
| `/api/v1/ay-menzili`    | POST   | Ay Menzili (28 Mansions)          | Free      |
| `/api/v1/iching`        | POST   | I Ching (64 Hexagram)             | Free      |
| `/api/v1/kabbalah`      | POST   | Kabbalah Sefirot                  | Free      |
| `/api/v1/sentez`        | POST   | Tüm sistemler (paralel)           | Pro       |
| `/api/auth/register`    | POST   | API key üret                      | —         |
| `/api/auth/validate`    | POST   | Key doğrula                       | —         |
| `/api/docs`             | GET    | OpenAPI spec (JSON)               | —         |

Her isteğe `x-api-key` header ekle:
```
x-api-key: kh_free_abcdefgh12345678901234
```

URL alias — `/v1/*` de çalışır (`/api/v1/*` ile aynı):
```
POST https://kadim-api.vercel.app/v1/ebced
```

---

## Kullanım Örnekleri

### Ebced

```bash
curl -X POST https://kadim-api.vercel.app/api/v1/ebced \
  -H "Content-Type: application/json" \
  -H "x-api-key: kh_free_XXXXXXXXXXXXXXXXXXXXXXXXXX" \
  -d '{ "metin": "Bismillah" }'
```

```json
{
  "success": true,
  "data": {
    "toplam": 786,
    "detaylar": [...],
    "sistemler": { "kebir": {...}, "sagir": {...}, "vusta": {...}, "ahar": {...}, "vefk": {...} }
  },
  "meta": { "sistem": "ebced", "versiyon": "1.0", "kredi": 1, "kalan": 499 }
}
```

### Numeroloji

```bash
curl -X POST https://kadim-api.vercel.app/api/v1/numeroloji \
  -H "Content-Type: application/json" \
  -H "x-api-key: kh_free_XXXXXXXXXXXXXXXXXXXXXXXXXX" \
  -d '{ "metin": "Ahmet Yilmaz", "dogumTarihi": "1990-05-15" }'
```

### Nakshatra

```bash
curl -X POST https://kadim-api.vercel.app/api/v1/nakshatra \
  -H "Content-Type: application/json" \
  -H "x-api-key: kh_free_XXXXXXXXXXXXXXXXXXXXXXXXXX" \
  -d '{ "yil": 1990, "ay": 5, "gun": 15, "saat": 14, "dakika": 30 }'
```

### BaZi

```bash
curl -X POST https://kadim-api.vercel.app/api/v1/bazi \
  -H "Content-Type: application/json" \
  -H "x-api-key: kh_free_XXXXXXXXXXXXXXXXXXXXXXXXXX" \
  -d '{ "yil": 1990, "ay": 5, "gun": 15, "saat": 14 }'
```

### Rune

```bash
curl -X POST https://kadim-api.vercel.app/api/v1/rune \
  -H "Content-Type: application/json" \
  -H "x-api-key: kh_free_XXXXXXXXXXXXXXXXXXXXXXXXXX" \
  -d '{ "metin": "Orkun" }'
```

### I Ching

```bash
curl -X POST https://kadim-api.vercel.app/api/v1/iching \
  -H "Content-Type: application/json" \
  -H "x-api-key: kh_free_XXXXXXXXXXXXXXXXXXXXXXXXXX" \
  -d '{ "isim": "Orkun", "tarih": "1990-05-15" }'
```

### Kabbalah

```bash
curl -X POST https://kadim-api.vercel.app/api/v1/kabbalah \
  -H "Content-Type: application/json" \
  -H "x-api-key: kh_free_XXXXXXXXXXXXXXXXXXXXXXXXXX" \
  -d '{ "metin": "Adamah" }'
```

### Sentez (Pro)

```bash
curl -X POST https://kadim-api.vercel.app/api/v1/sentez \
  -H "Content-Type: application/json" \
  -H "x-api-key: kh_pro_XXXXXXXXXXXXXXXXXXXXXXXXXX" \
  -d '{
    "metin": "Orkun",
    "dogumTarihi": "1990-05-15",
    "dogumSaati": 14,
    "sistemler": ["ebced", "numeroloji", "rune", "kabbalah", "iching"]
  }'
```

---

## Yanıt Formatı

Tüm yanıtlar standart format kullanır:

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "sistem": "ebced",
    "versiyon": "1.0",
    "kredi": 1,
    "kalan": 499,
    "limit": 500,
    "tier": "free"
  }
}
```

Hata yanıtı:
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "minute başına istek limiti (10) aşıldı.",
    "retryAfterSeconds": 60
  }
}
```

---

## Rate Limit Hata Kodları

| HTTP | Kod                   | Açıklama                    |
|------|-----------------------|-----------------------------|
| 401  | MISSING_API_KEY       | Header eksik                |
| 401  | INVALID_API_KEY       | Geçersiz format             |
| 429  | RATE_LIMIT_EXCEEDED   | Limit aşıldı                |
| 403  | TIER_REQUIRED         | Üst tier gerekli            |
| 400  | MISSING_PARAM         | Zorunlu parametre eksik     |
| 400  | INVALID_DATE          | Tarih formatı hatalı        |
| 500  | HESAPLAMA_HATASI      | Sunucu hatası               |

---

## Tier ve Fiyatlar

| Tier            | Fiyat        | RPM   | RPH    | RPD       |
|-----------------|--------------|-------|--------|-----------|
| **Free**        | Ucretsiz     | 10    | 100    | 500       |
| **Starter**     | $19/ay       | 60    | 1.000  | 10.000    |
| **Pro**         | $99/ay       | 300   | 5.000  | 100.000   |
| **Enterprise**  | Ozel fiyat   | 1.000 | 20.000 | Sinirsiz  |

**Pro** tier: Sentez endpoint + SLA %99.9 + Webhook
**Enterprise**: Sinirsiz istek + Dedicated destek + Ozel endpoint gelistirme

Upgrade: https://kadim-api.vercel.app/#fiyatlar

---

## Mimari

```
api/
  v1/          — Hesaplama endpoint'leri (Vercel Serverless Functions)
  auth/        — Key yonetimi
  docs.js      — OpenAPI spec
middleware/
  auth.js      — Key dogrulama + rate limit (in-memory; Redis ile degistir)
  rateLimit.js — Tier detaylari
lib/
  hesaplamalar/ — Kadim Hesap'tan kopyalanan engine'ler
  veri/         — JSON veri dosyalari
docs/
  openapi.yaml  — Tam API spec
```

**Production Rate Limit**: `middleware/auth.js` icerisindeki in-memory store'u
Supabase/Redis ile degistir:
1. `increment_counter(key)` RPC fonksiyonu olustur
2. `check_limit(key)` fonksiyonu ekle
3. `authenticate()` icerisindeki `checkRateLimit` ve `incrementCounters` fonksiyonlarini guncelle

---

## Deploy

```bash
# Vercel CLI ile
npx vercel

# Environment variables
KADIM_MASTER_KEY=gizli_anahtar
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_KEY=xxx
```
