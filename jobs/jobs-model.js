const knex = require("./knex");

module.exports() = {
  //add new job
  addNewJob(newJob) {
    return knex("jobs").insert(newJob);
  },
  // see available jobs in the washer's city
  getAvailableJobs(id) {
    return knex("user")
      .where({ id })
      .join("jobs", { "user.city": "jobs.city" })
      .where({ washerId: null });
  },
  //view jobs by jobId
  selectJobById(jobId) {
    return knex("jobs").where({ jobId });
  },
  //add washer to job
  addWasherToJob(jobId, washerId) {
    return knex("jobs").where({ jobId }).update({ washerId });
  },

  deleteJob(jobId) {
    return knex("jobs").where({ jobId }).del();
  },
  //update job by id
  editJob(jobId, changes) {
    return knex("jobs").where({ jobId }).update(changes);
  },
  //get all jobs by userId
  getJobsByUserId(userId) {
    return knex("jobs").where({ userId });
  },
};
