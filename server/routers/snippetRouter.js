const router= require("express").Router();
const Snippet= require("../models/snippetModel");

router.post("/", async (req, res) => {
    try {
        const {title, description, code}= req.body;

        if (!description && !code) {
            return res.status(400).json({errorMessage: "You need to enter at least a description or code."});
        }
        const newSnippet= new Snippet({
            title, description, code
        });
        
        const savedSnippet= await newSnippet.save();

        res.json(savedSnippet);
    }
    catch(err) {
        res.status(500).send();
    }
});

module.exports= router; 