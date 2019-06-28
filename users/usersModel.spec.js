const db = require('../data/dbConfig.js');

const Users = require('./usersModel.js');


describe('users model', () => {
  afterEach(async () => {
    // this function executes and clears out the table before each test
    await db('users').truncate();
  });

  describe('insert()', () => {

    it('should insert the provided hobbits into the db', async () => {
      // this code expects that the table is empty, we'll handle that below
      // add data to the test database using the data access file
      await Users.insert({ username: 'adam' });
      await Users.insert({ username: 'sam' });

      // read data from the table
      const users = await db('users');

      // verify that there are now two records inserted
      expect(users).toHaveLength(2);
    });

  })

})