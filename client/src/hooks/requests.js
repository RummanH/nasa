import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1';

async function httpGetPlanets() {
  const { data } = await axios.get(`${API_URL}/planets`);
  return data.data.planets;
}

async function httpGetLaunches() {
  const { data } = await axios.get(`${API_URL}/launches`);
  return data.data.launches.sort((a, b) => {
    return a.flightNumber - b.flightNumber;
  });
}

async function httpSubmitLaunch(launch) {
  try {
    return await axios.post(`${API_URL}/launches`, JSON.stringify(launch), {
      headers: {
        'content-type': 'application/json',
      },
    });
  } catch (err) {
    console.log(err.response);
    return {
      data: false,
    };
  }
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.

  try {
    return await axios.delete(`${API_URL}/launches/${id}`);
  } catch (err) {
    console.log(err);
    return { data: false };
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
