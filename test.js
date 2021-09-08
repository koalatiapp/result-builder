const priorities = require("./priorities");

class Test {
	constructor(uniqueName, title = "", description = "", weight = null, score = null) {
		this.uniqueName = uniqueName;
		this.title = title;
		this.description = description;
		this.weight = weight;
		this.score = score;
		this.recommendations = [];
		this.snippets = [];
		this.table = [];
	}

	setTitle(title) {
		if (typeof title !== "string") {
			throw new Error("Invalid value for title: must be a string.");
		}

		this.title = title;

		return this;
	}

	setDescription(description) {
		if (typeof description !== "string") {
			throw new Error("Invalid value for description: must be a string.");
		}

		this.description = description;

		return this;
	}

	setWeight(weight) {
		if (typeof weight !== "number" || weight < 0 || weight > 1) {
			throw new Error("Invalid value for weight: must be a number between 0 and 1.");
		}

		this.weight = weight;

		return this;
	}

	setScore(score) {
		if (typeof score !== "number" || score < 0 || score > 1) {
			throw new Error("Invalid value for score. must be a number between 0 and 1.");
		}

		this.score = score;

		return this;
	}

	getTitle() {
		return this.title;
	}

	getDescription() {
		return this.description;
	}

	getWeight() {
		return this.weight;
	}

	getScore() {
		return this.score;
	}

	getRecommendations() {
		return this.recommendations;
	}

	getSnippets() {
		return this.snippets;
	}

	/**
	 * @param {string} template
	 * @param {object} parameters
	 * @param {string|null} priority
	 */
	addRecommendation(template, parameters = {}, priority = null) {
		if (typeof template != "string") {
			throw new Error ("The recommendation template must be a string.");
		}

		const availablePriorities = Object.values(priorities);
		if (priority !== null && availablePriorities.indexOf(priority) == -1) {
			throw new Error (`The recommendation priority must be null, or one of the following values: ${availablePriorities.map(str => `"${str}"`).join(", ")}. Found "${priority}".`);
		}

		if (!parameters) {
			parameters = [];
		}

		if (typeof parameters != "object" || parameters.constructor != Object) {
			throw new Error ("The recommendation parameters must be an object literal.");
		}

		this.recommendations.push([template, parameters, priority]);

		return this;
	}

	addSnippet(snippet) {
		if (typeof snippet != "string" && snippet.constructor.name !== "ElementHandle") {
			throw new Error ("Invalid value for snippet: must be a string or an ElementHandle.");
		}

		this.snippets.push(snippet);

		return this;
	}

	addSnippets(snippets) {
		for (const snippet of snippets) {
			this.addSnippet(snippet);
		}

		return this;
	}

	addTableRow(table) {
		if (!Array.isArray(table)) {
			throw new Error ("The provided 'table' parameter must be an array.");
		}

		const firstRowColumnCount = typeof this.table[0] == "undefined" ? null : this.table[0].length;
		if (firstRowColumnCount !== null && table.length != firstRowColumnCount) {
			throw new Error(
				"Every row in the table should have the same number of columns. This row has %rowCount columns; %expectedCount are expected."
					.replace("%rowCount", table.length)
					.replace("%expectedCount", firstRowColumnCount)
			);
		}

		this.table.push(table);

		return this;
	}
}

module.exports = Test;
