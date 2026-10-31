'use client'

import { type FormEvent, useState } from 'react'

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('sending')
    const form = event.currentTarget
    const response = await fetch('/contact/submit', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    }).catch((): null => null)
    if (response?.ok) {
      form.reset()
      setStatus('sent')
    } else {
      setStatus('error')
    }
  }

  return (
    <form className="contact" onSubmit={submit}>
      <label>
        이름
        <input autoComplete="name" maxLength={50} name="name" required />
      </label>
      <label>
        답장 받을 이메일
        <input autoComplete="email" maxLength={254} name="email" required type="email" />
      </label>
      <label>
        내용
        <textarea maxLength={3000} name="message" required rows={7} />
      </label>
      {/* Hidden from people; bots that fill it are dropped on the server. */}
      <label aria-hidden="true" className="contact__trap">
        웹사이트
        <input autoComplete="off" name="website" tabIndex={-1} />
      </label>
      <p className="contact__consent">
        답장을 위해 이름과 이메일, 내용을 수집하며 답변 후 지체 없이 삭제합니다. 자세한 내용은 개인정보처리방침을 확인해
        주세요.
      </p>
      <button className="button" disabled={status === 'sending'} type="submit">
        {status === 'sending' ? '보내는 중' : '문의 보내기'}
      </button>
      <p aria-live="polite" role="status">
        {status === 'sent' ? '문의를 받았습니다. 감사합니다.' : null}
        {status === 'error' ? '보내지 못했습니다. 입력 내용을 확인하고 다시 시도해 주세요.' : null}
      </p>
    </form>
  )
}
