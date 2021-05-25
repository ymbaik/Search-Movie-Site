import { double } from './example'

//test('이름', 콜백함수)
//describe함수는 여러개의 test변수들을 묶어내는 그룹

describe('------------그룹1--------------', () => {
  beforeAll( () => {  //모든 프로그램 시작할 때 한번만 실행
    console.log('beforeAll!!')
  })
  afterAll( () => {  //모든 프로그램 끝날 때 한번만 실행
    console.log('afterAll!!')
  })

  beforeEach( () => { //각각 test 프로그램 시작할 때 한번만 실행
    console.log('beforeEach!!')
  })
  afterEach( () => {  //각각 test 프로그램 끝날 때 한번만 실행
    console.log('afterEach!!')
  })

  test('첫 테스트', () => {
    console.log('첫 테스트')
    expect(123).toBe(123)
  })
  
  test('인수가 숫자 데이터입니다', () => {
    console.log('인수가 숫자 데이터입니다')
    expect(double(3)).toBe(6)
    expect(double(10)).toBe(20)  
  })
  
  test('인수가 없습니다', () => {
    console.log('인수가 없습니다')
    expect(double()).toBe(0)
  })
})

//그룹2
describe('------------그룹2--------------', () => {
  beforeAll( () => {  //모든 프로그램 시작할 때 한번만 실행
    console.log('beforeAll!!')
  })
  afterAll( () => {  //모든 프로그램 끝날 때 한번만 실행
    console.log('afterAll!!')
  })

  beforeEach( () => { //각각 test 프로그램 시작할 때 한번만 실행
    console.log('beforeEach!!')
  })
  afterEach( () => {  //각각 test 프로그램 끝날 때 한번만 실행
    console.log('afterEach!!')
  })

  test('첫 테스트', () => {
    console.log('첫 테스트')
    expect(123).toBe(123)
  })
  
  test('인수가 숫자 데이터입니다', () => {
    console.log('인수가 숫자 데이터입니다')
    expect(double(3)).toBe(6)
    expect(double(10)).toBe(20)  
  })
  
  test('인수가 없습니다', () => {
    console.log('인수가 없습니다')
    expect(double()).toBe(0)
  })
})

const can = {
  name: 'pamplemousse',
  ounces: 12,
};

describe('the can', () => {
  test('has 12 ounces', () => {
    expect(can.ounces).toBe(12);
  });

  test('has a sophisticated name', () => {
    expect(can.name).toBe('pamplemousse');
  });
});

//toEqual methods
const can1 = {  //can1 객체데이터
  flavor: 'grapefruit',
  ounces: 12,
};
const can2 = { //can2 객체데이터
  flavor: 'grapefruit',
  ounces: 12,
};

describe('the La Croix cans on my desk', () => {
  test('have all the same properties', () => {
    expect(can1).toEqual(can2);
  });
  test('are not the exact same can', () => {
    expect(can1).not.toBe(can2);
  });
});


