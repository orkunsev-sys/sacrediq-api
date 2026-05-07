/**
 * GET /api/docs
 * OpenAPI 3.1 spec — JSON formatında
 */

export default function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).end()

  const spec = {
    openapi: '3.1.0',
    info: {
      title:       'Kadim Hesap API',
      version:     '1.0.0',
      description: 'Ebced, Numeroloji, Rune, BaZi, Nakshatra, Ay Menzili, I Ching ve Kabbalah hesaplama motorları.',
      contact: {
        name:  'Kadim Hesap',
        url:   'https://kadim-hesap.vercel.app',
        email: 'orkunsev@gmail.com',
      },
      license: { name: 'Proprietary' },
    },
    servers: [{ url: 'https://kadim-api.vercel.app', description: 'Production' }],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in:   'header',
          name: 'x-api-key',
          description: 'Format: kh_{tier}_{random}. Kayıt: POST /api/auth/register',
        },
      },
      schemas: {
        Meta: {
          type: 'object',
          properties: {
            sistem:   { type: 'string' },
            versiyon: { type: 'string' },
            kredi:    { type: 'integer' },
            kalan:    { type: ['integer', 'null'] },
            limit:    { type: ['integer', 'null'] },
            tier:     { type: 'string', enum: ['free', 'starter', 'pro', 'enterprise'] },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', enum: [false] },
            error: {
              type: 'object',
              properties: {
                code:    { type: 'string' },
                message: { type: 'string' },
              },
            },
          },
        },
      },
    },
    security: [{ ApiKeyAuth: [] }],
    paths: {
      '/api/v1/ebced': {
        post: {
          summary:     'Ebced Hesaplama',
          description: 'Metni ebced sistemlerine göre hesaplar: Kebir, Sagir, Vusta, Ahar, Vefk.',
          operationId: 'ebcedHesapla',
          tags:        ['Hesaplama'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['metin'],
                  properties: {
                    metin: { type: 'string', maxLength: 500, example: 'Bismillah', description: 'Hesaplanacak metin' },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Ebced hesaplama sonucu',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', enum: [true] },
                      data: {
                        type: 'object',
                        properties: {
                          toplam:   { type: 'integer' },
                          detaylar: { type: 'array' },
                          sistemler: {
                            type: 'object',
                            properties: {
                              kebir: { type: 'object' },
                              sagir: { type: 'object' },
                              vusta: { type: 'object' },
                              ahar:  { type: 'object' },
                              vefk:  { type: ['object', 'null'] },
                            },
                          },
                        },
                      },
                      meta: { '$ref': '#/components/schemas/Meta' },
                    },
                  },
                },
              },
            },
            400: { description: 'Geçersiz parametre', content: { 'application/json': { schema: { '$ref': '#/components/schemas/Error' } } } },
            401: { description: 'Geçersiz API key', content: { 'application/json': { schema: { '$ref': '#/components/schemas/Error' } } } },
            429: { description: 'Rate limit aşıldı', content: { 'application/json': { schema: { '$ref': '#/components/schemas/Error' } } } },
          },
        },
      },
      '/api/v1/numeroloji': {
        post: {
          summary:     'Numeroloji Hesaplama',
          description: 'İsim ve doğum tarihi ile numeroloji profili: Pisagor, Kaldean, Gematria, Tantrik.',
          operationId: 'numerolojiHesapla',
          tags:        ['Hesaplama'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['metin'],
                  properties: {
                    metin:       { type: 'string', example: 'Ahmet Yilmaz' },
                    dogumTarihi: { type: 'string', pattern: '^\\d{4}-\\d{2}-\\d{2}$', example: '1990-05-15' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Numeroloji sonucu' },
            400: { description: 'Geçersiz parametre', content: { 'application/json': { schema: { '$ref': '#/components/schemas/Error' } } } },
            401: { description: 'Yetkisiz', content: { 'application/json': { schema: { '$ref': '#/components/schemas/Error' } } } },
            429: { description: 'Rate limit', content: { 'application/json': { schema: { '$ref': '#/components/schemas/Error' } } } },
          },
        },
      },
      '/api/v1/rune': {
        post: {
          summary:     'Rune Analizi',
          description: 'Her harfi Elder Futhark rune sistemine dönüştürür. Element, chakra, mitolojik tanrı döner.',
          operationId: 'runeHesapla',
          tags:        ['Hesaplama'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['metin'],
                  properties: {
                    metin: { type: 'string', example: 'Orkun' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Rune analizi sonucu' },
            400: { description: 'Geçersiz parametre', content: { 'application/json': { schema: { '$ref': '#/components/schemas/Error' } } } },
            401: { description: 'Yetkisiz', content: { 'application/json': { schema: { '$ref': '#/components/schemas/Error' } } } },
            429: { description: 'Rate limit', content: { 'application/json': { schema: { '$ref': '#/components/schemas/Error' } } } },
          },
        },
      },
      '/api/v1/nakshatra': {
        post: {
          summary:     'Nakshatra Hesaplama',
          description: "Vedik astroloji — Ay'ın hangi Nakshatra'da olduğunu hesaplar. Lahiri Ayanamsha kullanır.",
          operationId: 'nakshatraHesapla',
          tags:        ['Hesaplama'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['yil', 'ay', 'gun'],
                  properties: {
                    yil:    { type: 'integer', example: 1990 },
                    ay:     { type: 'integer', minimum: 1, maximum: 12, example: 5 },
                    gun:    { type: 'integer', minimum: 1, maximum: 31, example: 15 },
                    saat:   { type: 'integer', minimum: 0, maximum: 23, default: 12 },
                    dakika: { type: 'integer', minimum: 0, maximum: 59, default: 0 },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Nakshatra sonucu' },
            400: { description: 'Geçersiz parametre', content: { 'application/json': { schema: { '$ref': '#/components/schemas/Error' } } } },
            401: { description: 'Yetkisiz', content: { 'application/json': { schema: { '$ref': '#/components/schemas/Error' } } } },
            429: { description: 'Rate limit', content: { 'application/json': { schema: { '$ref': '#/components/schemas/Error' } } } },
          },
        },
      },
      '/api/v1/bazi': {
        post: {
          summary:     'BaZi (Sekiz Hane) Hesaplama',
          description: 'Çin metafiziği — 4 pillar haritası. Göksel Gövdeler, Yer Yüzü Dalları, 5 element dengesi.',
          operationId: 'baziHesapla',
          tags:        ['Hesaplama'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['yil', 'ay', 'gun', 'saat'],
                  properties: {
                    yil:  { type: 'integer', example: 1990 },
                    ay:   { type: 'integer', minimum: 1, maximum: 12, example: 5 },
                    gun:  { type: 'integer', minimum: 1, maximum: 31, example: 15 },
                    saat: { type: 'integer', minimum: 0, maximum: 23, example: 14 },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'BaZi haritası' },
            400: { description: 'Geçersiz parametre', content: { 'application/json': { schema: { '$ref': '#/components/schemas/Error' } } } },
            401: { description: 'Yetkisiz', content: { 'application/json': { schema: { '$ref': '#/components/schemas/Error' } } } },
            429: { description: 'Rate limit', content: { 'application/json': { schema: { '$ref': '#/components/schemas/Error' } } } },
          },
        },
      },
      '/api/v1/ay-menzili': {
        post: {
          summary:     'Ay Menzili Hesaplama',
          description: "Ay'ın o andaki lunar mansion'ını hesaplar. 28 menzil sistemi — İslami, Hint, Batı ezoterik.",
          operationId: 'ayMenziliHesapla',
          tags:        ['Hesaplama'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['yil', 'ay', 'gun'],
                  properties: {
                    yil:    { type: 'integer', example: 2024 },
                    ay:     { type: 'integer', minimum: 1, maximum: 12, example: 5 },
                    gun:    { type: 'integer', minimum: 1, maximum: 31, example: 15 },
                    saat:   { type: 'integer', minimum: 0, maximum: 23, default: 12 },
                    dakika: { type: 'integer', minimum: 0, maximum: 59, default: 0 },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Ay menzili sonucu' },
            400: { description: 'Geçersiz parametre', content: { 'application/json': { schema: { '$ref': '#/components/schemas/Error' } } } },
            401: { description: 'Yetkisiz', content: { 'application/json': { schema: { '$ref': '#/components/schemas/Error' } } } },
            429: { description: 'Rate limit', content: { 'application/json': { schema: { '$ref': '#/components/schemas/Error' } } } },
          },
        },
      },
      '/api/v1/iching': {
        post: {
          summary:     'I Ching Hexagram',
          description: "İsimden I Ching hexagramı hesaplar. 64 hexagram, dönüşüm hexagramı ve aktif hatlar.",
          operationId: 'ichingHesapla',
          tags:        ['Hesaplama'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['isim'],
                  properties: {
                    isim:  { type: 'string', example: 'Orkun' },
                    tarih: { type: 'string', pattern: '^\\d{4}-\\d{2}-\\d{2}$', example: '1990-05-15', description: 'Doğum tarihi — doğum hexagramı için' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'I Ching sonucu' },
            400: { description: 'Geçersiz parametre', content: { 'application/json': { schema: { '$ref': '#/components/schemas/Error' } } } },
            401: { description: 'Yetkisiz', content: { 'application/json': { schema: { '$ref': '#/components/schemas/Error' } } } },
            429: { description: 'Rate limit', content: { 'application/json': { schema: { '$ref': '#/components/schemas/Error' } } } },
          },
        },
      },
      '/api/v1/kabbalah': {
        post: {
          summary:     'Kabbalah Sefirot Analizi',
          description: 'Her harfi Kabbalah tablosuna göre değerlendirir. Dijital kök üzerinden Sefirot eşleşmesi yapar.',
          operationId: 'kabbalahHesapla',
          tags:        ['Hesaplama'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['metin'],
                  properties: {
                    metin: { type: 'string', example: 'Adamah' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Kabbalah sonucu' },
            400: { description: 'Geçersiz parametre', content: { 'application/json': { schema: { '$ref': '#/components/schemas/Error' } } } },
            401: { description: 'Yetkisiz', content: { 'application/json': { schema: { '$ref': '#/components/schemas/Error' } } } },
            429: { description: 'Rate limit', content: { 'application/json': { schema: { '$ref': '#/components/schemas/Error' } } } },
          },
        },
      },
      '/api/v1/sentez': {
        post: {
          summary:     'Sentez — Tüm Sistemler',
          description: 'Pro/Enterprise. Tüm hesaplama motorlarını tek sorguda çalıştırır. Kredi maliyeti: 5.',
          operationId: 'sentezHesapla',
          tags:        ['Hesaplama', 'Pro'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['metin'],
                  properties: {
                    metin:       { type: 'string', example: 'Orkun' },
                    dogumTarihi: { type: 'string', pattern: '^\\d{4}-\\d{2}-\\d{2}$', example: '1990-05-15' },
                    dogumSaati:  { type: 'integer', minimum: 0, maximum: 23, default: 12 },
                    sistemler: {
                      type: 'array',
                      items: { type: 'string', enum: ['ebced','numeroloji','rune','kabbalah','iching','nakshatra','bazi','ay-menzili'] },
                      description: 'Boş bırakılırsa tüm sistemler çalışır.',
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Sentez sonucu — tüm sistemler' },
            400: { description: 'Geçersiz parametre', content: { 'application/json': { schema: { '$ref': '#/components/schemas/Error' } } } },
            401: { description: 'Yetkisiz', content: { 'application/json': { schema: { '$ref': '#/components/schemas/Error' } } } },
            403: { description: 'Pro tier gerekli', content: { 'application/json': { schema: { '$ref': '#/components/schemas/Error' } } } },
            429: { description: 'Rate limit', content: { 'application/json': { schema: { '$ref': '#/components/schemas/Error' } } } },
          },
        },
      },
      '/api/auth/register': {
        post: {
          summary:     'API Key Üret',
          description: 'Yeni API key oluşturur. Free tier otomatik, ücretli tier\'lar ödeme sonrası.',
          operationId: 'register',
          tags:        ['Auth'],
          security:    [],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['email'],
                  properties: {
                    email: { type: 'string', format: 'email', example: 'gelistirici@ornek.com' },
                    tier:  { type: 'string', enum: ['free', 'starter', 'pro', 'enterprise'], default: 'free' },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: 'API key oluşturuldu' },
            400: { description: 'Geçersiz parametre' },
            403: { description: 'Ödeme gerekli' },
          },
        },
      },
      '/api/auth/validate': {
        post: {
          summary:     'API Key Doğrula',
          description: "API key'in geçerli olup olmadığını ve tier bilgisini döner. Rate limit tüketmez.",
          operationId: 'validate',
          tags:        ['Auth'],
          security:    [],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['apiKey'],
                  properties: {
                    apiKey: { type: 'string', example: 'kh_free_abcdefgh12345678' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Doğrulama sonucu' },
            400: { description: 'Geçersiz parametre' },
          },
        },
      },
    },
    tags: [
      { name: 'Hesaplama', description: 'Kadim hesaplama motorları' },
      { name: 'Auth',      description: 'API key yönetimi' },
      { name: 'Pro',       description: 'Pro ve Enterprise tier endpoint\'leri' },
    ],
  }

  return res.status(200).json(spec)
}
