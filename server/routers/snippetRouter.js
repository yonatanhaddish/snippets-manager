const router= require("express").Router();
const Snippet= require("../models/snippetModel");

router.post("/", (req, res) => {
    const {title, description, code}= req.body;

    const newSnippet= new Snippet({
        title, description, code
    });

    newSnippet.save();
    
})

module.exports= router; 