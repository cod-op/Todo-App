const todoModel = require("../models/todoModel");

// CREATE TODO
const createTodoController = async (req, res) => {
  try {
    const { title, description, createdBy } = req.body;
   
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "please provide title and description",
      });
    }
    const todo = new todoModel({ title, description,createdBy });
    const result = await todo.save();
    res.status(201).json({
      success: true,
      message: "your task has been created",
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "erorr in create todo api",
       error: error.message,
    });
  }
};

//GET TODO
const getTodoController = async (req, res) => {
  try {
    //get user id
    const { userId } = req.params;
    //validate
    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "No User Found with this id",
      });
    }
    //find task
    const todos = await todoModel.find({ createdBy: userId });
    if (!todos) {
      return res.status(404).json({
        success: true,
        message: "you have no todos ",
      });
    }
    res.status(200).json({
      success: true,
      message: "Your Todos",
      todos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error In Get Todo API",
      error,
    });
  }
};

//delete api
const deleteTodoController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({
        success: false,
        message: "No todo found with this id",
      });
    }
    //find id
    const todo = await todoModel.findByIdAndDelete({ _id: id });
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "No task found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Your Task Has Been Deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      message: "Error in dlete todo api",
    });
  }
};

//Update todo
const updateTodoController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({
        success: false,
        message: "please prvide todo id",
      });
    }
    const data = req.body;
    //updte
    const todo = await todoModel.findByIdAndUpdate(
      id,
      { $set: data },
      { returnOriginal: false }
    );
    res.status(200).json({
      success: true,
      message: "your task has been updated",
      todo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      message: "Error In Update Todo Api",
    });
  }
};

module.exports = {
  createTodoController,
  getTodoController,
  deleteTodoController,
  updateTodoController,
};