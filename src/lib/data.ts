import type { Plan, Service } from '@/payload-types'

import { cheapestByService, getHalfProducts, halfHref } from './half'
import { getClient } from './payload'
import { type Currency } from './pricing'

export type PlanRow = {
  id: number
  service: string
  category: Service['category']
  name: string
  currency: Currency
  monthlyPrice: number
  annualPrice: number | null
  pricePrefix: string | null
  highlights: string
  note: string | null
  verifiedAt: string
  href: string
  sponsored: boolean
  half: { href: string; price: number | null; name: string } | null
}

const toRow = (plan: Plan, from: string, half: PlanRow['half']): PlanRow | null => {
  if (typeof plan.service !== 'object') return null
  const link = plan.affiliateLink
  const affiliate = link && typeof link === 'object' ? link : null
  return {
    half,
    id: plan.id,
    service: plan.service.name,
    category: plan.service.category,
    name: plan.name,
    currency: plan.currency,
    monthlyPrice: plan.monthlyPrice,
    annualPrice: plan.annualPrice ?? null,
    pricePrefix: plan.pricePrefix ?? null,
    highlights: plan.highlights,
    note: plan.note ?? null,
    verifiedAt: plan.verifiedAt,
    href: affiliate
      ? `/go/${affiliate.slug}?from=${encodeURIComponent(from)}`
      : plan.service.officialUrl,
    sponsored: Boolean(affiliate),
  }
}

export const getPlanRows = async (
  from: string,
  filter?: { categories?: Service['category'][]; serviceIds?: number[] },
): Promise<PlanRow[]> => {
  const payload = await getClient()
  const where = filter?.serviceIds
    ? { service: { in: filter.serviceIds } }
    : filter?.categories
      ? { 'service.category': { in: filter.categories } }
      : {}
  const { docs } = await payload.find({
    collection: 'plans',
    where,
    limit: 200,
    depth: 1,
    pagination: false,
  })
  const serviceIds = [...new Set(docs.map((p) => (typeof p.service === 'object' ? p.service.id : p.service)))]
  // Cheapest GamsGo product per service, shown under the official button.
  const halfByService: Record<number, PlanRow['half']> = {}
  for (const [id, product] of Object.entries(cheapestByService(await getHalfProducts({ serviceIds })))) {
    halfByService[Number(id)] = { href: halfHref(product, from), price: product.monthlyPrice ?? null, name: product.name }
  }
  return docs
    .map((plan) => toRow(plan, from, halfByService[typeof plan.service === 'object' ? plan.service.id : plan.service] ?? null))
    .filter((row) => row !== null)
}
