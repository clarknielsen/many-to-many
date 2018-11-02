module.exports = function(sequelize, DataTypes) {
  const Post = sequelize.define("Post", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  Post.associate = function(models) {
    Post.belongsToMany(models.Author, {
      through: "post2author"
    });
  };

  return Post;
};
