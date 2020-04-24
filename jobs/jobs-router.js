const jobsRouter = require("express").Router();
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

// DELETE EVERYTHING

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
  return addNewJob(newJob)
    .then((newJobRes) => {
      return res.status(200).json(newJobRes);
    })
    .catch((err) => res.status(500).json(error));
});

// returns all jobs with washerid null (new jobs)
//working
jobsRouter.get("/available", async (req, res) => {
  return seeAvailableJobs()
    .then((newJobs) => {
      return res.status(200).json(newJobs);
    })
    .catch((err) => res.status(500).json(err));
});

// returns the full job for a given jobid
// changed to a get from a post didn't make sense before returns an array requires to send a job id in the body? shouldn't this be coming from params?
jobsRouter.get("/jobInfo", async (req, res) => {
  const { jobId } = req.body;
  return selectJobById(jobId)
    .then((result) => {
      // console.log(result)
      res.status(200).json(result);
    })
    .catch((err) => res.status(500).json(err));
});

// returns the workstatus of a washer
//changed to a get
//working requires id to be passed into the body? Shouldn't it be coming from params?
jobsRouter.get("/getWorkStatus", async (req, res) => {
  const { id } = req.body;
  return getWorkStatus(id)
    .then((result) => {
      // console.log(result)
      res.status(200).json(result);
    })
    .catch((err) => res.status(500).json(err));
});

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
});

module.exports = jobsRouter;
