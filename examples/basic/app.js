import express from 'express'
import { json, urlencoded } from 'body-parser'
import schema from './schema.json'
import { validateRequest } from '../../lib'

const app = express()

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(validateRequest({ schema: schema }))
app.all('*', (req, res) => res.status(200).send())

export default app
