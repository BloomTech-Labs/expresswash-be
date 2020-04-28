const jobsRouter = require("express").Router();
<<<<<<< HEAD
const queries = require("../database/queries.js");
const {
  getLatestJobClient,
  addNewJob,
  seeAvailableJobs,
  getWasherInfo,
  getWorkStatus,
  setWorkStatus,
  setWasherOnJob,
  selectJobById,
  countWasherOnJobs,
} = require("../database/queries.js");

// DELT

// returns info on the latest job a client had done
jobsRouter.post("/getLatestJobClient", async (req, res) => {
  const { clientId } = req.body;
  return getLatestJobClient(clientId)
    .then((latestJobClient) => {
      return res.status(200).json(latestJobClient);
    })
    .catch((err) => res.status(500).json(err));
});

// returns info on the last washer on a clients job
jobsRouter.post("/getLatestWasherClient", async (req, res) => {
  const { clientId } = req.body;
  return getLatestJobClient(clientId)
    .then((latestJobClient) => {
      const washerId = latestJobClient.washerId;
      console.log(washerId);
      return getWasherInfo(washerId)
        .then((latestWasherInfo) => {
          return res.status(200).json(latestWasherInfo);
        })
        .catch((err) => res.status(500).json(err));
    })
    .catch((err) => res.status(500).json(err));
});
=======
const {
  addNewJob,
  getAvailableJobs,
  selectJobById,
  addWasherToJob,
  deleteJob,
  editJob,
  getJobsByUserId,
} = require("./jobs-model.js");
>>>>>>> e535f72877005bd7725fbf6a08a48ecb72390463

// creates a job
jobsRouter.post("/new", async (req, res) => {
  const date = new Date();
  const creationDate = date;
  const {
    clientId,
    washAddress,
<<<<<<< HEAD
    clientCarId,
    washerId,
    scheduled,
    completed,
    paid,
=======
    carId,
    address,
    address2,
    jobLocationLat,
    jobLocationLon,
    city,
    state,
    zip,
    notes,
    jobType,
    timeRequested,
>>>>>>> e535f72877005bd7725fbf6a08a48ecb72390463
  } = req.body;
  const newJob = {
    clientId,
    washAddress,
<<<<<<< HEAD
    clientCarId,
    washerId,
    scheduled,
    completed,
    paid,
    creationDate,
  };
  console.log(newJob);
  return addNewJob(newJob)
    .then((newJobRes) => {
      return res.status(200).json(newJobRes);
=======
    carId,
    address,
    address2,
    jobLocationLat,
    jobLocationLon,
    city,
    state,
    zip,
    notes,
    jobType,
    timeRequested,
    creationDate,
  };
  console.log(newJob);
  addNewJob(newJob)
    .then((newJobRes) => {
      res.status(200).json(newJobRes);
>>>>>>> e535f72877005bd7725fbf6a08a48ecb72390463
    })
    .catch((err) => res.status(500).json(error));
});

// returns all jobs with washerid null (new jobs)
<<<<<<< HEAD
//working
jobsRouter.get("/available", async (req, res) => {
  return seeAvailableJobs()
    .then((newJobs) => {
      return res.status(200).json(newJobs);
=======
// change to send city to query
jobsRouter.get("/available/:id", async (req, res) => {
  const id = req.params.id
  getAvailableJobs(id)
    .then((newJobs) => {
      if (newjobs) {
      res.status(200).json(newJobs);
      } else {
      res.status(403).json({ message: "No available jobs found." });
      }
>>>>>>> e535f72877005bd7725fbf6a08a48ecb72390463
    })
    .catch((err) => res.status(500).json(err));
});

// returns the full job for a given jobid
// changed to a get from a post didn't make sense before returns an array requires to send a job id in the body? shouldn't this be coming from params?
<<<<<<< HEAD
jobsRouter.get("/jobInfo", async (req, res) => {
  const { jobId } = req.body;
  return selectJobById(jobId)
    .then((result) => {
      // console.log(result)
      res.status(200).json(result);
=======
jobsRouter.get("/jobInfo/:id", async (req, res) => {
  const jobId = req.params.id;
  selectJobById(jobId)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(403).json({ message: "A job with the provided ID does not exist." })
      }
>>>>>>> e535f72877005bd7725fbf6a08a48ecb72390463
    })
    .catch((err) => res.status(500).json(err));
});

<<<<<<< HEAD
// returns the workstatus of a washer
//changed to a get
//working requires id to be passed into the body? Shouldn't it be coming from params?
jobsRouter.get("/getWorkStatus", async (req, res) => {
  const { id } = req.body;
  return getWorkStatus(id)
    .then((result) => {
      // console.log(result)
      res.status(200).json(result);
=======
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
>>>>>>> e535f72877005bd7725fbf6a08a48ecb72390463
    })
    .catch((err) => res.status(500).json(err));
});

<<<<<<< HEAD
// insert boolean in req.body to set washer workstatus
// working???
// probably needs to be blown up and refactored...
jobsRouter.put("/setWorkStatus", async (req, res) => {
  const { id, workStatus } = req.body;
  return setWorkStatus(id, workStatus)
    .then((result) => {
      // console.log(result)
      if (result === 1) {
        res.status(200).json({
          workStatus: `${workStatus}`,
          message: "Success setting work status",
        });
      } else {
        res.status(500).json({ message: "Error setting work status" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// adds the washer to new job
//working??? needs to be refactored probably, We need to seed users for further testing.
jobsRouter.put("/selectJob", async (req, res) => {
  const { jobId, id } = req.body;
  const washerId = id;
  return setWasherOnJob(jobId, washerId)
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

// tells how many jobs the washer is on
jobsRouter.get("/howManyCompleted", async (req, res) => {
  const { id } = req.body;
  const washerId = id;
  return countWasherOnJobs(washerId)
    .then((result) => {
      // console.log(result)
      res.status(200).json(result);
    })
    .catch((err) => res.status(500).json(err));
=======
//deletes a job by jobId
jobsRouter.delete("/job/:id", async (req, res) => {
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
      }})
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
      }})
    .catch(err => res.status(500).json(err.message));
>>>>>>> e535f72877005bd7725fbf6a08a48ecb72390463
});

module.exports = jobsRouter;
