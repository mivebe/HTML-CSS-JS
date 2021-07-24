const cloneArray = require("./cloneArray")

test("properly clones an array", () => {
    const arr = ["ASD", "DSA"]
    expect(cloneArray(arr)).not.toBe(arr)
    expect(cloneArray(arr)).toEqual(arr)
})