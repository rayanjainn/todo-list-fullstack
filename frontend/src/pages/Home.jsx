import React, { useEffect } from "react";
import Header from "../components/home/Header";
import "./home.css";
import SearchBar from "../components/home/SearchBar";
import Filters from "../components/home/Filters";
import Todos from "../components/home/Todos";
import AddTask from "../components/home/AddTask";
//recoil
import { useRecoilState } from "recoil";
import addTaskAtom from "../recoil/addTaskAtom";
import apiDataAtom from "../recoil/apiDataAtom";
import todoDataAtom from "../recoil/todoDataAtom";
import editTaskAtom from "../recoil/editTaskAtom";
import EditTask from "../components/home/EditTask";
import filterDataAtom from "../recoil/filterDataAtom";

const Home = () => {
  //global variables
  const [addTaskOverlay, setAddTaskOverlay] = useRecoilState(addTaskAtom);
  const [apiData, setApiData] = useRecoilState(apiDataAtom);
  const [todoApiData, setTodoApiData] = useRecoilState(todoDataAtom);
  const [selectedEditTask, setSelectedEditTask] = useRecoilState(editTaskAtom);
  const [filterData, setFilterData] = useRecoilState(filterDataAtom);

  //local variables
  const homeData = {
    stats: [
      { label: "All", value: 10 },
      { label: "Completed", value: 4 },
      { label: "In Progress", value: 6 },
      { label: "Archived", value: 2 },
    ],
    todo_data: [
      {
        title: "Title1",
        desc: "decs1Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam odio ad rerum hic incidunt quam, repudiandae ipsam non! Unde, qui?",
        status: "Completed",
      },
      {
        title: "Title2",
        desc: "decs2",
        status: "In Progress",
      },
      {
        title: "Title3",
        desc: "decs3",
        status: "Archived",
      },
      {
        title: "Title4",
        desc: "decs4",
        status: "Archived",
      },
    ],
  };

  //initial call to get apidata

  useEffect(() => {
    fetch("http://127.0.0.1:8000/initial_call", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setApiData(data);
        setTodoApiData(data?.todo_data);
        setFilterData(data?.stats);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <div className="relative">
      {addTaskOverlay && (
        <div>
          {/* overlay */}
          <div
            className="add-overlay"
            onClick={() => setAddTaskOverlay(null)}
          ></div>

          {/* add task */}
          <AddTask />
        </div>
      )}
      {selectedEditTask && (
        <div>
          {/* overlay */}
          <div
            className="add-overlay"
            onClick={() => setSelectedEditTask(null)}
          ></div>

          {/* add task */}
          <EditTask />
        </div>
      )}

      <div className="home-container">
        <Header />
        <SearchBar />
        <Filters />
        <Todos />
      </div>
    </div>
  );
};

export default Home;
