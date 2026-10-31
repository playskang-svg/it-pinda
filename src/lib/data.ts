import type { Plan, Service } from '@/payload-types'

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
}

const toRow = (plan: Plan, from: string): PlanRow | null => {
  if (typeof plan.service !== 'object') return null
  const link = plan.affiliateLink
  const affiliate = link && typeof link === 'object' ? link : null
  return {
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
  return docs.map((plan) => toRow(plan, from)).filter((row) => row !== null)
}
