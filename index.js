import express from "express";
import bodyParser from "body-parser";
import { describe } from "node:test";

let app=express();
var port=3000;

var arrBName=[];
var arrBdescription=[];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");


app.get("/",(req,res)=>{
  res.render("index.ejs")
})

app.get("/create",(req,res)=>{
  res.render("creation.ejs")
})

app.get("/view",(req,res)=>{
  res.render("view.ejs",{
    arrBName:arrBName,
  })
})

app.get("/remove",(req,res)=>{
  res.render("remove.ejs")
})

app.post("/pass",(req,res)=>{
  var blogName=req.body["bRName"];
  var pos=-1;
  for(var i=0;i<arrBName.length;i++){
    if(blogName===arrBName[i]){
      pos=i;
    }
  }
  if(pos!=-1){
    arrBName.splice(pos, 1); 
    arrBdescription.splice(pos, 1); 
    res.redirect("/view");
  }
  else{
    res.status(404).send("Blog not found");
  }
})


app.post("/submitcreation",(req,res)=>{
  arrBName.push(req.body["Blog-Name"]);
  arrBdescription.push(req.body["Blog-Description"]);
  console.log(arrBName);
  console.log(arrBdescription);
  res.render("creation.ejs");
})

app.get("/blog/:id",(req,res)=>{
  const blogId=req.params.id;
  if(blogId>=0 &&blogId<arrBName.length){
    res.render("blogDetails.ejs",{
      name:arrBName[blogId],
      description:arrBdescription[blogId]
    })
  }
  else{
    res.status(404).send("Blog not found");
  }
})


app.listen(port,()=>{
  console.log(`server is listening on port ${port}.`)
})