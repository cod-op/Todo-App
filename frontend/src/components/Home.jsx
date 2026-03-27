import React, { useEffect, useState } from "react";
import Navbar from "../pages/Navbar";
import TaskModal from "../Layout/Taskmodal";
import TodoServices from "../Service/TodoService";
import Card from "../Cards/Card";
import Spinner from "../Layout/Spinner";
import "./Home.css"; 

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [allTask, setAllTask] = useState([]);

  // Open modal
  const openModalHandler = () => setShowModal(true);

  // Search tasks
  const handleSearch = (e) => {
    const query = e.target.value;
    let filterList = allTask?.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setSearchQuery(query);
    if (query && filterList.length > 0) {
      setAllTask(filterList);
    } else {
      getUserTask();
    }
  };

  // Get user todos
  const userData = JSON.parse(localStorage.getItem("todoapp"));
  const id = userData?.user?.id;

  const getUserTask = async () => {
    setLoading(true);
    try {
      const { data } = await TodoServices.getAllTodo(id);
      setAllTask(data?.todos);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserTask();
  }, []);

  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="task-header">
          <h1>Your Tasks</h1>
          <div className="task-controls">
            <input
              type="search"
              placeholder="Search your task"
              value={searchQuery}
              onChange={handleSearch}
              className="search-input"
            />
            <button className="add-task-btn" onClick={openModalHandler}>
              Create Task +
            </button>
          </div>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <Card allTask={allTask} getUserTask={getUserTask} />
        )}

        <TaskModal
          getUserTask={getUserTask}
          showModal={showModal}
          setShowModal={setShowModal}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
        />
      </div>
    </>
  );
};

export default HomePage;