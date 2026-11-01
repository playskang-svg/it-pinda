import Link from 'next/link'

import { DealList } from '@/components/DealList'
import { PhotoHead } from '@/components/PhotoHead'
import { PlanTable } from '@/components/PlanTable'
import { PostList } from '@/components/PostList'
import { getPlanRows } from '@/lib/data'
import { getClient, publishedWhere } from '@/lib/payload'
import { isActiveDeal } from '@/lib/pricing'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const payload = await getClient()
  const [rows, deals, posts] = await Promise.all([
    getPlanRows('home', { categories: ['ai', 'ott'] }),
    payload.find({ collection: 'deals', limit: 50, depth: 1, pagination: false }),
    payload.find({
      collection: 'posts',
      where: publishedWhere(),
      limit: 6,
      depth: 1,
      sort: '-publishedAt',
    }),
  ])
  const activeDeals = deals.docs.filter((deal) => isActiveDeal(deal, new Date())).slice(0, 3)

  return (
    <>
      <PhotoHead
        lede="공식 요금을 나란히 비교하고, 지금 받을 수 있는 공식 할인까지 확인하세요."
        photo="/photos/hero.webp"
        photoAlt="집 소파에 앉아 휴대폰으로 구독 결제 내역을 확인하는 한국인 여성"
        tall
        title="AI·OTT 구독료, 더 내고 있지 않나요?"
      >
        <a className="button" href="#compare">
          내 요금제 비교하기
        </a>
      </PhotoHead>

      <section className="section" id="compare">
        <div className="frame">
          <h2>공식 요금 한눈에 비교</h2>
          <PlanTable limit={7} rows={rows} />
          <Link className="text-link" href="/compare">
            전체 요금표 보기
          </Link>
        </div>
      </section>

      <section className="section section--photo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="section__photo" height={800} loading="lazy" src="/photos/family.webp" width={1200} />
        <div className="frame section__body">
          <h2>이달의 할인</h2>
          <DealList deals={activeDeals} from="home" />
          <Link className="text-link" href="/deals">
            할인 전체 보기
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="frame">
          <h2>요금제 고르기 전에 읽는 글</h2>
          <PostList feature posts={posts.docs} />
        </div>
      </section>

      <section className="section section--photo band">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="section__photo" height={800} loading="lazy" src="/photos/cancel.webp" width={1200} />
        <div className="frame section__body">
          <h2>안 쓰는 구독부터 정리하세요</h2>
          <p>해지와 환불 방법을 정리한 글을 모았습니다.</p>
          <Link className="button" href="/cancel">
            해지·환불 안내 보기
          </Link>
        </div>
      </section>
    </>
  )
}
