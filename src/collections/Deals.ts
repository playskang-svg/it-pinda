import type { CollectionConfig } from 'payload'

import { anyone, signedIn } from './access'

export const Deals: CollectionConfig = {
  slug: 'deals',
  labels: { singular: '할인', plural: '할인' },
  admin: {
    useAsTitle: 'title',
    group: '요금 데이터',
    defaultColumns: ['title', 'service', 'startsAt', 'endsAt', 'verifiedAt'],
    description: '종료일이 지나면 이달의 할인에서 자동으로 빠집니다.',
  },
  access: { read: anyone, create: signedIn, update: signedIn, delete: signedIn },
  defaultSort: 'endsAt',
  fields: [
    { name: 'title', label: '할인 이름', type: 'text', required: true },
    {
      name: 'service',
      label: '서비스',
      type: 'relationship',
      relationTo: 'services',
      required: true,
    },
    {
      name: 'benefit',
      label: '혜택(크게 표시)',
      type: 'text',
      required: true,
      admin: { description: '예: 월 9,400원 절약' },
    },
    { name: 'conditions', label: '조건', type: 'textarea', required: true },
    {
      name: 'startsAt',
      label: '시작일',
      type: 'date',
      admin: { date: { pickerAppearance: 'dayOnly' } },
    },
    {
      name: 'endsAt',
      label: '종료일',
      type: 'date',
      index: true,
      admin: {
        date: { pickerAppearance: 'dayOnly' },
        description: '공식 종료일이 없으면 비워 두세요.',
      },
    },
    { name: 'officialUrl', label: '공식 안내', type: 'text', required: true },
    {
      name: 'verifiedAt',
      label: '확인일',
      type: 'date',
      required: true,
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
