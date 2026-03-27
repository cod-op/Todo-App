
import React, { useState } from "react";
import EditTodo from "../Layout/Taskmodal";
import { toast } from "react-toastify";
import TodoServices from "../Service/TodoService";
import "./Card.css";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Card = ({ allTask, getUserTask }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (task) => {
    setSelectedTask(task);
    setShowModal(true); // open modal
  };

  const handleDelete = async (id) => {
    try {
      await TodoServices.deleteTodo(id);
      toast.success("Task Deleted Successfully");
      getUserTask();
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  };

  return (
    <>
      <div className="card-container">
        {allTask?.map((task) => (
          <div className="card" key={task._id}>
            <div className="card-header">
              <h4>{task?.title.substring(0, 12)}</h4>
              <span className={task?.isCompleted ? "status done" : "status pending"}>
                {task?.isCompleted ? "Completed" : "Incomplete"}
              </span>
            </div>

            <div className="card-body">
              <p>{task?.description}</p>
              <small>Date: {task?.createdAt?.substring(0, 10)}</small>
            </div>

            <div className="card-footer">
              <button className="edit-btn" onClick={() => handleEdit(task)}>
                <FaPencilAlt />
              </button>

              <button className="delete-btn" onClick={() => handleDelete(task._id)}>
                <MdDelete />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {showModal && (
        <EditTodo
          task={selectedTask}
          showModal={showModal}
          setShowModal={setShowModal}
          getUserTask={getUserTask}
        />
      )}
    </>
  );
};

export default Card;