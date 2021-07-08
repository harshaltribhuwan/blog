//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "Welcome !!,     Just click on 👉🏻 Compose to create your own new Blog";
const aboutContent = "This is Daily-Journal. We are here to make you comfortable in Blog writing. You can write as much you wantm you can write it annonimously so know one know who write that. you can write here Tension Free. If you want to create blog just click on Compose. we never share identity with anyone . its all encrypted, we made this website for you thake express your fellings freely and now we want that you feel positive and happy. we also like to share your views on content all like that and finally thanks for visiting us";
const contactContent = "Feel Free to contact us on out social media platforms and you can also send us an email which is given on about us page. just fell free and send us some nice content. also you can also tell us that what more we can do to change things to it look more good on this website. ";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGO_URI, 
{useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});


app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose", {composeContent: composeContent});
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started on port Succesfully");
});
