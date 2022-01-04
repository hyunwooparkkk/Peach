import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { registeremail } from "../../actions/reg";
import "../../App.css";
import apeachFlower from "../../images/apeach_flower.gif"
function Register(props) {
  let history = useHistory();

  const [inputs, setinputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    setinputs({
      ...inputs,
      [name]: value,
    });
  };

  const onsubmit = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      alert("비밀번호는 6자 이상 작성 해주세요 ");
    } else {
      console.log(email, password);
      props.registeremail(email);
      axios
        .post("/first/register", { email: email, password: password })
        .then((res) => {
          res.data.success === true
            ? history.push("/code")
            : alert(res.data.message);
        });
    }
  };

  return (
    <div className="Register-body">
      <form onSubmit={onsubmit} className="Register-form">
      <div className="Register-img">
          <img src={apeachFlower} className="Register-thum"></img>
        </div>
        <span className="Register-word">PEACH에 처음 오신 것을 환영 합니다!</span>
      <p className="Register-word">회원으로 가입해주세요</p>
      <div className="Register-info">
        <li className="Register-li Register-li1">
          <label>E-mail : </label>
        <input className="Register-input"
          type="text"
          name="email"
          placeholder="이메일을 입력해주세요"
          value={email}
          onChange={onChange}
        ></input>
        </li>
        <li className="Register-li">
        <label>Password : </label>
        <input className="Register-input"
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={onChange}
        ></input>
        </li>
        </div>
        <button type="submit" className="btn-register">Sign up</button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    state: state,
  };
};
const mapDispatchToProps = {
  registeremail,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
