import React, { useRef } from "react";
import { useRecoilState } from "recoil";
import addTaskAtom from "../../recoil/addTaskAtom";
import todoDataAtom from "../../recoil/todoDataAtom";
import editTaskAtom from "../../recoil/editTaskAtom";
import filterDataAtom from "../../recoil/filterDataAtom";

const EditTask = () => {
  //global variables
  const [addTaskOverlay, setAddTaskOverlay] = useRecoilState(addTaskAtom);
  const [todoApiData, setTodoApiData] = useRecoilState(todoDataAtom);
  const [selectedEditTask, setSelectedEditTask] = useRecoilState(editTaskAtom);
  const [filterData, setFilterData] = useRecoilState(filterDataAtom);
  //local variables
  const titleRef = useRef(null);
  const descRef = useRef(null);

  const editTaskHandler = (e) => {
    e.preventDefault();
    const data = {
      id: selectedEditTask?.id,
      title: titleRef?.current?.value,
      desc: descRef?.current?.value,
    };
    fetch("http://127.0.0.1:8000/update_task", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSelectedEditTask(false);
        setTodoApiData(data?.todo_data);
        setFilterData(data?.stats);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  return (
    <div className="add-task-container">
      <div className="add-task-content">
        <h1>Edit Task</h1>
        <form onSubmit={editTaskHandler} className="add-task-form">
          <input
            ref={titleRef}
            type="text"
            placeholder="Title"
            defaultValue={selectedEditTask?.title}
          />
          <textarea
            ref={descRef}
            cols="30"
            rows="10"
            placeholder="Description"
            defaultValue={selectedEditTask?.desc}
          ></textarea>
          <button>Add</button>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
