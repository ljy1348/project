import React, { useEffect, useRef, useState } from 'react'
import { Nav } from 'react-bootstrap'
import AdminMemberList from '../admin/AdminMemberList';
import AdminMember from '../admin/AdminMember';
import OperationInfoManager from '../admin/OperationInfo/OperationInfoManager';
import AddOperationInfo from '../admin/OperationInfo/AddOperationInfo';
import OperationInfo from '../admin/OperationInfo/OperationInfo';

function AdminPage() {

  const [selectTab, setSelectTab] = useState("");
  const [dataId, setDataId] = useState("");

  useEffect(()=>{
  },[])

  const tabView = () => {
    if (selectTab==="항공") return <OperationInfoManager setSelectTab={setSelectTab} setDataId={setDataId}/>
    else if (selectTab==="체크인") return <>체크인</>
    else if (selectTab==="수화물") return <>수화물</>
    else if (selectTab==="회원") return <AdminMemberList setSelectTab={setSelectTab} setDataId={setDataId}/>
    else if (selectTab==="회원상세") return <AdminMember setSelectTab={setSelectTab} dataId={dataId}/>
    else if (selectTab==="항공기 추가") return <AddOperationInfo setSelectTab={setSelectTab}/>
    else if (selectTab==="항공기 상세") return <OperationInfo setSelectTab={setSelectTab} dataId={dataId}/>
    else return <>예약</>
  }

  return (
    <div>
       <div className="hero hero-inner">
        <div className="container">
          <div className=" align-items-center">
            <div className="col-lg-6 mx-auto text-center">
              <div className="intro-wrap">
                <h1 className="mb-0">관리자</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>

      <Nav fill variant="tabs" defaultActiveKey="link-0">
      <Nav.Item>

        <Nav.Link eventKey="link-0" onClick={()=>{setSelectTab("예약")}}>예약 관리</Nav.Link>

      </Nav.Item>
      <Nav.Item>

        <Nav.Link eventKey="link-1" onClick={()=>{setSelectTab("항공")}}>항공기 관리</Nav.Link>

      </Nav.Item>
      <Nav.Item>

        <Nav.Link eventKey="link-2" onClick={()=>{setSelectTab("체크인")}}>체크인 관리</Nav.Link>

      </Nav.Item>
      <Nav.Item>

        <Nav.Link eventKey="link-3" onClick={()=>{setSelectTab("수화물")}}>
          수화물 관리
        </Nav.Link>
        </Nav.Item>
        <Nav.Item>
        <Nav.Link eventKey="link-4" onClick={()=>{setSelectTab("게시물")}}>
          게시판 관리
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-5" onClick={()=>{setSelectTab("회원")}}>
          회원 관리
        </Nav.Link>
      </Nav.Item>
    </Nav>
      {tabView()}
      </div>
    </div>
  )
}

export default AdminPage