import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../src/App.css";
import { useHistory } from "react-router-dom";
function Mypage() {
  let history = useHistory();
  const [img, setimg] = useState(null);
  const [username, setusername] = useState(null);
  const [birth, setbirth] = useState(null);
  const [firstdate, setfirstdate] = useState(null);
  const [change, setchange] = useState(false);
  useEffect(() => {
    axios.get("/first/auth").then((res) => {
      if (res.data.isAuth === false) {
        alert("로그아웃 되었습니다");
        history.push("/login");
      }
      setimg(res.data.profileimage);
      setusername(res.data.username);
      let newbirth = res.data.birth.slice(0, 10);
      setbirth(newbirth);
      let newfirstdate = res.data.firstdate.slice(0, 10);
      setfirstdate(newfirstdate);
    });
  }, []);

  const logout = () => {
    axios.get("/first/logout").then((res) => {
      if (res.data.isAuth === true) {
        alert("로그아웃!!");
        history.push("/login");
      } else {
        alert("로그아웃 실패");
      }
    });
  };

  return (
    <div className="Mypage-body">
      <div className="Mypage-profile">
        <div className="profileimgyo">
          <img src={img} className="user-profileimg" />
        </div>
        <div className="Mypage-form">
          <div>
            <div className="Mypage-weak">이름</div>
            <p className="Mypage-bold">{username}</p>
            <div className="Mypage-bold">생일</div>
            <p className="Mypage-high">{birth}</p>
          </div>
          <p className="Mypage-weak">계정 연결 정보</p>
          <div className="Mypage-bold">처음 만난 날 </div>
          <p className="Mypage-high">{firstdate}</p>
          <div className="Mypage-bold">내 계정</div>
          {/* <p className="Mypage-weak">{email}</p> */}
          <p className="Mypage-weak MyPage-hr"></p>
          <div className="btn-Mypage-form">
            <div class="btn-mypage">
              <button type="button" className="btn-logout" onClick={logout}>
                Logout
              </button>
            </div>
            {/* <div class="btn-mypage"><button type="button" className="btn-pwChange" onClick={pwdChange}>Change Password</button></div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mypage;
