import React from "react";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import apeachHug from "../../images/apeach_hug.gif";
function Subinformation() {
  const email = useSelector((store) => store.registeremailReducer.email);
  let history = useHistory();
  const [imgFile, setImgFile] = useState(null);
  const [Sex, setSex] = useState("");
  const [Username, setUsername] = useState("");
  const [Birth, setBirth] = useState("");
  const [FirstDate, setFirstDate] = useState("");
  const [imgBase64, setImgBase64] = useState("");

  const handleChangeFile = (event) => {
    let reader = new FileReader();

    reader.onloadend = () => {
      // 2. 읽기가 완료되면 아래코드가 실행됩니다.
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString()); // 파일 base64 상태 업데이트
      }
    };
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
      setImgFile(event.target.files[0]); // 파일 상태 업데이트
    }
  };

  const onsubmit = (e) => {
    e.preventDefault();

    if (
      Birth === "" ||
      FirstDate === "" ||
      Sex === "" ||
      FirstDate === "" ||
      imgFile === null
    ) {
      alert("모두 입력 해주세요!");
    } else {
      const formData = new FormData();
      formData.append("Email", email);
      formData.append("Sex", Sex);
      formData.append("Username", Username);
      formData.append("Birth", Birth);
      formData.append("FirstDate", FirstDate);
      formData.append("file", imgFile);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      return axios
        .post("/first/subinformation", formData, config)

        .then((res) => {
          alert("회원가입 성공");
          history.push("/login");
        })
        .catch((err) => {});
    }
  };

  return (
    <div className="connect-body">
      <div>
        <img src={apeachHug} className="connect-thum"></img>
      </div>
      <form onSubmit={onsubmit}>
        <div>
          <img
            src={imgBase64}
            style={{
              backgroundColor: "#efefef",
              width: "157px",
              height: "150px",
            }}
          ></img>
          <span><input type="file" name="file" onChange={handleChangeFile} className="btn-connect-file"></input></span>
        </div>
        <div className="connect-form">
        <li className="connect-sex connect-li" >
          <label>Gender : </label>
          <span>
            male
            <input className="connect-input"
              type="radio"
              name="sex"
              value="남성"
              onClick={(e) => {
                setSex(e.target.value);
              }}
            />
          </span>
          <span>
            female
            <input className="connect-input"
              type="radio"
              name="sex"
              value="여성"
              onClick={(e) => {
                setSex(e.target.value);
              }}
            />
          </span>
        </li>
        <li className="connect-li"> <label>Name : </label>
        <input className="connect-input"
          type="text"
          value={Username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></input>
        </li>
        <li className="connect-li"><label>Birth : </label>
        <input className="connect-input"
          type="date"
          onChange={(e) => {
            setBirth(e.target.value);
          }}
        ></input>
        </li>
        
        <li className="connect-li"><label>First date : </label>
        <input className="connect-input"
          type="date"
          onChange={(e) => {
            setFirstDate(e.target.value);
          }}
        ></input>
        </li>
        </div>
        <button className="btn-connect-reg"type="submit">작성완료</button>
      </form>
    </div>
  );
}

export default Subinformation;
