/**
 * Kadim API — Rate Limit Yardımcıları
 *
 * Vercel serverless'ta her instance bellekte bağımsız sayaç tutar.
 * Production için SUPABASE_URL + SUPABASE_SERVICE_KEY ile Redis/pg tabanlı
 * sayaç entegrasyonu yapılabilir (auth.js içinde increment/check fonksiyonlarını
 * Supabase RPC çağrılarıyla değiştir).
 *
 * Bu dosya tier limitlerini ve meta bilgilerini dışa aktarır.
 */

export { TIERS } from './auth.js'

/**
 * Tier özellik tablosu — fiyatlandırma ve döküman için kullanılır
 */
export const TIER_DETAILS = {
  free: {
    fiyat:     'Ücretsiz',
    rpm:       10,
    rpd:       500,
    ozellikler: [
      'Günlük 500 istek',
      'Dakikada 10 istek',
      'Tüm temel endpoint\'ler',
      'JSON yanıt',
    ],
  },
  starter: {
    fiyat:     '$19/ay',
    rpm:       60,
    rpd:       10000,
    ozellikler: [
      'Günlük 10.000 istek',
      'Dakikada 60 istek',
      'Tüm endpoint\'ler',
      'Öncelikli destek',
    ],
  },
  pro: {
    fiyat:     '$99/ay',
    rpm:       300,
    rpd:       100000,
    ozellikler: [
      'Günlük 100.000 istek',
      'Dakikada 300 istek',
      'Sentez endpoint dahil',
      'SLA %99.9',
      'Webhook desteği',
    ],
  },
  enterprise: {
    fiyat:     'Özel fiyat',
    rpm:       1000,
    rpd:       null,
    ozellikler: [
      'Sınırsız günlük istek',
      'Dakikada 1.000 istek',
      'Özel SLA',
      'Dedicated destek',
      'Özel endpoint geliştirme',
    ],
  },
}
