const sum = require("./sum")

test("proper addition on two numbers", () => {
    expect(sum(1, 2)).toBe(3)
})