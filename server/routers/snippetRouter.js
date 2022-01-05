const router= require("express").Router();

router.post("/", (req, res) => {
    const body= req.body;
    console.log(body);
})

router.get("/", (req, res) => {
    const body= req.body;
    res.send(body)
})

module.exports= router; 