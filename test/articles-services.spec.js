const knex = require('knex');
const ArticlesServices = require('../src/article-services');

describe('Article services object', () => {
  let db;
  let testArticles = [
    {
      id: 1,
      date_published: new Date('2029-01-22T16:28:32.615Z'),
      title: 'First test post!',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?'
    },
    {
      id: 2,
      date_published: new Date('2100-05-22T16:28:32.615Z'),
      title: 'Second test post!',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, exercitationem cupiditate dignissimos est perspiciatis, nobis commodi alias saepe atque facilis labore sequi deleniti. Sint, adipisci facere! Velit temporibus debitis rerum.'
    },
    {
      id: 3,
      date_published: new Date('1919-12-22T16:28:32.615Z'),
      title: 'Third test post!',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, voluptate? Necessitatibus, reiciendis? Cupiditate totam laborum esse animi ratione ipsa dignissimos laboriosam eos similique cumque. Est nostrum esse porro id quaerat.'
    }
  ];
  before(() => {
    return (db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    }));
  });

  before(() => {
    return db('articles').truncate();
  });

  afterEach(() => db('articles').truncate());

  after(() => db.destroy());

  context('getAllArticles() when articles has data', () => {
    beforeEach(() => {
      return db('articles').insert(testArticles);
    });

    it('getAllArticles() returns correct array', () => {
      return ArticlesServices.getAllArticles(db).then(res => {
        expect(res).to.eql(testArticles);
      });
    });

    it('gets specific article', () => {
      return ArticlesServices.getById(db, 1).then(res => {
        expect(res).to.eql(testArticles[0]);
      });
    });

    it('deletes an article when deleteArticle() is called', () => {
      const artId = 3;
      return ArticlesServices.deleteArticle(db, 3).then(() => {
        ArticlesServices.getAllArticles(db).then(allArt => {
          const expected = testArticles.filter(art => art.id !== artId);
          expect(allArt).to.eql(expected);
        });
      });
    });

    it('updateArticle() updates an article', () => {
      const artId = 2;
      const updatedArt = {
        title: 'updated Title',
        content: 'lorem ipsum',
        date_published: new Date('1919-12-22T16:28:32.615Z'),
      }
      return ArticlesServices.updateArticle(db, artId, updatedArt)
        .then(() => ArticlesServices.getById(db,artId))
        .then(res=> {
          expect(res).to.eql({
            id: artId, 
            ...updatedArt,});
        });
      });
    });

  context('no data in database', () => {
    it('returns empty array', () => {
      return ArticlesServices.getAllArticles(db).then(res => {
        expect(res).to.eql([]);
      });
    });
    it('inserts an article and gives it an id', () => {
      const newArt = {
        title: 'Test new Article',
        content: 'new content test',
        date_published: new Date('2020-01-01T00:00:00.000Z')
      };
      return ArticlesServices.insertArticle(db, newArt).then(res => {
        expect(res).to.be.an('object');
        expect(res).to.eql({id: 1, ...newArt});
      });
    });
  });
});
