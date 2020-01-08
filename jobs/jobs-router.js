const jobsRouter = require('express').Router();
const queries = require('../database/queries.js');
const { getLatestJobClient, addNewJob, seeAvailableJobs, getWasherInfo } = require('../database/queries.js')

jobsRouter.post('/getLatestJobClient', async (req, res) => {
    const { clientId } = req.body
    return getLatestJobClient(clientId)
    .then(latestJobClient => {
        return res.status(200).json(latestJobClient)
    })
    .catch(err => res.status(500).json(err))
});

jobsRouter.post('/getLatestWasherClient', async (req, res) => {
    const { clientId } = req.body
    return getLatestJobClient(clientId)
    .then(latestJobClient => {
        const washerId = latestJobClient.washerId
        console.log(washerId)
        return getWasherInfo(washerId)
        .then(latestWasherInfo => {
            return res.status(200).json(latestWasherInfo)
        })
        .catch(err => res.status(500).json(err))
    })
    .catch(err => res.status(500).json(err))
});

jobsRouter.post('/new', async (req, res) => {
    const date = new Date();
    const creationDate = date
    const { clientId, washAddress, clientCarId, washerId, scheduled, completed, paid } = req.body
    const newJob = { clientId, washAddress, clientCarId, washerId, scheduled, completed, paid, creationDate};
    console.log(newJob)
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
});

jobsRouter.put('/selectJob', async (req, res) => {
    const { jobId } = req.body;
    return selectJobById(jobId)
    .then(result => {
        console.log(result)
        res.status(200).json(result)
    })
    .catch(err => res.status(500).json(err))
})


module.exports = jobsRouter;