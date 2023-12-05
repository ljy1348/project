import React, { useEffect, useState } from 'react'
import initCustom from '../../../assets/js/custom'
import { Button, Form, Modal, Nav } from 'react-bootstrap';
import '../../../assets/css/login.css';
import IUser from '../../../types/auth/IMember';
import AuthService from '../../../services/auth/authService';
import { RootState, useAppDispatch } from '../../../store/store';
import { useSelector } from 'react-redux';
import UserInfoList from './UserInfoList';
import UserReservationList from './UserReservationList';
import UserPaymentList from './UserPaymentList';
import { ErrorMessage, Field, Formik } from 'formik';
import DaumPostcode from "react-daum-postcode";
import DatePicker from "react-datepicker";
import initScripts from '../../../assets/js/scripts';
import { register } from '../../../store/slices/auth';
import * as Yup from "yup";
import PasswordChage from './PasswordChage';

function UserInfo() {

  const { user: currentUser } = useSelector((state:RootState)=> state.auth);
  const [user, setUser] = useState<IUser>();
  const [selectedTab, setSelectedTab] = useState(""); 
  const [message, setMessage] = useState("");

  const viewTab = () => { 
    
    if (selectedTab === "reservation") return <><UserReservationList></UserReservationList></>
    else if (selectedTab === "payment") return <><UserPaymentList/></>
    else if (selectedTab ==="userInfo") return <><UserInfoList user={user!} setMessage={setMessage}/></>
    else if (selectedTab ==="password") return <><PasswordChage/></>
    else return <></>
   }

  useEffect(() => {
    initScripts();
    initCustom();
    if (!currentUser) window.location.href = "/";
  }, []);

  


  useEffect(()=>{
    console.log(currentUser)
    if (currentUser?.memberId)
    AuthService.getUserInfo(currentUser.memberId)
  .then((response:any)=>{console.log(response);
  setUser(response.data)
  setSelectedTab("userInfo")
})
  .catch((e:Error)=>{console.log(e)})
  },[message])

  return (
    <div className='user-info'>
<div className="user-info-hero user-info-hero-inner hero-box">
  <div className="container">
    <div className="align-items-center">
      <div className="mx-auto text-center">
        <div className="intro-wrap container">
          <ul className='row'>
            <li className='hero-user-info col-3 mt-5'><span className='hero-title'></span>
            <br/>
            {/* <ul style={{marginTop:"10px"}}>
              <li>name : {user&&user.memberName}</li>
              <li>phone : {user&&user.memberPhone}</li>
              <li>email : {user&&user.memberEmail}</li>
            </ul> */}
            </li>
            <div className="hero-mile col-6">
              <br/><br/><br/>
    <div className="circle">


            <li className='mt-5'><span className='hero-title'>잔여 마일리지</span>
            <br/><br/>
            <ul>
              <li> {user&&user.memberMile}</li>
            </ul>
            </li>
            </div>
            </div>
            {/* <li className='hero-count col-3 mt-5'><span className='hero-title'>예약 횟수</span>
            <br/><br/>
            <ul>
              <li> 0</li>
            </ul>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
  <div className='container'>
  <Nav fill variant="tabs" defaultActiveKey="link-0">
      <Nav.Item>
        <Nav.Link eventKey="link-0" className='user-info-nav' onClick={()=>setSelectedTab("userInfo")}>회원 정보</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1" className='user-info-nav' onClick={()=>setSelectedTab("password")}>
          비밀번호 변경
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2" className='user-info-nav' onClick={()=>setSelectedTab("payment")}>예약 내역</Nav.Link>
      </Nav.Item>
    </Nav>
    {viewTab()}
  </div>
  <div className='container text-center text-success'>
    {message}
  </div>
  </div>
  )
}

export default UserInfo