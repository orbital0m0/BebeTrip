# GitHub Actions 가이드

이 문서는 BeBe Trip 프로젝트의 GitHub Actions 워크플로우 사용 방법을 설명합니다.

## 설정된 워크플로우

### 1. CI (Continuous Integration)

**파일**: `.github/workflows/ci.yml`

**트리거**:
- `main`, `develop` 브랜치에 푸시할 때
- `main`, `develop` 브랜치로 Pull Request 생성 시

**수행 작업**:
- **Backend Tests**: 
  - TypeScript 컴파일 검사
  - PostgreSQL 데이터베이스와 함께 테스트 실행
  - 의존성 설치 및 검증

- **Frontend Tests**:
  - TypeScript 컴파일 검사
  - ESLint 코드 품질 검사
  - 프로덕션 빌드 테스트
  - 의존성 설치 및 검증

### 2. Code Quality

**파일**: `.github/workflows/code-quality.yml`

**트리거**:
- Pull Request 생성 시

**수행 작업**:
- 백엔드/프론트엔드 코드 품질 검사
- TypeScript 타입 체크
- Linting

### 3. Deploy (템플릿)

**파일**: `.github/workflows/deploy.yml.template`

배포를 설정하려면:
1. 파일명을 `deploy.yml`로 변경
2. Docker Hub 또는 컨테이너 레지스트리 정보 수정
3. GitHub Secrets에 필요한 환경 변수 추가
4. 배포 대상 서비스에 맞게 스크립트 수정

## GitHub Secrets 설정

배포 워크플로우를 사용하려면 다음 Secrets를 설정해야 합니다:

### 필수 Secrets

1. **DOCKER_USERNAME**: Docker Hub 사용자 이름
2. **DOCKER_PASSWORD**: Docker Hub 비밀번호 또는 액세스 토큰

### Secrets 추가 방법

1. GitHub 저장소로 이동
2. Settings > Secrets and variables > Actions 클릭
3. "New repository secret" 버튼 클릭
4. Name과 Secret 값을 입력하고 저장

## 로컬에서 워크플로우 테스트

GitHub Actions를 로컬에서 테스트하려면 [act](https://github.com/nektos/act)를 사용할 수 있습니다:

```bash
# act 설치 (Windows - Chocolatey)
choco install act-cli

# CI 워크플로우 실행
act pull_request

# 특정 job만 실행
act -j backend-test
```

## 커밋 컨벤션

프로젝트는 다음과 같은 커밋 메시지 컨벤션을 권장합니다:

### 구조

```
<type>: <subject>

<body>

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

### Type 종류

- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 포맷팅, 세미콜론 누락 등 (코드 변경 없음)
- `refactor`: 코드 리팩토링
- `test`: 테스트 코드 추가
- `chore`: 빌드 업무, 패키지 매니저 설정 등
- `ci`: CI 설정 파일 수정

### 예시

```
feat: 숙소 검색 필터 기능 추가

- 월령별 편의용품 필터링
- 지역별 검색 기능
- 가격 범위 설정

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

## Branch 전략

### Main Branches

- **main**: 프로덕션 배포용 브랜치 (항상 배포 가능한 상태 유지)
- **develop**: 개발 통합 브랜치

### Supporting Branches

- **feature/\***: 새로운 기능 개발
- **fix/\***: 버그 수정
- **hotfix/\***: 긴급 버그 수정 (main에서 직접 분기)

### 워크플로우

1. `develop` 브랜치에서 `feature/기능명` 브랜치 생성
2. 기능 개발 및 커밋
3. Pull Request 생성 (`feature/기능명` → `develop`)
4. CI 통과 및 코드 리뷰 후 머지
5. `develop`이 안정화되면 `main`으로 머지
6. `main` 머지 시 자동 배포 (deploy 워크플로우 활성화 시)

## Pull Request 템플릿

Pull Request 생성 시 다음 템플릿을 사용하세요:

```markdown
## 변경 사항
<!-- 어떤 변경을 했는지 설명해주세요 -->

## 변경 이유
<!-- 왜 이 변경이 필요한지 설명해주세요 -->

## 테스트 방법
<!-- 이 변경사항을 어떻게 테스트했는지 설명해주세요 -->

## 스크린샷 (있다면)
<!-- UI 변경이 있다면 스크린샷을 첨부해주세요 -->

## 체크리스트
- [ ] 로컬에서 테스트 완료
- [ ] TypeScript 컴파일 에러 없음
- [ ] Linting 통과
- [ ] 관련 문서 업데이트 (필요시)
```

## 문제 해결

### CI 실패 시

1. **TypeScript 에러**: 로컬에서 `npm run build` 또는 `tsc --noEmit` 실행
2. **테스트 실패**: 로컬에서 `npm test` 실행
3. **의존성 문제**: `package-lock.json`이 최신 상태인지 확인

### 워크플로우 재실행

Actions 탭에서 실패한 워크플로우를 클릭하고 "Re-run jobs" 버튼을 클릭하면 재실행할 수 있습니다.

## 참고 자료

- [GitHub Actions 문서](https://docs.github.com/en/actions)
- [Docker Hub 문서](https://docs.docker.com/docker-hub/)
- [Conventional Commits](https://www.conventionalcommits.org/)
