import React, { useEffect, useState } from 'react'
import IUser from '../../../types/auth/IMember'
import { Button, Modal } from 'react-bootstrap';
import DaumPostcode from "react-daum-postcode";
import AuthService from '../../../services/auth/authService';
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from 'formik';

function UserInfoList({user, setMessage}:{user:IUser, setMessage:any}) {

    const [selectedDate, setSelectedDate] = useState("");
    const [getUser, setGetUser] = useState<IUser>(user);
    const [isModal, setIsModal] = useState(false);
    const [address, setAddress] = useState("");

    const initialValues = {
      memberName: user.memberName,
      memberEname: user.memberEname,
      memberEmail: user.memberEmail,
      memberPhone: user.memberPhone,
      memberSex: user.memberSex,
      memberAdd: address,
    };
  

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

    const handleEdit = (formValue:any) => {
      // console.log(formValue);
      // console.log(getUser);

      const data = getUser;
      data.memberName = formValue.memberName;
      data.memberEmail = formValue.memberEmail;
      data.memberEname = formValue.memberEname;
      data.memberSex = formValue.memberSex;
      data.memberPhone = formValue.memberPhone;
      console.log(data);

      setMessage("");
      console.log(data);
      AuthService.editUser(data)
      .then((response:any)=>{console.log(response);
        setMessage(response.data);
      })
      .catch((error:Error)=>{console.log(error)})
    }

    const validationSchema = Yup.object().shape({
      memberName: Yup.string()
        // 유효성 조건을 개발자 직접 작성하는 함수
        .test(
          "len2",
          "이름은 2 ~ 20사이에 글자만 입력됩니다.",
          // 유효성 체크 조건
          (val) => {
            if (
              val &&
              val.toString().length >= 3 &&
              val.toString().length <= 20
            ) {
              return true;
            }
            return false;
          }
        ).test(
          "len",
          "이름은 한글만 입력됩니다.",
          (val)=>{
          if (val) {
            let check = true;
            for (let i = 0; i < val.length; i++) {
              if (val.charCodeAt(i) >= 44032 && val.charCodeAt(i) <= 55203) {
              } else {
                check = false;
              }
            }
            if (!check) {
              // alert("이름에는 한글만 들어갈 수 있습니다.")
              return false;
            } else {
              return true;
            }
          }
        })
        .required("필수 입력입니다."), // username 필수 입력
      memberEmail: Yup.string().email("Invalid email address").required("필수 입력입니다."),
      memberEname: Yup.string()
      .test(
        "len",
        "영어이름은 영어만 입력됩니다.",
        (val)=>{
        if (val) {
          let check = true;
          for (let i = 0; i < val.length; i++) {
            if ((val.charCodeAt(i) >= 65 && val.charCodeAt(i) <= 90)||(val.charCodeAt(i) >= 97 && val.charCodeAt(i) <= 122)) {
            } else {
              check = false;
            }
          }
          if (!check) {
            // alert("이름에는 한글만 들어갈 수 있습니다.")
            return false;
          } else {
            return true;
          }
        }
      })
      .required("필수 입력입니다."),
      memberPhone: Yup.number().required("필수 입력입니다.")
      .test(
        "phone",
        "휴대폰 번호는 10~13자리 입니다.",
        (val) => {
          if (val && val.toString().length >= 9 && val.toString().length <= 13) {
            return true;
          } else if (val == null) return true;
          return false;
        }
      ),
    });

    useEffect (()=>{
      setMessage("");
      if (user) {

        if (!user.memberDate) {
          // setGetUser({...getUser, memberDate:new Date()})
        }
        
        if (getUser?.memberDate){
          const dateStringWithoutTimezone = getUser.memberDate.replace(' KST', '');
          console.log(dateStringWithoutTimezone)
          const date = new Date(dateStringWithoutTimezone);
          setSelectedDate(date.toISOString().split('T')[0]);
        }
      }
    },[])

    

  return (
    <div>
      <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleEdit}
                >
                {({ errors, touched }) => (
        <Form className='col-6 container mt-4'>
        <Field
                              type="text"
                              name="memberName"
                              className={
                                "form-control form-control-user mb-3" +
                                (errors.memberName && touched.memberName
                                  ? " is-invalid"
                                  : "")
                              }
                              id="exampleInputEmail"
                              placeholder="이름"
                            />
                            <ErrorMessage
                              name="memberName"
                              component="div"
                              className="invalid-feedback"
                            />
        <Field
                              type="text"
                              name="memberEname"
                              className={
                                "form-control form-control-user mb-3" +
                                (errors.memberEname && touched.memberEname
                                  ? " is-invalid"
                                  : "")
                              }
                              id="exampleInputEmail"
                              placeholder="영문이름"
                            />
                            <ErrorMessage
                              name="memberEname"
                              component="div"
                              className="invalid-feedback"
                            />
        <input type='text' className='form-control form-control-user mb-3' placeholder='Address' value={getUser?.memberAdd} name="memberAdd" onChange={onchangeInput} onClick={()=>setIsModal(true)}></input>
        <Field
                              type="text"
                              name="memberPhone"
                              className={
                                "form-control form-control-user mb-3" +
                                (errors.memberPhone && touched.memberPhone
                                  ? " is-invalid"
                                  : "")
                              }
                              id="exampleInputEmail"
                              placeholder="휴대폰번호"
                            />
                            <ErrorMessage
                              name="memberPhone"
                              component="div"
                              className="invalid-feedback"
                            />
                <Field
                              type="text"
                              name="memberEmail"
                              className={
                                "form-control form-control-user mb-3" +
                                (errors.memberEmail && touched.memberEmail
                                  ? " is-invalid"
                                  : "")
                              }
                              id="exampleInputEmail"
                              placeholder="이메일"
                            />
                            <ErrorMessage
                              name="memberEmail"
                              component="div"
                              className="invalid-feedback"
                            />
        <div className='form-group row'>
            <div className='col-sm-6 mb-3 mb-sm-0'>
            <Field
                                as="select"
                                name="memberSex"
                                className={
                                  "form-control form-control-select mb-3" +
                                  (errors.memberSex && touched.memberSex
                                    ? " is-invalid"
                                    : "")
                                }
                                id="userSexSelect"
                                placeholder="성별"
                              >
                                <option value="male" selected>
                                  남자
                                </option>
                                <option value="female">여자</option>
                              </Field>
            </div>
            <div className='col-sm-6 mb-3 mb-sm-0'>
        <input type='date' className='form-control form-control-select mb-3' placeholder='BirthDate' value={selectedDate} onChange={onchangeInput} name="memberDate"></input>

            </div>
        </div>
        <div className='container'>

        <div className='row mx-auto'>
        </div>
        </div>
        <button
                            type="submit"
                            className="btn btn-primary btn-user w-100 mb-3"
                          >
                            Register Account
                          </button>
                          </Form>)
        }
        </Formik>
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