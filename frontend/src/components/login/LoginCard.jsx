import React, { useRef } from "react";
import { useRecoilState } from "recoil";
import userInfoAtom from "../../recoil/userInfoAtom";

const LoginCard = () => {
  //global variables
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);

  //local variables
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  //functions
  const onSubmit = (e) => {
    e.preventDefault();

    const usercredentials = {
      username: usernameRef?.current?.value,
      password: passwordRef?.current?.value,
    };
    fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usercredentials),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data?.message === "Successfully logined") {
          localStorage.setItem("userStatus", true);
          setUserInfo(true);
        } else {
          localStorage.setItem("userStatus", false);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  return (
    <div>
      <div className="login-card-container">
        <div>
          <h1 className="login-heading">ToDoX</h1>
        </div>
        <form onSubmit={onSubmit}>
          <input
            className="login-input"
            type="text"
            placeholder="Username"
            ref={usernameRef}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            ref={passwordRef}
          />
          <button className="login-button" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginCard;
