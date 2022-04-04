const { DataTypes } = require("sequelize");

const Tag = (sequelize) => {
  return sequelize.define("Tag", {
    tag_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

module.exports = Tag;
