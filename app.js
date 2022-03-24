const express = require("express");
const bodyParser = require("body-parser")
const router = require("./routes/router.js");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))

app.use("/", router);

app.get("/compare", (req,res) =>{
	res.render("compare");
})

app.listen(3000, "localhost", ()=>{
    console.log("Server is running on 3000");
});