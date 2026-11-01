import type { Metadata } from 'next'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { GamsgoIntro } from '@/components/GamsgoIntro'
import { HalfGrid } from '@/components/HalfGrid'
import { JsonLd } from '@/components/JsonLd'
import { PhotoHead } from '@/components/PhotoHead'
import { ShareBar } from '@/components/ShareBar'
import { CATEGORY_LABEL, CATEGORY_ORDER, getHalfProducts } from '@/lib/half'
import { SITE_URL } from '@/lib/payload'
import { pageMeta } from '@/lib/seo'

export const dynamic = 'force-dynamic'

const title = '반값 구독 — AI·OTT·음악 공유 구독 최저가'
const description =
  '챗GPT, 제미나이, 넷플릭스, 유튜브 프리미엄, 스포티파이를 겜스고 공유 구독으로 월 2,666원부터. 겜스고 할인코드 WWSQD.'

export const metadata: Metadata = pageMeta({ title, description, path: '/half' })

export default async function HalfPage() {
  const products = await getHalfProducts()
  return (
    <>
      <JsonLd
        data={{
          '@type': 'ItemList',
          name: '반값 구독 상품',
          numberOfItems: products.length,
          itemListElement: products.map((product, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: `${product.name} 반값 구독`,
            url: `${SITE_URL}/half/${product.slug}`,
          })),
        }}
      />
      <PhotoHead
        eyebrow={<Breadcrumbs items={[{ name: '반값 구독', path: '/half' }]} />}
        lede={`정식 요금제를 여러 명이 나눠 쓰는 겜스고 공유 구독입니다. 결제 후 로그인 정보가 바로 옵니다.`}
        photo="/photos/student.webp"
        photoAlt="도서관에서 노트북과 헤드폰으로 공부하는 한국인 여성"
        title="반값 구독"
      />
      <section className="section">
        <div className="frame">
          <GamsgoIntro />
          <div className="half-notes">
            <p>
              <strong>어떻게 싸지나요?</strong> 가족·팀 요금제의 자리 하나를 사는 방식입니다. 겜스고가 계정을
              관리하고, 자리가 막히면 바꿔 주거나 환불합니다.
            </p>
            <p>
              <strong>주의할 점.</strong> 공유 이용은 각 서비스 약관과 다를 수 있습니다. 결제·환불·접속 문제는
              이 사이트가 아니라 겜스고 고객센터(24시간)에 문의하세요. 아래 가격은 겜스고 목록의 월 환산
              최저가이며 기간과 옵션에 따라 다릅니다.
            </p>
          </div>
          {CATEGORY_ORDER.map((category) => {
            const items = products.filter((p) => p.category === category)
            if (!items.length) return null
            return (
              <div className="half-section" id={category} key={category}>
                <h2>{CATEGORY_LABEL[category]} 반값 구독</h2>
                <HalfGrid from={`half:${category}`} products={items} />
              </div>
            )
          })}
          <ShareBar card title="반값 구독 — AI·OTT·음악 공유 구독 최저가" url={`${SITE_URL}/half`} />
        </div>
      </section>
    </>
  )
}
