const calculate = require('./calculate')

test('simple numbers test calculate/sum', () => {
    expect(calculate.sum(1,1)).toBe(2);
});

test('negative numbers test in calculate/sum', () => {
    expect(calculate.sum(-1,1)).toBe(0);
});

test('big numbers test in calculate/sum', () => {
    expect(calculate.sum(100000000000000,100000000000000)).toBe(200000000000000);
});

test('Concat Strings test in calculate/sum', () => {
    expect(calculate.sum("abc","1")).toBe("abc1");
});