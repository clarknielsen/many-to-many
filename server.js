const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
const db = require("./models");

app.get("/api/authors", (req, res) => {
  // get all authors, joining with post data
  db.Author.findAll({
    include: [{
      model: db.Post,
      // exclude through table data
      through: {attributes: []}
    }]
  }).then((authors) => {
    res.json(authors);
  });
});

app.get("/api/posts", (req, res) => {
  // get all posts, joining with author data
  db.Post.findAll({
    include: [{
      model: db.Author,
      // exclude through table data
      through: {attributes: []}
    }]
  }).then((posts) => {
    res.json(posts);
  });
});

db.sequelize.sync({ force: true }).then(() => {
  console.log("db synced");

  // create two test authors
  db.Author.bulkCreate([
    {name: "Jim"},
    {name: "Jane"}
  ]).then((authors) => {
    // create some test posts
    db.Post.bulkCreate([
      {title: "How to Learn JS", body: "Lots and lots of practice."},
      {title: "Why I Hate CSS", body: "Floats and what not."},
      {title: "Sequelize vs Regular SQL", body: "I vote for regular SQL."}
    ]).then((posts) => {
      // use setAuthors method to assign authors to posts
      // this will create new records in the post2author through table
      posts[0].setAuthors([authors[0]]);
      posts[0].setAuthors([authors[1]]);
      posts[1].setAuthors([authors[0]]);
      posts[2].setAuthors([authors[1]]);
    });
  });

  app.listen(PORT, () => {
    console.log("app started on port " + PORT);
  });
});
