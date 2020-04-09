# ScrapeScience

```diff
+ How it works +
```

  - When a user visits the ScrapeScience site, they can scrape stories from Openculture and ScienceNews and display them to the home page. Each scraped article is saved to a mongoDB database. 
  The app will scrape for the following information:

     * Headline/Summary - the title of the article/a short summary of the article

     * URL - the url to the original article

     * Photos or videos associated with that article.

  - Users can leave comments on the articles displayed and revisit them later. The comments are saved to the database as well and associated with their articles. Users may delete comments left on articles. All stored comments are visible to (and able to be deleted by) every user.

```diff
! Deployment !
```

This project is deployed on Heroku at [sheltered-coast-01541.herokuapp.com](https://sheltered-coast-01541.herokuapp.com/) 

```diff
- Notes -
```

* Currently any comment may be deleted by any user; user-specific comment editing or deletion requires an authorization method, which may be a project addition for the future

* If downloading for personal use, you may need to change the database information, found in the **server.js** file -- shown below:

```js
    // Connect to Mongo DB -- used by Heroku
    var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
    mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
    var db = mongoose.connection;
```


```diff
# Have fun & enjoy coding! #
```
