import React, { useEffect, useState } from "react";
import Navbar from "../pages/Navbar";
import TodoServices from "../Service/TodoService";
import Spinner from "../Layout/Spinner";
import "./TodoList.css"; 

const TodoList = () => {
  const [todoStatus, setTodosStatus] = useState("");
  const [filterdTask, setFilterdTask] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allTask, setAllTask] = useState([]);

  // Get user todos
  const userData = JSON.parse(localStorage.getItem("todoapp"));
  const id = userData?.user?.id;

  const getUserTask = async () => {
    setLoading(true);
    try {
      const { data } = await TodoServices.getAllTodo(id);
      setAllTask(data?.todos);
      filterTasks(data?.todos, todoStatus);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Filter tasks based on status
  const filterTasks = (tasks, status) => {
    if (status === "incomplete") {
      setFilterdTask(tasks?.filter((task) => task?.isCompleted === false));
    } else if (status === "completed") {
      setFilterdTask(tasks?.filter((task) => task?.isCompleted === true));
    } else {
      setFilterdTask(tasks);
    }
  };

  useEffect(() => {
    getUserTask();
  }, []);

  useEffect(() => {
    filterTasks(allTask, todoStatus);
  }, [todoStatus, allTask]);

  return (
    <>
      <Navbar />
      <div className="filter-container">
        <h4>Filter Todos by:</h4>
        <div className="filter-group">
          <select
            value={todoStatus}
            onChange={(e) => setTodosStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="incomplete">Incomplete</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {loading && <Spinner />}

      <div className="card-container">
        {filterdTask?.length === 0 ? (
          <h1 className="no-task">No task found</h1>
        ) : (
          filterdTask?.map((task, index) => (
            <div className="card" key={index}>
              <div className="card-header">
                <div className="chead">
                  <h6>{task?.title.substring(0, 10)}</h6>
                  <h6 className={task?.isCompleted ? "task-cmp" : "task-inc"}>
                    {task?.isCompleted ? "Completed" : "Incomplete"}
                  </h6>
                </div>
              </div>
              <div className="card-body">
                <h6>{task?.title}</h6>
                <p>{task?.description}</p>
                <h6>Date: {task?.createdAt.substring(0, 10)}</h6>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default TodoList;