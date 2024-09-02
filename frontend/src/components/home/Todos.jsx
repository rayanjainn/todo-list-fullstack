import React from "react";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
//recoil
import { useRecoilState } from "recoil";
import searchTextAtom from "../../recoil/searchTextAtom";
import todoDataAtom from "../../recoil/todoDataAtom";
import activeFilter from "../../recoil/activeFilter";
import editTaskAtom from "../../recoil/editTaskAtom";
import filterDataAtom from "../../recoil/filterDataAtom";

const Todos = () => {
  //global variables
  const [todoApiData, setTodoApiData] = useRecoilState(todoDataAtom);
  const [activeFilterValue, setActiveFilterValue] =
    useRecoilState(activeFilter);

  const [selectedEditTask, setSelectedEditTask] = useRecoilState(editTaskAtom);
  const [filterData, setFilterData] = useRecoilState(filterDataAtom);
  //local variables
  const [inputData, setInputData] = useRecoilState(searchTextAtom);

  return (
    <div className="todo-main-container">
      <div>
        {todoApiData
          ?.filter((filtered_data) => {
            if (inputData === "") {
              return filtered_data;
            } else if (
              filtered_data?.title
                ?.toLowerCase()
                ?.includes(inputData?.toLowerCase())
            ) {
              return filtered_data;
            }
          })
          ?.map((data, index) => {
            return (
              <div key={index} className="todo-card">
                <div>
                  <div
                    onClick={() => {
                      const bodyData = {
                        id: data?.id,
                      };
                      fetch("http://127.0.0.1:8000/complete_task", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(bodyData),
                      })
                        .then((response) => response.json())
                        .then((res) => {
                          console.log(res);
                          setTodoApiData(res?.todo_data);
                          setFilterData(res?.stats);
                        })
                        .catch((error) => {
                          console.log("Error", error);
                        });
                    }}
                    className={` ${
                      data?.status === "Completed"
                        ? "checkbox-active"
                        : "checkbox"
                    } `}
                  ></div>
                </div>
                <div className="todo-content-container">
                  <div className="todo-card-header">
                    <h2
                      className={` ${
                        data?.status === "Completed"
                          ? "completed-todo-title"
                          : "todo-title"
                      } `}
                    >
                      {data?.title}
                    </h2>
                    {activeFilterValue === "All" && (
                      <div className="icon-container">
                        <ArchiveOutlinedIcon
                          className="archive"
                          onClick={() => {
                            const bodyData = {
                              id: data?.id,
                            };
                            fetch("http://127.0.0.1:8000/archive_task", {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify(bodyData),
                            })
                              .then((response) => response.json())
                              .then((res) => {
                                console.log(res);
                                setTodoApiData(res?.todo_data);
                                setFilterData(res?.stats);
                              })
                              .catch((error) => {
                                console.log("Error", error);
                              });
                          }}
                        />
                        <BorderColorOutlinedIcon
                          className="edit"
                          onClick={() => {
                            setSelectedEditTask({
                              id: data?.id,
                              title: data?.title,
                              desc: data?.desc,
                            });
                          }}
                        />
                        <DeleteOutlineOutlinedIcon
                          className="delete"
                          onClick={() => {
                            const bodyData = {
                              id: data?.id,
                            };
                            fetch("http://127.0.0.1:8000/delete_task", {
                              method: "DELETE",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify(bodyData),
                            })
                              .then((response) => response.json())
                              .then((res) => {
                                console.log(res);
                                setTodoApiData(res?.todo_data);
                                setFilterData(res?.stats);
                              })
                              .catch((error) => {
                                console.log("Error", error);
                              });
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <p className="todo-desc">{data?.desc}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Todos;
