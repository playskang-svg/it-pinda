import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { cache } from 'react'

import { HalfButton } from '@/components/HalfButton'
import { HalfGrid } from '@/components/HalfGrid'
import { PhotoHead } from '@/components/PhotoHead'
import { PlanTable } from '@/components/PlanTable'
import { ShareBar } from '@/components/ShareBar'
import { getPlanRows } from '@/lib/data'
import { CATEGORY_LABEL, GAMSGO_CODE, getHalfProduct, getHalfProducts, halfHref } from '@/lib/half'
import { SITE_URL } from '@/lib/payload'
import { formatDate, formatPrice } from '@/lib/pricing'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

const PHOTO: Record<string, string> = {
  ai: '/photos/ai.webp',
  ott: '/photos/ott.webp',
  music: '/photos/student.webp',
  software: '/photos/compare.webp',
  life: '/photos/family.webp',
}

const getProduct = cache(getHalfProduct)

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) return {}
  const price = product.monthlyPrice ? `월 ${formatPrice(product.monthlyPrice, 'KRW')}부터` : '최저가'
  const title = `${product.name} 반값 구독 — 겜스고 ${price}`
  return {
    title,
    description: product.summary,
    alternates: { canonical: `/half/${product.slug}` },
    openGraph: { title, description: product.summary, url: `/half/${product.slug}` },
  }
}

export default async function HalfProductPage({ params }: Props) {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) notFound()

  const service = typeof product.service === 'object' ? product.service : null
  const from = `half:${product.slug}`
  const href = halfHref(product, from)
  const [rows, others] = await Promise.all([
    service ? getPlanRows(from, { serviceIds: [service.id] }) : [],
    getHalfProducts({ category: product.category, limit: 7 }),
  ])
  const official = rows.filter((r) => r.monthlyPrice > 0 && r.currency === 'KRW')
  const cheapestOfficial = official.length ? Math.min(...official.map((r) => r.monthlyPrice)) : null
  const saving =
    product.monthlyPrice && cheapestOfficial && cheapestOfficial > product.monthlyPrice
      ? Math.round((1 - product.monthlyPrice / cheapestOfficial) * 100)
      : null
  const related = others.filter((p) => p.id !== product.id).slice(0, 6)
  const url = `${SITE_URL}/half/${product.slug}`

  return (
    <article className="half-product">
      <PhotoHead
        eyebrow={
          <Link className="post__category" href={`/half#${product.category}`}>
            {CATEGORY_LABEL[product.category]} 반값 구독
          </Link>
        }
        lede={product.summary}
        photo={PHOTO[product.category]}
        title={`${product.name} 반값 구독`}
      />
      <section className="section">
        <div className="frame frame--text">
          <div className="half-price">
            <div>
              <small>겜스고 월 환산가</small>
              <strong>{product.monthlyPrice ? formatPrice(product.monthlyPrice, 'KRW') : '겜스고에서 확인'}</strong>
              {cheapestOfficial ? (
                <span>
                  공식 최저 월 {formatPrice(cheapestOfficial, 'KRW')}
                  {saving ? ` → 약 ${saving}% 절약` : ''}
                </span>
              ) : null}
              <small>
                {formatDate(product.verifiedAt)} 확인
                {product.priceNote ? ` · ${product.priceNote}` : ''}
              </small>
            </div>
            <HalfButton href={href} label={`${product.name} 구독할인 받기`} />
          </div>
          <p className="half-code">
            결제 창에서 프로모션 코드 <code>{GAMSGO_CODE}</code>를 넣으면 추가 할인이 적용됩니다.
          </p>

          <h2>이렇게 받아요</h2>
          <ol className="half-steps">
            <li>위 버튼으로 겜스고 상품 페이지에 들어가 기간(1·3·6·12개월)을 고릅니다.</li>
            <li>결제하면 보통 몇 초 안에 로그인 정보가 주문 페이지와 메일로 옵니다.</li>
            <li>안내대로 로그인해 바로 씁니다. 접속이 막히면 겜스고 주문 페이지에서 교체나 환불을 신청합니다.</li>
          </ol>

          {product.features?.length ? (
            <>
              <h2>포함 내용</h2>
              <ul className="half-features">
                {product.features.map((f) => (
                  <li key={f.id ?? f.text}>{f.text}</li>
                ))}
              </ul>
            </>
          ) : null}

          {rows.length ? (
            <>
              <h2>{service?.name} 공식 요금과 비교</h2>
              <PlanTable rows={rows} showTabs={false} />
            </>
          ) : null}

          {product.faq?.length ? (
            <>
              <h2>자주 묻는 질문</h2>
              {product.faq.map((item) => (
                <details className="half-faq" key={item.id ?? item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </>
          ) : null}

          <h2>꼭 알아 두세요</h2>
          <ul className="half-features">
            <li>공유 구독은 정식 요금제의 자리를 나눠 쓰는 방식이라 각 서비스 약관과 다를 수 있습니다.</li>
            <li>결제, 환불, 접속 문제는 이 사이트가 아니라 겜스고 고객센터(24시간)에서 처리합니다.</li>
            <li>가격은 {formatDate(product.verifiedAt)} 겜스고 목록 기준이며 기간과 옵션에 따라 다릅니다.</li>
          </ul>
          <div className="half-final">
            <HalfButton href={href} label={`${product.name} 구독할인 받기`} price={product.monthlyPrice} />
          </div>
          <p className="disclosure">
            이 페이지의 반값 구독 버튼은 제휴 링크이며, 구매 시 운영자가 수수료를 받습니다. 방문자가 추가로 내는
            금액은 없습니다.
          </p>
          <ShareBar card text={product.summary} title={`${product.name} 반값 구독`} url={url} />
        </div>
      </section>
      {related.length ? (
        <section className="section section--tone">
          <div className="frame">
            <h2>함께 많이 보는 {CATEGORY_LABEL[product.category]} 반값 구독</h2>
            <HalfGrid from={`half:${product.slug}:related`} products={related} />
            <Link className="text-link" href="/half">
              반값 구독 전체 보기
            </Link>
          </div>
        </section>
      ) : null}
    </article>
  )
}
