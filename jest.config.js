const jestConfig = {
  verbose: true,
  testURL: "http://localhost:5000/",
  testMatch: ['**/tests/*.js?(x)'],
  testEnvironment: "node"
}

module.exports = jestConfig