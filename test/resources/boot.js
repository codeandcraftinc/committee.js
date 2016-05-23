import app from './app'
const port = process.env.PORT || 3000
app.listen(port, console.log.bind(
  console,
  `[committee.js] server listening on port ${port}`
))
