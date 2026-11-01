import type { Metadata } from 'next'

import { DealList } from '@/components/DealList'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { PhotoHead } from '@/components/PhotoHead'
import { ShareBar } from '@/components/ShareBar'
import { getClient, SITE_URL } from '@/lib/payload'
import { isActiveDeal } from '@/lib/pricing'
import { pageMeta } from '@/lib/seo'

export const dynamic = 'force-dynamic'

const title = '이달의 구독 할인'
const description = 'AI·OTT·VPN 공식 프로모션과 묶음 요금, 연간 결제 혜택을 종료일과 함께 모았습니다.'

export const metadata: Metadata = pageMeta({ title, description, path: '/deals' })

export default async function DealsPage() {
  const payload = await getClient()
  const { docs } = await payload.find({ collection: 'deals', limit: 100, depth: 1, pagination: false })
  const deals = docs.filter((deal) => isActiveDeal(deal, new Date()))
  return (
    <>
      <PhotoHead
        eyebrow={<Breadcrumbs items={[{ name: '이달의 할인', path: '/deals' }]} />}
        lede="공식 페이지에 표기된 혜택만 올립니다. 종료일이 지난 할인은 자동으로 사라집니다."
        photo="/photos/receipt.webp"
        title={title}
      />
      <section className="section section--tone">
        <div className="frame">
          <DealList deals={deals} from="deals" />
          <ShareBar card title={title} url={`${SITE_URL}/deals`} />
        </div>
      </section>
    </>
  )
}
