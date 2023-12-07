import React, { useEffect, useState } from 'react'
import IUser from '../../../types/auth/IMember';
import { Button, Modal } from 'react-bootstrap';
import DaumPostcode from "react-daum-postcode";
import AuthService from '../../../services/auth/authService';
import AdminService from '../../../services/auth/adminService';

function AdminMember({setSelectTab, dataId}:{setSelectTab:any, dataId:string}) {

    const [selectedDate, setSelectedDate] = useState("");
    const [getUser, setGetUser] = useState<IUser>();
    const [isModal, setIsModal] = useState(false);

    const onchangeInput = (e:any) => {
        const {name, value} = e.target;
        if (name==="memberDate") setSelectedDate(value);

        if (getUser)
        setGetUser({...getUser, [name]:value});
    }

    const onCompleteAdd = (data:any) => {
        if (getUser)
        setGetUser({...getUser, memberAdd:data.address});
        setIsModal(false);
    }

    const onSubmit = () => {
      if (getUser)
      AdminService.editUser(getUser)
      .then((response:any)=>{
        setSelectTab("회원");
      })
      .catch((error:Error)=>{console.log(error)})
    }

    useEffect (()=>{
      if (dataId) {
        
        AuthService.getUserInfo(dataId)
        .then(
            (response:any)=>{
        setGetUser(response.data);
        if (response.data.memberDate){
            // const date = new Date(response.data.memberDate);
            setSelectedDate(response.data.memberDate);
          }
        })
        .catch((e:Error)=>{
            console.log(e);
        })


      }
    },[])

    const onSubmitDelete = () => {
      // alert(dataId)
      AdminService.deleteMember(dataId)
      .then((response:any)=>{
        setSelectTab("회원")
      })
      .catch((e:Error)=>{console.log(e)})
    }

  return (
    <div>
    <form className='col-6 container mt-4' onSubmit={onSubmit}>
    <label htmlFor="Full Nam">이름</label>
    <input type='text' id='Full Nam' className='form-control form-control-user mb-3' placeholder='Full Name' value={getUser?.memberName} name="memberName" onChange={onchangeInput}></input>
    <label htmlFor="Full Nam">영어 이름</label>
    <input type='text' className='form-control form-control-user mb-3' placeholder='English Name' value={getUser?.memberEname} name="memberEname" onChange={onchangeInput}></input>
    <label htmlFor="Full Nam">주소</label>
    <input type='text' className='form-control form-control-user mb-3' placeholder='Address' value={getUser?.memberAdd} name="memberAdd" onChange={onchangeInput} onClick={()=>setIsModal(true)}></input>
    <label htmlFor="Full Nam">휴대폰</label>
    <input type='text' className='form-control form-control-user mb-3' placeholder='Phone Number' value={getUser?.memberPhone} name="memberPhone" onChange={onchangeInput}></input>
    <label htmlFor="Full Nam">이메일</label>
    <input type='text' className='form-control form-control-user mb-3' placeholder='Email' value={getUser?.memberEmail} name="memberEmail" onChange={onchangeInput}></input>
    <div className='form-group row'>
        <div className='col-sm-6 mb-3 mb-sm-0'>
        <label htmlFor="Full Nam">성별</label>
    <select className='form-control form-control-select mb-3 ' placeholder='Sex' value={getUser?.memberSex} name="memberSex" onChange={onchangeInput}>
        <option value={"male"}>남자</option>
        <option value={"female"}>여자</option>
    </select>
        </div>
        <div className='col-sm-6 mb-3 mb-sm-0'>
        <label htmlFor="Full Nam">생일</label>
    <input type='date' className='form-control form-control-select mb-3' placeholder='BirthDate' value={selectedDate} onChange={onchangeInput} name="memberDate"></input>

        </div>
    </div>
    <label htmlFor="Full Nam">마일리지</label>
        <input type='text' className='form-control form-control-user mb-3' placeholder='Mile' value={getUser?.memberMile} name="memberMile" onChange={onchangeInput}></input>
    <div className='container'>

    <div className='row mx-auto'>
    </div>
    </div>

    </form>
    <div className='row'>
    <button className='btn btn-danger btn-user mx-auto' onClick={onSubmitDelete}>회원 탈퇴</button>
    <button className='btn btn-primary btn-user mx-auto' onClick={onSubmit}>정보 수정</button>
    </div>
    <Modal
                          show={isModal}
                          onHide={() => setIsModal(false)}
                        >
                          <Modal.Body>
                            {" "}
                            <DaumPostcode
                              style={{
                                maxWidth: "400px",
                                height: "500px",
                                margin: "auto",
                                display: isModal ? "block" : "none",
                              }}
                              onComplete={(data) => {
                                onCompleteAdd(data);
                              }}
                            ></DaumPostcode>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              className="btn"
                              onClick={() => setIsModal(false)}
                            >
                              Close
                            </Button>
                          </Modal.Footer>
    </Modal>
</div>
  )
}

export default AdminMember