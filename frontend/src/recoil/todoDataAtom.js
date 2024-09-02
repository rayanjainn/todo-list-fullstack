import { atom } from "recoil";

const todoDataAtom = atom({
  key: "todoDataAtom", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export default todoDataAtom;
