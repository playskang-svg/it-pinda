import { describe, expect, it } from 'vitest'

import { formatPrice, isActiveDeal, sortByPrice } from './pricing'

describe('sortByPrice', () => {
  it('orders mixed currencies by comparable value without changing rows', () => {
    const rows = [
      { id: 'usd', monthlyPrice: 22, currency: 'USD' as const },
      { id: 'cheap', monthlyPrice: 7000, currency: 'KRW' as const },
      { id: 'pricey', monthlyPrice: 159000, currency: 'KRW' as const },
    ]
    expect(sortByPrice(rows).map((r) => r.id)).toEqual(['cheap', 'usd', 'pricey'])
    expect(rows[0].id).toBe('usd')
  })
})

describe('formatPrice', () => {
  it('keeps the original currency', () => {
    expect(formatPrice(13500, 'KRW')).toBe('13,500원')
    expect(formatPrice(22, 'USD')).toBe('$22')
  })
})

describe('isActiveDeal', () => {
  const now = new Date('2026-11-01T00:00:00Z')
  it('keeps deals with no end date', () => expect(isActiveDeal({}, now)).toBe(true))
  it('removes ended deals', () => expect(isActiveDeal({ endsAt: '2026-10-31' }, now)).toBe(false))
  it('hides deals that have not started', () =>
    expect(isActiveDeal({ startsAt: '2026-11-10' }, now)).toBe(false))
  it('keeps a deal through its final day', () =>
    expect(isActiveDeal({ endsAt: '2026-11-01' }, new Date('2026-11-01T20:00:00Z'))).toBe(true))
})
