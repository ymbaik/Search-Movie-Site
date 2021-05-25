//코드 테스트를 하기 위해서는 외부로 데이터(데이터, 함수)를 내보낼 수 있도록 export 설정한다
export function double(num) {
  if (!num) {
    return 0
  }
  return num * 2
}