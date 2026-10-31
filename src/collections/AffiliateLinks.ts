import type { CollectionConfig } from 'payload'

import { anyone, signedIn } from './access'

export const AffiliateLinks: CollectionConfig = {
  slug: 'affiliate-links',
  labels: { singular: '제휴 링크', plural: '제휴 링크' },
  admin: { useAsTitle: 'name', group: '제휴', defaultColumns: ['name', 'slug', 'partner', 'url'] },
  access: { read: anyone, create: signedIn, update: signedIn, delete: signedIn },
  fields: [
    { name: 'name', label: '이름', type: 'text', required: true },
    {
      name: 'slug',
      label: '주소',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: '사이트 안 주소 /go/주소 로 연결됩니다.' },
    },
    { name: 'partner', label: '제휴사', type: 'text' },
    { name: 'url', label: '제휴 URL', type: 'text', required: true },
  ],
}
