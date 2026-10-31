import type { CollectionConfig } from 'payload'

import { anyone, signedIn } from './access'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: '구독 서비스', plural: '구독 서비스' },
  admin: { useAsTitle: 'name', group: '요금 데이터', defaultColumns: ['name', 'category'] },
  access: { read: anyone, create: signedIn, update: signedIn, delete: signedIn },
  fields: [
    { name: 'name', label: '서비스 이름', type: 'text', required: true },
    { name: 'slug', label: '주소', type: 'text', required: true, unique: true, index: true },
    {
      name: 'category',
      label: '분야',
      type: 'select',
      required: true,
      options: [
        { label: 'AI', value: 'ai' },
        { label: 'OTT', value: 'ott' },
        { label: 'VPN', value: 'vpn' },
        { label: '웹호스팅', value: 'hosting' },
        { label: '소프트웨어', value: 'software' },
      ],
    },
    { name: 'officialUrl', label: '공식 요금 페이지', type: 'text', required: true },
    { name: 'cancelUrl', label: '공식 해지 안내', type: 'text' },
  ],
}
