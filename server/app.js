const express = require('express')
const YAML = require('yamljs')
const swaggerUI = require('swagger-ui-express')
require('./config/config')
const routes = require('./routes')
const morgan = require('morgan')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))

app.use('/api', routes);

// Document API with Swagger
const swaggerDocument = YAML.load('./openapi.yaml');
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

module.exports = app
