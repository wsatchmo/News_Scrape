var express = require("express");
var router = express.Router(); 
// Scraping dependencies
const axios = require("axios");
const cheerio = require("cheerio");
// Requiring Article model
var Article = require("../models/Article.js");

router.get("/",function(req,res){

    Article.find({}).lean()
    // execute query
    .exec(function(error, body) {
        //console.log("FIRING");
        // Log any errors
        if (error) {
            console.log(error);
        }
        // Otherwise, send the body to the browser as a json object
        else {
            //console.log("Articles: ", body);
            res.render("index", {articles: body});
        }
    });
});

// A GET route for scraping Openculture
router.get("/scrape/openculture", function(req, res) {
    // Grab html with axios
    axios.get("http://www.openculture.com").then(function(response) {
      // Load into cheerio, save it to $ for shorthand selector
      var $ = cheerio.load(response.data);
  
      // WHAT YOU WANT TO DO: grab each image and display it, and the h2 associated with it
      $(".recent_post").each(function(i, element) {
        // Save an empty result object
        var result = {};
  
        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this)
          .children("h1")
          .children("a")
          .text()
          .replace("/n", "")
          .trim();
          //console.log("TITLE:: ", result.title);
  
        result.link = $(this)
          .children("h1")
          .children("a")
          .attr("href");
          //console.log("LINK:: ", result.link);
        
        result.video = $(this)
          .children("div")
          .children("div")
          .children("div")
          .children("div")
          .children("span")
          .children("iframe")
          .attr("src");
       
        result.image = $(this)
          .children("div")
          .children("div")
          .children("p")
          .children("img")
          .attr("src");
          
        if (result.video !== undefined){
          console.log("VIDEO: ", result.video);
        } else {
          console.log("IMAGE: ", result.image);
        }  
          console.log("------------------");
  

        Article.findOne({title:result.title},function(err,data){
            //Check if the title already exists in the db
            if (!data){
                // If it doesn't, create a new Article using the `result` object built from scraping
                Article.create(result)
                .then(function(dbArticle) {
                // View the added result in the console
                console.log(dbArticle);
                })
                .catch(function(err) {
                // If an error occurred, log it
                console.log(err);
                });

            } else { //Otherwise, log that it exists
                console.log("this aritcle is already in db: "+ data.title);
            }
        });  
      });
  
      // Return to home page
      res.redirect("/");
    });
});

// A GET route for scraping ScienceNews
router.get("/scrape/sciencenews", function(req, res) {
    // Grab html with axios
    axios.get("https://www.sciencenews.org/").then(function(response) {
      // Load into cheerio, save it to $ for shorthand selector
      var $ = cheerio.load(response.data);
  
      // WHAT YOU WANT TO DO: grab each image and display it, and the h2 associated with it
      $("li.term-river-grid__wrapper___fTw9V.with-image").each(function(i, element) {
        // Save an empty result object
        var result = {};
  
        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this)
          .children("div")
          .children("h3")
          .children("a")
          .text()
          .trim();
          //console.log("TITLE:: ", result.title);
  
        result.link = $(this)
          .children("div")
          .children("h3")
          .children("a")
          .attr("href");
          //console.log("LINK:: ", result.link);
        
        result.image = $(this)
          .children("figure")
          .children("a")
          .children("img")
          .attr("src");
        
          console.log("IMAGE: ", result.image);

        Article.findOne({title:result.title},function(err,data){
            //Check if the title already exists in the db
            if (!data){
                // If it doesn't, create a new Article using the `result` object built from scraping
                Article.create(result)
                .then(function(dbArticle) {
                // View the added result in the console
                console.log(dbArticle);
                })
                .catch(function(err) {
                // If an error occurred, log it
                console.log(err);
                });

            } else { //Otherwise, log that it exists
                console.log("this aritcle is already in db: "+ data.title);
            }
        });  
      });
  
      // Return to home page
      res.redirect("/");
    });
});

router.get("/articles/:id", function(req, res) {
    // Using the id passed in the id parameter, query for Article with matching id
    // console.log("req: ", req);
    // console.log("res: ", res);
    Article.findOne({ "_id": req.params.id }).lean() //may need .lean()
    // ..and populate all of the notes associated with it
    .populate("comments")
    // now, execute our query
    .exec(function(error, body) {
      // Log any errors
      console.log("body: ", body);
        if (error) {
            console.log(error);
        }
        // Otherwise, send the body to the browser as a json object
        else {
            res.render("article", {article: body});
        }
    });
});

// Create a new comment 
router.post("/articles/comment", function(req, res) {
    // Create a new comment and pass the req.body to the entry
    console.log("req.body: " , req.body)
    // And save the new comment the db
    // Use the article id to find and update comment array
    Article.findOneAndUpdate({ "_id": req.body._id }, { $push:{"comment": req.body.comment }},{new:true},function(err,body){
        if (err){
            console.log("ERROR - Could not add comment: " + err);
        }
        else{
            console.log("Body: ", body);
        };
    });
});

// Delete a comment 
router.post("/articles/comment/delete", function(req, res) {
    // Create a new comment and pass the req.body to the entry
    //console.log("req.body: " , req.body)
    // And save the new comment the db
    // Use the article id to find and update comment array
    let commByArr = {};
    commByArr["comment"] = req.body.comment;
    console.log("commByArr:: ", commByArr);

    "comment." + req.body.index;
    Article.findOneAndUpdate({ "_id": req.body._id }, { $pull: commByArr}, function(err,body){
        if (err){
            console.log("ERROR - Could not delete comment: " + err);
        }
        else{
            //console.log("Body: ", body);
        };
    });
});

//||||||||||||||||| NOT NECESSARY; NICE TO HAVE THOUGH ||||||||||||||||||||||

// router.get("/articles", function(req, res) {
//     // Grab every body in the Articles array
//     Article.find({}, function(error, body) {
//       // Log any errors
//         if (error) {
//             console.log(error);
//         }
//         // Or send the body to the browser as a json object
//         else {
//             res.json(body);
//         }
//     });
// });

//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
  
module.exports=router;