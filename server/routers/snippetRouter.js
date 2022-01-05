const router= require("express").Router();
const Snippet= require("../models/snippetModel");

// get all snippets
router.get("/", async (req, res) => {
    try {
        const snippets= await Snippet.find();
        res.json(snippets);
    }
    catch(err) {
        res.status(500).send();
    }
});

// post snippets
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

// delete snippet by a specific Id
router.delete("/:id", async (req,res) => {
    try {
        const snippetId= req.params.id;
        
        if (!snippetId)
            return res.status(400).json({errorMessage: "Snippet Id not given. Please contact the developer."});
        
        const existingSnippet= await Snippet.findById(snippetId);

        if (!existingSnippet)
            return res.status(400).json({errorMessage: "No snippet with this Id was found. Please contact the developer"})

        await existingSnippet.delete();
        
        res.json(existingSnippet);
    }
    catch(err) {
        res.status(500).send();
    }
})




module.exports= router; 