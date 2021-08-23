const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");

const Track = mongoose.model("Track");

const router = express.Router();
router.use(requireAuth);

router.get("/tracks", async (req, res) => {
  const tracks = await Track.find({ userId: req.user._id });

  res.send(tracks);
});

router.post("/tracks", async (req, res) => {
  const { name, locations } = req.body;
  if (!name || !locations) {
    return res
      .status(422)
      .send({ error: "You must provide a name and locations." });
  }
  try {
    const track = new Track({ name, locations, userId: req.user._id });
    await track.save();
    res.send(track);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.delete("/tracks/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Track.deleteOne({ _id: id });
    res.send();
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

module.exports = router;
