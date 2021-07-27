# Result Builder library for Koalati tools
[![npm (scoped)](https://img.shields.io/npm/v/@koalati/result-builder)](https://www.npmjs.com/package/@koalati/result-builder)
[![GitHub CI Workflow status](https://github.com/koalatiapp/result-builder/workflows/CI/badge.svg)](https://github.com/koalatiapp/result-builder/actions)
[![Libraries.io dependency status for latest release, scoped npm package](https://img.shields.io/librariesio/release/npm/@koalati/result-builder)](https://www.npmjs.com/package/@koalati/result-builder)


A library that allows tool developers to easily build and format result sets in Koalati tools, using the validation format defined in Koalati's [contributor documentation](https://docs.koalati.com/docs/tools/formatting-results).


## Installation 
- Make sure [NodeJs](https://nodejs.org/en/) is installed
- Install the package using the `npm install` command
```
npm i result-builder
```

## Usage
Then, you can include it in your project and use like this
```javascript
const ResultBuilder = require('@koalati/result-builder')
//...
const resultsBuilder = new ResultBuilder(); 
const test = resultsBuilder.newTest('test-unique-name');
test.setTitle("my-title")
    .setDescription("my-description")
    .setWeight(0.5)
    .setScore(0.5)
    .addRecommendation("Optimize your images to reduce your page's weight by %savings%.", { "%savings%": "6%" })
    .addSnippet(["my-snippet"])
    .addTableRow([
        [
            "Table heading 1",
            "Table heading 2"
        ],
        [
            "Table value 1",
            "Table value 2"
        ]
    ])
// ... 
return resultsBuilder.getResultsTests(); 
```

## Classes and methods
### `ResultBuilder` (main class)
| Methods           | Descriptions                                               |
| :---------------- | :--------------------------------------------------------- |
| newTest(string)   | Allow to set up a new test by providing a test unique name |
| getResultsTests() | Allow to get all the list of all the recorded tests        |
| toJson()          | Convert the result to a JSON format                        |
| toArray()         | Convert all the results into an array                      |

### `Test` (utility class)
| Methods                             | Descriptions |
| :---------------------------------  | :------------------------------- |
| addRecommendation(`string`, `object = {}`) | Adds a recommendation indicating to the user improvements to be made. The first parameter is the recommendation's template message. The second argument is an object literal containing any dynamic values that should be substituted in the template (where the object's keys correspond to the placeholder it will replace).  |
| addSnippet(`string`\|[`ElementHandle`](https://pptr.dev/#?product=Puppeteer&version=main&show=api-class-elementhandle)) | Allows you to add code snippets from the results obtained.|
| addSnippets(`string[]`\|[`ElementHandle[]`](https://pptr.dev/#?product=Puppeteer&version=main&show=api-class-elementhandle)) | Allows you to add multiple code snippets from the results obtained.|
| addTableRow(`array`)                  | Adds a row to a data table. The first row will act as the table's header. Every row must have the same number of columns. |
| setTitle(`string`)                    | Defines a user-friendly title for the test. |
| setDescription(`string`)              | Defines a user-friendly description for the test. |
| setWeight(`number`)                   | Defines the weight of this test relative to others in the same tool. Only numbers between 0.0 and 1.0. |
| setScore(`float`)                     | Defines the score of this test. Only numbers between 0.0 and 1.0. |
| getTitle()                          | Returns the title of the test. |
| getDescription()                    | Returns the description of the test. |
| getWeight()                         | Returns the weight of the test. |
| getScore()                          | Returns the score of the test. |
| getSnippets()                       | Returns the list of snippets. |


## Authors
This was originally developed by [Papa Alioune FALL](https://github.com/ppalioune) in the Spring of 2021. 
This fork has been made to keep the library up-to-date, as Papa's has since completed his internship.
