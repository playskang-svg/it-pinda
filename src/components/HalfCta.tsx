import Link from 'next/link'

import { CopyCode } from '@/components/CopyCode'
import { HalfButton } from '@/components/HalfButton'
import { GAMSGO_GO, halfHref, yearlyLoss } from '@/lib/half'
import { formatPrice } from '@/lib/pricing'
import type { GamsgoProduct } from '@/payload-types'

// Hook box inside posts and category pages: facts first, then the yearly overpay, then the button.
export function HalfCta({
  products,
  floor = {},
  from,
  title = '이 요금, 반값에 쓰는 방법이 있어요',
  compact = false,
}: {
  products: GamsgoProduct[]
  floor?: Record<number, number>
  from: string
  title?: string
  compact?: boolean
}) {
  const losses = products.map((p) => yearlyLoss(p, floor)).filter((n): n is number => n !== null)
  const biggest = losses.length ? Math.max(...losses) : null
  return (
    <aside className={compact ? 'half-cta half-cta--compact' : 'half-cta'}>
      <strong className="half-cta__title">💸 {title}</strong>
      <p>
        겜스고에서 정식 요금제를 여러 명이 나눠 쓰면 월 요금이 크게 내려갑니다. 결제 후 몇 초 안에 로그인
        정보가 오고, 문제가 생기면 겜스고 고객센터가 24시간 처리합니다.{' '}
        <Link href="/half#gamsgo">겜스고가 어떤 곳인지 보기</Link>
      </p>
      <CopyCode />
      {biggest ? (
        <p className="half-cta__loss">
          지금처럼 정가로 계속 내면 1년에 <strong>{formatPrice(biggest, 'KRW')}</strong>을 더 내는 셈입니다.
        </p>
      ) : null}
      <div className="half-cta__buttons">
        {products.length ? (
          products.map((product) => (
            <HalfButton
              href={halfHref(product, from)}
              key={product.id}
              label={`${product.name} 구독할인 받기`}
              price={product.monthlyPrice}
            />
          ))
        ) : (
          <HalfButton href={`${GAMSGO_GO}?from=${encodeURIComponent(from)}`} label="겜스고 구독할인 보기" />
        )}
      </div>
      <small>
        제휴 링크입니다. 공유 구독은 서비스 약관과 다를 수 있으니{' '}
        <Link href="/half">반값 구독 안내</Link>를 먼저 읽어 주세요.
      </small>
    </aside>
  )
}
