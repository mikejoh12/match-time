const express = require('express')
const path = require('path');

require('./config/config')
require('./config/db')

const isProduction = process.env.NODE_ENV === 'production'

const passport = require('passport')
require('./config/passport')

const routes = require('./routes')
const morgan = require('morgan')
const rateLimit = require("express-rate-limit")
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))

if (isProduction) {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

const compression = require("compression")
app.use(compression())

// Add header security
const helmet = require("helmet")
app.use(helmet())

// Rate limiting
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 200 requests per windowMs
  message: "Too many requests in 15 minutes. Limit is 200."
});
app.use("/api/", rateLimiter);

app.use(passport.initialize())
app.use('/api', routes);

// Serve React static files
if (isProduction) {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
    
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// Improved error handling
app.use((error, req, res, next) => {
    console.log(error)
    res.status(error.status || 500).send({
    error: {
        status: error.status || 500,
        data: error.message || 'Internal Server Error',
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
