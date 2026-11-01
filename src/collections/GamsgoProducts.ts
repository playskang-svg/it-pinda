import type { CollectionConfig } from 'payload'

import { anyone, signedIn } from './access'

export const GamsgoProducts: CollectionConfig = {
  slug: 'gamsgo-products',
  labels: { singular: '반값 구독 상품', plural: '반값 구독 상품' },
  admin: {
    useAsTitle: 'name',
    group: '제휴',
    defaultColumns: ['name', 'category', 'monthlyPrice', 'featured', 'verifiedAt'],
    description: '겜스고 공유 구독 상품입니다. 가격은 겜스고 목록의 월 환산가이며 확인일을 함께 적습니다.',
  },
  access: { read: anyone, create: signedIn, update: signedIn, delete: signedIn },
  defaultSort: 'name',
  fields: [
    { name: 'name', label: '상품 이름', type: 'text', required: true },
    {
      name: 'slug',
      label: '주소',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { position: 'sidebar', description: '사이트 안 주소 /half/주소' },
    },
    {
      name: 'category',
      label: '분야',
      type: 'select',
      required: true,
      index: true,
      admin: { position: 'sidebar' },
      options: [
        { label: 'AI', value: 'ai' },
        { label: 'OTT·영상', value: 'ott' },
        { label: '음악', value: 'music' },
        { label: '소프트웨어', value: 'software' },
        { label: '학습·생활', value: 'life' },
      ],
    },
    {
      name: 'featured',
      label: '홈에 노출',
      type: 'checkbox',
      defaultValue: false,
      index: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'monthlyPrice',
      label: '겜스고 월 환산가(원)',
      type: 'number',
      admin: { description: '비우면 가격 대신 "겜스고에서 확인"으로 표시됩니다.' },
    },
    { name: 'priceNote', label: '가격 설명', type: 'text', admin: { description: '예: 12개월 기준 월 환산' } },
    { name: 'summary', label: '한 줄 소개', type: 'textarea', required: true },
    {
      name: 'features',
      label: '포함 내용',
      type: 'array',
      fields: [{ name: 'text', label: '내용', type: 'text', required: true }],
    },
    {
      name: 'faq',
      label: '자주 묻는 질문',
      type: 'array',
      fields: [
        { name: 'q', label: '질문', type: 'text', required: true },
        { name: 'a', label: '답', type: 'textarea', required: true },
      ],
    },
    { name: 'logo', label: '로고 이미지 주소', type: 'text' },
    {
      name: 'service',
      label: '공식 요금표 서비스',
      type: 'relationship',
      relationTo: 'services',
      index: true,
      admin: { description: '연결하면 그 서비스의 요금표와 글에 반값 구독 버튼이 붙습니다.' },
    },
    {
      name: 'affiliateLink',
      label: '제휴 링크',
      type: 'relationship',
      relationTo: 'affiliate-links',
      required: true,
    },
    {
      name: 'verifiedAt',
      label: '가격 확인일',
      type: 'date',
      required: true,
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' } },
    },
  ],
}
