const { ResultBuilder, priorities } = require("../");
const assert = require("assert").strict;
const expectedResults = require("./expectation.json");

describe("Building result", function () {
	// Build a sample result builder & result set
	const sampleResultBuilder = new ResultBuilder();
	sampleResultBuilder.newTest("Test name")
		.setDescription("My test's sample description")
		.setTitle("User-friendly title")
		.setWeight(1)
		.setScore(1)
		.addRecommendation("Sample recommendation #1")
		.addRecommendation("Sample recommendation #2", {}, priorities.ISSUE)
		.addSnippet("<h1>Lorem Ipsum</h1>")
		.addTableRow(["Heading 1", "Heading 2", "Heading 3", ""])
		.addTableRow(["Value 1", "Value 2", "Value 3", "Value 4"]);

	const resultBuilder = new ResultBuilder();
	let workingTest = null;

	it("should start empty", function () {
		assert.equal(resultBuilder.getResultsTests().length, 0);
	});

	it("should be able to add a new entry", function () {
		// Complete the elements of the 1st test
		workingTest = resultBuilder.newTest("h1-heading");
		workingTest.setDescription("description 1")
			.setTitle("H1 headings")
			.setWeight(1)
			.setScore(1)
			.addRecommendation("zzzz")
			.addSnippet(" snippets 1")
			.addTableRow([
				"",
				"URL",
				"Resource Size",
				"Potential Savings"
			]);
		assert.equal(resultBuilder.getResultsTests().length, 1);
	});

	it("should keep test references internally", function() {
		resultBuilder.newTest("name-1");
		resultBuilder.newTest("name-2");
		assert.equal(resultBuilder.getResultsTests().length, 3);
	});

	it("should throw an error when a test already exists", function() {
		resultBuilder.newTest("name");
		assert.throws(() => { resultBuilder.newTest("name"); }, Error);
	});
	it("should return valid JSON results when calling ResultBuilder.toJson()", function () {
		assert.deepStrictEqual(JSON.parse(sampleResultBuilder.toJson()), expectedResults);
	});

	it("should return valid results when calling ResultBuilder.toArray()", function () {
		assert.deepStrictEqual(sampleResultBuilder.toArray(), expectedResults);
	});

	it("Should throw an error when Test.setWeight have invalid value, ", function () {
		assert.throws(() => { workingTest.setWeight("a string"); }, Error);
	});

	it("Should throw an error when Test.setScore have invalid value, ", function () {
		assert.throws(() => { workingTest.setScore("a string"); }, Error);
	});

	it("Should throw an error when Test.addRecommendation have invalid value", function () {
		assert.throws(() => { workingTest.addRecommendation(1); }, Error);
	});

	it("Should throw an error when Test.addSnippet have invalid value", function () {
		assert.throws(() => { workingTest.addSnippet(1); }, Error);
	});

	it("Should throw an error when Test.addTableRow have invalid value", function () {
		assert.throws(() => { workingTest.addTableRow("a string"); }, Error);
	});

	it("Should throw an error when the Test.addTableRow() method receives a row with a different number of columns than existing rows", function () {
		assert.throws(() => { workingTest.addTableRow([""]); }, Error);
	});
});
