const knex = require("../database/dbConfig.js");

module.exports = {
  //add new job
  addNewJob(newJob) {
    return knex("jobs").insert(newJob, "*");
  },

  // see available jobs in the washer's city
  getAvailableJobs(id) {
    return knex("users")
      .where({ id })
      .join("jobs", { "users.city": "jobs.city" })
      .where({ washerId: null });
  },

  //view jobs by jobId
  selectJobById(jobId) {
    return knex("jobs").where({ jobId });
  },

  //add washer to job
  addWasherToJob(jobId, washerId) {
    return knex("jobs").where({ jobId }).update(washerId, "*");
  },

  deleteJob(jobId) {
    return knex("jobs").where({ jobId }).del();
  },

  //update job by id
  editJob(jobId, changes) {
    return knex("jobs").where({ jobId }).update(changes, "*");
  },

  //get all jobs by userId
  getJobsByUserId(clientId) {
    return knex("jobs").where({ clientId });
  },

  //get all jobs by washerId
  getJobsByWasherId(washerId) {
    return knex("jobs").where({ washerId });
  },
  
  find() {
    return knex("jobs");
  },
};
