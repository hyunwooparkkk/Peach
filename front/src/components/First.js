import { useState } from "react";
import { React, useEffect } from "react";
import { Link } from "react-router-dom";
import apeach from "../images/apeach_star.gif";
import "../App.css";

function First() {
  console.log("부모렌더링");

  useEffect(() => {
    console.log("부모리렌더링");
  });
  
  const [exit, setexit] = useState(false);
  const onchange = () => {
    setexit(true);
  };
  return (
    <div className="first-body">
      <div className="first-form">
        <div className="first-img">
      <img src={apeach} className="first-thum"></img>
      <p className="first-welcome">Welcome to APEACH !</p>
      </div>
        <div id="first-form2">
          <Link className="first-login"
            to="/login">
            Login
          </Link>
        </div>
        <div className="first-register-info">
          <p>
            아직 아이디가 없으신가요?
            <br />
            <Link className="first-register-button"
              to="/register"
              className="register_login"
              onClick={onchange}>
              Sign-up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default First;
