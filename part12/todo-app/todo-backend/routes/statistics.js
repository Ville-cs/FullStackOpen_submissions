const express = require("express");
const router = express.Router();
const { getAsync } = require("../redis");

/* GET statistics */
router.get("/", async (_, res) => {
  try {
    const stats = await getAsync("counter");
    const toNumber = parseInt(stats);
    res.json({
      added_todos: toNumber,
    });
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

module.exports = router;
