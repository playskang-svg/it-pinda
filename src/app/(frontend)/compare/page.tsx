import type { Metadata } from 'next'

import { PlanTable } from '@/components/PlanTable'
import { ShareBar } from '@/components/ShareBar'
import { getPlanRows } from '@/lib/data'
import { SITE_URL } from '@/lib/payload'

export const dynamic = 'force-dynamic'

const title = 'AI·OTT 구독 요금 비교'
const description = '챗GPT·클로드·제미나이, 넷플릭스·티빙·웨이브·디즈니+ 공식 요금을 가격순으로 비교합니다.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/compare' },
  openGraph: { title, description, url: '/compare' },
}

export default async function ComparePage() {
  const rows = await getPlanRows('compare')
  return (
    <section className="section page-head">
      <div className="frame">
        <h1>{title}</h1>
        <p className="lede">
          모든 요금은 공식 페이지에서 직접 확인한 값이며, 확인일을 함께 적었습니다. 달러 요금은 환산하지 않고 공식 표기
          그대로 보여 드립니다.
        </p>
        <PlanTable rows={rows} />
        <ShareBar title={title} url={`${SITE_URL}/compare`} />
      </div>
    </section>
  )
}
