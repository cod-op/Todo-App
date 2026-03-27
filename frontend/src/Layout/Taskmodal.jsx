
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import TodoServices from "../Service/TodoService";
import { FaTimes } from "react-icons/fa";
import "./Taskmodal.css";

const TaskModal = ({ task, getUserTask, showModal, setShowModal }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setIsCompleted(task.isCompleted || false);
    } else {
      setTitle("");
      setDescription("");
      setIsCompleted(false);
    }
  }, [task]);

  const handleClose = () => setShowModal(false);

  const handleSubmit = async () => {
    try {
      if (!title || !description) {
        return toast.error("Please provide title or description");
      }

      const userData = JSON.parse(localStorage.getItem("todoapp"));
      const createdBy = userData?.user?.id;

      const data = { title, description };
      if (task) data.isCompleted = isCompleted;

      if (task) {
        await TodoServices.updateTodo(task._id, data);
        toast.success("Task Updated Successfully");
      } else {
        data.createdBy = createdBy;
        await TodoServices.createTodo(data);
        toast.success("Task Created Successfully");
      }

      getUserTask();
      handleClose();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h3>{task ? "Edit Task" : "Add New Task"}</h3>
              <button className="close-btn" onClick={handleClose}>
                <FaTimes />
              </button>
            </div>

            <div className="modal-body">
              <label>Title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

              <label>Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

              {task && (
                <>
                  <label>Status</label>
                  <select value={isCompleted} onChange={(e) => setIsCompleted(e.target.value === "true")}>
                    <option value="true">Completed</option>
                    <option value="false">Incomplete</option>
                  </select>
                </>
              )}
            </div>

            <div className="modal-footer">
              <button className="btn cancel" onClick={handleClose}>Close</button>
              <button className="btn create" onClick={handleSubmit}>{task ? "Update" : "Create"}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskModal;