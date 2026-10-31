// shortcut: this fixed rate only orders USD plans among KRW plans; shown prices are never converted. Replace if USD plans become common.
const USD_TO_KRW_FOR_SORT = 1400

export type Currency = 'KRW' | 'USD'
export type PriceRow = { monthlyPrice: number; currency: Currency }

export const comparablePrice = ({ monthlyPrice, currency }: PriceRow): number =>
  currency === 'USD' ? monthlyPrice * USD_TO_KRW_FOR_SORT : monthlyPrice

export const sortByPrice = <T extends PriceRow>(rows: T[]): T[] =>
  [...rows].sort((a, b) => comparablePrice(a) - comparablePrice(b))

export const formatPrice = (amount: number, currency: Currency): string =>
  currency === 'USD' ? `$${amount.toLocaleString('en-US')}` : `${amount.toLocaleString('ko-KR')}원`

export const isActiveDeal = (
  deal: { startsAt?: string | null; endsAt?: string | null },
  now: Date,
): boolean => {
  if (deal.startsAt && new Date(deal.startsAt) > now) return false
  if (!deal.endsAt) return true
  const end = new Date(deal.endsAt)
  end.setUTCHours(23, 59, 59, 999)
  return end >= now
}

export const formatDate = (value: string | null | undefined): string => {
  if (!value) return ''
  return new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(value))
}
