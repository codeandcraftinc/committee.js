import express from 'express'
import { json, urlencoded } from 'body-parser'
import { readFileSync } from 'fs'
import schema from './schema.json'
import { validateRequest } from './committee'

const app = express()

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(validateRequest({ schema: schema }))
app.get('/examples', (req, res) => res.json('list'))
app.get('/examples/:id', (req, res) => res.json('read'))
app.post('/examples', (req, res) => res.status(201).json('create'))
app.patch('/examples/:id', (req, res) => res.json('update'))
app.delete('/examples/:id', (req, res) => res.json('destroy'))
app.all('*', (req, res) => res.status(404).send())
app.use((err, req, res, next) => {
  console.log(err)
  console.log(err.stack)
  next(err)
})

export default app
