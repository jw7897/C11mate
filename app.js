const express = require("express");
const bodyParser = require("body-parser")

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))

app.get("/", (req,res) =>{
	res.render("travel");
})

app.get("/travel", (req,res) =>{
	res.render("travel");
})

app.get("/locus", (req,res) =>{
	res.render("locus");
})

app.post("/locus", (req,res) =>{
	console.log("test")
})

app.listen(3000, "localhost", ()=>{
    console.log("Server is running on 3000");
});