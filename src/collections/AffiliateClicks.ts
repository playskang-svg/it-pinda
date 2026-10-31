import type { CollectionConfig } from 'payload'

import { signedIn } from './access'

export const AffiliateClicks: CollectionConfig = {
  slug: 'affiliate-clicks',
  labels: { singular: '제휴 클릭', plural: '제휴 클릭' },
  admin: {
    group: '제휴',
    defaultColumns: ['link', 'from', 'createdAt'],
    description: '링크와 유입 페이지로 필터해 어떤 글에서 클릭이 나오는지 봅니다.',
  },
  access: { read: signedIn, create: () => false, update: () => false, delete: signedIn },
  defaultSort: '-createdAt',
  fields: [
    {
      name: 'link',
      label: '링크',
      type: 'relationship',
      relationTo: 'affiliate-links',
      required: true,
      index: true,
    },
    { name: 'from', label: '유입 페이지', type: 'text', index: true },
  ],
}
