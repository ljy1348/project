import React, { useEffect, useState } from "react";
import "../../assets/css/login.css";
// todo: 유효성 체크 lib
import { Form, ErrorMessage, Field, Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import { RootState, useAppDispatch } from "../../store/store";
import IUser from "../../types/auth/IMember";
import { register } from "../../store/slices/auth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DaumPostcode from "react-daum-postcode";
import initScripts from "../../assets/js/scripts";
import initCustom from "../../assets/js/custom";
import { Popover, OverlayTrigger, Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Register() {

  const { isLoggedIn } = useSelector((state: RootState)=> state.auth);

  // todo: 변수 정의
  // 회원생성 성공 여부 변수
  const [successful, setSuccessful] = useState<boolean>(false);
  // 화면에 메세지 출력할 변수
  const [message, setMessage] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [address, setAddress] = useState("");
  const [addApiView, setAddApiView] = useState(false);
  const navi = useNavigate();
  
  if (isLoggedIn) {
    navi(-1);
  }
  // todo: 공유저장소 공유함수(register) 가져오기
  const dispatch = useAppDispatch();

  // 객체 초기화 : 속성(Formik) 체크
  const initialValues = {
    memberId: "",
    memberPw: "",
    memberName: "",
    memberEname: "",
    memberEmail: "",
    memberPhone: "",
    memberSex: "male",
    memberAdd: address,
    memberAuth: "ROLE_USER",
    memberDate: "",
    memberCountry: "kor",
    memberMile: 0,
    repassword: "",
  };

  // todo: 함수 정의
  // 유효성 체크 함수 : validationSchema(Formik & Yup 함수)
  // 에러에 대한 정의를 함수
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
    .required("필수 입력입니다."), // email 필수 입력
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
    ),
    memberEmail: Yup.string().email("Invalid email address").required("필수 입력입니다."),
    memberEname: Yup.string()
    .test(
      "len",
      "id는 영어만 입력됩니다.",
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

  // 회원 가입 함수 : Formik 의 onSubmit(저장) 함수 바인딩
  //  formValue : (email, password, username, repassword)
  const handleRegister = (formValue: any) => {
    // 임시 객체
    const {
      memberId,
      memberPw,
      memberName,
      memberEname,
      memberEmail,
      memberPhone,
      memberSex,
      memberAdd,
      memberDate,
      memberCountry,
    } = formValue;

    // 임시 객체
    const data: IUser = {
      // 예) email:email => email (간략 표기 가능)
      memberId,
      memberPw,
      memberName,
      memberEname,
      memberEmail,
      memberPhone,
      memberSex,
      memberAdd: address,
      memberAuth: "ROLE_USER",
      memberDate: selectedDate?.toISOString(),
      memberCountry: "kor",
      memberMile: 0,
      changePw:""
    };

    console.log(data);

    // 성공여부 변수 초기화
    setSuccessful(false);
    // todo: 벡엔드 저장 요청 : 공유함수(register)
    dispatch(register(data))
      .unwrap() // 공유저장소 에러처리
      .then(() => {
        setSuccessful(true);
        setMessage("유저가 생성되었습니다.");
      })
      .catch((e: Error) => {
        console.log(e);
        setSuccessful(false);
      });
  };

  

  const onChangeDate = (data: any) => {
    setSelectedDate(data);
  };

  const onCompleteAdd = (data: any) => {
    setAddress(data.address);
    setAddApiView(false);
  };

  const setPostCodeView = () => {
    setAddApiView(true);
  };

  useEffect(() => {
    initScripts();
    initCustom();
  }, []);

  return (
    // 여기
    <div>
      <div className="hero hero-inner">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mx-auto text-center">
              <div className="intro-wrap">
                <h1 className="mb-0">회원 가입</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card mt-5 container">
        <div className="card-body p-0">
          {/* <!-- Nested Row within Card Body --> */}
          <div className="row">
            <div className="col-lg-5 bg-register-image"></div>
            <div className="col-lg-7">
              <div className="p-5">
                <div className="text-center">
                  <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                </div>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleRegister}
                >
                  {({ errors, touched }) => (
                    <Form className="user">
                      {!successful && (
                        <div>
                          {/* 아이디 */}
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
                          </div>
                          {/* 패스워드 */}
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

                          {/* 이름 */}
                          <div className="form-group">
                            <Field
                              type="text"
                              name="memberName"
                              className={
                                "form-control form-control-user mb-3" +
                                (errors.memberName && touched.memberName
                                  ? " is-invalid"
                                  : "")
                              }
                              id="exampleName"
                              placeholder="Full Name(필수)"
                            />
                            <ErrorMessage
                              name="memberName"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>

                          {/* 영어 이름 */}
                          <div className="form-group">
                            <Field
                              type="text"
                              name="memberEname"
                              className={
                                "form-control form-control-user mb-3" +
                                (errors.memberEname && touched.memberEname
                                  ? " is-invalid"
                                  : "")
                              }
                              id="exampleName"
                              placeholder="English Name"
                            />
                            <ErrorMessage
                              name="memberEname"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>

                          {/* email */}
                          <div className="form-group">
                            <Field
                              type="email"
                              name="memberEmail"
                              className={
                                "form-control form-control-user mb-3" +
                                (errors.memberEmail && touched.memberEmail
                                  ? " is-invalid"
                                  : "")
                              }
                              id="exampleName"
                              placeholder="Email"
                            />
                            <ErrorMessage
                              name="memberEmail"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>

                          {/* 성별, 생일 */}
                          <div className="form-group row">
                            <div className="col-sm-6 mb-3 mb-sm-0">
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
                            <div className="col-sm-6">
                              <DatePicker
                                // showIcon
                                dateFormat="yyyy-MM-dd" // 날짜 형태
                                shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                                minDate={new Date("1900-01-01")} // minDate 이전 날짜 선택 불가
                                maxDate={new Date()} // maxDate 이후 날짜 선택 불가
                                selected={selectedDate}
                                onChange={(data) => {
                                  onChangeDate(data);
                                }}
                                // customInput={<div></div>}
                                className="form-control form-control-select mb-3"
                              />
                            </div>
                          </div>

                          {/* 주소 */}
                          <div className="form-group">
                            {/* <div>
                              <input
                                type="text"
                                name="memberAdd"
                                className={
                                  "form-control form-control-user mb-3"
                                }
                                id="exampleName"
                                placeholder="Address"
                                onClick={setPostCodeView}
                                value={address}
                              />
                            </div> */}
                            <Field
                              type="text"
                              name="memberAdd"
                              className={
                                "form-control form-control-user mb-3" +
                                (address===""
                                  ? " is-invalid"
                                  : "")
                              }
                              id="exampleName"
                              placeholder="address"
                              onClick={setPostCodeView}
                                value={address}
                            />
                            <ErrorMessage
                              name="memberAdd"
                              component="div"
                              className="invalid-feedback"
                            />
                            <Modal
                              show={addApiView}
                              onHide={() => setAddApiView(false)}
                            >
                              <Modal.Body>
                                {" "}
                                <DaumPostcode
                                  style={{
                                    maxWidth: "400px",
                                    height: "500px",
                                    margin: "auto",
                                    display: addApiView ? "block" : "none",
                                  }}
                                  onComplete={(data) => {
                                    onCompleteAdd(data);
                                  }}
                                ></DaumPostcode>
                              </Modal.Body>
                              <Modal.Footer>
                                <Button
                                  className="btn"
                                  onClick={() => setAddApiView(false)}
                                >
                                  Close
                                </Button>
                              </Modal.Footer>
                            </Modal>
                          </div>

                          {/* 휴대폰번호 */}
                          <div className="form-group">
                            <Field
                              type="text"
                              name="memberPhone"
                              className={
                                "form-control form-control-user mb-3" +
                                (errors.memberPhone && touched.memberPhone
                                  ? " is-invalid"
                                  : "")
                              }
                              id="exampleName"
                              placeholder="Phone Number"
                            />
                            <ErrorMessage
                              name="memberPhone"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>

                          <button
                            type="submit"
                            className="btn btn-primary btn-user w-100 mb-3"
                          >
                            Register Account
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

                <hr />
                <div className="text-center">
                  <a href="/forgot-password">Forgot Password?</a>
                </div>
                <div className="text-center">
                  <a href="/login">Already have an account? Login!</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
