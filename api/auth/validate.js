/**
 * POST /api/auth/validate
 *
 * Body:
 *   { "apiKey": string }
 *
 * API key'in geçerli olup olmadığını ve tier bilgisini döner.
 * Rate limit tüketmez.
 */

import { parseApiKey, TIERS } from '../../middleware/auth.js'

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).end()

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: { code: 'METHOD_NOT_ALLOWED', message: 'POST metodu gerekli.' },
    })
  }

  const { apiKey } = req.body ?? {}

  if (!apiKey) {
    return res.status(400).json({
      success: false,
      error: { code: 'MISSING_PARAM', message: '"apiKey" parametresi gerekli.' },
    })
  }

  const { valid, tier } = parseApiKey(apiKey)

  if (!valid) {
    return res.status(200).json({
      success: true,
      data: {
        gecerli: false,
        hata:    'Geçersiz API key formatı.',
      },
    })
  }

  const tierLimits = TIERS[tier]

  return res.status(200).json({
    success: true,
    data: {
      gecerli: true,
      tier,
      tierLabel: tierLimits.label,
      limitler: {
        rpm: tierLimits.rpm,
        rph: tierLimits.rph,
        rpd: tierLimits.rpd,
      },
      format: `kh_${tier === 'enterprise' ? 'ent' : tier}_***`,
    },
  })
}
