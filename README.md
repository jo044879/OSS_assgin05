# Weekly Review

## Deployment

- **Vercel 배포 URL**: [배포 URL을 여기에 입력하세요](#)

---

## Key Learning

1. JavaScript로 DOM을 동적으로 생성하고 조작하는 방법
2. 배열 메서드(`push`, `filter`, `find`, `forEach`)를 활용한 데이터 관리
3. 이벤트 리스너를 통해 사용자 입력을 처리하고 화면을 실시간으로 갱신하는 흐름

---

## CRUD Service

### 구현 서비스
상품 관리 시스템 — 상품 정보를 추가, 조회, 수정, 삭제할 수 있는 웹 페이지

### 데이터 Field
| Field | 설명 |
|---|---|
| id | 상품 고유 번호 |
| productName | 상품명 |
| productNum | 상품번호 |
| price | 가격 |
| market | 매장명 |
| address | 배송지 |
| category | 카테고리 |

### 구현 방법
- **Create**: 입력 폼에서 값을 받아 `products.push()`로 배열에 추가 후 `render()` 호출
- **Read**: `render()` 함수에서 `forEach`로 배열을 순회하며 테이블 행을 동적 생성
- **Update**: 수정 버튼 클릭 시 폼에 기존 값을 채우고, 저장 시 `find()`로 해당 항목을 찾아 덮어씀
- **Delete**: `filter()`로 해당 id를 제외한 새 배열을 생성해 교체

---

## JavaScript

- `querySelector()` / `getElementById()` — DOM 요소 선택
- `addEventListener()` — 버튼 클릭 이벤트 처리
- `createElement()` / `appendChild()` — 동적으로 테이블 행 및 버튼 생성
- `Array.push()` — 새 상품 추가
- `Array.filter()` — 삭제 시 해당 항목 제거
- `Array.find()` — 수정 대상 항목 탐색
- `Array.forEach()` — 전체 목록 순회
- `render()` — 배열 상태를 기반으로 테이블을 전체 재렌더링

---

## AI / Search Usage

- **사용 목적**:
  - 개념 학습 — DOM 조작, 이벤트 처리, 배열 메서드 등 모르는 개념을 질문하며 이해를 높이는 용도로 활용
  - 반복 작업 — 여러 입력 필드의 유효성 검사 코드처럼 구조가 반복되는 부분 작성에 활용
- **적용 방식**: AI가 제안한 코드를 그대로 사용하지 않고, 원리를 이해한 뒤 직접 수정하여 적용
- **새롭게 이해한 내용**: `return;`과 `return false;`의 차이 — 유효성 검사 함수에서 `return;`은 `undefined`를 반환하므로 `!validate()`가 예상대로 동작하지 않을 수 있음

---

## Problem & Solution

| 문제 | 원인 | 해결 |
|---|---|---|
| 수정 후 저장 시 페이지가 새로고침됨 | `<button>`에 `type` 속성이 없어 기본값 `submit`으로 동작 | `type="button"` 명시 |
| Add 버튼을 눌러도 목록에 바로 반영 안 됨 | `clearForm()` 함수가 정의되지 않아 에러 발생, `render()` 미실행 | `clearForm()` 함수 추가 |

---

## Reflection

- `<button>` 태그 하나에도 `type` 속성이 없으면 의도치 않은 동작이 생긴다는 것을 직접 경험하며 배웠다.
- CRUD 흐름을 직접 구현해보니 데이터(배열)와 화면(DOM)을 분리해서 생각하는 것이 중요하다는 걸 느꼈다.
- `render()` 함수 하나로 화면 전체를 다시 그리는 패턴이 React 같은 프레임워크의 기본 원리와 연결된다는 점이 흥미로웠다.
