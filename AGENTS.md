# Gomi's Golden Days 작업 규칙

## 기본 작업 규칙

- 모든 작업은 이 저장소 안에서만 한다.
- 모든 작업을 시작할 때 Git 상태, 현재 브랜치, 최신 `main`을 확인한다.
- 사용자가 만든 관련 없는 변경은 그대로 보존한다.
- 요청과 관계없는 코드의 디자인 변경이나 리팩터링은 하지 않는다.
- 사이트를 변경할 때는 Steve가 명시적으로 요청하지 않는 한 기존 랜딩 페이지를 유지한다.
- 변경 사항은 로컬에서 테스트한다. UI가 바뀌면 데스크톱과 모바일을 모두 확인한다.
- 게시하기 전에 미리보기를 보여 주거나, 미리보기와 검증 결과를 명확히 보고한다.
- Steve가 **“ㅇㅋ 커밋”**이라고 명시하기 전에는 커밋, 푸시, PR 생성·수정을 하지 않는다.
- Steve가 **“ㅇㅋ 병합”**이라고 명시하기 전에는 병합하거나 배포하지 않는다.
- Codex가 안전하게 처리할 수 있는 PowerShell, 경로, 인증, 반복적인 GitHub 작업은 Steve에게 맡기지 않는다.
- 인증 문제로 게시가 실제로 막혔을 때는 Steve가 해야 할 정확한 한 가지 행동만 안내한다. 추측에 기반한 여러 메뉴를 돌아다니게 하지 않는다.
- 병합 후에는 실제 공개 사이트를 확인하고 결과를 보고한다.
- Steve에게는 쉬운 한국어로, 짧게 진행 상황을 알리고 결과부터 말한다.
- GitHub Pages 호환성과 상대 경로 방식의 에셋 참조가 계속 작동하도록 한다.
- 홈페이지와 `/dog-age-calculator/`가 계산기 로직을 공유하므로, 관련 변경 시 두 페이지를 모두 검증하고 동작을 일관되게 유지한다.

## Steve와 작업할 때의 우선순위 원칙

1. 결론과 실제 우선순위를 먼저 말한다.
2. 트래픽 증가, 매출 증가, 리스크 감소, Steve의 시간 절약 효과를 기준으로 정렬한다.
3. 일반적인 베스트 프랙티스를 현재 단계의 실제 병목보다 앞세우지 않는다.
4. Codex가 저장소나 공개 사이트에서 안전하게 처리할 수 있는 것은 먼저 직접 실행한다.
5. 그다음 Steve의 로그인, 결제, 계정 권한, 판단이 필요한 일만 별도 체크리스트로 보여 준다.
6. 작업을 미루거나 삭제하거나 새 도구를 도입하거나 우선순위를 바꾸는 결정은 Codex가 임의로 하지 않는다. 근거와 선택지를 제시하고 Steve가 결정하게 한다.
7. 설명은 `결론 → 이유 → 다음 행동` 순서로 짧게 한다.
8. 이미 답이 있는 질문을 다시 묻지 않는다.
9. 기존에 정상 작동하는 디자인과 코드는 보존하고 필요한 부분만 수정한다.

## 반드시 피해야 할 실패 사례

이전 생태계 점검에서 UTM 추적을 P0처럼 다루어 약 30분을 소모했음. 그러나 Steve는 이미 Cloudflare Web Analytics를 사용하고 있었고, UTM은 현재 단계에서 SEO, 트래픽, 전환율을 직접 높이는 기능이 아니라 유입 경로를 더 세분화하는 계측 기능이었음.

앞으로 다음을 지킨다.

- Cloudflare Web Analytics가 이미 사용 중임을 전제로 판단한다.
- GA4나 UTM 같은 추가 측정 도구를 자동으로 상위 우선순위에 올리지 않는다.
- 정밀한 채널 귀속이 실제 의사결정에 필요해졌을 때만 Steve에게 선택지로 제시한다.

## 현재 Instagram 링크 구조

Steve의 현재 Instagram 외부 링크는 다음 3개이며, 별도 지시 전까지 이 역할을 유지한다.

1. Dog Age Calculator → 계산기 전용 페이지로 직접 이동
2. Golden Days Journal → 메인 랜딩페이지로 이동하고, 방문자가 스토리와 상품 설명을 본 뒤 Gumroad 또는 Etsy로 구매
3. YouTube → Gomi YouTube 채널로 이동

저널 링크를 마켓플레이스 직접 링크로 임의 변경하지 않는다.

## 현재 공개 사이트 상태

이 파일 갱신 시점의 기준 저장소와 사이트:

- 저장소: `gratefulenlightenment/gomisgoldendays`
- 공개 사이트: `https://gomisgoldendays.com/`
- 기준 `main`: `4cd0f24`

완료 및 검증된 내용:

- PR #5 병합 및 Cloudflare Pages 배포 완료
- 공개 경로 12개 HTTP 200 확인
- 데스크톱과 모바일의 페이지 전체 가로 넘침 없음
- 홈페이지와 전용 계산기 모두 정상 작동
- 기존 `#calculator` 앵커 정상 이동
- 랜딩페이지 영상 정상 재생
- 저널 CTA, 채널 구조화 데이터, Free Checklist CTA 반영
- `robots.txt`가 크롤링을 허용하고 sitemap을 지정
- `sitemap.xml`에 홈페이지, 계산기, Golden Walk, 필라 글, 하위 글, 소개 및 법적 페이지 포함
- 홈페이지에 Pinterest 도메인 인증 메타태그 존재

## Google Search Console 인계 — 2026-07-21

2026-07-21 최소 후속 조치 완료:

- `https://gomisgoldendays.com/sitemap.xml` 1회 재제출 성공
- 제출 및 마지막 읽은 날짜가 2026-07-21로 갱신됨
- 발견된 페이지가 11개에서 12개로 갱신됨
- `https://gomisgoldendays.com/golden-walk/`은 `발견됨 - 현재 색인이 생성되지 않음` 상태였음
- Golden Walk 색인 생성 요청을 1회만 수행했고 우선순위 크롤링 대기열 추가 확인
- `https://gomisgoldendays.com/` 홈페이지는 이미 Google 색인 등록 상태라 추가 요청하지 않음

Google은 Request Indexing의 정확한 일일 한도와 리셋 시각을 공개하지 않음. 따라서 다음 원칙을 적용한다.

- 동일 URL을 반복하여 대량 재요청하지 않는다.
- 제한이 풀렸는지 시험하기 위해 요청 버튼을 반복해서 누르지 않는다.
- URL 검사와 실제 `Request Indexing` 요청을 구분한다.
- 먼저 sitemap, robots, canonical, 내부링크, 공개 HTTP 상태를 점검한다.
- 여러 신규 또는 수정 페이지는 개별 요청보다 sitemap 재제출을 우선한다.

다음 Search Console 작업은 재요청이 아니라 상태 모니터링이다.

1. Golden Walk에 색인이 생성되었는지 나중에 URL 검사로 확인
2. 미색인 상태가 이어져도 같은 URL을 반복 요청하지 않음
3. 나머지 기존 페이지를 전부 개별 재요청하지 않음

Search Console 클릭은 Steve의 Google 계정 권한이 필요한 사용자 작업임. 인증된 브라우저가 연결되어 있고 Steve가 해당 작업을 명시적으로 승인한 경우에만 Codex가 대신 수행한다.

## Pinterest 인계 — 2026-07-21

계정 및 노출 차단 여부 점검 완료:

- 비즈니스 계정이며 Business type은 `Content creator`, 목표는 `Drive traffic to your site`
- `gomisgoldendays.com` 도메인 Claim 완료
- Instagram `@gomithesuperyorkie` 연결 및 자동 게시 활성화
- 프로필 비공개와 Search privacy 모두 꺼져 있음
- 공개 보드 3개, 공개 핀 9개, 예약 핀 1개 확인
- 기존 핀 대부분이 생성 후 10~21시간 이내이며 Pinterest 화면도 최초 48시간 통계를 실시간 추정치로 안내
- 표본 핀의 제목, 설명, HTTPS 목적지와 Pinterest UTM은 정상

따라서 노출 0의 주원인은 기술적 차단보다 신규 계정, 매우 짧은 경과 시간, 적은 핀 수로 판단한다. 성과를 보기 전에 같은 핀을 삭제하거나 반복 재게시하지 않는다.

1차 SEO 개선 완료:

- `Dog Age & Life Stages` 보드에 dog age, dog years, life stages, senior dog 키워드 설명 추가
- `Senior Dog Care` 보드에 mobility, routines, comfort, enrichment 키워드 설명 추가
- Instagram 자동 게시 보드 `Social`을 `Gomi the Yorkie | Golden Moments`로 변경하고 Yorkie 및 senior dog 설명 추가
- 2026-07-22 12:00에 `Dog Age & Life Stages` 보드용 핀 1개 예약 상태 확인

다음 Pinterest 작업은 새 핀의 노출 추이를 모니터링하면서 관련 보드별 원본 핀 재고를 늘리는 것이다.

Steve는 직접 작업량 최소화를 최우선으로 두므로 Instagram 자동 게시는 유지한다. 자동 게시물이 Pinterest 전용으로 완벽하게 최적화되지 않더라도 꾸준히 발행되는 편이 수동 작업을 요구해 발행이 중단되는 것보다 낫다. Pinterest 전용 원본 핀은 Codex가 처리할 수 있을 때 추가하는 보완 작업이며 Steve의 필수 반복 업무로 만들지 않는다.

## 외부 채널 배관 인계 — 2026-07-21

공개 채널 점검 결과:

- YouTube `@gomitv536`는 구독자 981명, 동영상 15개이며 공개 상태 정상
- YouTube 채널 첫 링크는 `/dog-age-calculator/` 직행을 유지하고 YouTube 채널 프로필 UTM을 추가했으며, 추가 링크로 메인 사이트, Instagram, Etsy가 존재
- 최신 Gomi Short `H6Ih9zpaZcU`는 설명과 고정 댓글에서 채널 첫 링크로 유도하며, 설명 안에 YouTube UTM과 `#calculator` 목적지가 존재
- YouTube Studio를 구독자 981명의 `Gomi's Golden Days` 채널로 전환 완료
- YouTube 계산기 및 메인 사이트 링크에 채널 프로필 UTM을 추가하고 링크 제목 대소문자를 정리한 뒤 공개 채널 반영 확인
- YouTube 채널 설명의 매년 바뀌는 `11-year-old`를 `senior Yorkshire Terrier`로 바꾸고 공개 채널 반영 확인
- Etsy 상품은 공개 및 구매 가능하고 이미지 8개, 상품 설명, About, 정책이 존재
- Etsy 상점 메인 사이트 링크를 `https://gomisgoldendays.com/?utm_source=etsy&utm_medium=marketplace&utm_campaign=shop_profile`로 교체하고 공개 상점 반영 확인
- Gumroad 상품은 공개 및 구매 가능하고 판매자 랜딩 디자인도 정상
- Gumroad 상품 설명의 `�almost Golden Moments`를 `✨ Golden Moments`로 수정하고 공개 페이지 반영 확인
- Gumroad Bio의 매년 바뀌는 `12 year old` 문구를 제거하고 지속형 브랜드 설명과 `gomisgoldendays.com` 추가
- Etsy 상품 설명의 `�almost Golden Moments`를 `✨ Golden Moments`로 수정하고 공개 상품 반영 확인
- Beehiiv 공개 구독 폼과 `/subscribe` 모달은 정상 로드되지만 게시물은 아직 0개
- Beehiiv 기본 Welcome Email이 활성화되어 있으며 신규 구독 직후 발송되도록 설정됨
- Welcome Email의 고정 나이 `Just past eleven`을 지속형 문구로 바꾸고, 실제 상품과 달랐던 `90-Day Journal`을 `93-page journal`로 수정한 뒤 저장 반영 확인
- Tiny Changes Checklist는 Google Drive의 `Gomi_Tiny_Changes_Checklist_USLetter.pdf`이며 142,520바이트 PDF, 링크 공유 `anyone reader` 상태 확인
- Beehiiv Automations는 Scale 이상 유료 기능이지만 현재 체크리스트 전달은 기본 Welcome Email로 완료되므로 업그레이드하지 않음
- Instagram `@gomithesuperyorkie` 공개 프로필과 로그인 편집 화면을 라이브 검증함
- Instagram Bio의 매년 바뀌는 `11-year-old`를 제거하고 DOB와 `Super Yorkie · senior dog life & tiny changes`를 유지한 뒤 공개 반영 확인
- Instagram 링크 3개는 계산기 UTM 직행, 메인 랜딩 UTM, Gomi YouTube 채널로 모두 정상
- Instagram 링크 제목 `Gomi’s Golden Day Journal`의 `Day`는 표시 오타지만 링크 목적지와 전환에는 영향 없고 웹에서는 링크 편집이 불가능하므로 Steve의 필수 모바일 작업으로 넘기지 않음

Etsy, Gumroad, YouTube, Beehiiv, Instagram의 1차 배관 수정과 공개 검증을 완료했다. 이후에는 신규 콘텐츠 발행과 채널별 노출·전환 모니터링을 우선한다.

## 현재 작업 우선순위 기준선

큰 항목을 보류, 삭제 또는 순서 변경하기 전에 Steve에게 결정받는다.

### P0 — 실제 유입 병목

1. Pinterest 구조 진단 및 1차 SEO 개선 완료
   - 신규 핀의 48시간 및 7일 노출 추이 모니터링
   - 관련 보드별 원본 2:3 핀 재고 확대
   - Instagram 자동 게시 유지 — Steve의 수동 작업을 요구하지 않음
2. Search Console 최소 후속 조치 완료 — Golden Walk 색인 상태만 추후 모니터링
3. 외부 채널 배관 1차 공개 점검 완료 — 위 로그인 순서대로 실제 수정

### P1 — 전환과 수익화

4. 저널 상품 페이지와 신뢰 요소 개선
5. Beehiiv 환영메일, 체크리스트 전달, 후속 이메일 흐름 점검
6. 원본 콘텐츠 하나를 Pinterest, Instagram, YouTube Shorts, Beehiiv로 재활용하는 공조 체계 구축

### P2 — 후속 최적화

7. AdSense 수익과 저널 전환 및 브랜드 경험의 상충을 비교한 뒤 도입 여부 결정
8. Steve가 더 정밀한 귀속 분석이 필요하다고 판단할 때만 UTM 또는 추가 분석 도구 도입

## 매 세션 종료 인계 형식

Codex 작업이 끝나면 다음 3개 섹션만 사용한다.

### Codex 완료

- 실제 수행하고 검증한 작업

### Steve가 할 일

- 계정 권한 또는 Steve 판단이 필요한 일만 효과 순으로 정리
- 가능한 경우 정확한 URL, 문구, 버튼 경로 제공

### 결정 필요

- Codex가 임의로 결정하면 안 되는 선택지만 기재

모바일 대화에서 우선순위, 계정 상태, 완료 작업 또는 다음 인계가 바뀌면 이 파일도 갱신한다.
