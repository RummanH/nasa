const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connection.on('open', () => {
  console.log('successfully connected with MongoDB!');
});

mongoose.connection.on('error', (error) => {
  console.log('There was an error connection with the Database');
  console.log(error);
});

async function mongoConnect() {
  await mongoose.connect(process.env.MONGO_URL);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = { mongoConnect, mongoDisconnect };
