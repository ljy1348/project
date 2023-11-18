import React, { useEffect, useState } from "react";
import "../../assets/css/login.css";
// 유효성 체크 lib 임포트
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";
import IUser from "../../types/auth/IUser";
import { login } from "../../store/slices/auth";
import initScripts from "../../assets/js/scripts";
import initCustom from "../../assets/js/custom";
import DatePicker from "react-datepicker";
import { Button, Modal } from "react-bootstrap";

// 1) 로그인 로직
// 2) 유효성 체크 lib 사용 : Yup & Formik 
function Login() {

  useEffect(()=>{
    initScripts();
    initCustom();
  },[])

  // todo: 변수 정의
  // 강제 페이지 이동 함수
  let navigate = useNavigate();

  // todo: 공유저장소 변수(state.변수명) 가져오기
  // todo: 사용법 : useSelector((state)=> state.변수명)
  // 로그인 정보 상태변수(true/false)
  const { isLoggedIn } = useSelector((state: RootState)=> state.auth);
  const [tag, setTag] = useState("login");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [departureAirPort, setDepartureAirPort] = useState("");
  const [arrivalAirPort, setArrivalAirPort] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [isAirPort, setIsAirPort] = useState("");

  const tagSelect = (data:string) => {
    if (data==="login") setTag("login");
    if (data==="non-member") setTag("non-member");
  }




  // todo: 공유저장소 함수 가져오기
  // todo: 사용법 : useAppDispatch() 함수 이용 : dispatch(함수명)
  // todo: 사용 예) dispatch(login), dispatch(logout) 등
  const dispatch = useAppDispatch();

  // todo: 유효성 체크 lib 객체변수
  // todo: Formik 객체 초기화(initialValues) : html 태그에서 사용함
  // todo: 체크 대상 (email, password : input태그(==Field태그))
  const initialValues = {
    userId:"",
    userPassword:"",
    userName:"",
    enName:"",       
    userEmail:"",       
    userPhone:"",      
    userSex:"",       
    userAdd:"",       
    right:"ROLE_USER",       
    birthDate:"",       
    userNationality:"",       
    milePoint:0,
  }

  const initNonMember = {
      domesticInternational:"국내",
      airlineReservationNumber:"",
      enName:"",
      departure: selectedDate,       
      departureAirPort:"",       
      arrivalAirPort:"",      
  }

  // todo: 함수 정의
  // todo: 유효성 체크 lib 함수(Formit lib : validationSchema )
  // todo: validationSchema : 유효성 체크 규칙을 정의
  // todo: 사용법 : validationSchema = Yup.object().shape({유효성체크규칙})
  const validationSchema = Yup.object().shape({
    // email 유효성 규칙 : required(에러메세지) => 필수필드
    // string() : 자료형이 문자열인가? 체크
    userId: Yup.string().required("email 은 필수 입력입니다."),
    // password 유효성 규칙 : required(에러메세지) => 필수필드
    userPassword: Yup.string().required("password 도 필수 입력입니다."),
  });

  const validationSchemaNonMember = Yup.object().shape({
    // email 유효성 규칙 : required(에러메세지) => 필수필드
    // string() : 자료형이 문자열인가? 체크
    airlineReservationNumber: Yup.string().required("필수 입력입니다."),
    // password 유효성 규칙 : required(에러메세지) => 필수필드
    enName: Yup.string().required("필수 입력입니다.")
  });

  // isLoggedIn = true (로그인 상태변수(true/false))
  // 강제로 /home 이동
  if(isLoggedIn) {
    navigate("/home"); // 강제 페이지 이동
  }

  // 로그인 버튼 클릭시 실행되는 함수 : submit(Formit)
  // Formit lib 에서 자동으로 email, password 값을 넘겨줌
  const handleLogin = (formValue: any) => { 
    // Formit 넘겨준 email, password 값 저장
      const { userId,
        userPassword,
        userName,
        enName,       
        userEmail,       
        userPhone,      
        userSex,       
        userAdd,
        birthDate,       
        userNationality,  } = formValue;

    // 임시 객체 
    const data: IUser = {
      // 예) email:email => email (간략 표기 가능)
      userId,
      userPassword,
      userName,
      enName,       
      userEmail,       
      userPhone,      
      userSex,       
      userAdd,       
      right:"ROLE_USER",       
      birthDate,       
      userNationality,       
      milePoint:0,     
    }

    // todo: 벡엔드 로그인 함수(공유 로그인 함수) 호출
    dispatch(login(data))
      .unwrap()    // 리덕스의 공유함수 에러처리를 실행하게 하는 함수
      .then(()=>{
        // alert("로그인 성공했습니다.");
        // 강제 /home 페이지 이동
        navigate("/home");
        // js : 페이지 새로고침
        window.location.reload();
      })
      .catch((e:Error)=>{
        console.log(e);
      });
   }

   const handleNonMember = (formValue: any) => { console.log(formValue) }

   const onChangeDate = (data:Date) => { setSelectedDate(data) }

   const onClickModal = () => {setIsModal(true); setIsAirPort("data"); console.log("a")}

   const innerHtml = () => {
    if (tag==="login") {
    return (<div className="p-5">
    {/* validationSchema : Formik 유효성 체크 함수 */}
    <Formik                          // 유효성 체크가 있는 Formik lib                        
      initialValues={initialValues}  // 객체(체크 대상:email,password) 초기값
      validationSchema={validationSchema}  // 유효성 체크 함수
      onSubmit={handleLogin}               // 로그인함수 실행(벡엔드 전송)
    >
      {/* Form  : form 태그와 같음 */}
      {/* Field : input 태그와 같음 */}
      {/* errors.속성명 : 에러발생하면 메세지를 저장할 객체 */}
      {/* touched.속성명 : 현재 태그의 클릭여부 (true/false) */}
      {({ errors, touched }) => (
        <Form className="user">
          <div className="form-group">
            <Field
              type="text"
              name="userId"
              className={
                "form-control form-control-user mb-3" +
                // email 필드에 클릭되고 동시에 에러가 있으면 화면에 빨간색을 표시
                (errors.userId && touched.userId
                  ? " is-invalid"
                  : "")
              }
              placeholder="Enter Email Address..."
            />
            {/* ErrorMessage : 화면에 email에 대한 에러메세지를 표시함 */}
            <ErrorMessage
              name="userId"
              component="div"
              className="invalid-feedback"
            />
          </div>
          {/* 패스워드 필드 시작 */}
          <div className="form-group">
            <Field
              type="password"
              name="userPassword"
              className={
                "form-control form-control-user mb-3" +
                // password 필드에 클릭되고 동시에 에러가 있으면 화면에 빨간색을 표시
                (errors.userPassword && touched.userPassword
                  ? " is-invalid"
                  : "")
              }
              id="exampleInputPassword"
              placeholder="Password"
            />
            {/* ErrorMessage : 화면에 password 대한 에러메세지를 표시함 */}
            <ErrorMessage
              name="userPassword"
              component="div"
              className="invalid-feedback"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-user w-100 mb-3"
          >
            Login
          </button>
          <hr />
          <a
            href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_REST_API_KEY}&redirect_uri=${"http://localhost:3000/login/auth/google"}&response_type=code&scope=email`}
            className="btn btn-google btn-user w-100 mb-2"
          >
            <i className="fab fa-google fa-fw"></i>&nbsp;Login
            with Google
          </a>
          <a
            href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_NAVER_REDIRECT_URI}&state=${process.env.REACT_APP_STATE}`}
            className="btn btn-naver btn-user w-100 mb-2"
          >
            <i className="fa-solid fa-n"></i>&nbsp;Login with
            Naver
          </a>
          <a
            href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI2}`}
            className="btn btn-kakao btn-user w-100 mb-3"
          >
            <i className="fa-solid fa-k"></i>&nbsp;Login with
            Kakao
          </a>
        </Form>
      )}
    </Formik>
    <hr />
    <div className="text-center">
      <a className="small" href="/forgot-password">
        Forgot Password?
      </a>
    </div>
    <div className="text-center">
      <a className="small" href="/register">
        Create an Account!
      </a>
    </div>
  </div>)}
    if (tag==="non-member") {
     return (<Formik                          // 유효성 체크가 있는 Formik lib                        
      initialValues={initNonMember}  // 객체(체크 대상:email,password) 초기값
      validationSchema={validationSchemaNonMember}  // 유효성 체크 함수
      onSubmit={handleNonMember}               // 로그인함수 실행(벡엔드 전송)
    >
      {/* Form  : form 태그와 같음 */}
      {/* Field : input 태그와 같음 */}
      {/* errors.속성명 : 에러발생하면 메세지를 저장할 객체 */}
      {/* touched.속성명 : 현재 태그의 클릭여부 (true/false) */}
      {({ errors, touched }) => (
        <Form className="user col-11 mx-auto">
          <br></br><br></br>
          <div className="form-group">
            <Field
              type="text"
              name="airlineReservationNumber"
              className={
                "form-control form-control-user mb-3" +
                // email 필드에 클릭되고 동시에 에러가 있으면 화면에 빨간색을 표시
                (errors.airlineReservationNumber && touched.airlineReservationNumber
                  ? " is-invalid"
                  : "")
              }
              placeholder="예약 번호"
            />
          </div>
          <div className="row">
          <div className="form-group col-4">
          <DatePicker
                                showIcon
                                dateFormat="yyyy-MM-dd" // 날짜 형태
                                shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                                minDate={new Date("2000-01-01")} // minDate 이전 날짜 선택 불가
                                maxDate={new Date()} // maxDate 이후 날짜 선택 불가
                                selected={selectedDate}
                                onChange={(data) => {
                                  if (data)
                                  onChangeDate(data);
                                }}
                                // customInput={<div></div>}
                                className="form-control form-control-select mb-3"
                              />
          </div>
          <div className="form-group col-4">
            <input
              type="text"
              name="departureAirPort"
              className={
                "form-control form-control-user mb-3" 
              }
              onClick={()=>{setIsModal(true); setIsAirPort("departure");}}
              id="departureAirPort"
              placeholder="출발 공항"
            />
          </div>
          <div className="form-group col-4">
            <input
              type="text"
              name="arrivalAirPort"
              className={
                "form-control form-control-user mb-3"
                }
              onClick={()=>{setIsModal(true); setIsAirPort("arrival");}}
              id="arrivalAirPort"
              placeholder="도착 공항"
              value={arrivalAirPort}
            />
            <Modal
            show={isModal}
            onHide={() => setIsModal(false)}
            >
            <Modal.Body>
              {isAirPort === "arrival" && <>도착 공항 선택</>}
              {isAirPort === "departure" && <>출발 공항 선택</>}
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
          </div>
          {/* 패스워드 필드 시작 */}
          <div className="row">
            

          <div className="form-group col-3">
            <Field
              as="select"
              name="domesticInternational"
              className={
                "form-control form-control-select mb-3" +
                // password 필드에 클릭되고 동시에 에러가 있으면 화면에 빨간색을 표시
                (errors.domesticInternational && touched.domesticInternational
                  ? " is-invalid"
                  : "")
              }
              id="exampleInputPassword"
              placeholder="국내">
                <option value={"국내"}>국내</option>
                <option value={"국제"}>국제</option>
              </Field>
            
          </div>
          <div className="form-group col-9">
            <Field
              type="text"
              name="enName"
              className={
                "form-control form-control-user mb-3" +
                // password 필드에 클릭되고 동시에 에러가 있으면 화면에 빨간색을 표시
                (errors.enName && touched.enName
                  ? " is-invalid"
                  : "")
              }
              id="enName"
              placeholder="예약시 입력한 영문 이름"
            />
          </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-user w-100 mb-3"
          >
            예약 조회
          </button>
          <hr />
        </Form>
      )}
    </Formik>)
    }
   }

  return (
    
    // 여기
    <div>
            <div className="hero hero-inner">
        <div className="container">
          <div className=" align-items-center">
            <div className="col-lg-6 mx-auto text-center">
              <div className="intro-wrap">
                <h1 className="mb-0">로그인</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card mt-5">
            <div className="card-body p-0">
              {/* <!-- Nested Row within Card Body --> */}
              <div className="">
                <div className="">
                  <div>
                  <ul className="nav nav-tabs">
  <li className="nav-item col-6">
    <a className={"nav-link " + (tag==="login"?"active":"")} ><h3 className="container text-center" onClick={()=>{tagSelect("login")}}>로그인</h3></a>
  </li>
  <li className="nav-item col-6">
    <a className={"nav-link " + (tag==="non-member"?"active":"")} ><h3 className="container text-center" onClick={()=>{tagSelect("non-member")}}>비회원 조회</h3></a>
  </li>
</ul>
                  </div>
                  <div className="col-11 mx-auto">

                  {innerHtml()}
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

export default Login;
