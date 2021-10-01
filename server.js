// Only require New Relic in production when env-variable is set
if (process.env.NEW_RELIC_APP_NAME) {
	require ('newrelic');
}

require('dotenv').config()

const app = require('./app')
const { port } = require('./config/config.js')

app.listen(port, () => {
	console.log(`MatchTime API listening at http://localhost:${port}`);
});