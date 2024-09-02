import { atom } from "recoil";

const editTaskAtom = atom({
  key: "editTaskAtom", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export default editTaskAtom;
