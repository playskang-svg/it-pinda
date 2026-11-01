import type { Metadata } from 'next'

import { CategoryPage } from '@/components/CategoryPage'
import { pageMeta } from '@/lib/seo'

export const dynamic = 'force-dynamic'

const title = '해지·환불'
const description = '서비스별 해지 경로와 환불 조건, 자동 결제를 멈추는 방법을 공식 안내 기준으로 정리했습니다.'

export const metadata: Metadata = pageMeta({ title: '구독 해지·환불 방법', description, path: '/cancel' })

export default function Page() {
  return (
    <CategoryPage
      lede={description}
      photo="/photos/cancel.webp"
      photoAlt="식탁에서 휴대폰으로 구독 해지 화면을 확인하는 한국인 남성"
      slug="cancel"
      title={title}
    />
  )
}
