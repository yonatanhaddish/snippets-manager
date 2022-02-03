const router= require('express').Router();

const User = require('../models/userModal');
const bcrypt= require('bcryptjs');

router.post("/", async (req, res) => {
    try {
        const { email, password, passwordVerify }= req.body;

        if (!email || !password || !passwordVerify)
            return res.status(400).json({errorMessage: 'Please enter all required fields'});

        if (password.length <6 || passwordVerify.length < 6)
            return res.status(400).json({errorMessage: 'Password must be atleast 6 characters in length'});

        if (password !== passwordVerify)
            return res.status(400).json({errorMessage: 'Password and passwordVerify must be exactly the same'});

        const existingUser= await User.findOne({email});
            
        if (existingUser)
            return res.status(400).json({errorMessage: 'An account with this email already exists'});

        const salt= await bcrypt.genSalt();
        const passwordHash= await bcrypt.hash(password, salt);

        const newUser= new User({email, passwordHash});
        
        const savedUser= await newUser.save();

        res.json(savedUser);
    }
    catch(err) {
        res.status(500).send();
    }
});

router.get('/', async (req, res) => {
    try {
        const users= await User.find();
        res.json(users);
    }
    catch(err) {
        res.status(500).send();
    }
});









module.exports= router;