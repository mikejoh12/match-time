import express from 'express'
import { router } from './routes/index.mjs'

const app = express()
const port = 5000

app.get('/', (req, res) => {
    res.send('Calendar-booking API is running.')
  })

app.use('/api', router)

app.listen(port, () => {
console.log(`Calendar-booking API listening at http://localhost:${port}`)
})