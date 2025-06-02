describe('Basic test setup', () => {
  test('Jest is working correctly', () => {
    expect(1 + 1).toBe(2)
  })

  test('TypeScript compilation works', () => {
    const message: string = 'Hello, TypeScript!'
    expect(message).toBe('Hello, TypeScript!')
  })
})
