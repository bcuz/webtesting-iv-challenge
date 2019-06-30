const db = require('../data/dbConfig.js');

const Users = require('./usersModel.js');

describe('users model', () => {
  
  describe('insert()', () => {
    afterEach(async () => {
      // this function executes and clears out the table before each test
      await db('users').truncate();
    });

    it('should insert the provided users into the db', async () => {
      // this code expects that the table is empty, we'll handle that below
      // add data to the test database using the data access file
      await Users.insert({ name: 'adam' });
      await Users.insert({ name: 'adam' });

      // read data from the table
      const users = await db('users');

      // verify that there are now two records inserted
      expect(users).toHaveLength(2);
    });

  })

  describe('remove()', () => {

    it('should remove specific user by id', async () => {
      await Users.insert({ name: 'sam' });
      await Users.remove(1);
      const users = await db('users');

      expect(users).toHaveLength(0);
    });
  })

})