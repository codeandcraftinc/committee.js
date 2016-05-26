# committee.js

## Usage

```js
import express from 'express'
import { validateRequest } from 'committee.js'
import schema from './schema.json'

const app = express()

app.use(validateRequest({ schema: schema }))
app.get('*', (req, res) => res.json('OK'))

app.listen(3000)
```

## Development

### Run Example Server

```sh
npm run serve
```

### Run Tests

```sh
npm test
```
