const Todo = require("../models/Todo");

const createTodo = async (req, res) => {
  if (!req.body.todo) {
    res.status(400).send({ message: "Please fill the input" });
  }
  const { todo } = req.body;
  const user = new Todo({
    todo,
  });

  await user
    .save()
    .then((data) => {
      res.send({
        message: "Todo created successfully!!",
        user: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating user",
      });
    });
};
const getAllTodo = async (req, res) => {
  try {
    const states = await Todo.find();
    res.send({
      Todo: states,
      message: "Todo Fetch Successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const deleteTodo = async (req, res) => {
  try {
    // Check if the state exists
    const deletedResource = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedResource) {
      return res.status(404).json({ error: "Resource not found" });
    }

    res.status(200).send({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateTodo = async (req, res) => {
  try {
    const stateId = req.params.id;
    const { todo } = req.body; // Extracting 'todo' from req.body

    // Find the state by its ID
    const state = await Todo.findById(stateId);
    if (!state) {
      return res.status(404).send({ error: "Todo not found" });
    }

    // Update the 'todo' field
    if (todo !== undefined) {
      state.todo = todo;
    } else {
      return res.status(400).send({ error: "Please provide the todo value" });
    }

    // Save the updated state
    await state.save();

    res.status(200).send({
      state,
      message: "Todo updated successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createTodo, getAllTodo, deleteTodo, updateTodo };
