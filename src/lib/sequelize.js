const { Sequelize } = require("sequelize")
const mysqlConfig = require("../configs/database")

const sequelize = new Sequelize({
    username: mysqlConfig.MYSQL_USERNAME,
    password: mysqlConfig.MYSQL_PASSWORD,
    database: mysqlConfig.MYSQL_DB_NAME,
    port: 3306,
    dialect: "mysql"
})

const Tag = require("../models/tag")(sequelize)
const Book_tag = require("../models/book_tag")(sequelize)
const Book = require("../models/book")(sequelize)

Tag.hasMany(Book_tag, { foreignKey: "tag_id"})
Book_tag.belongsTo(Tag, { foreignKey: "tag_id"})
Book.hasMany(Book_tag, { foreignKey: "book_id"})
Book_tag.belongsTo(Book, { foreignKey: "book_id"})


module.exports = {
    Tag,
    Book_tag,
    sequelize,
    Book
}