import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
//components
import Home from "./pages/Home";
import Login from "./pages/Login";
//recoil
import { useRecoilState } from "recoil";
import userInfoAtom from "./recoil/userInfoAtom";

function App() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);

  useEffect(() => {
    if (localStorage?.getItem("userStatus")?.includes(true)) {
      setUserInfo(true);
    } else {
      setUserInfo(false);
    }
  }, [setUserInfo]);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={userInfo === true ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={userInfo === false ? <Login /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;
