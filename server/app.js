const express = require('express')
const YAML = require('yamljs')
const swaggerUI = require('swagger-ui-express')
require('./config/config')
const passport = require('passport')
require('./config/passport')
const routes = require('./routes')
const morgan = require('morgan')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))

app.use(passport.initialize())
app.use('/api', routes);

// Improved error handling
app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
    error: {
        status: error.status || 500,
        message: error.message || 'Internal Server Error',
    },
  })
})

// Document API with Swagger
const swaggerDocument = YAML.load('./openapi.yaml');
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

module.exports = app
