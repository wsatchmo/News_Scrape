# ScrapeScience

```diff
+ HOW IT WORKS +
```

  • When a user visits ScrapeScience they can scrape stories from Openculture and ScienceNews to display to the home page. Each scraped article is saved to a mongoDB database. 
  The app will scrape for the following information:

  - Headline/Summary - the title of the article/a short summary of the article

  - URL - a link to the original article

  - Photos or videos associated with that article.

  • Users can leave comments on the articles displayed and revisit them later. The comments are saved to the database in an array in their articles' object. Users may delete comments left on articles. 
  
  • All stored comments are visible to (and able to be deleted by) every user. This means that, for now, they are more like notes than comments.

```diff
! DEPLOYMENT !
```

This project is deployed [here on Heroku](https://sheltered-coast-01541.herokuapp.com/) 

![Screenshots](/public/images/screenshot.png)

```diff
- NOTES -
```

* Currently any comment may be deleted by any user; user-specific comment editing or deletion requires an authorization method - a project addition for the future

* If downloading for personal use, you may want to change the database information, found in the **server.js** file:

```js
    // Connect to Mongo DB -- used by Heroku
    var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
    mongoose.connect(MONGODB_URI, { useNewUrlParser: true }); //Change to your db↑↑↑
    var db = mongoose.connection;
```

```diff
! RESOURCES USED !
```
##### [Bootstrap](https://getbootstrap.com/)

##### [Cheerio](https://cheerio.js.org/)

##### [Heroku](https://heroku.com/)

##### [MongoDB](https://www.mongodb.com/)

```diff
# Happy coding! #
```