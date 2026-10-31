import type { Deal } from '@/payload-types'
import { formatDate } from '@/lib/pricing'

const SOON_DAYS = 14

export function DealList({ deals, from }: { deals: Deal[]; from: string }) {
  if (deals.length === 0) return <p>지금 확인된 공식 할인이 없습니다.</p>
  const now = Date.now()
  return (
    <ul className="deals">
      {deals.map((deal) => {
        const link = typeof deal.affiliateLink === 'object' ? deal.affiliateLink : null
        const service = typeof deal.service === 'object' ? deal.service.name : ''
        const left = deal.endsAt ? (new Date(deal.endsAt).getTime() - now) / 86_400_000 : null
        return (
          <li key={deal.id}>
            <p className="deals__benefit">{deal.benefit}</p>
            <h3>
              {service} {deal.title}
            </h3>
            <p>{deal.conditions}</p>
            <p className="deals__end">
              {deal.endsAt ? `${formatDate(deal.endsAt)} 종료` : '공식 종료일 표기 없음'}
              {left !== null && left <= SOON_DAYS ? <strong> 곧 종료</strong> : null}
            </p>
            <small>{formatDate(deal.verifiedAt)} 확인</small>
            <a
              className="button button--quiet"
              href={link ? `/go/${link.slug}?from=${encodeURIComponent(from)}` : deal.officialUrl}
              rel={link ? 'sponsored nofollow noopener' : 'noopener'}
              target="_blank"
            >
              공식 안내 확인
            </a>
            {link ? <small>제휴 링크</small> : null}
          </li>
        )
      })}
    </ul>
  )
}
