import type { Metadata } from 'next'
import Link from 'next/link'

import { CopyCode } from '@/components/CopyCode'
import { DealList } from '@/components/DealList'
import { HalfButton } from '@/components/HalfButton'
import { HalfGrid } from '@/components/HalfGrid'
import { JsonLd } from '@/components/JsonLd'
import { PhotoHead } from '@/components/PhotoHead'
import { PlanTable } from '@/components/PlanTable'
import { PostList } from '@/components/PostList'
import { getPlanRows } from '@/lib/data'
import { getHalfProducts } from '@/lib/half'
import { getClient, publishedWhere, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from '@/lib/payload'
import { isActiveDeal } from '@/lib/pricing'
import { pageMeta, publisher } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  ...pageMeta({ title: SITE_TITLE, description: SITE_DESCRIPTION, path: '/' }),
  title: { absolute: SITE_TITLE },
}

export default async function HomePage() {
  const payload = await getClient()
  const [rows, deals, posts, featured] = await Promise.all([
    getPlanRows('home', { categories: ['ai', 'ott'] }),
    payload.find({ collection: 'deals', limit: 50, depth: 1, pagination: false }),
    payload.find({
      collection: 'posts',
      where: publishedWhere(),
      limit: 6,
      depth: 1,
      sort: '-publishedAt',
    }),
    getHalfProducts({ featured: true, limit: 8 }),
  ])
  const activeDeals = deals.docs.filter((deal) => isActiveDeal(deal, new Date())).slice(0, 3)

  return (
    <>
      <JsonLd
        data={{
          '@type': 'WebSite',
          name: SITE_NAME,
          url: SITE_URL,
          inLanguage: 'ko-KR',
          description: SITE_DESCRIPTION,
          publisher,
        }}
      />
      <PhotoHead
        lede="공식 요금을 나란히 비교하고, 지금 받을 수 있는 공식 할인까지 확인하세요."
        photo="/photos/hero.webp"
        photoAlt="집 소파에 앉아 휴대폰으로 구독 결제 내역을 확인하는 한국인 여성"
        tall
        title="AI·OTT 구독료, 더 내고 있지 않나요?"
      >
        <div className="hero-actions">
          <a className="button" href="#compare">
            내 요금제 비교하기
          </a>
          <HalfButton href="/half" label="구독할인 보기" />
        </div>
      </PhotoHead>

      <section className="section section--tone" id="half">
        <div className="frame">
          <h2>지금 가장 많이 찾는 반값 구독</h2>
          <p className="section-lede">
            정식 요금제를 여러 명이 나눠 쓰는 겜스고 공유 구독입니다. 정가로 계속 내면 1년에 수십만 원이 그냥
            나갑니다. <Link href="/half#gamsgo">겜스고가 어떤 곳인지 보기</Link>
          </p>
          <div className="half-code half-code--home">
            <CopyCode />
          </div>
          <HalfGrid from="home" products={featured} />
          <Link className="text-link" href="/half">
            반값 구독 전체 보기
          </Link>
        </div>
      </section>

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
