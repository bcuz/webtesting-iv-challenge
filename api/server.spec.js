const request = require('supertest'); // calling it "request" is a common practice

const server = require('./server.js'); // this is our first red, file doesn't exist yet
const db = require('../data/dbConfig.js');
const Users = require('../users/usersModel.js');


describe('server.js', () => {
  it('should set the test env', () => {
    expect(process.env.DB_ENV).toBe('testing')
  })

  describe('get /users', () => {
    afterEach( async () => {
      await db('users').truncate();
    });

    it('should return no users', async () => {

      const response = await request(server).get('/users');

      expect(response.body).toEqual([]);
    }); 
    
    it('should return all users in db', async () => {
      const users = [
        { id: 1, name: 'adam' },
        { id: 2, name: 'sam' }
      ];

      await db('users').insert(users);

      const res = await request(server).get('/users');
      expect(res.status).toBe(200);
      expect(res.body).toEqual(users);
    }); 
  })

  describe('post /users', () => {
    afterEach( async () => {
      await db('users').truncate();
    });

    it('should return bad request status code for bad post to /users', async () => {
      const expectedStatusCode = 400;
      let body = {}

      // do a get request to our api (server.js) and inspect the response
      const response = await request(server).post('/users').send(body);

      expect(response.status).toEqual(expectedStatusCode);

    });
    
    it('should return a created status code for the /users route', async () => {
      const expectedStatusCode = 201;
      let body = { 
        "name": "bob"
      }

      // do a get request to our api (server.js) and inspect the response
      const response = await request(server).post('/users').send(body);

      expect(response.status).toEqual(expectedStatusCode);

    });

  })

  describe('delete /users/:id', () => {
    it('should show correct message when user is removed', async () => {
      await Users.insert({ name: 'bob' });

      let response = await request(server).del('/users/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'The user has been nuked' });
    }); 
    
    it('should show correct message when user doesnt exist', async () => {
      let response = await request(server).del('/users/3');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'The user could not be found' });
    }); 

  })

})