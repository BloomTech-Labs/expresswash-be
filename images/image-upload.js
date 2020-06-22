const router = require('express').Router();
const upload = require('./file-upload');
const aws = require('aws-sdk');
const Users = require('../users/users-model');
const Jobs = require('../jobs/jobs-model');
const Cars = require('../cars/cars-model');
const { validateCarId } = require('../cars/cars-middleware');

//Profile image endpoints
const profileUpload = upload.single('profilePicture');
router.post('/profile/:id', checkId, (req, res) => {
  profileUpload(req, res, (err) => {
    if (err) {
      res.status(422).json({ error: err.message });
    } else {
      Users.update(req.params.id, { profilePicture: req.file.location })
        .then((user) => {
          delete user[0].password;
          res.status(201).json(user);
        })
        .catch((err) => {
          res.status(501).json(err.message);
        });
    }
  });
});
router.put('/profile/:id', checkId, (req, res) => {
  const { profilePicture } = req.user;
  const picturearray = profilePicture.split('/');
  const pictureKey = picturearray[picturearray.length - 1];
  const removeBucket = new aws.S3();
  const params = {
    Bucket: 'wowo-images',
    Key: pictureKey,
  };
  removeBucket.deleteObject(params, (err, data) => {
    if (data) {
      profileUpload(req, res, (err) => {
        if (err) {
          res.status(422).json({ error: err.message });
        } else {
          Users.update(req.params.id, { profilePicture: req.file.location })
            .then((user) => {
              delete user[0].password;
              res.status(201).json(user);
            })
            .catch((err) => {
              res.status(500).json(err.message);
            });
        }
      });
    } else {
      res.status(500).json(err);
    }
  });
});
router.delete('/profile/:id', checkId, (req, res) => {
  const { profilePicture } = req.user;
  const picturearray = profilePicture.split('/');
  const pictureKey = picturearray[picturearray.length - 1];
  const removeBucket = new aws.S3();
  const params = {
    Bucket: 'wowo-images',
    Key: pictureKey,
  };
  removeBucket.deleteObject(params, (err, data) => {
    if (data) {
      Users.update(req.params.id, { profilePicture: '' })
        .then((del) => {
          res.status(200).json({ message: 'picture deleted successfully' });
        })
        .catch((err) => {
          res.status(500).json(err.message);
        });
    } else {
      res.status(500).json(err);
    }
  });
});
// Banner image endpoints
const bannerUpload = upload.single('bannerImage');
router.post('/banner/:id', checkId, (req, res) => {
  bannerUpload(req, res, (err) => {
    if (err) {
      res.status(422).json({ error: err.message });
    } else {
      Users.update(req.params.id, { bannerImage: req.file.location })
        .then((user) => {
          delete user[0].password;
          res.status(201).json(user);
        })
        .catch((err) => {
          res.status(500).json(err.message);
        });
    }
  });
});
router.put('/banner/:id', checkId, (req, res) => {
  const { bannerImage } = req.user;
  const bannerarray = bannerImage.split('/');
  const bannerKey = bannerarray[bannerarray.length - 1];
  const removeBucket = new aws.S3();
  const params = {
    Bucket: 'wowo-images',
    Key: bannerKey,
  };
  removeBucket.deleteObject(params, (err, data) => {
    if (data) {
      bannerUpload(req, res, (err) => {
        if (err) {
          res.status(422).json({ error: err.message });
        } else {
          Users.update(req.params.id, { bannerImage: req.file.location })
            .then((user) => {
              delete user[0].password;
              res.status(201).json(user);
            })
            .catch((err) => {
              res.status(500).json(err.message);
            });
        }
      });
    } else {
      res.status(500).json(err);
    }
  });
});
router.delete('/banner/:id', checkId, (req, res) => {
  const { bannerImage } = req.user;
  const bannerarray = bannerImage.split('/');
  const bannerKey = bannerarray[bannerarray.length - 1];
  const removeBanner = new aws.S3();
  const params = {
    Bucket: 'wowo-images',
    Key: bannerKey,
  };
  removeBanner.deleteObject(params, (err, data) => {
    if (data) {
      Users.update(req.params.id, { bannerImage: '' })
        .then((del) => {
          res.status(200).json({ message: 'picture deleted successfully' });
        })
        .catch((err) => {
          res.status(500).json(err.message);
        });
    } else {
      res.status(500).json(err);
    }
  });
});
//Before job image upload endpoint
const beforeUpload = upload.single('photoBeforeJob');
router.post('/job/before/:id', (req, res) => {
  beforeUpload(req, res, (err) => {
    if (err) {
      res.status(422).json({ error: err.message });
    } else {
      Jobs.editJob(req.params.id, { photoBeforeJob: req.file.location })
        .then(([job]) => {
          job.jobLocationLat = parseFloat(job.jobLocationLat);
          job.jobLocationLon = parseFloat(job.jobLocationLon);
          res.status(201).json(job);
        })
        .catch((err) => {
          res.status(500).json(err.message);
        });
    }
  });
});
//After job image endpoint
const afterUpload = upload.single('photoAfterJob');
router.post('/job/after/:id', (req, res) => {
  afterUpload(req, res, (err) => {
    if (err) {
      res.status(422).json({ error: err.message });
    } else {
      Jobs.editJob(req.params.id, { photoAfterJob: req.file.location })
        .then(([job]) => {
          job.jobLocationLat = parseFloat(job.jobLocationLat);
          job.jobLocationLon = parseFloat(job.jobLocationLon);
          res.status(201).json(job);
        })
        .catch((err) => {
          res.status(500).json(err.message);
        });
    }
  });
});
const carUpload = upload.single('photo');
router.post('/car/:carId', validateCarId, (req, res) => {
  carUpload(req, res, (err) => {
    if (err) {
      res.status(422).json({ error: err.message });
    } else {
      Cars.update({ photo: req.file.location }, req.params.carId)
        .then((car) => {
          res.status(201).json(car);
        })
        .catch((err) => {
          res.status(500).json(err.message);
        });
    }
  });
});
//middleware
function checkId(req, res, next) {
  const { id } = req.params;
  Users.findById(id)
    .then((user) => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).json({
          message: `there is no user with id of ${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: 'there was an error processing the request',
        error: err.message,
      });
    });
}
module.exports = router;
