const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//register
router.post("/register", async (req, res) => {
  const newUser = new User(req.body);
  try {
    //génère nouveau pssword et le hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //créé nouveau user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save le user + envoyer res
    const user = await newUser.save();
    res.status(200).json("Compte créé pour " + user.username + " !");
  } catch (err) {
    res.status(500).json(err);
  }
});

//login
router.post("/login", async (req, res) => {
    try {
        //trouver le user dans la database
        const user = await User.findOne({username:req.body.username})
        !user && res.status(400).json("Login ou Password incorrect")

        //vérifier password
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
            );
            !validPassword && res.status(400).json("Login ou Password incorrect");

        //envoyer res
        res.status(200).json("Ola " + user.username + " !");
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

module.exports = router;
