import type { Metadata } from 'next'

import { CategoryPage } from '@/components/CategoryPage'
import { pageMeta } from '@/lib/seo'

export const dynamic = 'force-dynamic'

const title = 'VPN'
const description = '공용 와이파이와 해외여행에 쓸 VPN을 고를 때 첫 결제액과 갱신 금액을 비교하는 방법을 정리했습니다.'

export const metadata: Metadata = pageMeta({ title: 'VPN 요금 비교', description, path: '/vpn' })

export default function Page() {
  return (
    <CategoryPage
      lede={description}
      photo="/photos/vpn.webp"
      photoAlt="공항 라운지에서 노트북을 쓰는 한국인 여성"
      planCategory="vpn"
      slug="vpn"
      title={title}
    />
  )
}
