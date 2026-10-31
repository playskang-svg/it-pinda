import type { CollectionConfig } from 'payload'

import { anyone, signedIn } from './access'

export const Plans: CollectionConfig = {
  slug: 'plans',
  labels: { singular: '요금제', plural: '요금제' },
  admin: {
    useAsTitle: 'name',
    group: '요금 데이터',
    defaultColumns: ['name', 'service', 'monthlyPrice', 'annualPrice', 'verifiedAt'],
    description: '기본 정렬은 확인일이 오래된 순서입니다. 위쪽 요금부터 공식 페이지와 다시 대조하세요.',
  },
  access: { read: anyone, create: signedIn, update: signedIn, delete: signedIn },
  defaultSort: 'verifiedAt',
  fields: [
    {
      name: 'service',
      label: '서비스',
      type: 'relationship',
      relationTo: 'services',
      required: true,
      index: true,
    },
    { name: 'name', label: '요금제 이름', type: 'text', required: true },
    {
      name: 'currency',
      label: '통화',
      type: 'select',
      required: true,
      defaultValue: 'KRW',
      options: [
        { label: '원', value: 'KRW' },
        { label: '달러', value: 'USD' },
      ],
    },
    {
      name: 'monthlyPrice',
      label: '월 요금',
      type: 'number',
      required: true,
      admin: { description: '월 결제 기준. 무료면 0.' },
    },
    {
      name: 'annualPrice',
      label: '연 요금',
      type: 'number',
      admin: { description: '연 결제가 있을 때 1년 총액.' },
    },
    { name: 'pricePrefix', label: '가격 앞 문구', type: 'text', admin: { description: '예: 최저' } },
    { name: 'highlights', label: '핵심 차이', type: 'text', required: true },
    { name: 'note', label: '주의 사항', type: 'text' },
    {
      name: 'verifiedAt',
      label: '가격 확인일',
      type: 'date',
      required: true,
      index: true,
      admin: { date: { pickerAppearance: 'dayOnly' } },
    },
    {
      name: 'affiliateLink',
      label: '제휴 링크',
      type: 'relationship',
      relationTo: 'affiliate-links',
    },
  ],
}
