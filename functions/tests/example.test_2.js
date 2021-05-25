
const userA = {
  name: 'Heropy',
  age: 85
}
const userB = {
  name: 'Neo',
  age: 22,
}

test('데이터가 일치해야 합니다', () => {
  expect(userA.age).toBe(85)
  expect(userA).toEqual({
    name: 'Heropy',
    age: 85
  })
})

test('데이터가 일치하지 않아야 합니다', () => {
  expect(userB.name).not.toBe('Haropy')
  expect(userB).not.toBe(userA)
})