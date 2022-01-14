const router = require("express").Router();
const Pin = require("../models/Pin");

//créer un pin (POST)
router.post("/", async (req, res) => {
  const newPin = new Pin(req.body);
  try {
    const savedPin = await new Pin.save();
    res.status(200).json(savedPin);
  } catch (err) {
    res.status(500).json(err);
  }
});

//récupérer tous les pins (GET)
router.get("/", async (req, res) => {
  try {
    const pins = await Pin.find();
    res.status(200).json(pins);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
