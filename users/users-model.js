const db = require('../database/dbConfig');

module.exports = {
  del,
  find,
  findById,
  update,
  updateWasher,
  findByWasherId,
  getUserCars,
  getAvailableWashers,
};

function find() {
  return db('users').select('*');
}

function findById(id) {
  return db('users').where({ id }).first();
}

function del(id) {
  return db('users').where({ id }).del();
}

function update(id, changes) {
  return db('users')
    .where({ id })
    .update(changes, '*')
    .then((user) => user);
}
function findByWasherId(washerId) {
  return db('washers').where({ washerId }).first();
}
async function updateWasher(washerId, changes) {
  const [updatedWasher] = await db('washers')
    .where({ washerId })
    .update(changes, '*');
  return updatedWasher;
}

function getUserCars(id) {
  return db('cars').where({ clientId: id });
}

// see available washers in the selected city
function getAvailableWashers(city) {
  return db('users')
    .where(function () {
      this.where(db.raw('LOWER("city") = ?', city)) // removes case sensitivity from city
        .andWhere('accountType', '=', 'washer');
    })
    .join('washers', { id: 'userId' })
    .where({ workStatus: true });
}
