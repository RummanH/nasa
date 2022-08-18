const http = require('http');

require('dotenv').config();
const { loadLaunchData } = require('./models/launches.model');
const { loadPlanets } = require('./models/planets.model');
const app = require('./app');

const { mongoConnect } = require('./services/mongo');

const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

async function startServer() {
  await mongoConnect();
  await loadPlanets();
  await loadLaunchData();
  server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}....`);
  });
}

startServer();
