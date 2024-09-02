import React, { useRef } from "react";
//recoil
import { useRecoilState } from "recoil";
import addTaskAtom from "../../recoil/addTaskAtom";
import todoDataAtom from "../../recoil/todoDataAtom";
import filterDataAtom from "../../recoil/filterDataAtom";

const AddTask = () => {
  //global variables
  const [addTaskOverlay, setAddTaskOverlay] = useRecoilState(addTaskAtom);
  const [todoApiData, setTodoApiData] = useRecoilState(todoDataAtom);
  const [filterData, setFilterData] = useRecoilState(filterDataAtom);
  //local variables
  const titleRef = useRef(null);
  const descRef = useRef(null);

  const addTaskHandler = (e) => {
    e.preventDefault();
    const data = {
      title: titleRef?.current?.value,
      desc: descRef?.current?.value,
    };
    fetch("http://127.0.0.1:8000/create_todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAddTaskOverlay(false);
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
        <h1>New Task</h1>
        <form onSubmit={addTaskHandler} className="add-task-form">
          <input ref={titleRef} type="text" placeholder="Title" />
          <textarea
            ref={descRef}
            cols="30"
            rows="10"
            placeholder="Description"
          ></textarea>
          <button>Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
