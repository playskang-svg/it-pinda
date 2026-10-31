import type { Metadata } from 'next'

import { ContactForm } from './ContactForm'

export const metadata: Metadata = {
  title: '문의',
  description: '잘못된 요금 제보, 제휴와 광고 문의를 받습니다.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <section className="section page-head">
      <div className="frame frame--text">
        <h1>문의</h1>
        <p className="lede">달라진 요금이나 끝난 할인을 발견하셨다면 알려 주세요. 제휴 문의도 받습니다.</p>
        <ContactForm />
      </div>
    </section>
  )
}
