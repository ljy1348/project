import React, { useState } from "react";
import "../../assets/css/login.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Button } from '@mui/material';
import AuthService from "../../services/auth/authService";

function ForgotPassword() {

  const initFormik = {
    memberId:"",
    memberEmail:"",
    memberPw:"",
    repassword:""
  }

  const [searchPw, setSearchPw] = useState(initFormik);

  const validationSchema = Yup.object().shape({
    memberId: Yup.string().test(
      "len",
      "id는 4 ~ 20사이에 글자만 입력됩니다.",
      // 유효성 체크 조건
      (val) => {
        if (
          val &&
          val.toString().length >= 4 &&
          val.toString().length <= 20
        ) {
          return true;
        }
        return false;
      }
    )
    .test(
      "len",
      "id는 영어 또는 숫자만 입력됩니다.",
      (val)=>{
      if (val) {
        let check = true;
        for (let i = 0; i < val.length; i++) {
          if ((val.charCodeAt(i) >= 65 && val.charCodeAt(i) <= 90)||(val.charCodeAt(i) >= 97 && val.charCodeAt(i) <= 122)||(val.charCodeAt(i) >= 48 && val.charCodeAt(i) <= 57)) {
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
    memberEmail: Yup.string().email("Invalid email address").required("필수 입력입니다."),
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
  repassword: Yup.string().oneOf(
    // repassword != password
    [Yup.ref("memberPw")],
    "패스워드가 일치하지 않습니다."
  )
  })

  const changePw = (formValue:any) => { 
    AuthService.forgotPassword(formValue)
    .then((response:any)=>{alert("변경되었습니다.")})
    .catch((e:Error)=>{console.log(e)})
   }


  return (
    <div>
            <div className="hero hero-inner">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mx-auto text-center">
              <div className="intro-wrap">
                <h1 className="mb-0">비밀번호 찾기</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card mt-5">
            <div className="card-body p-0">
              {/* <!-- Nested Row within Card Body --> */}
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-password-image"></div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 mb-2">아이디와 이메일을 입력해 주세요</h1>
                    </div>
                    <Formik
                     className="user"
                     initialValues={initFormik}
                     validationSchema={validationSchema}
                     onSubmit={changePw}
                     >{({ errors, touched }) => (
                      <Form>

                      
                      <div className="form-group">
                      <Field
                          type="text"
                          name="memberId"
                          className={
                            "form-control form-control-user mb-3" +
                            (errors.memberId && touched.memberId
                              ? " is-invalid"
                              : "")
                          }
                          id="exampleInputEmail"
                          placeholder="ID(필수)"
                        />
                        <ErrorMessage
                              name="memberId"
                              component="div"
                              className="invalid-feedback"
                            />
                        <Field
                          type="email"
                          className={
                            "form-control form-control-user mb-3" +
                            (errors.memberEmail && touched.memberEmail
                              ? " is-invalid"
                              : "")
                          }
                          name="memberEmail"
                          id="exampleInputEmail"
                          aria-describedby="emailHelp"
                          placeholder="Enter Email Address..."
                        />
                        <ErrorMessage
                              name="memberEmail"
                              component="div"
                              className="invalid-feedback"
                            />
                      </div>
                      <div className="form-group row">
                            <div className="col-sm-6 mb-3 mb-sm-0">
                              <Field
                                type="password"
                                name="memberPw"
                                className={
                                  "form-control form-control-user mb-3" +
                                  (errors.memberPw && touched.memberPw
                                    ? " is-invalid"
                                    : "")
                                }
                                id="exampleInputPassword"
                                placeholder="Password(필수)"
                              />
                              <ErrorMessage
                                name="memberPw"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                            <div className="col-sm-6">
                              <Field
                                type="password"
                                name="repassword"
                                className={
                                  "form-control form-control-user mb-3" +
                                  (errors.repassword && touched.repassword
                                    ? " is-invalid"
                                    : "")
                                }
                                id="exampleRepeatPassword"
                                placeholder="Repeat Password(필수)"
                              />
                              <ErrorMessage
                                name="repassword"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                          </div>
                      <button
                        type="submit"
                        className="btn btn-primary btn-user w-100 mb-3"
                      >
                        비밀번호 변경하기
                      </button>
                      </Form>
                      )}
                    </Formik>
                    <hr />
                    <div className="text-center">
                      <a href="/register">
                        Create an Account!
                      </a>
                    </div>
                    <div className="text-center">
                      <a href="/login">
                        Already have an account? Login!
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
