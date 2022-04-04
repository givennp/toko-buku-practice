const { bookControllers } = require("../controllers");
const router = require("express").Router();

router.get("/", bookControllers.getAllBook);
router.post("/", bookControllers.createNewBook);
router.delete("/:id", bookControllers.deleteBook);

module.exports = router;
