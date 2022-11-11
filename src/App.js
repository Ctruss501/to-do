import "./App.css";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  // Task state
  const [toDo, setToDo] = useState([]);

  // Temporary state
  const [newTask, setNewTask] = useState("");
  const [updateData, setUpdateData] = useState("");

  // Adding a new task
  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTask, status: false };
      setToDo([...toDo, newEntry]);
      setNewTask("");
    }
  };

  // Deleting a task
  const deleteTask = (id) => {
    let newTasks = toDo.filter((task) => task.id !== id);
    setToDo(newTasks);
  };
  // Marking a task as complete
  const markDone = (id) => {
    const newTasks = toDo.map((task) => {
      if (task.id === id) {
        return { ...task, status: !task.status };
      }
      return task;
    });
    setToDo(newTasks);
  };
  // Canceling a task update
  const cancelUpdate = () => {
    setUpdateData("");
  };
  // Changing a task being updated
  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false,
    };
    setUpdateData(newEntry);
  };
  // Updating a task
  const updateTask = () => {
    let filterRecords = [...toDo].filter((task) => task.id !== updateData.id);
    let updatedObject = [...filterRecords, updateData];
    setToDo(updatedObject);
    setUpdateData("");
  };

  document.body.style.backgroundColor = "#1f2521";
  document.body.style.color = "#0371b5";

  return (
    <div className="container App">
      <br />
      <br />
      <p>TO-DO</p>
      <br />
      <br />

      {updateData && updateData ? (
        <>
          <div className="row">
            <div className="col">
              <input
                value={updateData && updateData.title}
                onChange={(e) => changeTask(e)}
                className="form-control form-control-lg"
              />
            </div>
            <div className="col-auto">
              <button
                className="btn btn-lg btn-success mr-20"
                onClick={updateTask}
              >
                Update
              </button>
              <button className="btn btn-lg btn-warning" onClick={cancelUpdate}>
                Cancel
              </button>
            </div>
          </div>
          <br />
        </>
      ) : (
        <>
          <div className="row">
            <div className="col">
              <input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="form-control form-control-lg"
              />
            </div>
            <div className="col-auto">
              <button className="btn btn-lg btn-success" onClick={addTask}>
                Add Task
              </button>
            </div>
          </div>
          <br />
        </>
      )}

      {/* Display message if there are not tasks */}
      {toDo && toDo.length ? "" : "No tasks..."}

      {/* Displaying tasks */}
      {toDo &&
        toDo
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map((task, index) => {
            return (
              <React.Fragment key={task.id}>
                <div className="col taskBg">
                  <div
                    // If the status is true, add to done.
                    className={task.status ? "done" : ""}
                  >
                    {/* Display task number */}
                    <span className="taskNumber">{index + 1}</span>
                    <span className="taskText">{task.title}</span>
                  </div>

                  <div className="iconsWrap">
                    <span
                      onClick={(e) => markDone(task.id)}
                      title="Completed / Not Completed"
                    >
                      <div className="complete">
                        <FontAwesomeIcon icon={faCircleCheck} />
                      </div>
                    </span>

                    {task.status ? null : (
                      <span
                        title="Edit"
                        onClick={() =>
                          setUpdateData({
                            id: task.id,
                            title: task.title,
                            satus: task.status ? true : false,
                          })
                        }
                      >
                        <div className="edit">
                          <FontAwesomeIcon icon={faPen} />
                        </div>
                      </span>
                    )}

                    <span onClick={() => deleteTask(task.id)} title="Delete">
                      <div className="delete">
                        <FontAwesomeIcon icon={faTrashCan} />
                      </div>
                    </span>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
    </div>
  );
}

export default App;
