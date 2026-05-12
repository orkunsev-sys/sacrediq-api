import express from 'express'
import { createServer } from 'http'

// Route handlers
import ebced from './api/v1/ebced.js'
import numeroloji from './api/v1/numeroloji.js'
import rune from './api/v1/rune.js'
import kabbalah from './api/v1/kabbalah.js'
import bazi from './api/v1/bazi.js'
import nakshatra from './api/v1/nakshatra.js'
import ayMenzili from './api/v1/ay-menzili.js'
import iching from './api/v1/iching.js'
import sentez from './api/v1/sentez.js'
import wisdom from './api/v1/wisdom.js'
import register from './api/auth/register.js'
import validate from './api/auth/validate.js'
import docs from './api/docs.js'

const app = express()
app.use(express.json())

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,x-api-key')
  if (req.method === 'OPTIONS') return res.status(200).end()
  next()
})

// Vercel handler → Express adapter
function adapt(handler) {
  return (req, res) => handler(req, res)
}

// Routes
app.all('/api/v1/ebced',      adapt(ebced))
app.all('/api/v1/numeroloji', adapt(numeroloji))
app.all('/api/v1/rune',       adapt(rune))
app.all('/api/v1/kabbalah',   adapt(kabbalah))
app.all('/api/v1/bazi',       adapt(bazi))
app.all('/api/v1/nakshatra',  adapt(nakshatra))
app.all('/api/v1/ay-menzili', adapt(ayMenzili))
app.all('/api/v1/iching',     adapt(iching))
app.all('/api/v1/sentez',     adapt(sentez))
app.all('/api/v1/wisdom',     adapt(wisdom))
app.all('/api/auth/register', adapt(register))
app.all('/api/auth/validate', adapt(validate))
app.all('/api/docs',          adapt(docs))

// Vercel rewrite uyumluluğu: /v1/* → /api/v1/*
app.all('/v1/:path(*)', (req, res, next) => {
  req.url = `/api/v1/${req.params.path}`
  next('router')
})

app.get('/', (req, res) => {
  res.json({
    name: 'SacredIQ API',
    version: '1.0.0',
    docs: '/api/docs',
    endpoints: [
      '/v1/ebced', '/v1/numeroloji', '/v1/rune', '/v1/kabbalah',
      '/v1/bazi', '/v1/nakshatra', '/v1/ay-menzili', '/v1/iching',
      '/v1/sentez', '/v1/wisdom'
    ]
  })
})

const PORT = process.env.PORT || 8080
createServer(app).listen(PORT, () => {
  console.log(`SacredIQ API running on :${PORT}`)
})
