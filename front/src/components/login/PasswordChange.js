import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import {useSelector} from 'react-redux'
import { useHistory } from "react-router-dom";
function PasswordChange() {

    let history = useHistory();

    const email = useSelector((store) => store. registeremailReducer.email);
    const [password,setpassword]=useState("")
    const [confirmpassword,setconfirmpassword]=useState("")
    const pwdchange=(e)=>{
        setpassword(e.target.value)
    }
    const confirmpwdchange=(e)=>{
        setconfirmpassword(e.target.value)
    }
    const check=()=>{
        password===confirmpassword?axios.post('/first/updatepassword',{email:email,password:password})
        .then(res=>{if(res.data.success==true){alert("비밀번호 변경완료!");history.push('/login')}})
        :alert("비밀번호가 서로다릅니다")
    }
    return (
        <div>
            <h3>-새로운 비밀번호 설정-</h3>
        비밀번호 설정:<input type="password" value={password} onChange={pwdchange}></input>
        <p></p>
        비밀번호 확인:<input type="password" value={confirmpassword} onChange={confirmpwdchange}></input>
        <p></p>
        <button onClick={check}>비밀번호 등록</button>
        
        </div>
    )
}

export default PasswordChange