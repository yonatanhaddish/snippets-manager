const express= require('express');
const mongoose= require('mongoose');
const dotenv= require("dotenv");
const cors= require('cors');

dotenv.config();

// setup express server
const app= express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000"
}));

app.listen(5000, () => console.log("Server started on port 5000"));

// set up routers
app.use("/snippet", require("./routers/snippetRouter"));

// connect to mongoDB
mongoose.connect(process.env.MDB_CONNECT_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) return console.log(err);
    console.log("Connected to MongoDB");
})


