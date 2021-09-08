const request = require('supertest');
const app = require('./app.js');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

describe('POST /api/repos', () => {
  let mongo;

  beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
      await collection.deleteMany({});
    }
  });

  afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
  });

  describe('Create Repo', () => {
    test('should respond with a 200 status code', async () => {
      const response = await request(app).post('/api/repos').send({
        name: 'Repo Doe',
        repoIdentifier: 123,
      });
      expect(response.statusCode).toBe(200);
    });

    test('disallows tracking twice the same repo', async () => {
      const response = await request(app).post('/api/repos').send({
        name: 'Repo Doe',
        repoIdentifier: 123,
      });
      expect(response.statusCode).toBe(200);

      const response2 = await request(app).post('/api/repos').send({
        name: 'Repo Doe',
        repoIdentifier: 123,
      });
      expect(response2.statusCode).toBe(400);
    });

    test('should respond with a 400 error if name or repoIdentifier not given', async () => {
      const response = await request(app).post('/api/repos').send({});
      expect(response.statusCode).toBe(400);
      const expectedErrors = {
        errors: [
          { msg: 'Name is required', param: 'name', location: 'body' },
          {
            msg: 'Repo identifier is required',
            param: 'repoIdentifier',
            location: 'body',
          },
        ],
      };
      expect(response.text).toEqual(JSON.stringify(expectedErrors));
    });
  });

  describe('Get Repo List', () => {
    test('should respond with a 200 status code', async () => {
      const response = await request(app).get('/api/repos').send();
      expect(response.statusCode).toBe(200);
    });
  });
});
