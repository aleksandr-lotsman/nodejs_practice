const sum = require('./sum');

test('adds 5 + 2 to equal 7', () => {
    const result = sum(5, 2);
    expect(result).toBe(7);
});