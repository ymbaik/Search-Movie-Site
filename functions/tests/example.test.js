import { asyncFn } from './example'
//done 매개변수는 비동기 테스트가 언제 종료되는지를 알려준다
describe('비동기 태스트', () => {
  //단순한 한줄의 키워드의 경우 콜백함수에서 중괄호{}와 return 키워드 생략가능하다
  // test('resolves', () => {
  //   return expect(asyncFn()).resolves.toBe('Done!')
  // })
  test('resolves', () => expect(asyncFn()).resolves.toBe('Done!'))

  //단순한 비동기 프로그램 생성
  test('async/await', async () => {
    const res = await asyncFn()
    expect(res).toBe('Done!')
  }, 7000)
})