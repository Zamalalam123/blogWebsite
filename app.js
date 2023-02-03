//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "Welcome to our blog! We're thrilled you've taken the time to visit us. Our blog is a space where we share our thoughts, opinions, and insights on a variety of topics, including [insert relevant topics].Our goal is to provide valuable and thought-provoking content that inspires, informs, and educates our readers. Whether you're here for entertainment or to learn something new, we aim to deliver content that meets your needs.Our team of writers and contributors come from diverse backgrounds and bring unique perspectives to the table. From [insert relevant fields], we strive to bring a fresh take on the topics we cover.We believe in the power of community, and we encourage our readers to engage with us through comments and social media. We're always open to feedback, suggestions, and new ideas, and we welcome your contributions to our blog.Thank you for joining us on this journey. We hope you enjoy what we have to offer and that you'll become a regular reader. Let's start a conversation!";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/",function(req,res){
  res.render("home",{
    startingContent : homeStartingContent,
    posts : posts
  })
});

app.get("/about",function(req,res){
  res.render("about",{ about : aboutContent})
});

app.get("/contact",function(req,res){
  res.render("contact",{ contact : contactContent})
});

app.get("/compose",function(req,res){
  res.render("compose")
});

app.post("/compose",function(req,res){
  var blogContents = {
    title : req.body.blogPostTitle,
    content : req.body.blogPost 
  }
  posts.push(blogContents)
  res.redirect("/")
});

app.get('/posts/:anypost',function(req,res){
  const requestedFile = _.lowerCase(req.params.anypost)

  posts.forEach(function(post){
    const storedFile = _.lowerCase(post.title)
    if(storedFile === requestedFile){
      res.render("post",{
        title : post.title,
        content : post.content
      })
    }
  })

})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
