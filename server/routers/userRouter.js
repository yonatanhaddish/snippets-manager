const router = require("express").Router();

const User = require("../models/userModal");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

router.post("/", async (req, res) => {
  try {
    const { email, password, passwordVerify } = req.body;

    if (!email || !password || !passwordVerify)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields" });

    if (password.length < 6 || passwordVerify.length < 6)
      return res
        .status(400)
        .json({
          errorMessage: "Password must be atleast 6 characters in length",
        });

    if (password !== passwordVerify)
      return res
        .status(400)
        .json({
          errorMessage: "Password and passwordVerify must be exactly the same",
        });

    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res
        .status(400)
        .json({ errorMessage: "An account with this email already exists" });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({ email, passwordHash });

    const savedUser = await newUser.save();

    // res.json(savedUser);

    const token = jwt.sign(
      {
        id: savedUser._id,
      },
      process.env.JWT_SECRET
    );

    res.cookie("token", token, { httpOnly: true }).send();
    // res.send(token)
    // res.status(token);
    // res.json(token);
    // console.log(token);
  } catch (err) {
    res.status(500).send();
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send();
  }
});

router.post("/login", async(req, res) => {
  try {
    const { email, password }= req.body;

    if (!email || !password)
      return res.status(401).json({errorMessage: 'Please enter all the required fields.'})

    const existingUser= await User.findOne({email});

    if (!existingUser)
      return res.status(401).json({errorMessage: 'Wrong email or password.'});

    const correctPassword= await bcrypt.compare(password, existingUser.passwordHash);
    if (!correctPassword)
      return res.status(401).json({errorMessage: 'Wrong email or password.'});

    const token= jwt.sign({id: existingUser._id}, process.env.JWT_SECRET);

    res.cookie("token", token, {httpOnly: true}).send();
  }
  catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
