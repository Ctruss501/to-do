import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

const ToDo = ({ toDo, markDone, setUpdateData, deleteTask }) => {
  return (
    <>
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
                    {/* Display To-Do number */}
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
    </>
  );
};

export default ToDo;
