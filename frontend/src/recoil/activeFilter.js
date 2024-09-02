import { atom } from "recoil";

const activeFilter = atom({
  key: "activeFilter", // unique ID (with respect to other atoms/selectors)
  default: "All", // default value (aka initial value)
});

export default activeFilter;
