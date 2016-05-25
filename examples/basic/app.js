import express from 'express'
import { json, urlencoded } from 'body-parser'
import schema from './schema.json'
import { validateRequest } from '../../lib'

const app = express()

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(validateRequest({ schema: schema, strict: true }))
// app.get('/examples', (req, res) => res.json('list'))
// app.get('/examples/:id', (req, res) => res.json('read'))
// app.post('/examples', (req, res) => res.status(201).json('create'))
// app.patch('/examples/:id', (req, res) => res.json('update'))
// app.delete('/examples/:id', (req, res) => res.json('destroy'))
app.all('*', (req, res) => res.status(200).send())

export default app
