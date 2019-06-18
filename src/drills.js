require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

function nameContains(searchTerm) {
  knexInstance('shopping_list')
    .select('*')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(res => console.log(res))
    .finally(() => knexInstance.destroy());
}

function paginate(pageNumber) {
  const limit = 6;
  const offset = limit * (pageNumber - 1);
  knexInstance('shopping_list')
    .select('*')
    .limit(limit)
    .offset(offset)
    .then(res => console.log(res))
    .finally(() => knexInstance.destroy());
}

function addedAfter(daysAgo) {
  knexInstance('shopping_list')
    .select('*')
    .where(
      'date_added',
      '>',
      knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
    )
    .then(res => console.log(res))
    .finally(() => knexInstance.destroy());
}

function catCost() {
  knexInstance('shopping_list')
    .select('category')
    .sum('price AS total_price')
    .groupBy('category')
    .then(res => console.log(res));
}
