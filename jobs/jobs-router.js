const jobsRouter = require("express").Router();
const {
  addNewJob,
  getAvailableJobs,
  selectJobById,
  addWasherToJob,
  deleteJob,
  editJob,
  getJobsByUserId,
} = require("./jobs-model.js");

// creates a job
jobsRouter.post("/new", async (req, res) => {
  const date = new Date();
  const creationDate = date;
  const {
    clientId,
    washAddress,
    clientCarId,
    washerId,
    scheduled,
    completed,
    paid,
  } = req.body;
  const newJob = {
    clientId,
    washAddress,
    clientCarId,
    washerId,
    scheduled,
    completed,
    paid,
    creationDate,
  };
  console.log(newJob);
  addNewJob(newJob)
    .then((newJobRes) => {
      return res.status(200).json(newJobRes);
    })
    .catch((err) => res.status(500).json(error));
});

// returns all jobs with washerid null (new jobs)
// change to send city to query
jobsRouter.get("/available", async (req, res) => {
  getAvailableJobs()
    .then((newJobs) => {
      return res.status(200).json(newJobs);
    })
    .catch((err) => res.status(500).json(err));
});

// returns the full job for a given jobid
// changed to a get from a post didn't make sense before returns an array requires to send a job id in the body? shouldn't this be coming from params?
jobsRouter.get("/jobInfo", async (req, res) => {
  const { jobId } = req.body;
  selectJobById(jobId)
    .then((result) => {
      // console.log(result)
      res.status(200).json(result);
    })
    .catch((err) => res.status(500).json(err));
});

// adds the washer to new job
//working??? needs to be refactored probably, We need to seed users for further testing.
jobsRouter.put("/selectJob", async (req, res) => {
  const { jobId, id } = req.body;
  const washerId = id;
  addWasherToJob(jobId, washerId)
    .then((result) => {
      if (result === 1) {
        return selectJobById(jobId).then((job) => {
          res.status(200).json({ job, message: "Washer Set on Job" });
        });
      } else {
        res.status(500).json({ message: "Error setting washer on job" });
      }
    })
    .catch((err) => res.status(500).json(err));
});

//deletes a job by jobId
jobsRouter.del("/job/:id", async (req, res) => {
  const jobId = req.params.id;
  deleteJob(jobId)
    .then(removed => {
      if (removed) {
        res.status(204).json({ message: "Job " + jobId + " has been deleted."})
      } else {
        res.status(404).json({ message: "The job with the specified ID does not exist."})
      }
    })
    .catch(err => res.status(500).json(err.message));
});

//updates a job by jobId
jobsRouter.put("/job/:id", async (req, res) => {
  const jobId = req.params.id;
  const changes = req.body;
  editJob(jobId, changes)
    .then(edited => {
      if (edited) {
        res.status(200).json({ message: "Job " + jobId + " has been edited successfully."})
      } else {
        res.status(404).json({ message: "The job with the specified ID does not exist."})
      }
    .catch(err => res.status(500).json(err.message));
});

//returns all jobs associated with given userId
jobsRouter.get("/job/:id", async (req, res) => {
  const userId = req.params.id;
  getJobsByUserId(userId)
    .then(jobs => {
      if (jobs) {
        res.status(200).json(jobs)
      } else {
        res.status(404).json({ message: "Jobs for the specified ID does not exist."})
      }
    .catch(err => res.status(500).json(err.message));
});

module.exports = jobsRouter;
