import React, { useEffect, useState } from 'react'
import IUser from '../../../types/auth/IMember'
import { Button, Modal } from 'react-bootstrap';
import DaumPostcode from "react-daum-postcode";
import AuthService from '../../../services/auth/authService';

function UserInfoList({user, setMessage}:{user:IUser, setMessage:any}) {

    const [selectedDate, setSelectedDate] = useState("");
    const [getUser, setGetUser] = useState<IUser>(user);
    const [isModal, setIsModal] = useState(false);

    const onchangeInput = (e:any) => {
        const {name, value} = e.target;
        if (name==="memberDate") setSelectedDate(value);

        console.log(name)
        setGetUser({...getUser, [name]:value});
    }

    const onCompleteAdd = (data:any) => {
        setGetUser({...getUser, memberAdd:data.address});
        setIsModal(false);
    }

    const onSubmit = () => {
      setMessage("");
      console.log(getUser);
      AuthService.editUser(getUser)
      .then((response:any)=>{console.log(response);
        setMessage(response.data);
      })
      .catch((error:Error)=>{console.log(error)})
    }

    useEffect (()=>{
      setMessage("");
      if (user) {

        if (!user.memberDate) {
          setGetUser({...getUser, memberDate:new Date()})
        }
        
        if (getUser?.memberDate){
          const date = new Date(getUser.memberDate);
          setSelectedDate(date.toISOString().split('T')[0]);
        }
      }
    },[])

    

  return (
    <div>
        <form className='col-6 container mt-4' onSubmit={onSubmit}>
        <input type='text' className='form-control form-control-user mb-3' placeholder='Full Name' value={getUser?.memberName} name="memberName" onChange={onchangeInput}></input>
        <input type='text' className='form-control form-control-user mb-3' placeholder='English Name' value={getUser?.memberEname} name="memberEname" onChange={onchangeInput}></input>
        <input type='text' className='form-control form-control-user mb-3' placeholder='Address' value={getUser?.memberAdd} name="memberAdd" onChange={onchangeInput} onClick={()=>setIsModal(true)}></input>
        <input type='text' className='form-control form-control-user mb-3' placeholder='Phone Number' value={getUser?.memberPhone} name="memberPhone" onChange={onchangeInput}></input>
        <input type='text' className='form-control form-control-user mb-3' placeholder='Email' value={getUser?.memberEmail} name="memberEmail" onChange={onchangeInput}></input>
        <div className='form-group row'>
            <div className='col-sm-6 mb-3 mb-sm-0'>
        <select className='form-control form-control-select mb-3 ' placeholder='Sex' value={getUser?.memberSex} name="memberSex" onChange={onchangeInput}>
            <option value={"male"}>남자</option>
            <option value={"female"}>여자</option>
        </select>
            </div>
            <div className='col-sm-6 mb-3 mb-sm-0'>
        <input type='date' className='form-control form-control-select mb-3' placeholder='BirthDate' value={selectedDate} onChange={onchangeInput} name="memberDate"></input>

            </div>
        </div>
        <div className='container'>

        <div className='row mx-auto'>
        </div>
        </div>
        </form>
        <button className='btn btn-primary btn-user mx-auto' onClick={onSubmit}>정보 수정</button>
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

export default UserInfoList