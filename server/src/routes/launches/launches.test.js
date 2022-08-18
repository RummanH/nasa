const request = require('supertest');

const app = require('../../app');
const { mongoConnect, mongoDisconnect } = require('../../services/mongo');

describe('Launch API', () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  // afterAll(async () => {
  //   await mongoDisconnect();
  // });

  describe('Test GET /launches', () => {
    test('It should response with 200 success', async () => {
      const response = await request(app).get('/api/v1/launches');
      expect(200);
    });
  });

  describe('Test POST /launch', () => {
    const completeLaunchData = {
      mission: 'Test Mission to DB',
      rocket: 'test rocket',
      target: 'Kepler-62 f',
      launchDate: 'January 4, 2028',
    };

    const launchDataWithoutDate = {
      mission: 'Test Mission to DB',
      rocket: 'test rocket',
      target: 'Kepler-62 f',
    };

    const completeDataWithInvalidDate = {
      mission: 'Test Mission to DB',
      rocket: 'test rocket',
      target: 'Kepler-62 f',
      launchDate: 'January',
    };

    test('It should respond with 201 success', async () => {
      const response = await request(app)
        .post('/api/v1/launches')
        .send(completeLaunchData)
        .expect('Content-Type', /json/)
        .expect(201);

      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(
        response.body.data.launch.launchDate
      ).valueOf();

      expect(responseDate).toBe(requestDate);
      expect(response.body.data.launch).toMatchObject(launchDataWithoutDate);
    });

    test('It should catch missing property', async () => {
      const response = await request(app)
        .post('/api/v1/launches')
        .send(launchDataWithoutDate)
        .expect('Content-Type', /json/)
        .expect(400)
        .expect('Content-Type', /json/);

      expect(response.body).toStrictEqual({
        status: 'fail',
        message: 'Please provide all values',
      });
    });

    test('It should catch invalid property', async () => {
      const response = await request(app)
        .post('/api/v1/launches')
        .send(completeDataWithInvalidDate)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        status: 'fail',
        message: 'Invalid Date',
      });
    });
  });
});
