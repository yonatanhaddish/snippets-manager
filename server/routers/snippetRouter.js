const router= require("express").Router();
const Snippet= require("../models/snippetModel");
const auth= require("../middleware/auth");

// get all snippets
router.get("/", auth, async (req, res) => {
    try {
        const snippets= await Snippet.find({user: req.user});
        res.json(snippets);
        // console.log(req.user);
    }
    catch(err) {
        res.status(500).send();
    }
});

// post snippets
router.post("/", auth, async (req, res) => {
    try {
        const {title, description, code}= req.body;

        if (!description && !code) {
            return res.status(400).json({errorMessage: "You need to enter at least a description or code."});
        }
        const newSnippet= new Snippet({
            title, description, code, user: req.user
        });

        const savedSnippet= await newSnippet.save();

        res.json(savedSnippet);
    }
    catch(err) {
        res.status(500).send();
    }
});

// delete snippet by a specific Id
router.delete("/:id", auth, async (req,res) => {
    try {
        const snippetId= req.params.id;
        
        if (!snippetId)
            return res.status(400).json({errorMessage: "Snippet Id not given. Please contact the developer."});
        
        const existingSnippet= await Snippet.findById(snippetId);

        if (!existingSnippet)
            return res.status(400).json({errorMessage: "No snippet with this Id was found. Please contact the developer"})

        if (existingSnippet.user.toString() !== req.user)
            return res.status(401).json({errorMessage: 'Unauthorized.'});

        await existingSnippet.delete();
        
        res.json(existingSnippet);
    }
    catch(err) {
        res.status(500).send();
    }
});

// update a snippet by a specific Id
router.put("/:id", auth, async (req, res) => {
    try {
        const {title, description,code}= req.body;
        const snippetId= req.params.id;

        if (!description && !code) {
            return res.status(400).json({errorMessage: "You need to enter at least a description or code"});
        }
        
        if (!snippetId)
            return res.status(400).json({errorMessage: "Snippet Id not given. Please contact the developer"});

        const originalSnippet= await Snippet.findById(snippetId);
        if (!originalSnippet)
            return res.status(400).json({errorMessage: "No snippet with this Id was found. Please contact the developer"});

        if (originalSnippet.user.toString() !== req.user)
            return res.status(401).json({errorMessage: 'Unauthorized.'});
        
        originalSnippet.title= title;
        originalSnippet.description= description;
        originalSnippet.code= code;

        const savedSnippet= await originalSnippet.save();

        res.json(savedSnippet);
    }
    catch(err) {
        res.status(500).send();
    }
});




module.exports= router; 