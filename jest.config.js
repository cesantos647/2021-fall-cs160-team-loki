const jestConfig = {
  verbose: true,
  testURL: "http://localhost:5000/",
  testMatch: ['<rootDir>/tests/*.js?(x)'],
  testEnvironment: "node",
  roots: ["./"]
}

module.exports = jestConfig