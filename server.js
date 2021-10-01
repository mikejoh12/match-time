const app = require('./app')
const { port } = require('./config/config.js')

app.listen(port, () => {
	console.log(`MatchTime API listening at http://localhost:${port}`);
});