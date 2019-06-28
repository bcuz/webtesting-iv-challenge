const request = require('supertest'); // calling it "request" is a common practice

const server = require('./server.js'); // this is our first red, file doesn't exist yet

describe('server.js', () => {
  it('should set the test env', () => {
    expect(process.env.DB_ENV).toBe('testing')
  })

  describe('get /users', () => {
    it('should return no users', async () => {

      const response = await request(server).get('/users');

      expect(response.body).toEqual([]);
    }); 
  })

})