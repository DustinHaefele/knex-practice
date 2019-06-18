require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});



function searchByProductName(searchTerm) {
  knexInstance('amazong_products')
    .select('*')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(res => console.log(res));
}

function pagnateProducts(page) {
  const productsPerPage = 10;
  const offset = productsPerPage * (page - 1 );
  knexInstance
    .select('*')
    .from('amazong_products')
    .limit(productsPerPage)
    .offset(offset)
    .then(res => console.log(res));
}

function getProductsWithImages() {
  knexInstance('amazong_products')
    .select('*')
    .whereNotNull('image')
    .then(res => console.log(res));
}

function mostPopularVideosForDays(days) {
  knexInstance('whopipe_video_views')
    .select('video_name', 'region')
    .count('date_viewed AS views')
    .where('date_viewed', '>', 
      knexInstance.raw(`now() - '?? days'::INTERVAL`, days)
    )
    .groupBy('video_name', 'region')
    .orderBy([
      { column: 'region', order: 'ASC' },
      { column: 'views', order: 'DESC' },
    ])
    .then(res => console.log(res));
}

mostPopularVideosForDays(30);

searchByProductName('holo');

pagnateProducts(2);

getProductsWithImages();
