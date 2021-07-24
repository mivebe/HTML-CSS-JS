const subtract = require("./subtract")

test("proper subtraction on two numbers", () => {
    expect(subtract(1, 2)).toBe(-1)
})