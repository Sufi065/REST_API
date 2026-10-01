const express = require('express');
const path = require("path");
const { v4:uuid}= require("uuid");
const methodOverride = require("method-override");

const app = express();
app.set("views engine", "ejs");
app.use(express.urlencoded({extended:true}));
app.set("views", path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride('_method'));

const port = 8080;

let posts = [
    {
        "id":uuid(),
        "username":"sufi",
        "content":"lu lu la li.."

    },
    {
        "id":uuid(),
        "username":"xyz",
        "content":"la la li lu.."
    },
      {
        "id":uuid(),
        "username":"abc",
        "content":"la la li lu.."
    }
]
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/posts",(req,res)=>{
    let {username, content} = req.body;
    let id = uuid();
    posts.push({id, username, content});
    res.redirect("/posts");
})

app.get("/posts/:id",(req, res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id === p.id);
    res.render("show.ejs",{post});
})

app.patch("/posts/:id",(req, res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=>id === p.id);
    post.content = newContent;
    console.log(newContent);
    res.redirect("/posts"); 
})

app.get("/posts/:id/edit", (req, res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id === p.id);
    res.render("edit.ejs",{post});
})
app.delete("/posts/:id", (req, res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=>id !== p.id);
    res.redirect("/posts");
})
app.listen(port,()=>{
    console.log(`app is listning at port : ${port}`);
})