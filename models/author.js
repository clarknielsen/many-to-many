module.exports = function(sequelize, DataTypes) {
  const Author = sequelize.define("Author", {
    name: DataTypes.STRING
  });

  Author.associate = function(models) {
    Author.belongsToMany(models.Post, {
      through: "post2author"
    });
  };

  return Author;
};
