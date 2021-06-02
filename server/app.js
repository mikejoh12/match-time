const express = require('express')
const YAML = require('yamljs')
const swaggerUI = require('swagger-ui-express')

const swaggerDocument = YAML.load('./openapi.yaml');

const app = express()
const routes = require('./routes')
const config = require('./config/config')

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/api', routes);

module.exports = app
