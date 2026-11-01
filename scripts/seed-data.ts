// Prices and conditions below were read from each official page on 2026-11-01.
export const VERIFIED = '2026-10-31T15:30:00.000Z'

type Text = string | { text: string; url: string }
export type Block =
  | { h2: string }
  | { h3: string }
  | { p: Text[] | string }
  | { ul: string[] }
  | { ol: string[] }
  | { img: string; caption: string }

export const categories = [
  { slug: 'ai', title: 'AI 구독' },
  { slug: 'ott', title: 'OTT 구독' },
  { slug: 'cancel', title: '해지·환불' },
  { slug: 'vpn', title: 'VPN' },
]

export const photos: Record<string, string> = {
  hero: '소파에 앉아 휴대폰으로 구독 결제 내역을 확인하는 한국인 여성',
  ai: '카페에서 노트북으로 작업하는 한국인 여성',
  ott: '거실 소파에서 TV를 보는 한국인 커플',
  cancel: '식탁에서 휴대폰을 보며 구독을 정리하는 한국인 남성',
  vpn: '공항 라운지에서 노트북을 쓰는 한국인 여성',
  compare: '집 책상에서 노트북과 메모로 요금을 비교하는 한국인 남성',
  family: '거실에서 태블릿으로 영상을 함께 보는 한국인 가족',
  receipt: '카드 명세서 위에서 휴대폰으로 금액을 확인하는 손',
  student: '도서관에서 노트북과 헤드폰으로 공부하는 한국인 여성',
}

export const services = [
  { slug: 'chatgpt', name: '챗GPT', category: 'ai', officialUrl: 'https://chatgpt.com/ko-KR/pricing/', cancelUrl: 'https://help.openai.com/ko-kr/articles/7232927' },
  { slug: 'claude', name: '클로드', category: 'ai', officialUrl: 'https://claude.com/ko/pricing' },
  { slug: 'google-ai', name: '구글 AI(제미나이)', category: 'ai', officialUrl: 'https://one.google.com/about/google-ai-plans/' },
  { slug: 'netflix', name: '넷플릭스', category: 'ott', officialUrl: 'https://help.netflix.com/ko/node/24926', cancelUrl: 'https://help.netflix.com/ko/node/407' },
  { slug: 'tving', name: '티빙', category: 'ott', officialUrl: 'https://www.tving.com/bill/subscription/plan' },
  { slug: 'wavve', name: '웨이브', category: 'ott', officialUrl: 'https://www.wavve.com/voucher' },
  { slug: 'disney-plus', name: '디즈니+', category: 'ott', officialUrl: 'https://help.disneyplus.com/ko/article/disneyplus-price' },
  { slug: 'ott-bundle', name: 'OTT 묶음', category: 'ott', officialUrl: 'https://www.tving.com/bill/subscription/plan' },
  { slug: 'coupang-play', name: '쿠팡플레이', category: 'ott', officialUrl: 'https://www.coupangplay.com/' },
  { slug: 'nordvpn', name: 'NordVPN', category: 'vpn', officialUrl: 'https://nordvpn.com/ko/pricing/' },
] as const

type PlanSeed = {
  service: (typeof services)[number]['slug']
  name: string
  monthlyPrice: number
  annualPrice?: number
  currency?: 'KRW' | 'USD'
  pricePrefix?: string
  highlights: string
  note?: string
}

const DISNEY_NOTE = '2026년 11월 10일부터 신규 가입자에게 적용되는 공식 표기 요금'
const CLAUDE_NOTE = '공식 표기 달러 요금, 10% 부가세 포함'
const NORD_NOTE = '2년+3개월 선결제 기준 월 환산액, 부가세 별도 가능'

export const plans: PlanSeed[] = [
  { service: 'chatgpt', name: 'Free', monthlyPrice: 0, highlights: '일상 대화 중심, 도구와 업로드는 제한적' },
  { service: 'chatgpt', name: 'Go', monthlyPrice: 13000, highlights: '메시지·업로드·이미지 한도 확대', note: '광고가 포함될 수 있음' },
  { service: 'chatgpt', name: 'Plus', monthlyPrice: 29000, highlights: '고급 추론 모델, 심층 리서치·프로젝트·예약 작업' },
  { service: 'chatgpt', name: 'Pro', monthlyPrice: 159000, pricePrefix: '최저', highlights: '사용량 등급 3가지, 최대 한도', note: 'Pro 100 159,000원, Pro 200 299,000원, Pro 500 790,000원' },
  { service: 'claude', name: 'Free', monthlyPrice: 0, currency: 'USD', highlights: '웹·앱 대화, 사용량 제한적' },
  { service: 'claude', name: 'Pro', monthlyPrice: 22, annualPrice: 220, currency: 'USD', highlights: 'Claude Code, 프로젝트, 리서치 포함', note: `연 결제 시 월 $18. ${CLAUDE_NOTE}` },
  { service: 'claude', name: 'Max', monthlyPrice: 110, currency: 'USD', highlights: 'Pro 사용량의 5배', note: CLAUDE_NOTE },
  { service: 'claude', name: 'Ultra', monthlyPrice: 220, currency: 'USD', highlights: 'Pro 주간 사용량의 10배', note: CLAUDE_NOTE },
  { service: 'google-ai', name: 'Google AI Plus', monthlyPrice: 7500, highlights: '무료 대비 사용량 2배, 저장 공간 400GB' },
  { service: 'google-ai', name: 'Google AI Pro', monthlyPrice: 29000, highlights: '무료 대비 사용량 4배, 저장 공간 5TB' },
  { service: 'google-ai', name: 'Google AI Ultra', monthlyPrice: 119000, pricePrefix: '최저', highlights: 'Pro 대비 사용량 5배 또는 20배, 저장 공간 20TB 이상', note: '20배 등급은 월 300,000원' },
  { service: 'netflix', name: '광고형 스탠다드', monthlyPrice: 7000, highlights: '광고 포함, 동시 2대, 1080p' },
  { service: 'netflix', name: '스탠다드', monthlyPrice: 13500, highlights: '광고 없음, 동시 2대, 1080p', note: '추가 회원 1명 월 5,000원' },
  { service: 'netflix', name: '프리미엄', monthlyPrice: 17000, highlights: '광고 없음, 동시 4대, 4K·HDR', note: '추가 회원 최대 2명, 1명당 월 5,000원' },
  { service: 'tving', name: '광고형 스탠다드', monthlyPrice: 5500, highlights: '광고 포함, 일부 콘텐츠 제한' },
  { service: 'tving', name: '베이직', monthlyPrice: 9500, highlights: '광고 없음, 공식 페이지 표기 조건 확인' },
  { service: 'tving', name: '스탠다드', monthlyPrice: 13500, highlights: '광고 없음, 공식 페이지 표기 조건 확인' },
  { service: 'tving', name: '프리미엄', monthlyPrice: 17000, highlights: '광고 없음, Apple TV 콘텐츠는 2026년 11월 23일 16시까지' },
  { service: 'wavve', name: '광고형 스탠다드', monthlyPrice: 5500, highlights: '광고 포함, 동시 2대, FHD' },
  { service: 'wavve', name: '베이직', monthlyPrice: 7900, annualPrice: 79000, highlights: '광고 없음, 동시 1대, HD, TV 불가' },
  { service: 'wavve', name: '스탠다드', monthlyPrice: 10900, annualPrice: 109000, highlights: '광고 없음, 동시 2대, FHD' },
  { service: 'wavve', name: '프리미엄', monthlyPrice: 13900, annualPrice: 139000, highlights: '광고 없음, 동시 4대, 최고화질' },
  { service: 'disney-plus', name: '스탠다드', monthlyPrice: 11500, annualPrice: 115000, highlights: '광고 없음, 동시 2대, 1080p', note: DISNEY_NOTE },
  { service: 'disney-plus', name: '프리미엄', monthlyPrice: 16500, annualPrice: 165000, highlights: '광고 없음, 동시 4대, 4K·HDR', note: DISNEY_NOTE },
  { service: 'ott-bundle', name: '티빙+웨이브 더블 광고형', monthlyPrice: 7000, highlights: '따로 결제 시 11,000원', note: '광고 포함' },
  { service: 'ott-bundle', name: '티빙+웨이브 더블 스탠다드', monthlyPrice: 15000, highlights: '따로 결제 시 24,400원' },
  { service: 'ott-bundle', name: '티빙+웨이브 더블 프리미엄', monthlyPrice: 19500, highlights: '따로 결제 시 30,900원' },
  { service: 'ott-bundle', name: '티빙+디즈니+ 더블', monthlyPrice: 18000, highlights: '따로 결제 시 23,400원' },
  { service: 'ott-bundle', name: '티빙+웨이브+디즈니+ 3 PACK', monthlyPrice: 21500, highlights: '따로 결제 시 34,300원' },
  { service: 'coupang-play', name: '광고형 무료', monthlyPrice: 0, highlights: '쿠팡 회원 무료, 광고 포함', note: '일부 콘텐츠는 와우 멤버십이나 패스 필요' },
  { service: 'nordvpn', name: '베이직', monthlyPrice: 3990, highlights: 'VPN, 장치 10대', note: `${NORD_NOTE}. 첫 결제 107,730원, 갱신 연 194,400원` },
  { service: 'nordvpn', name: '컴플리트', monthlyPrice: 4990, highlights: 'VPN과 안티바이러스, 비밀번호 관리자, 1TB', note: `${NORD_NOTE}. 첫 결제 134,730원, 갱신 연 306,000원` },
  { service: 'nordvpn', name: '컴플리트 Max', monthlyPrice: 7990, highlights: '컴플리트에 전용 IP 추가', note: `${NORD_NOTE}. 첫 결제 215,730원, 갱신 연 409,200원` },
]

export const deals = [
  { title: '티빙+웨이브 더블 스탠다드', service: 'ott-bundle', benefit: '월 9,400원 적게', conditions: '따로 결제하면 24,400원인 조합을 월 15,000원에 이용합니다. 공식 페이지의 기간 한정 표기 기준입니다.', startsAt: '2026-10-06', endsAt: '2027-01-31', officialUrl: 'https://www.tving.com/bill/subscription/plan' },
  { title: '티빙+웨이브+디즈니+ 3 PACK', service: 'ott-bundle', benefit: '월 12,800원 적게', conditions: '따로 결제하면 34,300원인 조합을 월 21,500원에 이용합니다. 공식 페이지의 기간 한정 표기 기준입니다.', startsAt: '2026-10-06', endsAt: '2027-01-31', officialUrl: 'https://www.tving.com/bill/subscription/plan' },
  { title: '티빙+디즈니+ 더블', service: 'ott-bundle', benefit: '월 5,400원 적게', conditions: '따로 결제하면 23,400원인 조합을 월 18,000원에 이용합니다. 공식 페이지의 기간 한정 표기 기준입니다.', startsAt: '2026-10-06', endsAt: '2027-01-31', officialUrl: 'https://www.tving.com/bill/subscription/plan' },
  { title: 'Pro 연간 결제', service: 'claude', benefit: '연 $44 절약', conditions: '월 결제 $22를 12번 내면 $264, 연간 선불은 $220입니다.', officialUrl: 'https://claude.com/ko/pricing' },
  { title: '스탠다드 12개월 이용권', service: 'wavve', benefit: '연 21,800원 절약', conditions: '월 10,900원을 12번 내면 130,800원, 12개월 이용권은 109,000원입니다.', officialUrl: 'https://www.wavve.com/voucher' },
  { title: '스탠다드 연간 멤버십', service: 'disney-plus', benefit: '연 23,000원 절약', conditions: '2026년 11월 10일 이후 신규 가입 요금 기준, 월 11,500원 12번은 138,000원이고 연간은 115,000원입니다.', officialUrl: 'https://help.disneyplus.com/ko/article/disneyplus-price' },
  { title: '블랙 프라이데이 컴플리트', service: 'nordvpn', benefit: '최대 80% 할인 +3개월', conditions: '2년 플랜 첫 27개월 134,730원입니다. 이후 연 306,000원으로 갱신된다고 공식 페이지에 표기되어 있습니다.', officialUrl: 'https://nordvpn.com/ko/pricing/' },
] as const

const link = (text: string, url: string) => ({ text, url })

export const posts: {
  slug: string
  title: string
  category: string
  hero: string
  summary: string
  hook: string
  services?: string[]
  related: string[]
  sources: { label: string; url: string }[]
  body: Block[]
}[] = [
  {
    slug: 'chatgpt-pricing',
    title: '챗GPT 요금제 비교: Go와 Plus 중 무엇을 고를까',
    category: 'ai',
    hero: 'student',
    summary: '가벼운 대화와 긴 메모리가 목적이면 월 13,000원 Go, 심층 리서치와 프로젝트를 자주 쓰면 월 29,000원 Plus가 맞습니다.',
    hook: '챗GPT 유료 요금제, 월 13,000원과 29,000원을 가르는 기준은 따로 있습니다.',
    services: ['chatgpt'],
    related: ['ai-plan-compare', 'chatgpt-cancel'],
    sources: [{ label: 'ChatGPT 플랜 및 가격', url: 'https://chatgpt.com/ko-KR/pricing/' }],
    body: [
      { h2: '요금제가 4개로 나뉜 이유' },
      { p: '개인용 챗GPT는 Free, Go, Plus, Pro로 나뉩니다. 차이는 메시지 양보다 어떤 도구를 얼마나 쓸 수 있는가에 있습니다.' },
      { p: '무료 요금제도 일상적인 대화는 할 수 있습니다. 다만 파일 업로드, 이미지 생성, 심층 리서치는 제한적으로만 제공됩니다.' },
      { img: 'ai', caption: '▲ 업로드나 리서치를 자주 쓴다면 무료 한도가 먼저 부족해집니다.' },
      { h2: 'Go는 이런 분께 맞습니다' },
      { p: 'Go는 월 13,000원입니다. 도구를 쓴 메시지와 업로드, 이미지 생성 한도가 늘고 메모리도 더 길어집니다.' },
      { p: '공식 안내에 따르면 이 요금제에는 광고가 포함될 수 있습니다. 광고가 신경 쓰인다면 결제 전에 확인해 보세요.' },
      { h2: 'Plus로 올릴 만한 경우' },
      { p: 'Plus는 월 29,000원으로 Go보다 16,000원 비쌉니다. 고급 추론 모델, 확장된 심층 리서치, 프로젝트, 예약 작업, 맞춤형 GPT가 추가됩니다.' },
      { ul: ['보고서나 자료 조사를 주 몇 차례 맡기는 경우', '프로젝트별로 자료를 묶어 두고 이어서 일하는 경우', 'Codex나 ChatGPT Work를 함께 쓰는 경우'] },
      { h2: 'Pro는 언제 필요할까' },
      { p: 'Pro는 Pro 100 월 159,000원, Pro 200 월 299,000원, Pro 500 월 790,000원 세 등급입니다. 대부분의 개인 사용자에게는 Plus 한도가 먼저 부족해지는지 확인한 뒤에 올려도 늦지 않습니다.' },
      { h2: '결제 전에 확인할 것' },
      { p: '개인용 요금제의 연간 결제는 공식 가격 안내에 나오지 않습니다. 그래서 월 결제로 시작해 한 달 사용량을 본 뒤 조정하는 편이 부담이 적습니다.' },
    ],
  },
  {
    slug: 'claude-pricing',
    title: '클로드 요금제 정리: Pro 연간 결제는 얼마나 저렴할까',
    category: 'ai',
    hero: 'ai',
    summary: '클로드 Pro는 월 결제가 $22, 연간 선불이 $220이라 1년을 쓴다면 연간 결제가 $44 저렴합니다.',
    hook: '클로드 Pro를 1년 쓸 생각이라면 결제 방식만 바꿔도 차이가 납니다.',
    services: ['claude'],
    related: ['ai-plan-compare', 'chatgpt-pricing'],
    sources: [{ label: 'Claude 플랜 및 요금제', url: 'https://claude.com/ko/pricing' }],
    body: [
      { h2: '요금은 달러로 표기됩니다' },
      { p: '공식 페이지의 개인 요금제는 Free $0, Pro $22, Max $110, Ultra $220입니다. 표기 금액에는 10% 부가세가 포함되어 있습니다.' },
      { p: '실제 원화 청구액은 카드사 환율과 수수료에 따라 달라질 수 있습니다. 이 사이트는 달러 요금을 환산하지 않고 그대로 보여 드립니다.' },
      { img: 'compare', caption: '▲ 달러 요금은 결제 시점의 환율에 따라 원화 금액이 달라질 수 있습니다.' },
      { h2: 'Pro 연간 결제 계산' },
      { p: '월 결제 $22를 12번 내면 $264입니다. 연간 선불은 $220이라 1년을 다 쓴다면 $44를 아낄 수 있습니다.' },
      { p: 'Max와 Ultra는 공식 표에 월간 결제만 나옵니다. 연간 할인을 기대하고 고르면 안 되는 요금제입니다.' },
      { h2: 'Pro, Max, Ultra의 차이' },
      { ul: ['Pro: Claude Code, 프로젝트, 리서치 포함', 'Max: 5시간 한도와 주간 한도가 Pro의 5배', 'Ultra: 주간 한도가 Pro의 10배, 인증된 계정은 5시간 한도 없음'] },
      { p: '모든 요금제에는 사용 한도가 있습니다. 대화 길이와 모델에 따라 한도에 닿는 속도가 달라지므로, Pro로 시작해 한도에 자주 걸릴 때 올리는 순서를 권합니다.' },
    ],
  },
  {
    slug: 'google-ai-pricing',
    title: '구글 AI 요금제 비교: Plus와 Pro, 저장 공간까지 따져 보기',
    category: 'ai',
    hero: 'family',
    summary: '구글 AI는 Plus 월 7,500원에 400GB, Pro 월 29,000원에 5TB를 줍니다. 저장 공간까지 쓰는 사람이라면 체감 가격이 달라집니다.',
    hook: '구글 AI 요금제는 AI만 보고 고르면 저장 공간 혜택을 놓칩니다.',
    services: ['google-ai'],
    related: ['ai-plan-compare', 'chatgpt-pricing'],
    sources: [
      { label: 'Google AI 요금제', url: 'https://one.google.com/about/google-ai-plans/' },
      { label: 'Gemini 구독', url: 'https://gemini.google/subscriptions/' },
    ],
    body: [
      { h2: '세 가지 유료 요금제' },
      { p: 'Google AI Plus는 월 7,500원, Pro는 월 29,000원, Ultra는 월 119,000원부터입니다. Ultra의 상위 등급은 월 300,000원입니다.' },
      { img: 'student', caption: '▲ 과제와 자료 정리에 함께 쓴다면 저장 공간도 비교 대상입니다.' },
      { h2: '저장 공간이 함께 늘어납니다' },
      { p: '무료 계정의 저장 공간은 15GB입니다. Plus는 400GB, Pro는 5TB, Ultra는 20TB 이상을 Gmail, 드라이브, 포토에서 함께 씁니다.' },
      { p: '사진과 문서 백업에 이미 비용을 내고 있다면, 그 금액까지 합쳐서 비교해 보세요.' },
      { h2: '가족과 나눠 쓸 수 있습니다' },
      { p: 'Google One 요금제 안내에는 최대 5명의 가족 구성원과 공유할 수 있다고 적혀 있습니다. 공유되는 혜택의 범위는 요금제와 국가에 따라 다르니 가입 전에 확인이 필요합니다.' },
      { h2: '해지와 환불' },
      { p: '공식 안내에 따르면 언제든 취소할 수 있지만, 관련 법규에서 요구하는 경우를 제외하면 남은 결제 기간은 환불되지 않습니다.' },
    ],
  },
  {
    slug: 'ai-plan-compare',
    title: '챗GPT·클로드·제미나이 월 요금 비교: 첫 유료 구독은 어디부터',
    category: 'ai',
    hero: 'compare',
    summary: '가장 낮은 유료 요금은 구글 AI Plus 7,500원, 챗GPT Go 13,000원, 클로드 Pro $22 순입니다. 첫 구독은 가격보다 이미 쓰는 도구를 기준으로 고르세요.',
    hook: '월 7,500원부터 시작하지만, 가장 싼 요금제가 답은 아닙니다.',
    services: ['chatgpt', 'claude', 'google-ai'],
    related: ['chatgpt-pricing', 'claude-pricing', 'google-ai-pricing'],
    sources: [
      { label: 'ChatGPT 플랜 및 가격', url: 'https://chatgpt.com/ko-KR/pricing/' },
      { label: 'Claude 플랜 및 요금제', url: 'https://claude.com/ko/pricing' },
      { label: 'Google AI 요금제', url: 'https://one.google.com/about/google-ai-plans/' },
    ],
    body: [
      { h2: '가장 낮은 유료 요금부터 보면' },
      { p: '구글 AI Plus는 월 7,500원, 챗GPT Go는 월 13,000원입니다. 클로드 Pro는 월 $22이고 연간 결제 시 월 $18입니다.' },
      { p: '세 서비스 모두 무료 요금제가 있습니다. 먼저 무료로 쓰면서 어디에서 한도가 막히는지 확인하는 것이 가장 돈이 덜 듭니다.' },
      { img: 'hero', caption: '▲ 결제 내역을 열어 겹치는 구독이 있는지 먼저 확인해 보세요.' },
      { h2: '이미 쓰는 도구로 고르는 법' },
      { ul: ['구글 드라이브와 Gmail을 많이 쓰고 저장 공간도 필요하다면 구글 AI', '이미지 생성과 다양한 도구를 한곳에서 쓰고 싶다면 챗GPT', 'Claude Code나 긴 문서 작업이 중심이라면 클로드'] },
      { p: '위 기준은 각 공식 요금표의 포함 기능을 바탕으로 한 제안입니다. 답변 품질은 쓰임새마다 다르니 무료 요금제로 같은 질문을 넣어 비교해 보세요.' },
      { h2: '겹치는 구독을 줄이는 방법' },
      { p: '두 AI를 같이 결제하고 있다면 한 달만 하나로 줄여 보세요. 불편한 일이 없었다면 그만큼 고정비를 아낀 셈입니다.' },
    ],
  },
  {
    slug: 'netflix-pricing',
    title: '넷플릭스 요금제 정리: 광고형 7,000원과 추가 회원 비용',
    category: 'ott',
    hero: 'family',
    summary: '넷플릭스는 광고형 7,000원, 스탠다드 13,500원, 프리미엄 17,000원입니다. 함께 살지 않는 사람과 나누려면 추가 회원 비용이 따로 듭니다.',
    hook: '넷플릭스 요금은 세 가지지만, 함께 쓰는 사람에 따라 계산이 달라집니다.',
    services: ['netflix'],
    related: ['ott-bundle-compare', 'netflix-cancel'],
    sources: [{ label: '넷플릭스 멤버십 및 요금', url: 'https://help.netflix.com/ko/node/24926' }],
    body: [
      { h2: '요금제 3가지' },
      { p: '광고형 스탠다드는 월 7,000원, 스탠다드는 월 13,500원, 프리미엄은 월 17,000원입니다. 연간이나 평생 멤버십은 제공되지 않고 매월 결제됩니다.' },
      { img: 'ott', caption: '▲ TV로 함께 본다면 동시 시청 대수와 화질이 요금제를 가릅니다.' },
      { h2: '광고형과 스탠다드의 차이' },
      { p: '두 요금제 모두 동시 2대, 1080p입니다. 광고 유무와 일부 콘텐츠 제한, 추가 회원 가능 여부가 다릅니다.' },
      { p: '광고가 크게 거슬리지 않고 보는 작품이 제한 대상이 아니라면 월 6,500원을 줄일 수 있습니다.' },
      { h2: '프리미엄이 필요한 경우' },
      { p: '4K와 HDR로 보거나 4대에서 동시에 볼 때 필요합니다. 집에 4K TV가 없고 동시에 보는 사람이 적다면 스탠다드로 충분할 수 있습니다.' },
      { h2: '함께 살지 않는 사람과 쓰려면' },
      { p: '넷플릭스 계정은 이용 가구 밖의 사람과 공유할 수 없습니다. 대신 스탠다드는 1명, 프리미엄은 최대 2명까지 추가 회원을 등록할 수 있습니다.' },
      { p: '추가 회원 요금은 광고형 멤버십 기준 1명당 월 4,000원, 광고 없는 멤버십 기준 1명당 월 5,000원입니다.' },
    ],
  },
  {
    slug: 'ott-bundle-compare',
    title: '티빙·웨이브·디즈니+ 묶음 요금, 따로 결제보다 얼마나 쌀까',
    category: 'ott',
    hero: 'ott',
    summary: '티빙과 웨이브 더블 스탠다드는 월 15,000원으로 따로 결제한 24,400원보다 9,400원 적습니다. 3 PACK은 12,800원 차이입니다.',
    hook: '같은 OTT를 묶음으로 결제하면 월 12,800원까지 차이가 납니다.',
    services: ['ott-bundle'],
    related: ['ott-annual-saving', 'netflix-pricing'],
    sources: [
      { label: '티빙 이용권', url: 'https://www.tving.com/bill/subscription/plan' },
      { label: '웨이브 이용권', url: 'https://www.wavve.com/voucher' },
      { label: '디즈니+ 멤버십과 구독료', url: 'https://help.disneyplus.com/ko/article/disneyplus-price' },
    ],
    body: [
      { h2: '묶음 상품별 절약액' },
      { ul: ['더블 스탠다드: 월 15,000원, 따로 결제 대비 9,400원 적음', '더블 프리미엄: 월 19,500원, 따로 결제 대비 11,400원 적음', '티빙+디즈니+: 월 18,000원, 따로 결제 대비 5,400원 적음', '3 PACK: 월 21,500원, 따로 결제 대비 12,800원 적음'] },
      { p: '따로 결제 금액은 티빙 공식 이용권 화면에 함께 표기된 값입니다. 일부 상품에는 2026년 10월 6일부터 2027년 1월 31일까지의 기간 한정 표기가 붙어 있습니다.' },
      { img: 'family', caption: '▲ 가족이 보는 서비스가 서로 다르다면 묶음 상품이 특히 유리합니다.' },
      { h2: '묶음이 손해인 경우' },
      { p: '세 서비스 중 실제로 보는 것이 하나뿐이라면 단품이 더 쌉니다. 웨이브 스탠다드만 쓴다면 월 10,900원으로 더블 스탠다드보다 4,100원 적습니다.' },
      { h2: '가입 전에 확인할 것' },
      { p: '디즈니+는 2026년 11월 10일부터 멤버십 정책이 바뀐다고 안내하고 있습니다. 이미 디즈니+를 구독 중이라면 번들을 결제할 때 요금이 중복될 수 있으니 기존 구독을 먼저 확인하세요.' },
      { p: '번들 해지나 변경은 구매한 곳에서 진행해야 합니다. 티빙에서 결제했다면 티빙에서 처리합니다.' },
    ],
  },
  {
    slug: 'ott-annual-saving',
    title: 'OTT 연간 결제, 월 결제보다 얼마나 아낄까 (웨이브·디즈니+)',
    category: 'ott',
    hero: 'hero',
    summary: '웨이브 스탠다드는 연 21,800원, 디즈니+ 스탠다드는 연 23,000원을 아낄 수 있습니다. 다만 넷플릭스에는 연간 멤버십이 없습니다.',
    hook: '연간 결제만 바꿔도 2만 원 넘게 차이 나는 OTT가 있습니다.',
    services: ['wavve', 'disney-plus'],
    related: ['ott-bundle-compare', 'subscription-cancel-checklist'],
    sources: [
      { label: '웨이브 이용권', url: 'https://www.wavve.com/voucher' },
      { label: '디즈니+ 멤버십과 구독료', url: 'https://help.disneyplus.com/ko/article/disneyplus-price' },
      { label: '넷플릭스 멤버십 및 요금', url: 'https://help.netflix.com/ko/node/24926' },
    ],
    body: [
      { h2: '서비스별 연간 절약액' },
      { ul: ['웨이브 베이직: 94,800원에서 79,000원으로 15,800원 절약', '웨이브 스탠다드: 130,800원에서 109,000원으로 21,800원 절약', '웨이브 프리미엄: 166,800원에서 139,000원으로 27,800원 절약', '디즈니+ 스탠다드: 138,000원에서 115,000원으로 23,000원 절약', '디즈니+ 프리미엄: 198,000원에서 165,000원으로 33,000원 절약'] },
      { p: '디즈니+ 금액은 2026년 11월 10일부터 신규 가입자에게 적용되는 공식 표기 요금입니다. 그 전에 가입했다면 기존 요금이 유지되는 경우가 있습니다.' },
      { img: 'receipt', caption: '▲ 월 결제액에 12를 곱해 연간 이용권 가격과 비교해 보세요.' },
      { h2: '연간 결제가 맞는 사람' },
      { p: '1년 내내 볼 서비스가 분명할 때만 유리합니다. 보고 싶은 작품이 끝나면 해지하는 편이라면 월 결제가 더 낫습니다.' },
      { h2: '연간 결제가 없는 서비스' },
      { p: '넷플릭스는 공식 안내에 연간 멤버십을 제공하지 않는다고 적혀 있습니다. 넷플릭스를 줄이려면 요금제를 낮추거나 잠시 해지하는 방법을 살펴보세요.' },
    ],
  },
  {
    slug: 'subscription-cancel-checklist',
    title: '구독 해지 전에 확인할 3가지: 결제처, 해지 시점, 환불 조건',
    category: 'cancel',
    hero: 'receipt',
    summary: '해지는 결제한 곳에서 다음 결제일 전에 해야 합니다. 앱을 지우는 것만으로는 해지되지 않고, 환불 조건은 서비스마다 다릅니다.',
    hook: '앱을 지웠는데 결제가 계속된다면, 해지 경로부터 잘못된 것입니다.',
    related: ['chatgpt-cancel', 'netflix-cancel'],
    sources: [
      { label: 'ChatGPT 구독 취소하기', url: 'https://help.openai.com/ko-kr/articles/7232927' },
      { label: '넷플릭스 해지 방법', url: 'https://help.netflix.com/ko/node/407' },
      { label: '티빙 이용권 유의사항', url: 'https://www.tving.com/bill/subscription/plan' },
    ],
    body: [
      { h2: '첫째, 어디서 결제했는지 확인하세요' },
      { p: '같은 서비스라도 웹, 앱스토어, 구글 플레이 중 어디서 결제했는지에 따라 해지 위치가 다릅니다. 카드 명세서의 결제처 이름을 보면 찾기 쉽습니다.' },
      { p: '챗GPT와 넷플릭스 모두 앱 삭제나 로그아웃만으로는 해지되지 않는다고 안내합니다.' },
      { img: 'cancel', caption: '▲ 앱을 지우기 전에 구독 관리 화면에서 해지 완료까지 확인하세요.' },
      { h2: '둘째, 다음 결제일 전에 해지하세요' },
      { ul: ['챗GPT: 다음 결제일 최소 24시간 전에 취소', '티빙: 결제 예정일 전날까지 신청, 이후에는 결제가 진행될 수 있음'] },
      { p: '해지해도 대개 이미 결제한 기간이 끝날 때까지는 계속 이용할 수 있습니다. 그래서 결제 직후에 해지해 두는 방법도 있습니다.' },
      { h2: '셋째, 환불 조건을 나눠서 보세요' },
      { ul: ['챗GPT: 취소해도 이미 결제한 요금이 자동으로 환불되지는 않음', '티빙: 7일 이내 사용 이력이 없으면 철회 가능, 그 외에는 사용 일수와 수수료를 뺀 금액 환불', '구글 AI: 관련 법규에서 요구하는 경우를 빼면 남은 기간 환불 없음'] },
      { p: '위 내용은 각 서비스의 공식 안내를 요약한 것입니다. 환불 여부는 결제 경로와 시점에 따라 달라질 수 있으니 고객센터에 확인해 보세요.' },
    ],
  },
  {
    slug: 'chatgpt-cancel',
    title: '챗GPT 구독 해지 방법: 웹, 아이폰, 구글 플레이별 경로',
    category: 'cancel',
    hero: 'compare',
    summary: '챗GPT는 구독한 곳에서 해지해야 하며, 다음 결제일 최소 24시간 전까지 끝내야 다음 달 요금이 나가지 않습니다.',
    hook: '챗GPT 해지 경로는 어디서 결제했느냐에 따라 세 갈래로 나뉩니다.',
    related: ['subscription-cancel-checklist', 'chatgpt-pricing'],
    sources: [{ label: 'ChatGPT 구독 취소하기', url: 'https://help.openai.com/ko-kr/articles/7232927' }],
    body: [
      { h2: '웹에서 결제했을 때' },
      { ol: ['ChatGPT에 로그인합니다.', '계정 메뉴에서 설정을 엽니다.', '결제를 선택합니다.', '플랜 취소에서 취소를 누릅니다.'] },
      { p: '메뉴가 보이지 않으면 다른 브라우저에서 같은 계정으로 다시 로그인해 보세요.' },
      { h2: '아이폰이나 아이패드에서 결제했을 때' },
      { ol: ['설정 앱을 엽니다.', '본인 이름을 누릅니다.', '구독을 선택합니다.', 'ChatGPT를 고르고 구독 취소를 누릅니다.'] },
      { p: '취소 버튼 없이 만료일만 보인다면 이미 취소된 상태일 수 있습니다.' },
      { img: 'cancel', caption: '▲ 앱스토어 구독은 챗GPT 앱이 아니라 휴대폰 설정에서 취소합니다.' },
      { h2: '구글 플레이에서 결제했을 때' },
      { ol: ['구글 플레이 스토어 앱을 엽니다.', '구독 메뉴를 엽니다.', 'ChatGPT를 고릅니다.', '구독 취소를 누르고 확인합니다.'] },
      { h2: '해지 후 달라지는 점' },
      { p: '취소하면 자동 갱신만 멈추고, 현재 결제 기간이 끝날 때까지는 유료 기능을 쓸 수 있습니다. 이미 결제한 요금은 자동으로 환불되지 않습니다.' },
      { p: '요금만 멈추려는 경우라면 계정을 삭제할 필요가 없습니다. 앱스토어 구독은 계정을 지워도 취소되지 않습니다.' },
    ],
  },
  {
    slug: 'netflix-cancel',
    title: '넷플릭스 해지 방법: 멤버십 페이지에서 3단계로 끝내기',
    category: 'cancel',
    hero: 'cancel',
    summary: '넷플릭스 해지는 멤버십 관리 페이지에서만 됩니다. 로그아웃이나 앱 삭제로는 요금이 멈추지 않습니다.',
    hook: '넷플릭스 앱을 지워도 요금은 계속 나갑니다. 해지 경로는 하나입니다.',
    related: ['subscription-cancel-checklist', 'netflix-pricing'],
    sources: [{ label: '넷플릭스 해지 방법', url: 'https://help.netflix.com/ko/node/407' }],
    body: [
      { h2: '해지 순서' },
      { ol: ['멤버십 관리 페이지로 이동합니다. 필요하면 먼저 로그인합니다.', '해지를 누릅니다.', '해지 아래의 해지 완료를 누릅니다.'] },
      { p: '끝나면 계정에 등록된 이메일로 확인 메일이 옵니다. 메일까지 받아야 마무리된 것입니다.' },
      { img: 'receipt', caption: '▲ 해지 후 다음 달 명세서에서 결제가 멈췄는지 확인해 보세요.' },
      { h2: '이것만으로는 해지되지 않습니다' },
      { p: '공식 안내에 따르면 계정 로그아웃이나 앱 삭제는 해지가 아닙니다. 해지 옵션이 보이지 않는다면 패키지나 다른 업체를 통해 결제하고 있을 수 있습니다.' },
      { h2: '해지 대신 고려할 것' },
      { p: '스탠다드에서 광고형으로 바꾸면 월 6,500원이 줄어듭니다. 잠깐 쉬려는 경우라면 고객 센터의 멤버십 일시정지 안내도 함께 확인해 보세요.' },
    ],
  },
  {
    slug: 'vpn-public-wifi',
    title: '공항·카페 와이파이에서 VPN 고르는 법: 첫 결제액보다 갱신가',
    category: 'vpn',
    hero: 'ai',
    summary: 'VPN은 월 환산가보다 첫 결제 총액과 갱신 금액을 봐야 합니다. NordVPN 컴플리트는 첫 27개월 134,730원, 이후 연 306,000원으로 표기되어 있습니다.',
    hook: '월 4,990원이라고 적힌 VPN, 2년 뒤 갱신 금액까지 봐야 합니다.',
    services: ['nordvpn'],
    related: ['subscription-cancel-checklist', 'ai-plan-compare'],
    sources: [{ label: 'NordVPN 가격', url: 'https://nordvpn.com/ko/pricing/' }],
    body: [
      { h2: 'VPN이 필요한 상황' },
      { p: 'VPN은 기기와 VPN 서버 사이의 통신을 암호화합니다. 비밀번호 없는 공용 와이파이를 자주 쓴다면 고려해 볼 만합니다.' },
      { p: '다만 VPN이 모든 위험을 막아 주지는 않습니다. 피싱 사이트에 직접 정보를 입력하면 VPN을 켜도 소용이 없습니다.' },
      { img: 'vpn', caption: '▲ 공항이나 카페의 공용 와이파이를 자주 쓴다면 보안 수단을 점검해 보세요.' },
      { h2: '가격표를 읽는 법' },
      { p: '월 환산 금액은 장기 선결제를 전제로 한 경우가 많습니다. 첫 결제 총액, 약정 기간, 갱신 금액을 함께 확인하세요.' },
      { ul: ['베이직: 첫 27개월 107,730원, 이후 연 194,400원', '컴플리트: 첫 27개월 134,730원, 이후 연 306,000원', '컴플리트 Max: 첫 27개월 215,730원, 이후 연 409,200원'] },
      { p: '공식 페이지 표기 기준이며 부가세가 추가될 수 있습니다. 세 요금제 모두 30일 이내 환불 보장이 안내되어 있습니다.' },
      { h2: '이 사이트가 다루지 않는 것' },
      { p: '해외 요금으로 구독료를 결제하려고 VPN을 쓰는 방법은 다루지 않습니다. 유튜브 프리미엄처럼 약관에 따라 멤버십이 해지될 수 있어 독자에게 손해가 될 수 있기 때문입니다.' },
    ],
  },
]

export const pages: { slug: string; title: string; description: string; body: Block[] }[] = [
  {
    slug: 'about',
    title: '사이트 소개',
    description: '핀다구독이 어떤 곳이고 어떤 기준으로 정보를 다루는지 안내합니다.',
    body: [
      { p: '핀다구독은 AI·OTT 구독의 공식 요금과 할인, 해지 방법을 정리하는 개인 운영 정보 사이트입니다.' },
      { h2: '각 서비스의 공식 사이트가 아닙니다' },
      { p: '이 사이트는 챗GPT, 클로드, 구글, 넷플릭스, 티빙, 웨이브, 디즈니+ 등 어떤 구독 서비스의 운영사와도 무관합니다. 서비스 이름은 정보 제공을 위해 표기하며, 각 상표의 권리는 해당 회사에 있습니다.' },
      { p: '결제, 해지, 환불 처리는 이 사이트에서 할 수 없습니다. 결제한 플랫폼의 고객센터로 문의해 주세요.' },
      { h2: '다루는 것' },
      { ul: ['공식 요금, 공식 프로모션, 연간 결제와 묶음 상품', '서비스별 해지와 환불 경로', '겜스고 공유 구독(반값 구독)의 월 환산가와 이용 방법'] },
      { p: [{ text: '반값 구독', url: '/half' }, '은 정식 요금제의 자리를 여러 명이 나눠 쓰는 겜스고 상품입니다. 각 서비스 약관과 다를 수 있으므로 주의 사항을 읽고 결정해 주세요. VPN으로 해외 요금을 결제하는 방법은 다루지 않습니다.'] },
      { h2: '사진 안내' },
      { p: '이 사이트의 인물과 생활 사진은 글의 상황을 보여 주기 위해 AI로 만든 연출 이미지입니다. 실제 이용자나 후기와는 관련이 없습니다.' },
      { p: [{ text: '문제가 생기면 문의 안내 페이지의 플랫폼 고객센터를 이용해 주세요.', url: '/contact' }] },
    ],
  },
  {
    slug: 'affiliate',
    title: '제휴 안내',
    description: '이 사이트의 제휴 링크와 수수료에 대해 안내합니다.',
    body: [
      { p: '이 사이트의 일부 링크는 제휴 링크입니다. 링크를 통해 가입하거나 구매하시면 운영자가 수수료를 받을 수 있으며, 이 때문에 방문자가 추가로 내는 금액은 없습니다.' },
      { h2: '제휴 링크 표시 방법' },
      { p: '제휴 링크에는 버튼 옆에 제휴 링크라고 표시합니다. 주황색 "반값 구독하기" 버튼은 모두 겜스고 제휴 링크입니다. 표시가 없는 링크는 공식 페이지로 바로 연결됩니다.' },
      { h2: '겜스고 제휴' },
      { p: '반값 구독 버튼으로 겜스고에서 구매하면 운영자가 구매 금액의 일부를 수수료로 받습니다. 주문, 환불, 접속 문제는 겜스고 고객센터가 처리하며 이 사이트는 관여하지 않습니다.' },
      { h2: '수수료가 내용에 미치는 영향' },
      { p: '요금 비교표의 기본 순서는 월 요금이 낮은 순입니다. 수수료 유무로 순서를 바꾸지 않습니다.' },
    ],
  },
  {
    slug: 'update-policy',
    title: '정보 갱신 기준',
    description: '가격 확인 날짜와 수정 방식을 안내합니다.',
    body: [
      { p: '모든 요금과 할인에는 공식 페이지에서 직접 확인한 날짜를 함께 적습니다.' },
      { h2: '확인 방법' },
      { ul: ['각 서비스의 공식 요금 페이지나 고객센터 문서에서 직접 확인합니다.', '달러 요금은 환산하지 않고 공식 표기 그대로 보여 드립니다.', '반값 구독 가격은 겜스고 상품 목록의 월 환산 최저가를 확인일과 함께 적습니다. 기간과 옵션에 따라 실제 결제액은 다릅니다.'] },
      { h2: '수정 방식' },
      { p: '요금이 바뀌면 값과 확인일을 함께 고칩니다. 종료일이 지난 할인은 이달의 할인에서 자동으로 빠집니다.' },
      { h2: '꼭 확인해 주세요' },
      { p: '요금은 사전 공지 후 바뀌거나 결제 경로에 따라 다를 수 있습니다. 결제 전에는 반드시 공식 페이지의 금액을 확인해 주세요.' },
    ],
  },
  {
    slug: 'privacy',
    title: '개인정보처리방침',
    description: '핀다구독의 개인정보 처리 기준입니다.',
    body: [
      { h2: '수집 항목과 목적' },
      { p: '이 사이트는 회원 가입과 문의 양식이 없으며 이름, 이메일 등 개인정보를 직접 받지 않습니다.' },
      { h2: '방문 분석과 쿠키' },
      { p: '이 사이트는 방문 통계를 위해 Google Analytics를 사용할 수 있으며, 이 과정에서 쿠키가 쓰일 수 있습니다. 브라우저 설정에서 쿠키를 차단할 수 있습니다.' },
      { h2: '제휴 링크' },
      { p: '제휴 링크를 누르면 어느 페이지에서 눌렀는지가 익명으로 기록됩니다. 이동한 사이트의 개인정보 처리에는 해당 사이트의 방침이 적용됩니다.' },
      { h2: '처리 위탁과 저장 위치' },
      { p: '사이트 운영과 데이터 저장에 Cloudflare 서비스를 이용합니다.' },
      { h2: '이용자의 권리와 문의' },
      { p: '이 사이트에 저장되는 개인정보가 없으므로 별도의 열람·삭제 절차를 두지 않습니다. 이동한 외부 사이트에서 제공한 정보는 해당 사이트의 절차로 처리해 주세요.' },
    ],
  },
  {
    slug: 'terms',
    title: '이용약관',
    description: '핀다구독 이용 조건입니다.',
    body: [
      { h2: '정보의 성격' },
      { p: '이 사이트의 내용은 일반 정보이며, 특정 서비스의 가입을 보장하거나 권유하지 않습니다. 요금과 조건은 언제든 바뀔 수 있습니다.' },
      { h2: '책임의 범위' },
      { p: '구독 서비스의 가입, 결제, 해지, 환불은 각 서비스와 이용자 사이의 계약입니다. 결제 전에는 공식 페이지의 조건을 확인해 주세요.' },
      { h2: '콘텐츠 이용' },
      { p: '이 사이트의 글과 이미지를 무단으로 복제해 배포할 수 없습니다. 링크 공유는 자유롭게 하셔도 됩니다.' },
      { h2: '약관 변경' },
      { p: '약관이 바뀌면 이 페이지에 반영합니다.' },
    ],
  },
]

export const navigation = {
  header: [
    { label: '반값 구독', url: '/half' },
    { label: '요금 비교', url: '/compare' },
    { label: '이달의 할인', url: '/deals' },
    { label: 'AI 구독', url: '/ai' },
    { label: 'OTT 구독', url: '/ott' },
    { label: '해지·환불', url: '/cancel' },
  ],
  footer: [
    { label: '사이트 소개', url: '/about' },
    { label: '제휴 안내', url: '/affiliate' },
    { label: '정보 갱신 기준', url: '/update-policy' },
    { label: '문의 안내', url: '/contact' },
    { label: '반값 구독', url: '/half' },
    { label: '개인정보처리방침', url: '/privacy' },
    { label: '이용약관', url: '/terms' },
    { label: '전체 글', url: '/posts' },
    { label: 'VPN', url: '/vpn' },
  ],
}

export { link }
