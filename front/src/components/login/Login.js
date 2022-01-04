import React from "react";
import { useState } from "react";
import axios from "axios";

import { useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";
import { registeremail } from "../../actions/reg";
import apeachCake from "../../images/apeach_cake.gif";
import "../../App.css";
function Login() {
  let history = useHistory();
  const [help, sethelp] = useState(null);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const eonChange = (e) => {
    setemail(e.target.value);
  };
  const ponChange = (e) => {
    setpassword(e.target.value);
  };
  const onsubmit = (e) => {
    e.preventDefault();
    axios
      .post("/first/login", { email: email, password: password })
      .then((res) => {
        if (res.data.loginSuccess === true) {
          history.push("/mainpage");
        } else {
          alert(res.data.message);
        }
      });
  };
  return (
    <div className="Login-body">
      <div className="Login-info">
        
        <form className="Login-form"
          onSubmit={onsubmit}
        >
          <div className="Login-img">
          <img src={apeachCake} className="Login-thum"></img>
        </div>
          <div
            style={{
              textAlign: "center",
            }}
          >
            <div>
              <li className="Login-li Login-li1">
              <label>E-mail :</label>
              <input className="Login-input"
                type="email"
                value={email}
                onChange={eonChange}
                
                placeholder="이메일을 입력해주세요"
              ></input>
              </li>
              <li className="Login-li">
              <label>Password :</label>
              <input className="Login-input"
                type="password"
                value={password}
                onChange={ponChange}
               
                placeholder="비밀번호를 입력해주세요"
              ></input>
              </li>
              <button type="submit" className="Login-button">
            로그인
          </button>
            </div>
          </div>
          
         
        </form>
        <div className="btn-login-form">
          <button
          className="Login-missing-button"
          onClick={() => {
            sethelp(true);
          }}
        >
          비밀번호를 잊어버렸습니다
        </button>
        </div>
        {help === true ? <Modal></Modal> : null}   
        
      </div>
     
    </div>
  );
}

function Modal() {
  let history = useHistory();
  const [email, setemail] = useState("");
  const [check, setcheck] = useState(false);
  const [checkuser, setcheckuser] = useState("");
  const dispatch = useDispatch();

  const findmypassword = () => {
    axios.post("/first/findmypassword", { email: email }).then((res) => {
      alert(res.data.text);
      setcheck(res.data.check);
    });
  };

  const sendemail = (e) => {
    e.preventDefault();
    axios.post("/first/sendemail", { checkuser: checkuser }).then((res) => {
      if (res.data.auth == true) {
        dispatch(registeremail(email));
        history.push("/passwordchange");
      } else {
        alert("인증번호를 정확하게 입력해주세요!");
      }
    });
  };

  const changecheck = (e) => {
    setcheckuser(e.target.value);
  };

  return (
    <div className="Login-missing">
      E-mail:
      <input className="missing-input"
        type="text"
        value={email}
        placeholder="찾을 이메일 주소"
        onChange={(e) => {
          setemail(e.target.value);
        }}
      ></input>
      <button onClick={findmypassword} className="btn-find-pw">비밀 번호 찾기</button>
      
      {check === true ? (
        <input value={checkuser} onChange={changecheck}></input>
      ) : null}
      {check === true ? (
        <button onClick={sendemail}>인증번호확인</button>
      ) : null}
    </div>
  );
}
export default Login;
