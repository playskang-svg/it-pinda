import type { CollectionConfig } from 'payload'

import { signedIn } from './access'

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  labels: { singular: '문의', plural: '문의' },
  admin: { useAsTitle: 'email', group: '설정', defaultColumns: ['email', 'name', 'createdAt'] },
  access: { read: signedIn, create: () => false, update: signedIn, delete: signedIn },
  defaultSort: '-createdAt',
  fields: [
    { name: 'name', label: '이름', type: 'text', required: true },
    { name: 'email', label: '답장 이메일', type: 'email', required: true },
    { name: 'message', label: '내용', type: 'textarea', required: true },
  ],
}
