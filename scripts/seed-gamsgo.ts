// Fills GamsGo affiliate links and products from scripts/gamsgo-products.json. Safe to re-run: matched by slug.
// Run: NODE_ENV=production pnpm payload run scripts/seed-gamsgo.ts   (remote D1)
import fs from 'node:fs'
import path from 'node:path'

import { type CollectionSlug, getPayload } from 'payload'

import config from '../src/payload.config'

type Product = {
  name: string
  slug: string
  category: 'ai' | 'ott' | 'music' | 'software' | 'life'
  featured: boolean
  monthlyPrice: number | null
  priceNote: string | null
  summary: string
  features: string[]
  faq: { q: string; a: string }[]
  logo: string | null
  service: string | null
  link: string
}

export const GAMSGO_PARTNER_URL = 'https://www.gamsgo.com/partner/N4RGX'
export const GAMSGO_CODE = 'WWSQD'
const VERIFIED = '2026-11-01T00:00:00.000Z'

const payload = await getPayload({ config })
const products: Product[] = JSON.parse(
  fs.readFileSync(path.resolve('scripts/gamsgo-products.json'), 'utf8'),
)

/* eslint-disable @typescript-eslint/no-explicit-any */
const upsert = async (collection: CollectionSlug, where: any, data: any): Promise<any> => {
  const { docs } = await payload.find({ collection, where, limit: 1, depth: 0 })
  if (docs[0]) return payload.update({ collection, id: docs[0].id, data, depth: 0 } as any)
  return payload.create({ collection, data, depth: 0 } as any)
}

await upsert(
  'affiliate-links',
  { slug: { equals: 'gamsgo' } },
  { name: '겜스고 (전체)', slug: 'gamsgo', partner: 'GamsGo', url: GAMSGO_PARTNER_URL },
)

const services = await payload.find({ collection: 'services', limit: 100, depth: 0, pagination: false })
const serviceIds = Object.fromEntries(services.docs.map((s) => [s.slug, s.id]))

for (const p of products) {
  const link = await upsert(
    'affiliate-links',
    { slug: { equals: `gg-${p.slug}` } },
    { name: `겜스고 ${p.name}`, slug: `gg-${p.slug}`, partner: 'GamsGo', url: p.link },
  )
  await upsert(
    'gamsgo-products',
    { slug: { equals: p.slug } },
    {
      name: p.name,
      slug: p.slug,
      category: p.category,
      featured: p.featured,
      monthlyPrice: p.monthlyPrice,
      priceNote: p.priceNote,
      summary: p.summary,
      features: p.features.map((text) => ({ text })),
      faq: p.faq,
      logo: p.logo,
      service: p.service ? serviceIds[p.service] : null,
      affiliateLink: link.id,
      verifiedAt: VERIFIED,
    },
  )
}
console.log('gamsgo products', products.length)
process.exit(0)
