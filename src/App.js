import "./App.css";
import { useState } from "react";
import ToDo from "./components/ToDo.jsx";
import AddToDo from "./components/AddToDo.jsx";
import UpdateToDo from "./components/UpdateToDo.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

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

      {/* Update To-Dos */}
      {updateData && updateData ? (
        <UpdateToDo
          updateData={updateData}
          changeTask={changeTask}
          updateTask={updateTask}
          cancelUpdate={cancelUpdate}
        />
      ) : (
        // Add To-Dos
        <AddToDo newTask={newTask} setNewTask={setNewTask} addTask={addTask} />
      )}

      {/* Display message if there are no To-Dos */}
      {toDo && toDo.length ? "" : "No tasks..."}

      {/* Display To-Dos */}
      <ToDo
        toDo={toDo}
        markDone={markDone}
        setUpdateData={setUpdateData}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default App;
