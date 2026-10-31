import type { Metadata } from 'next'

import { CategoryPage } from '@/components/CategoryPage'

export const dynamic = 'force-dynamic'

const title = 'OTT 구독'
const description = '넷플릭스·티빙·웨이브·디즈니+ 요금제와 묶음 상품을 비교하고 월 구독료를 줄이는 방법을 정리했습니다.'

export const metadata: Metadata = {
  title: 'OTT 요금제 비교',
  description,
  alternates: { canonical: '/ott' },
  openGraph: { title: 'OTT 요금제 비교', description, url: '/ott' },
}

export default function Page() {
  return (
    <CategoryPage
      lede={description}
      photo="/photos/ott.webp"
      photoAlt="한국 아파트 거실에서 TV로 드라마를 보는 가족"
      planCategory="ott"
      slug="ott"
      title={title}
    />
  )
}
