const axios = require("axios");

const jobsRouter = require("express").Router();
const {
  addNewJob,
  getAvailableJobs,
  selectJobById,
  addWasherToJob,
  deleteJob,
  editJob,
  getJobsByUserId,
  find,
} = require("./jobs-model.js");

// creates a job
jobsRouter.post("/new", [addJobLatLon], async (req, res) => {
  const date = new Date();
  const creationDate = date;
  const {
    clientId,
    washAddress,
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
  } = req.body;
  const newJob = {
    clientId,
    washAddress,
    carId,
    address,
    address2,
    jobLocationLat: req.jobLat ? req.jobLat : jobLocationLat,
    jobLocationLon: req.jobLon ? req.jobLon : jobLocationLon,
    city,
    state,
    zip,
    notes,
    jobType,
    timeRequested,
    creationDate,
  };
  addNewJob(newJob)
    .then((newJobRes) => {
      res.status(201).json(newJobRes);
    })
    .catch((err) => res.status(500).json(err.message));
});

// returns all jobs with washerid null (new jobs)
// change to send city to query
// takes user id from params
jobsRouter.get("/available/:id", async (req, res) => {
  const id = req.params.id;
  getAvailableJobs(id)
    .then((newJobs) => {
      if (newJobs) {
        const returnJobs = newJobs.map((item) => {
          delete item.password;
          return item;
        });
        res.status(200).json(returnJobs);
      } else {
        res.status(404).json({ message: "No available jobs found." });
      }
    })
    .catch((err) => res.status(500).json(err.message));
});

// returns the full job for a given jobid
// changed to a get from a post didn't make sense before returns an array requires to send a job id in the body? shouldn't this be coming from params?
jobsRouter.get("/jobInfo/:id", [validateJobId], async (req, res) => {
  const jobId = req.params.id;
  selectJobById(jobId)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => res.status(500).json(err));
});

// adds the washer to new job
//uses job id
jobsRouter.put("/selectJob/:id", [validateJobId], async (req, res) => {
  const jobId = req.params.id;
  const washerId = req.body;
  addWasherToJob(jobId, washerId)
    .then((result) => {
      res.status(203).json(result);
    })
    .catch((err) => res.status(500).json(err));
});

//deletes a job by jobId
jobsRouter.delete("/job/:id", [validateJobId], async (req, res) => {
  const jobId = req.params.id;
  deleteJob(jobId)
    .then((removed) => {
      res.status(204).json().end();
    })
    .catch((err) => res.status(500).json(err.message));
});

//updates a job by jobId
jobsRouter.put("/job/:id", [validateJobId], async (req, res) => {
  const jobId = req.params.id;
  const changes = req.body;
  editJob(jobId, changes)
    .then((edited) => {
      res.status(200).json(edited);
    })
    .catch((err) => res.status(500).json(err.message));
});

//returns all jobs associated with given userId
jobsRouter.get("/user/:id", async (req, res) => {
  const userId = req.params.id;
  getJobsByUserId(userId)
    .then((jobs) => {
      if (jobs) {
        res.status(200).json(jobs);
      } else {
        res
          .status(400)
          .json({ message: "Jobs for the specified ID does not exist." });
      }
    })
    .catch((err) => res.status(500).json(err.message));
});
jobsRouter.get("/", async (req, res) => {
  find().then((jobs) => {
    res.status(200).json(jobs);
  });
});
// validates that the Job id does exist
function validateJobId(req, res, next) {
  selectJobById(req.params.id).then((job) => {
    if (job) {
      req.job = job;
      next();
    } else {
      res.status(400).json({ message: "invalid job id" });
    }
  });
}
// adds a job latitude and longitude if none are provided based on the washAddress
async function addJobLatLon(req, res, next) {
  if (!req.body.washAddress || req.body.washAddress.length < 5)
    return res
      .status(500)
      .json({ message: "Please provide a valid washAddress" });
  if (!req.body.jobLocationLat || !req.body.jobLocationLon) {
    const TOKEN =
      "pk.eyJ1IjoicXVhbjAwNSIsImEiOiJjazN0a2N3a2YwM3ViM2twdzhkbGphMTZzIn0.OepqB_mymhr1YLSYwNmRSg"; // Set your mapbox token here
    const country = "us";
    try {
      const getLocation = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${req.body.washAddress}.json?country=${country}&limit=1&autocomplete=true&access_token=${TOKEN}`
      );
      req.jobLat = getLocation.data.features[0].geometry.coordinates[1];
      req.jobLon = getLocation.data.features[0].geometry.coordinates[0];
      next();
    } catch (err) {
      res.status(500).json(err.message);
    }
  } else {
    next();
  }
}

module.exports = jobsRouter;
