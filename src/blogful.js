require('dotenv').config();
const knex = require('knex');
const ArticlesService = require('./article-services');

const db = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

ArticlesService.getAllArticles(db)
  .then(articles => console.log(articles))
  .then(() => {
    return ArticlesService.insertArticle(db, {
      title: 'New title',
      content: 'New content',
      date_published: new Date()
    });
  })
  .then(newArticle => {
    console.log(newArticle);
    return ArticlesService.updateArticle(db, newArticle.id, {
      title: 'Updated title'
    });
  })
  .then(article => {
    console.log(article);
    return ArticlesService.deleteArticle(db, article.id);
  });
