const path = require('path');
const fs = require('fs');

const { parse } = require('csv-parse');

const planets = require('./planets.mongo');

function isHabitablePlanet(planet) {
  return (
    planet.koi_disposition === 'CONFIRMED' &&
    planet.koi_insol > 0.36 &&
    planet['koi_insol'] < 1.11 &&
    planet['koi_prad'] < 1.6
  );
}

function loadPlanets() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, '..', '..', 'data', 'exoplanet.csv')
    )
      .pipe(
        parse({
          comment: '#',
          columns: true,
        })
      )
      .on('data', async (data) => {
        if (isHabitablePlanet(data)) {
          savePlanets(data);
        }
      })
      .on('err', (err) => {
        console.log(err);
        reject(err);
      })
      .on('end', async () => {
        const countPlanets = (await getAllPlanets()).length;
        console.log(`${countPlanets} Habitable planets found `);
        resolve();
      });
  });
}

async function savePlanets(planet) {
  try {
    await planets.updateOne(
      {
        keplerName: planet.kepler_name,
      },
      { keplerName: planet.kepler_name },
      { upsert: true }
    );
  } catch (err) {
    console.log('There was an error inserting the planets data', err);
  }
}

async function getAllPlanets() {
  return await planets.find({}, { __v: 0 });
}

module.exports = {
  loadPlanets,
  getAllPlanets,
};
