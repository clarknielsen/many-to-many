# Sequelize Many-to-Many Example

* Author and Post models use `belongsToMany` method to create a third "through" table called `post2author`.

* In `server.js`, I use `bulkCreate` to seed some initial data, but the real magic happens with the `setAuthors` method. Run this method on a post object retrieved from the database and pass in an author object to auto-create the record in the through table.

* In the GET routes, we can still use `include` as normal to perform a join, but I added the `through: {attributes: []}` property to exclude all of the unnecessary data from the through table.