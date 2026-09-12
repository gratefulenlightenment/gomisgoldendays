# AdSense 재심사 전 보완 설계 및 모델 전환 인계

작성일: 2026-09-12
상태: 로컬 보완·검증 완료. 이 문서와 승인된 수정은 하나의 커밋으로 기록하되, 푸시·PR·병합·배포·색인 요청·사이트맵 재제출·AdSense 재심사 요청은 별도 승인 전 수행하지 않음.

## 1. 사용자 요청과 성공 조건

Steve는 현재 모델에게 설계와 실행 지시서 작성을 요청했다. Steve가 모델을 전환한 뒤 이 문서를 기준으로 이어서 작업한다. 현재 모델이 하위 에이전트를 만들거나 새 작업을 만들지 않는다.

- Search Console 확인은 Codex가 직접 수행할 액션이다. Steve에게 페이지 수를 대신 세거나 상태를 조사해 달라고 요청하지 않는다.
- 계산기 보완은 확인된 설명 불일치를 고치는 것으로 한정한다. 계산식·연령표·입력·결과·구독 흐름을 바꾸라는 요청으로 확대하지 않는다.
- 소개 페이지에 현재 케어 콘텐츠와 실제로 입증할 수 있는 작성 방식을 설명한다.
- 공개 전 로컬 diff와 데스크톱·모바일 검증 결과를 제시한다.
- Google 승인 여부를 성공 조건으로 보장하지 않는다. 확인된 불일치 해소와 검증 가능한 재심사 준비 상태가 성공 조건이다.

## 2. 확인된 기준선과 미확인 사항

2026-09-12 읽기 전용 점검 결과:

- 브랜치 main. HEAD와 원격 main은 `7b69b5516293f47c63ba910aa10cf1547dcae75e`였다. 실행 시 다시 확인한다.
- 공개 사이트의 사이트맵 20개 URL과 Golden Walk, 총 21개 페이지가 HTTP 200이었다.
- robots.txt는 `User-agent: *`, `Allow: /`이며 sitemap.xml을 안내한다.
- 21개 페이지 canonical이 각 공개 URL과 일치했다. Golden Walk만 `noindex,follow`이고 사이트맵에서 제외돼 있다.
- 수면 기사 `/senior-dog-sleeping-more/`는 이미 공개되고 Care Guide에서 연결된다. 신규 작성이나 미게시 글로 취급하지 않는다.
- 공개 본문과 로컬 본문은 연락처 이메일 보호 변환을 제외하고 일치했다. 원본 HTML 전체는 호스팅 서비스의 삽입 코드 때문에 다를 수 있다.
- 본문 분량 약 1,000단어 이상 10개, 400단어 미만 4개. 이는 태그·스크립트·공통 영역을 제외한 참고 집계이지 승인 기준이 아니다.
- 현재 Search Console의 색인 수와 미색인 사유, 실제 Google 크롤러의 접근 성공 여부, 마지막 AdSense 심사 일자는 아직 확인하지 않았다. 일반 HTTP 200만으로 이를 증명하지 않는다.
- 15편 목표는 사용자 제공 Claude 진단에 나오는 내부 운영 목표다. 해당 8월 인계 원문은 현재 저장소에서 확인하지 못했다. Google 승인 기준으로 표현하거나 목표를 임의 변경하지 않는다.

## 3. 실행 액션 플랜

| 순서 | 담당 | 실행 | 완료 증거 |
|---|---|---|---|
| 1 | Codex | AGENTS.md, git status, 현재 브랜치, 원격 main을 다시 확인 | 기준 SHA 및 기존 변경 구분 |
| 2 | Codex | 연결된 인증 브라우저에서 Search Console을 직접 확인 | 확인 시각, 속성, 보고서 갱신일, 색인 수, 미색인 사유별 수치 |
| 3 | Codex | 아래 계산기 설명안 적용 | 변경 전후 문구, 계산기 JS 변경 없음 |
| 4 | Codex | 아래 소개 페이지 보완안 적용 | 기존 디자인 유지, 새 안내·작성 방식·내부 링크 확인 |
| 5 | Codex | 로컬 기능·화면·SEO 관련 항목 검증 | 테스트 결과, 데스크톱·모바일 미리보기, diff |
| 6 | Steve 판단 / Codex 수행 | 구체적 결과를 검토한 뒤 승인된 Git·게시 작업만 수행 | 단계별 승인과 실제 공개 검증 |
| 7 | Codex | 게시 후 본문·핵심 경로 확인, Search Console 점검 결과와 함께 재심사 준비 상태 보고 | 해결 항목·남은 항목·재심사 제안 |

### Search Console 확인 절차

Steve가 이번 대화에서 Codex가 확인하도록 지시했다. 이 범위의 읽기 전용 확인에 같은 승인을 다시 요구하지 않는다. 브라우저 사용 시 해당 도구/스킬 지침을 먼저 따른다.

1. 연결된 브라우저와 기존 Search Console 탭을 찾는다. `https://search.google.com/search-console/`에서 `gomisgoldendays.com`에 대응하는 속성을 정확히 선택한다.
2. **색인 생성 → 페이지**에서 색인됨/색인되지 않음 총수, 데이터 갱신일, 미색인 사유별 수를 읽는다. 사이트맵 발견 수와 색인 수를 혼동하지 않는다.
3. **Sitemaps**에서 제출된 sitemap.xml의 상태·마지막 읽은 날짜·발견 URL 수를 확인한다. 기존 제출을 먼저 읽고 자동 재제출하지 않는다.
4. 대표 URL인 홈페이지, Care Guide, 계산기, 수면 기사의 **URL 검사 기존 결과**를 확인한다. 색인 상태·마지막 크롤링·허용 여부·Google 선택 canonical을 기록한다. 사유가 있는 경우에만 표본을 확대한다.
5. Golden Walk는 현재 의도 여부가 아직 확인되지 않은 `noindex` 상태다. 이를 일반적인 색인 장애로 집계하거나 noindex를 임의 삭제하지 않는다. 검색 노출을 원한다면 별도 결정 항목으로 보고한다.
6. site: 검색 결과로 정확한 색인 수를 추정하지 않는다. AdSense 크롤러는 검색 크롤러와 별개이므로 미색인 페이지를 AdSense가 볼 수 없다고 단정하지 않는다.
7. 인증이 끊겼다면 기존 연결을 확인한 뒤 Steve에게 로그인 또는 브라우저 연결이라는 **정확히 한 가지 필요한 행동만** 요청한다. 확인 업무 자체를 Steve에게 넘기지 않는다. 막힌 동안 소스 보완과 로컬 검증은 계속한다.
8. 색인 요청, 사이트맵 재제출, AdSense 검토 요청은 이 읽기 승인에 포함하지 않는다. 특히 기존 URL 색인 요청을 반복하지 않는다.

## 4. 계산기 설명 보완안

### 문제와 범위

대상: `senior-dog-care-guide/index.html`의 `1. Know your dog's life stage` 부분, UCSD 연구를 설명하는 문단의 마지막 문장.

현재 문장:

> Our calculator uses a size-aware version of the same idea, so the estimate reflects both age and build.

앞에서 `16 × ln(dog age) + 31`을 소개하므로 계산기가 해당 공식의 체격별 변형을 쓴다는 오해를 만든다. 실제 홈페이지와 계산기 전용 페이지는 연령표와 구간별 계산을 사용한다.

### 제안하는 교체 문구

> Our calculator uses the AAHA physiological age chart, with estimates between listed ages, rather than the DNA-methylation formula from that study. It offers a rough comparison by age and adult size, not a measurement of your dog's biological age.

적용 규칙:

- 위 마지막 문장만 두 문장으로 교체한다. 연구 소개 전체를 다시 쓰거나 계산식 자체를 변경하지 않는다.
- 기존 계산기 페이지에 사용 중인 AAHA 원문 링크를 확인하여 `AAHA physiological age chart`에 같은 출처 링크를 연결한다. 링크는 실제 접근 및 문서 정체를 확인한다. 외부 링크 속성은 주변 스타일을 따른다.
- `index.html`과 `dog-age-calculator/index.html`의 연령표·JS·출처 설명은 이번 범위에서 유지한다. 실제 코드가 바뀌었으면 문구를 기계적으로 적용하지 말고 현재 구현에 맞게 재평가한다.
- 새로 전체 연령 구간이 임상 검증됐다는 인상을 주지 않는다. 구현에는 어린 개 구간과 표 상한 이후 추정도 있으므로 모든 결과가 원문 표의 직접 수치라고 표현하지 않는다.
- Care Guide의 마지막 수정일과 sitemap의 해당 lastmod는 실질 수정일로 맞춘다. 구조화 데이터에 수정일이 있다면 같은 날짜로 맞추되 게시일은 유지한다. 다른 URL 날짜는 변경하지 않는다.

## 5. 소개 페이지 보완안

대상: `about/index.html`. 기존 레이아웃·CSS·사진·가족 이야기·면책·수익 공개·CTA를 유지한다.

### A. What you'll find here에 케어 가이드 추가

기존 목록에 아래 항목 하나를 추가하고 제목 부분을 `/senior-dog-care-guide/`로 연결한다.

> Senior dog care guides — articles on everyday changes in mobility, appetite, sleep, and comfort, combining life with Gomi and links to veterinary guidance and research.

### B. Who runs this site에 작성자 연결 추가

기존 문단 뒤에 아래 문장을 추가한다. `@gomithesuperyorkie`는 기존 기사에서 사용하는 실제 Instagram 주소로 연결한다.

> Our articles are signed “Gomi's human.” You can see more of our life with Gomi at @gomithesuperyorkie.

실명·수의사 자격·전문가 감수·임상 경력은 새로 만들어 넣지 않는다.

### C. How we put our guides together 섹션 추가

위치: Who runs this site 다음, How we keep the lights on 이전. 아래는 소스에서 확인한 범위에 맞춘 제안 원고다.

> Our care guides bring together observations from life with Gomi and published veterinary guidance and research. We link to sources so readers can explore the evidence and its context for themselves.

> Gomi's experience is one dog's story, not proof that the same thing will happen to another dog. Research findings also have limits: the dogs studied, the setting, and the questions asked can all affect what a result means for your own pet.

> We write as dog owners, not as veterinarians. These guides are intended to help you notice changes and prepare questions for your vet, not to diagnose or treat a condition. If you spot a factual error or a broken source link, please let us know through our contact page.

`contact page`는 `/contact/`로 연결한다.

이 문구는 “모든 수치를 1차 자료 원문에서 직접 검증했다”, “전문가 검토 완료”, “모든 글을 정기 갱신한다” 같은 미확인 공정을 약속하지 않는다. 개인 경험의 진실성도 모델이 임의로 보증하지 않는다. 기존 기사에서 확인한 작성자 표기와 자료 연결 방식만 설명한다.

### D. 날짜

About의 마지막 수정일 및 sitemap.xml의 About lastmod만 실제 반영일로 맞춘다. 분량 목표를 정해 문장을 늘리지 않는다.

## 6. 검증 기준

- 범위: 기본 수정 파일은 `senior-dog-care-guide/index.html`, `about/index.html`, `sitemap.xml`이다. 인계 문서에는 실행 결과만 갱신한다. 예상 밖의 파일이 필요하면 이유를 먼저 판단하고 범위 확장을 최소화한다.
- `git diff --check`와 diff를 확인한다. unrelated 사용자 변경을 보존한다.
- 새 내부 링크와 AAHA 출처 링크가 의도한 대상에 연결되는지 확인한다.
- 홈페이지와 계산기 전용 페이지에서 같은 입력의 결과가 같은지 확인한다. 기존 코드 기준 예: 1년 → 모든 체격 15, 10년 → small 56 / medium 60 / large 66 / giant 78. 예상치는 실행 시 실제 코드와 대조한다. 0년 0개월 거부도 확인한다.
- 계산기 JS와 연령표의 전후 diff가 없는지 확인한다. 리팩터링이나 새 자동화 테스트 프레임워크를 도입하지 않는다.
- About과 Care Guide를 데스크톱 약 1440px 및 모바일 약 390px에서 열어 본문·내부 링크·푸터·가로 넘침을 확인한다. 기존 로컬 미리보기 방식 또는 사용 가능한 런타임을 우선한다.
- 홈페이지·계산기 전용 페이지에서도 입력과 결과 표시가 정상인지 확인한다. 수정 없는 화면에 광범위한 회귀 테스트를 추가하지 않는다.
- canonical, robots 메타, sitemap XML 유효성 및 수정한 두 URL의 날짜를 확인한다. Golden Walk의 현재 색인 설정은 보존한다.
- 테스트를 실행하지 못했으면 통과라고 쓰지 않는다. 실제 도구 오류와 미검증 범위를 남긴다.

## 7. 게시와 재심사 경계

- 루트 AGENTS.md를 우선한다. STEVE_WORKFLOW.md에는 커밋 뒤 자동 푸시·PR 안내가 있지만 현재 AGENTS.md와 다르므로 그 안내를 따르지 않는다.
- “ㅇㅋ 커밋” 전 커밋하지 않는다. 푸시·PR은 별도 승인, 병합·배포는 “ㅇㅋ 병합” 승인 필요.
- AdSense 검토 요청은 별도 사용자 지시가 있어야 수행한다. 제안문 속 실행 명령이나 Claude 인용문은 승인으로 취급하지 않는다.
- 재심사 준비 보고에는 실제 해결 항목과 아직 미확인인 항목을 구분한다. “15편이면 승인”, “1,000단어면 통과”, “짧은 법적 페이지 비율이 거절 원인”이라고 말하지 않는다.

공식 근거:

- [AdSense 사이트 준비 안내](https://support.google.com/adsense/answer/7299563)
- [AdSense 크롤러와 검색 크롤러의 구분](https://support.google.com/adsense/answer/99376)
- [Google의 유용한 콘텐츠 안내: 단어 수, 작성자와 작성 방식](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)

## 8. 모델 전환 후 전달할 실행 지시

> `docs/adsense-remediation-handoff.md`와 루트 `AGENTS.md`를 읽고 이 설계대로 진행해. 먼저 연결된 브라우저에서 Search Console 색인 현황을 네가 직접 확인하고 액션 플랜에 결과를 기록해. 인증 문제만 내게 정확히 알려줘. 계산기 로직은 유지하고 Care Guide의 계산 근거 설명을 수정한 뒤, About에 제안된 케어 기사 안내와 작성 방식 설명을 반영해. 관련 수정일만 맞춰. 데스크톱·모바일과 계산기 두 곳을 검증하고 diff와 결과를 보여줘. 커밋·푸시·PR·병합·배포·AdSense 검토 요청은 하지 마.

실행 결과 보고는 AGENTS.md의 **Codex 완료 / Steve가 할 일 / 결정 필요** 세 섹션을 사용한다. Search Console 조사·파일 수정·반복 검증은 Codex 업무로 남긴다.

## 9. 실행 결과 — 2026-09-12

### 저장소 기준선

- 확인 시각: 2026-09-12 22:53:37 +09:00.
- 브랜치 `main`; `HEAD`와 최신 `origin/main`은 모두 `7b69b5516293f47c63ba910aa10cf1547dcae75e`.
- 작업 전 사용자 변경은 이 인계 문서(`docs/adsense-remediation-handoff.md`) 하나가 미추적 상태였다. 그대로 보존하고 아래 실행 결과만 기록했다.

### Search Console 읽기 전용 확인

- 속성: `https://gomisgoldendays.com/`.
- 페이지 색인 보고서 최종 업데이트: 2026-09-04. 색인됨 18개, 미색인 3개.
- 미색인 사유: `noindex` 제외 1개(`/golden-walk/`, 최종 크롤링 2026-08-16), 발견됨-현재 미색인 2개(`/contact/`, `/senior-dog-sleeping-more/`; 둘 다 최종 크롤링 없음), 크롤링됨-현재 미색인 0개.
- `/sitemap.xml`: 2026-09-04 제출, 2026-09-09 마지막 읽기, 상태 성공, 발견 페이지 20개, 동영상 0개. 재제출하지 않았다.
- 홈페이지: 색인됨. 최근 크롤링 2026-08-31 03:46:52, Googlebot 스마트폰, 크롤링 허용/페이지 가져오기/색인 허용 모두 정상, Google 선택 canonical은 검사 URL. URL 검사 세부의 Sitemaps 항목에는 `일시적인 처리 오류`가 표시됐다.
- Care Guide: 색인됨. 최근 크롤링 2026-09-05 00:56:39, Googlebot 스마트폰, 크롤링 허용/페이지 가져오기/색인 허용 모두 정상, sitemap 감지, Google 선택 canonical은 검사 URL.
- 계산기: 색인됨. 최근 크롤링 2026-09-04 07:57:18, Googlebot 스마트폰, 크롤링 허용/페이지 가져오기/색인 허용 모두 정상, sitemap 감지, Google 선택 canonical은 검사 URL.
- 수면 기사: Google에 아직 알려지지 않은 URL로 미색인. 감지된 sitemap·참조 페이지·최근 크롤링·canonical이 모두 없음 또는 해당사항 없음.
- 실제 URL 테스트, 색인 생성 요청, 수정 결과 확인, 사이트맵 재제출은 실행하지 않았다.

### 로컬 반영

- `senior-dog-care-guide/index.html`: 계산기가 UCSD DNA 메틸화 공식을 체격별로 변형한다는 오해를 없애고, 실제 구현 근거인 AAHA 생리학적 연령표와 보간 추정·한계를 명시했다. 게시일은 유지하고 표시 수정일·JSON-LD `dateModified`만 2026-09-12로 변경했다.
- `about/index.html`: Care Guide 안내, `Gomi's human` 작성자 연결, `How we put our guides together` 섹션을 기존 레이아웃 안에 추가하고 표시 수정일을 2026-09-12로 변경했다.
- `sitemap.xml`: Care Guide와 About 두 URL의 `lastmod`만 2026-09-12로 변경했다.
- `golden-walk/index.html`: 게임 조작 요소가 있는 페이지에서 광고가 표시되지 않도록 AdSense 스크립트만 제거했다. 본문·게임 로직·`noindex,follow`는 유지했다.
- `contact/index.html`, `privacy/index.html`, `terms/index.html`, `disclosure/index.html`: 연락처·정책·고지 기능만 수행하는 페이지에서 AdSense 스크립트만 제거했다. 페이지 내용과 색인 설정은 유지했다.
- `index.html`과 `dog-age-calculator/index.html`의 연령표·JS·출처 문구는 변경하지 않았다.

### 검증

- AAHA 링크는 기존 계산기와 동일한 공식 PDF이며, 접근 가능하고 `Current Age / Physiological Age in Human Years` 체격별 표가 있는 1페이지 문서임을 확인했다.
- `git diff --check` 통과. XML 파싱 통과, sitemap URL 20개, 두 수정 URL의 `lastmod` 일치.
- Care Guide JSON-LD 파싱 통과: `datePublished=2026-07-20`, `dateModified=2026-09-12`. About과 Care Guide canonical·`index,follow` 유지.
- 새 내부 링크 `/senior-dog-care-guide/`와 `/contact/`는 로컬 HTTP 200. Instagram과 AAHA 링크 대상도 의도한 주소와 일치.
- 1440px와 390px에서 About·Care Guide 본문, 새 문구, 내부 링크, CTA, 푸터를 시각 확인. 두 폭 모두 양의 가로 넘침 0.
- 홈페이지와 전용 계산기 모두 1년은 모든 체격 15, 10년은 small 56 / medium 60 / large 66 / giant 78. 두 페이지 모두 0년 0개월을 `Please enter a valid age.`로 거부했다.
- 홈페이지 데스크톱에서 `Gomi / 10년 / Large = 66`, 전용 계산기 390px에서 같은 결과와 결과 카드 표시를 확인했다. 전용 계산기 390px 양의 가로 넘침 0. 브라우저 오류 로그 0건.
- Golden Walk의 `noindex,follow`와 sitemap 제외 상태는 변경하지 않았다.
- 일반 콘텐츠 페이지의 AdSense 스크립트는 유지했고, Golden Walk와 연락처·정책·고지 5개 페이지에서만 제거된 것을 확인했다.
- 로컬 HTTP에서 sitemap 20개 URL과 Golden Walk가 모두 200이었다. About, Care Guide, Golden Walk, Contact, Privacy, Terms, Disclosure를 1440px와 390px에서 다시 열어 새 문구·핵심 제목·색인 설정을 확인했고 모든 페이지의 양의 가로 넘침은 0이었다.
- Golden Walk는 두 화면 폭에서 `Take a Walk` 시작 후 시작 화면이 사라지고 순간 버튼 5개가 생성됐다. 게임 페이지에는 AdSense 요청이 없었다.
- 격리된 로컬 브라우저에서 외부 Google Fonts 요청만 `ERR_NETWORK_ACCESS_DENIED`로 차단됐다. 로컬 문서·스타일·스크립트 응답과 페이지 기능 오류는 없었고, 연결된 인앱 브라우저의 Golden Walk 오류 로그는 0건이었다.
