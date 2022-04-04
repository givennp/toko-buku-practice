const { Op } = require("sequelize");
const { Tag } = require("../lib/sequelize");

const tagControllers = {
  getAllTag: async (req, res) => {
    try {
      const { _limit = 30, _page = 1 } = req.query;

      delete req.query._limit;
      delete req.query._page;
      const findTag = await Tag.findAndCountAll({
        where: {
          ...req.query,
        },
        limit: _limit ? parseInt(_limit) : undefined,
        offset: (_page - 1) * _limit,
      });
      return res.status(200).json({
        message: "Find Tag",
        result: findTag,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
  createNewTag: async (req, res) => {
    try {
      const { tag_name } = req.body;

      const isTagExist = await Tag.findOne({
          where: {
              tag_name
          }
      })  

      if (isTagExist) {
        return res.status(400).json({
          message: "Tag already exist, please add another tag",
        });
      }

      const newTag = await Tag.create({
        tag_name,
      });

      return res.status(201).json({
        message: "Tag created",
        result: newTag,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
  deleteTag: async (req, res) => {
    try {
      const { id } = req.params;

      const deletedTag = await Tag.destroy({
        where: {
          id,
        },
      });

      return res.status(201).json({
        message: "Deleted tag"
      });
    } catch (error) {
      console.log(err);
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
};

module.exports = tagControllers;
