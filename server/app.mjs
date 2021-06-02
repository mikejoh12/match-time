import express from 'express'
import { router } from './routes/index.mjs'
import cors from 'cors'

import YAML from 'yamljs'
import swaggerUI from 'swagger-ui-express'
const swaggerDocument = YAML.load('./openapi.yaml')

const app = express()
import { port } from './config/config.mjs'

// Todo: secure cors settings
app.use(cors())

app.get('/', (req, res) => {
    res.send('Calendar-booking API is running.')
  })

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.use('/api', router)

app.listen(port, () => {
console.log(`Calendar-booking API listening at http://localhost:${port}`)
})