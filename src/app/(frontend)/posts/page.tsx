import type { Metadata } from 'next'

import { PhotoHead } from '@/components/PhotoHead'
import { PostList } from '@/components/PostList'
import { getClient, publishedWhere } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: '전체 글',
  description: 'AI·OTT 구독료와 해지·환불 정보를 다룬 글 모음입니다.',
  alternates: { canonical: '/posts' },
}

export default async function PostsPage() {
  const payload = await getClient()
  const { docs } = await payload.find({
    collection: 'posts',
    where: publishedWhere(),
    limit: 100,
    depth: 1,
    sort: '-publishedAt',
  })
  return (
    <>
      <PhotoHead
        lede="AI·OTT 구독료와 해지·환불 정보를 다룬 글을 모았습니다."
        photo="/photos/student.webp"
        title="전체 글"
      />
      <section className="section">
        <div className="frame">
          <PostList feature posts={docs} />
        </div>
      </section>
    </>
  )
}
