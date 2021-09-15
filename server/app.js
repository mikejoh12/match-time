const express = require('express')
const cors = require('cors')

require('./config/config')
const isProduction = process.env.NODE_ENV === 'production'

const passport = require('passport')
require('./config/passport')
const routes = require('./routes')
const morgan = require('morgan')
const rateLimit = require("express-rate-limit");

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))


const compression = require("compression")
app.use(compression())

// Add header security
const helmet = require("helmet")
app.use(helmet())

// Cors config
const origin = {
  origin: isProduction ? 'https://www.example.com' : '*',
}
app.use(cors(origin))

// Rate limiting
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 200 requests per windowMs
  message: "Too many requests in 15 minutes. Limit is 200."
});
app.use("/api/", rateLimiter);

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

// Document API with Swagger if not in production
if (!isProduction) {
  const YAML = require('yamljs')
  const swaggerUI = require('swagger-ui-express')
  const swaggerDocument = YAML.load('./openapi.yaml');
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
}

module.exports = app
