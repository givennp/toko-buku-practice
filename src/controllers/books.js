const { Op } = require("sequelize");
const { Book, Book_tag, Tag } = require("../lib/sequelize");

const bookControllers = {
  getAllBook: async (req, res) => {
    try {
      const { _limit = 30, _page = 1 } = req.query;

      delete req.query._limit;
      delete req.query._page;
      const findBook = await Book.findAndCountAll({
        where: {
          ...req.query,
        },
        limit: _limit ? parseInt(_limit) : undefined,
        offset: (_page - 1) * _limit,
        include: [
          {
            model : Book_tag,
            include : Tag,
          },
        ]
      });
      return res.status(200).json({
        message: "Find Book",
        result: findBook,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
  createNewBook: async (req, res) => {
    try {
      const { book_name, cover, arr_tag_id = [] } = req.body;

      // const isBookExist = await Book.findOne({
      //   where: {
      //     book_name,
      //   },
      // });

      // if (isBookExist) {
      //   return res.status(400).json({
      //     message: "Book already exist, please add another Book",
      //   });
      // }

      const newBook = await Book.create({
        book_name,
        cover
      });

      console.log(newBook.id)
      

      // await Book_tag.create({
      //     tag_id,
      //     book_id: newBook.ids
      // })

      await Book_tag.bulkCreate(
        arr_tag_id.map((tagId) => {
          return {
            tag_id: tagId,
            book_id: newBook.id
          }
        })
      )

      

      return res.status(201).json({
        message: "Book created",
        result: newBook,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
  deleteBook: async (req, res) => {
    try {
      const { id } = req.params;

      const deletedBook = await Book.destroy({
        where: {
          id,
        },
      });

      return res.status(201).json({
        message: "Deleted Book",
      });
    } catch (error) {
      console.log(err);
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
};

module.exports = bookControllers;
