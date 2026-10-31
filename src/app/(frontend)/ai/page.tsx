import type { Metadata } from 'next'

import { CategoryPage } from '@/components/CategoryPage'

export const dynamic = 'force-dynamic'

const title = 'AI 구독'
const description = '챗GPT·클로드·제미나이 요금제를 비교하고 내 사용량에 맞는 플랜을 고르는 방법을 정리했습니다.'

export const metadata: Metadata = {
  title: 'AI 구독 요금제 비교',
  description,
  alternates: { canonical: '/ai' },
  openGraph: { title: 'AI 구독 요금제 비교', description, url: '/ai' },
}

export default function Page() {
  return (
    <CategoryPage
      lede={description}
      photo="/photos/ai.webp"
      photoAlt="카페에서 노트북으로 AI 도구를 쓰는 한국인 여성"
      planCategory="ai"
      slug="ai"
      title={title}
    />
  )
}
