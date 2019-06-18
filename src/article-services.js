const ArticlesServices = {
  getAllArticles(db) {
    return db('articles').select('*');
  },
  insertArticle(db, newArticle) {
    return db('articles')
      .insert(newArticle)
      .returning('*')
      .then(res => res[0]);
  },

  getById(db, id) {
    return db('articles')
      .where('id', '=', id)
      .returning('*')
      .then(res => res[0]);
  },

  deleteArticle(db, id) {
    return db('articles')
      .where({ id })
      .delete();
  },

  updateArticle(db, id, updatedArt) {
    return db('articles')
      .where({ id })
      .update(updatedArt)
      .returning('*')
      .then(res => res[0]);
  }
};

module.exports = ArticlesServices;
