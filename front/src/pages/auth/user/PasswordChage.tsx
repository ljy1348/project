import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import IUser from '../../../types/auth/IMember';
import IAuth from '../../../types/auth/IAuth';
import AuthService from '../../../services/auth/authService';

function PasswordChage() {

    const { user: currentUser } = useSelector((state:RootState)=> state.auth);

    const [successful, setSuccessful] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const initValue = {
        memberId: currentUser?.memberId,
        memberPw:"",
        repassword:"",
        changePw:"",
    }

    const validationSchema = Yup.object().shape({
        memberPw: Yup.string()
          // 개발자가 직접 유효성 체크 기능을 추가하는 방법
          .test(
            "len",
            "password 6 ~ 40 문자를 입력해야 합니다.", // 에러메세지
            // 유효성 체크 조건
            (val) => {
              if (
                val &&
                val.toString().length >= 6 &&
                val.toString().length <= 40
              ) {
                return true;
              }
              return false;
            }
          )
          .required("필수 입력입니다."), // password 필수 입력
          changePw: Yup.string()
          // 개발자가 직접 유효성 체크 기능을 추가하는 방법
          .test(
            "len",
            "password 6 ~ 40 문자를 입력해야 합니다.", // 에러메세지
            // 유효성 체크 조건
            (val) => {
              if (
                val &&
                val.toString().length >= 6 &&
                val.toString().length <= 40
              ) {
                return true;
              }
              return false;
            }
          )
          .required("필수 입력입니다."), // password 필수 입력
        repassword: Yup.string().oneOf(
          // repassword != password
          [Yup.ref("changePw")],
          "패스워드가 일치하지 않습니다."
        ),

      });

      const handleChage = (formValue: any) => {
        // // 임시 객체
        const {
          memberId,
          memberPw,
          changePw,
        } = formValue;
    
        // // 임시 객체
        const data = {
          // 예) email:email => email (간략 표기 가능)
          memberId,
          memberPw,
          changePw,
        };
    
        setSuccessful(false);
        AuthService.changePw(data)
        .then((response:any)=>{console.log(response);
        setSuccessful(true);
    setMessage("변경되었습니다.")})
        .catch((e:Error)=>{console.log(e)})
    
        // 성공여부 변수 초기화
      };

  return (
    <div className='mt-5 col-6 container'>
                        <Formik
                  initialValues={initValue}
                  validationSchema={validationSchema}
                  onSubmit={handleChage}
                >
                  {({ errors, touched }) => (
                    <Form className="user">
                      {!successful && (
                        <div>
                          {/* 아이디 */}

                          <div className="form-group">
                            현재 비밀번호
                            <Field
                              type="text"
                              name="memberPw"
                              className={
                                "form-control form-control-user mb-3" +
                                (errors.memberPw && touched.memberPw
                                  ? " is-invalid"
                                  : "")
                              }
                              id="memberPw"
                              placeholder="현재 비밀번호"
                            />
                            <ErrorMessage
                              name="memberPw"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="form-group">
                            새 비밀번호
                            <Field
                              type="text"
                              name="changePw"
                              className={
                                "form-control form-control-user mb-3" +
                                (errors.memberPw && touched.memberPw
                                  ? " is-invalid"
                                  : "")
                              }
                              id="changePw"
                              placeholder="새 비밀번호"
                            />
                            <ErrorMessage
                              name="changePw"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="form-group">
                          새 비밀번호 확인
                            <Field
                              type="text"
                              name="repassword"
                              className={
                                "form-control form-control-user mb-3" +
                                (errors.repassword && touched.repassword
                                  ? " is-invalid"
                                  : "")
                              }
                              id="repassword"
                              placeholder="새 비밀번호 확인"
                            />
                            <ErrorMessage
                              name="repassword"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <button
                            type="submit"
                            className="btn btn-primary btn-user w-100 mb-3"
                          >
                            비밀번호 변경
                          </button>
                        </div>
                      )}

                      {successful && (
                        <div
                          className="alert alert-success text-center"
                          role="alert"
                        >
                          {message}
                        </div>
                      )}
                    </Form>
                  )}
                </Formik>
    </div>
  )
}

export default PasswordChage
