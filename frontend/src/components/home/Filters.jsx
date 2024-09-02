import React, { useEffect } from "react";
import { filterEndpoints } from "../../helper/filter";
//recoil
import todoDataAtom from "../../recoil/todoDataAtom";
import { useRecoilState } from "recoil";
import activeFilter from "../../recoil/activeFilter";
import filterDataAtom from "../../recoil/filterDataAtom";

const Filters = (props) => {
  //global variable
  const [todoApiData, setTodoApiData] = useRecoilState(todoDataAtom);
  const [activeFilterValue, setActiveFilterValue] =
    useRecoilState(activeFilter);
  const [filterData, setFilterData] = useRecoilState(filterDataAtom);

  useEffect(() => {
    console.log(todoApiData);
  }, [todoApiData]);

  return (
    <div>
      <div className="filter-container">
        {filterData?.map((data, index) => {
          return (
            <div
              key={index}
              className="filter-btn-container"
              onClick={() => {
                setActiveFilterValue(data?.label);
              }}
            >
              <button
                onClick={() => {
                  fetch(
                    "http://127.0.0.1:8000/" + filterEndpoints[index]?.endpoint,
                    {
                      method: "GET",
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  )
                    .then((response) => response.json())
                    .then((data) => {
                      setTodoApiData(data?.todo_data);
                    })
                    .catch((error) => {
                      alert(error);
                    });
                }}
                className={`${
                  activeFilterValue === data?.label ? "active-filter" : ""
                }`}
              >
                <h4>{data?.label}</h4>
                <p>{data?.value}</p>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Filters;
