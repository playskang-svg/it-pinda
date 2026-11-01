import type { GamsgoProduct } from '@/payload-types'

import { getClient } from './payload'

// GamsGo affiliate identity. The per-product links live in affiliate-links as gg-<slug>.
export const GAMSGO_CODE = 'WWSQD'
export const GAMSGO_GO = '/go/gamsgo'

export const CATEGORY_LABEL: Record<GamsgoProduct['category'], string> = {
  ai: 'AI',
  ott: 'OTT·영상',
  music: '음악',
  software: '소프트웨어',
  life: '학습·생활',
}
export const CATEGORY_ORDER = ['ai', 'ott', 'music', 'software', 'life'] as const

export const halfHref = (product: GamsgoProduct, from: string): string => {
  const link = product.affiliateLink
  const slug = typeof link === 'object' ? link.slug : null
  return slug ? `/go/${slug}?from=${encodeURIComponent(from)}` : `${GAMSGO_GO}?from=${encodeURIComponent(from)}`
}

export const getHalfProducts = async (filter?: {
  category?: GamsgoProduct['category']
  featured?: boolean
  serviceIds?: number[]
  limit?: number
}): Promise<GamsgoProduct[]> => {
  const payload = await getClient()
  const and: Record<string, unknown>[] = []
  if (filter?.category) and.push({ category: { equals: filter.category } })
  if (filter?.featured) and.push({ featured: { equals: true } })
  if (filter?.serviceIds) {
    if (filter.serviceIds.length === 0) return []
    and.push({ service: { in: filter.serviceIds } })
  }
  const { docs } = await payload.find({
    collection: 'gamsgo-products',
    where: and.length ? { and } : {},
    limit: filter?.limit ?? 200,
    depth: 1,
    sort: 'monthlyPrice',
    pagination: false,
  })
  return docs
}

// Cheapest paid KRW official plan per service, for the "what you overpay per year" line.
export const getOfficialFloor = async (serviceIds: number[]): Promise<Record<number, number>> => {
  if (serviceIds.length === 0) return {}
  const payload = await getClient()
  const { docs } = await payload.find({
    collection: 'plans',
    where: { and: [{ service: { in: serviceIds } }, { currency: { equals: 'KRW' } }, { monthlyPrice: { greater_than: 0 } }] },
    limit: 200,
    depth: 0,
    pagination: false,
  })
  const floor: Record<number, number> = {}
  for (const plan of docs) {
    const id = typeof plan.service === 'object' ? plan.service.id : plan.service
    floor[id] = Math.min(floor[id] ?? Infinity, plan.monthlyPrice)
  }
  return floor
}

// One product per service, preferring the cheapest one that has a price (null prices sort first in D1).
export const cheapestByService = (products: GamsgoProduct[]): Record<number, GamsgoProduct> => {
  const out: Record<number, GamsgoProduct> = {}
  const sorted = [...products].sort((a, b) => (a.monthlyPrice ?? Infinity) - (b.monthlyPrice ?? Infinity))
  for (const product of sorted) {
    const id = serviceIdOf(product)
    if (id && !out[id]) out[id] = product
  }
  return out
}

export const serviceIdOf = (product: GamsgoProduct): number | null =>
  product.service ? (typeof product.service === 'object' ? product.service.id : product.service) : null

// Yearly overpay when staying on the cheapest official plan instead of this product.
export const yearlyLoss = (product: GamsgoProduct, floor: Record<number, number>): number | null => {
  const id = serviceIdOf(product)
  const official = id ? floor[id] : undefined
  if (!official || !product.monthlyPrice || official <= product.monthlyPrice) return null
  return (official - product.monthlyPrice) * 12
}

export const getHalfProduct = async (slug: string): Promise<GamsgoProduct | null> => {
  const payload = await getClient()
  const { docs } = await payload.find({
    collection: 'gamsgo-products',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })
  return docs[0] ?? null
}
