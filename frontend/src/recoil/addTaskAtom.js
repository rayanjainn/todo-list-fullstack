import { atom } from "recoil";

const addTaskAtom = atom({
  key: "addTaskAtom", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export default addTaskAtom;
