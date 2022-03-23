const express = require("express");
const bodyParser = require("body-parser")
const router = require("./routes/router.js");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))

app.use("/", router);

/*
app.get("/", (req,res) =>{
	res.render("travel");
})

app.get("/travel", (req,res) =>{
	res.render("travel");
})

app.get("/locus", (req,res) =>{
	res.render("locus");
})

*/

app.listen(3000, "localhost", ()=>{
    console.log("Server is running on 3000");
});