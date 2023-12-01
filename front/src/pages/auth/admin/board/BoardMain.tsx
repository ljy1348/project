import React, { useEffect, useState } from 'react'
import { Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { useNavigate } from 'react-router-dom';
import AdminNotice from './AdminNotice';
import AdminNoticeEdit from './AdminNoticeEdit';

function BoardMain() {
    const { user: currentUser } = useSelector((state:RootState)=> state.auth);
  
    const [selectTab, setSelectTab] = useState("");
    const navi = useNavigate();
  
    useEffect(()=>{
      if (currentUser?.memberAuth !="ROLE_ADMIN") navi("/");
    },[])
  
    const tabView = () => {
      if (selectTab==="공지사항 수정/삭제") return <AdminNotice />
      else if (selectTab==="공지사항 작성") return <AdminNoticeEdit />
    }
  
    return (
      <div>
         
        <div className='container'>
  
        <Nav fill variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
  
          <Nav.Link eventKey="link-0" onClick={()=>{setSelectTab("공지사항 수정/삭제")}}>공지사항 수정/삭제</Nav.Link>
  
        </Nav.Item>
        <Nav.Item>
  
          <Nav.Link eventKey="link-1" onClick={()=>{setSelectTab("공지사항 작성")}}>공지사항 작성</Nav.Link>
  
        </Nav.Item>
      </Nav>
        {tabView()}
        </div>
      </div>
    )
  }


export default BoardMain