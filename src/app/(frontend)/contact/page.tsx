import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '문의 안내',
  description: '결제, 환불, 접속 문제는 각 서비스와 겜스고 고객센터에서 처리합니다.',
  alternates: { canonical: '/contact' },
}

const CENTERS = [
  { name: '겜스고 고객센터 (반값 구독 주문·환불·접속)', url: 'https://www.gamsgo.com/ko/contact-us', note: '24시간 채팅 상담' },
  { name: '챗GPT 고객센터', url: 'https://help.openai.com/ko-kr/' },
  { name: '구글 One·제미나이 고객센터', url: 'https://support.google.com/googleone/' },
  { name: '넷플릭스 고객센터', url: 'https://help.netflix.com/ko/' },
  { name: '티빙 고객센터', url: 'https://www.tving.com/help/' },
  { name: '웨이브 고객센터', url: 'https://www.wavve.com/customer' },
  { name: '디즈니+ 고객센터', url: 'https://help.disneyplus.com/ko' },
  { name: 'NordVPN 고객센터', url: 'https://support.nordvpn.com/' },
]

export default function ContactPage() {
  return (
    <section className="section page-head">
      <div className="frame frame--text">
        <h1>문의 안내</h1>
        <p className="lede">
          이 사이트는 요금 정보를 정리해 보여 드리는 곳이라 결제나 계정을 다루지 않습니다. 주문, 환불, 접속 문제는
          결제한 플랫폼의 고객센터에서 바로 처리됩니다.
        </p>
        <ul className="half-features">
          {CENTERS.map((c) => (
            <li key={c.url}>
              <a href={c.url} rel="noopener" target="_blank">
                {c.name}
              </a>
              {c.note ? <small> · {c.note}</small> : null}
            </li>
          ))}
        </ul>
        <p className="disclosure">
          반값 구독 주문은 겜스고와 구매자 사이의 계약입니다. 겜스고 주문 페이지의 "문의" 버튼이 가장 빠릅니다.
        </p>
      </div>
    </section>
  )
}
