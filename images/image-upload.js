const router = require("express").Router();
const upload = require("./file-upload");

//Upload for profile images
const singleUpload = upload.single("profileImage");
router.post("/profile", (req, res) => {
  singleUpload(req, res, (err) => {
    if (err) {
      res.status(422).json({ error: err.message });
    } else {
      console.log(req.file);
      res.status(201).json({ profilePicture: req.file.location });
    }
  });
});

module.exports = router;
