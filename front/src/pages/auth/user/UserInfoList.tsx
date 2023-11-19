import React, { useEffect, useState } from 'react'
import IUser from '../../../types/auth/IUser'
import { Button, Modal } from 'react-bootstrap';
import DaumPostcode from "react-daum-postcode";

function UserInfoList({user}:{user:IUser}) {

    const [selectedDate, setSelectedDate] = useState("");
    const [getUser, setGetUser] = useState<IUser>(user);
    const [isModal, setIsModal] = useState(false);

    const onchangeInput = (e:any) => {
        const {name, value} = e.target;
        console.log(name)
        setGetUser({...getUser, [name]:value});
    }

    const onCompleteAdd = (data:any) => {
        setGetUser({...getUser, userAdd:data.address});
        setIsModal(false);
    }

    useEffect (()=>{
        if (!user.birthDate) {
            setGetUser({...getUser, birthDate:new Date()})
        }

        if (getUser?.birthDate){
            const date = new Date(getUser.birthDate);
            setSelectedDate(date.toISOString().split('T')[0]);
        }
    },[getUser.birthDate])

    

  return (
    <div>
        <form className='col-6 container mt-4'>
        <input type='text' className='form-control form-control-user mb-3' placeholder='Full Name' value={getUser?.userName} name="userName" onChange={onchangeInput}></input>
        <input type='text' className='form-control form-control-user mb-3' placeholder='English Name' value={getUser?.enName} name="enName" onChange={onchangeInput}></input>
        <input type='text' className='form-control form-control-user mb-3' placeholder='Address' value={getUser?.userAdd} name="userAdd" onChange={onchangeInput} onClick={()=>setIsModal(true)}></input>
        <input type='text' className='form-control form-control-user mb-3' placeholder='Phone Number' value={getUser?.userPhone} name="userPhone" onChange={onchangeInput}></input>
        <div className='form-group row'>
            <div className='col-sm-6 mb-3 mb-sm-0'>
        <select className='form-control form-control-select mb-3 ' placeholder='Sex' value={getUser?.userSex} name="userSex" onChange={onchangeInput}>
            <option value={"male"}>남자</option>
            <option value={"female"}>여자</option>
        </select>
            </div>
            <div className='col-sm-6 mb-3 mb-sm-0'>
        <input type='date' className='form-control form-control-select mb-3' placeholder='BirthDate' value={selectedDate} onChange={onchangeInput} name="birthDate"></input>

            </div>
        </div>
        <div className='container'>

        <div className='row mx-auto'>
        <button className='btn btn-primary btn-user mx-auto'>정보 수정</button>
        </div>
        </div>
        </form>
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