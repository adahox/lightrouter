# lightrouter

A faster way to build apis using nodejs.

## Dependencies

| Package           | version                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Express | ^4.17.2 |

## Installation

Install lightrouter package
```bash
  npm install --save ligthrouter
```

Add lightrouter package in your project
```javascript
const lightrouter = require('lightrouter');
```

At root project folder create route.js file and paste the code bellow
```javascript
module.exports = [
    {
        "/": [
            {
                "type":"post",
                "response": "{\"test\": \"working\"}"
            },
        ]
    },
];
```
You can also pass the path of a file as a value in the response attribute instead of a json object.

```javascript
module.exports = [
    {
        "/": [
            {
                "type":"post",
                "response": "path/to/file/js/without/extension"
            },
        ]
    },
];
```
So, let lightrouter build your route.js file  and see the magic.
```javascript
...
const { lightRoute } = require('../index');
const route = new lightRoute;

app.use('/', (req, res, next) => { next() }, route.build(path.join(__dirname, '..', 'routes.js')));
...
```

here is all the code 
```javascript
const path = require('path');
const express = require('express');
const { lightRoute } = require('../index');
const app = express();
const lightrouter = new lightRoute;

const routerFile = path.join(__dirname, '..', 'routes.js');

app.use('/', (req, res, next) => { next() }, lightrouter.build(routerFile) );

app.listen(3000, () => console.log('listening at port 3000'));
```
