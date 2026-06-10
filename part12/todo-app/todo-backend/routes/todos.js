const express = require("express");
const { Todo } = require("../mongo");
const router = express.Router();
const { getAsync, setAsync } = require("../redis");

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  try {
    const todo = await Todo.create({
      text: req.body.text,
      done: req.body.done,
    });
    res.send(todo);

    const stats = await getAsync("counter");
    const toNumber = parseInt(stats);
    setAsync("counter", toNumber ? toNumber + 1 : 1);
  } catch (error) {
    console.log(error);
  }
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  try {
    req.todo = await Todo.findById(id);
  } catch {
    console.error("malformatted id");
  }
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  req.todo ? res.send(req.todo) : res.sendStatus(404);
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  const newData = { text: req.body.text, done: req.body.done };
  const update = await Todo.findByIdAndUpdate(req.todo, newData, { new: true });
  req.todo
    ? update
      ? res.send(update)
      : res.send("error")
    : res.sendStatus(404);
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
