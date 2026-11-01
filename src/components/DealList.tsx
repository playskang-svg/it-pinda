import { HalfButton } from '@/components/HalfButton'
import { cheapestByService, getHalfProducts, halfHref } from '@/lib/half'
import { formatDate } from '@/lib/pricing'
import type { Deal } from '@/payload-types'

const SOON_DAYS = 14

export async function DealList({ deals, from }: { deals: Deal[]; from: string }) {
  if (deals.length === 0) return <p>지금 확인된 공식 할인이 없습니다.</p>
  const now = Date.now()
  const serviceIds = [...new Set(deals.map((d) => (typeof d.service === 'object' ? d.service.id : d.service)))]
  // Cheapest GamsGo product per service: the deal button goes there when one exists.
  const half: Record<number, { href: string; price: number | null }> = {}
  for (const [id, product] of Object.entries(cheapestByService(await getHalfProducts({ serviceIds })))) {
    half[Number(id)] = { href: halfHref(product, from), price: product.monthlyPrice ?? null }
  }
  return (
    <ul className="deals">
      {deals.map((deal) => {
        const link = typeof deal.affiliateLink === 'object' ? deal.affiliateLink : null
        const serviceId = typeof deal.service === 'object' ? deal.service.id : deal.service
        const service = typeof deal.service === 'object' ? deal.service.name : ''
        const left = deal.endsAt ? (new Date(deal.endsAt).getTime() - now) / 86_400_000 : null
        const offer = half[serviceId]
        return (
          <li key={deal.id}>
            <p className="deals__benefit">{deal.benefit}</p>
            <h3>
              {service} {deal.title}
            </h3>
            <p>{deal.conditions}</p>
            {deal.endsAt ? (
              <p className="deals__end">
                {formatDate(deal.endsAt)} 종료
                {left !== null && left <= SOON_DAYS ? <strong> 곧 종료</strong> : null}
              </p>
            ) : null}
            <small>{formatDate(deal.verifiedAt)} 확인</small>
            {offer ? (
              <HalfButton href={offer.href} label="구독할인 받기" price={offer.price} small />
            ) : (
              <a
                className="button button--quiet"
                href={link ? `/go/${link.slug}?from=${encodeURIComponent(from)}` : deal.officialUrl}
                rel={link ? 'sponsored nofollow noopener' : 'noopener'}
                target="_blank"
              >
                구독할인 받기
              </a>
            )}
            {offer || link ? <small>제휴 링크</small> : null}
          </li>
        )
      })}
    </ul>
  )
}
