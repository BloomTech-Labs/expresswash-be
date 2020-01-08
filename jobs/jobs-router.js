const jobsRouter = require('express').Router();
const queries = require('../database/queries.js');
const { getLatestJobClient, addNewJob, seeAvailableJobs } = require('../database/queries.js')

jobsRouter.post('/getLatestJobClient', async (req, res) => {
    const { clientId } = req.body
    return getLatestJobClient(clientId)
    .then(latestJobClient => {
        return res.status(200).json(latestJobClient)
    })
    .catch(err => res.status(500).json(err))
});

jobsRouter.post('/new', async (req, res) => {
    const { clientId, washAddress, clientCarId } = req.body
    const { newJob } = { clientId, washAddress, clientCarId };
    return addNewJob(newJob)
    .then(newJobRes => {
        return res.status(200).json(newJobRes)
    })
    .catch(err => res.status(500).json(error))
});

jobsRouter.get('/available', async (req, res) => {
    return seeAvailableJobs()
    .then(newJobs => {
        return res.status(200).json(newJobs)
    })
    .catch(err => res.status(500).json(err))
})


module.exports = jobsRouter;