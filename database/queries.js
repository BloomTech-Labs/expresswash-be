const knex = require("./dbConfig.js");

module.exports = {
  getAllUsers() {
    return knex("users");
  },

  getNewUser() {
    return knex("users");
  },

  insertUserPG(user) {
    return knex("users").insert(user);
  },

  singleUserForLogin(email) {
    return knex("users").where("email", email);
  },

  getCarMakes() {
    return knex("cars")
      .select("make")
      .count()
      .groupBy("make")
      .orderBy("make", "asc");
  },

  getCarModelsForMake(make) {
    return knex("cars").where({ make }).select("carId", "model");
  },

  myCars(id) {
    return knex("clientCars")
      .where({ id })
      .select("carId", "color", "licensePlate");
  },

  addACar(clientCar) {
    return knex("clientCars").insert(clientCar);
  },

  getLatestReviewOfWasher(id) {
    return knex("ratingsOW").first().where({ id });
  },

  getLatestReviewOfClient(id) {
    return knex("ratingsOC").first().where({ id });
  },

<<<<<<< HEAD
  getLatestJobClient(clientId) {
    return knex("jobs")
      .where({ clientId })
      .orderBy("creationDate", "desc")
      .first();
  },

  addNewJob(newJob) {
    return knex("jobs").insert(newJob);
  },

  seeAvailableJobs() {
    return knex("jobs").where("washerId", null);
  },

=======
>>>>>>> 920188c3572402d23bfc426565a8b61f068d4042
  getWasherInfo(id) {
    return knex("users").where({ id });
  },

<<<<<<< HEAD
  selectJobById(jobId, washerId) {
    return knex("jobs").where({ jobId });
  },

=======
>>>>>>> 920188c3572402d23bfc426565a8b61f068d4042
  getWorkStatus(id) {
    return knex("users").where({ id }).select("id", "workStatus");
  },

  setWorkStatus(id, workStatus) {
    return knex("users").where({ id }).update({ workStatus });
  },

<<<<<<< HEAD
  setWasherOnJob(jobId, washerId) {
    return knex("jobs").where({ jobId }).update({ washerId });
  },

=======
>>>>>>> 920188c3572402d23bfc426565a8b61f068d4042
  getWasherRatings(id) {
    return knex("ratingsOW").where({ id }).select("rating");
  },

  getClientRatings(id) {
    return knex("ratingsOC").where({ id }).select("rating");
  },

  rateWasher(washerRating) {
    return knex("ratingsOW").insert(washerRating);
  },
<<<<<<< HEAD

  rateClient(clientRating) {
    return knex("ratingsOC").insert(clientRating);
  },

  countWasherOnJobs(washerId) {
    return knex("jobs").where({ washerId }).count();
  },
=======
>>>>>>> 920188c3572402d23bfc426565a8b61f068d4042
};
