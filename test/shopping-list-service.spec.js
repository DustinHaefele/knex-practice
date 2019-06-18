const knex = require('knex');
const ShoppingService = require('../src/shopping-list-service');

describe('Shopping Service Tests', () => {
  let db;

  const testItems = [
    {
      id: 1,
      name: 'Not Dogs',
      price: '4.99',
      category: 'Snack',
      checked: true,
      date_added: new Date('1920-08-22T16:28:32.615Z')
    },
    {
      id: 2,
      name: 'Bluffalo Wings',
      price: '5.50',
      category: 'Snack',
      checked: false,
      date_added: new Date('1921-11-22T16:28:32.615Z')
    },
    {
      id: 3,
      name: 'SubstiTuna Salad',
      price: '1.24',
      category: 'Lunch',
      checked: false,
      date_added: new Date('1919-12-22T16:28:32.615Z')
    }
  ];

  before(() => {
    return (db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    }));
  });

  after(() => db.destroy());

  before(() => db('shopping_list').truncate());

  afterEach(() => db('shopping_list').truncate());

  context('database has data', () => {
    beforeEach(() => db('shopping_list').insert(testItems));

    it('should return test data with getShoppingItems()', () => {
      return ShoppingService.getShoppingItems(db).then(res => {
        expect(res).to.eql(testItems);
      });
    });

    it('deleteItem() should delete item at an id', () => {
      const testId = 2;
      return ShoppingService.deleteShoppingItem(db, testId).then(() => {
        const expected = testItems.filter(item => item.id !== testId);
        return ShoppingService.getShoppingItems(db).then(res => {
          expect(res).to.eql(expected);
        });
      });
    });

    it('updateItem() should update an item at an id', () => {
      const newProps = { name: 'Chicken Salad' };
      const expected = {
        id: 2,
        name: 'Chicken Salad',
        price: '5.50',
        category: 'Snack',
        checked: false,
        date_added: new Date('1921-11-22T16:28:32.615Z')
      };
      const itemId = 2;
      return ShoppingService.updateShoppingItem(db, itemId, newProps)
        .then(() => ShoppingService.getById(itemId))
        .then(res => {
          expect(res).to.eql(expected);
        });
    });
  });

  context('database is empty', () => {
    it('getShoppingItem() should return', () => {
      return ShoppingService.getShoppingItems(db).then(res => {
        expect(res).to.eql([]);
      });
    });

    it('addItem() adds expected item to table', () => {
      const newItem = {
        id: 5,
        name: 'chicken salad',
        date_added: new Date('1919-12-22T16:28:32.615Z'),
        category: 'Lunch',
        price: '10.99',
        checked: false
      };
      return ShoppingService.addShoppingItem(db, newItem).then(res => {
        expect(res).to.eql(newItem);
      });
    });
  });
});
