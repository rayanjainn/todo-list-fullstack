import React, { useEffect } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
//recoil
import { useRecoilState } from "recoil";
import searchTextAtom from "../../recoil/searchTextAtom";

const SearchBar = () => {
  const [inputData, setInputData] = useRecoilState(searchTextAtom);

  useEffect(() => {
    console.log(inputData);
  }, [inputData]);

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="   Search..."
        className="search-bar"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
      />
      <div className="search-icon">
        <SearchRoundedIcon fontSize="large" />
      </div>
    </div>
  );
};

export default SearchBar;
