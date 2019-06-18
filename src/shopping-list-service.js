const ShoppingService = {
  getShoppingItems(db) {
    return db('shopping_list').select('*');
  },

  addShoppingItem(db, newItem) {
    return db('shopping_list')
      .insert(newItem)
      .returning('*')
      .then(res => res[0]);
  },

  getById(db, id) {
    return db('shopping_list')
      .select('*')
      .where({ id })
      .returning('*')
      .then(res => res[0]);
  },

  deleteShoppingItem(db, id) {
    return db('shopping_list')
      .where({ id })
      .delete();
  },

  updateShoppingItem(db, id, updatedData) {
    return db('shopping_list')
      .where({ id })
      .update(updatedData)
      .returning('*')
      .then(res=>res[0]);
  }
};

module.exports = ShoppingService;
