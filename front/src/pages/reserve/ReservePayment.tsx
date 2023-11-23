import React, { useEffect, useState } from "react";
import MyareaModal from "../modal/MyareaModal";
import ForiareaModal from "../modal/ForiareaModal";
import IReservation from "../../types/reserve/IReservation";
import initScripts from "../../assets/js/scripts";
import initCustom from "../../assets/js/custom";
import { useParams } from "react-router-dom";
import IOperationinfo from "../../types/IOperationinfo";
import OperationService from "../../services/OperationService";

function ReservePayment() {
  const { firstId, secoundId } = useParams();

  // operationinfo 배열 변수 정의

  const initialOperationinfo = {
    operationId: null,
    airline: "",
    flightName: "",
    startAirport: "",
    finalAirport: "",
    startTime: "",
    finalTime: "",
    operationDate: "",
    startDate: "",
    finalDate: "",
    domesticInternational:"",
    price:"",    
  };
  const initialOperationinfo2 = {
    operationId: "",
    airline: "",
    flightName: "",
    startAirport: "",
    finalAirport: "",
    startTime: "",
    finalTime: "",
    operationDate: "",
    startDate: "",
    finalDate: "",
    domesticInternational:"",
    price:"",    
  };
  const initiaReservaionl = {
    AirlineReservaitonNumber: null,
    FlightName: "",
    UserId: "",
    RoundOrOne: "",
    EnName: "",
    Departure: "",
    Arrival: "",
    OperationDay: "",
    Airline: "",
    SeatType: "",
    AdultCount: 0,
    ChildCount: 0,
    InfantCount: 0,
    MileUseStatus: "",
    MembershipStatus: "",
    DomesticInternational: "",
    KorCity: "",
    ForiCountry: "",
    ForiCity: "",
    AirportFee: "",
    Email: "",
    PhoneNum: "",
    PassWord: "",
  };
  // operationinfo 배열 변수 정의

  const [operationinfo, setOperationinfo] = useState<IOperationinfo>(initialOperationinfo);
  const [operationinfo2, setOperationinfo2] = useState<IOperationinfo>(initialOperationinfo2);

  // 상세조회 함수
  const getCustomer = (operationId: string) => {
    OperationService.get(operationId) // 벡엔드로 상세조회 요청
      .then((response: any) => {
        setOperationinfo(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  // type 선언
  const [reservation, setReservation] =
    useState<IReservation>(initiaReservaionl);
  // modalcontrol
  const [modalShow, setModalShow] = useState(false);
  const [foriModalShow, foriSetModalShow] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target; // 화면값
    setReservation({ ...reservation, [name]: value }); // 변수저장
  };

  useEffect(() => {
    initScripts();
    initCustom();
  }, []);

  return (
    <>
      {/* 공통 */}
      <div className="hero hero-inner">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mx-auto text-center">
              <div className="intro-wrap">
                <h1 className="mb-0">결제 페이지</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 상단바 */}

      {/* 본문 */}
      <div className="container">
        {/* step bedge */}
        <div className="d-flex justify-content-center mt-5 col-12">
          <div className="sangmin_step_bedge">
            <span className="badge rounded-pill text-bg-danger">
              {/* {" "} */}
              {/* 1 검색 */}1
            </span>
            {/* <span> 검색 </span> */}
            {/* <span></span> */}
          </div>
          <div className="sangmin_step_bedge">
            <span className="badge rounded-pill text-bg-danger">2</span>
            {/* <span> 검색 </span> */}
            {/* <span></span> */}
          </div>
          <div className="sangmin_step_bedge">
            <span className="badge rounded-pill text-bg-danger">3 결제</span>
            {/* <span> 검색 </span> */}
            {/* <span></span> */}
          </div>
        </div>

        <h3 className="sangmin_reserve_payment_subtitle">여정 정보</h3>

        {/* 안내상황 */}
        <div className="mt-5 mb-5">
          <div className="sangmin_payment_reserve_info">
            <div className="row text-left">
              <div className="sangmin_payment_reserve_info_first col-2">
                첫 번째 여정
              </div>
              <div className="sangmin_payment_reserve_info_secound col-8">
                <div className="col">
                  <span className="sangmin_payment_loca">서울/인천</span>
                  <span className="sangmin_payment_loca">
                    <i className="sang_min_arrow_icon bi bi-arrow-right"></i>
                  </span>
                  <span className="sangmin_payment_loca">광저우</span>
                </div>
                <div className="sangmin_payment_reserve_info_last col">
                  <span>2023.12.20(수)</span> <span>08:30</span> <span>~</span>{" "}
                  <span>2023.12.20(수)</span> <span>11:30</span>
                  <span className="sangmin_aircode">OZ369</span>
                  <span>이코노미(L)</span>
                </div>
              </div>
              <div className="col-2">내용 펼치기</div>
            </div>
          </div>
          <div className="sangmin_payment_reserve_two_info">
            <div className="row text-left">
              <div className="sangmin_payment_reserve_info_first col-2">
                두 번째 여정
              </div>
              <div className="sangmin_payment_reserve_info_secound col-8">
                <div className="col">
                  <span className="sangmin_payment_loca">서울/인천</span>
                  <span className="sangmin_payment_loca">
                    <i className="sang_min_arrow_icon bi bi-arrow-right"></i>
                  </span>
                  <span className="sangmin_payment_loca">광저우</span>
                </div>
                <div className="sangmin_payment_reserve_info_last col">
                  <span>2023.12.20(수)</span> <span>08:30</span> <span>~</span>{" "}
                  <span>2023.12.20(수)</span> <span>11:30</span>
                  <span className="sangmin_aircode">OZ369</span>
                  <span>이코노미(L)</span>
                </div>
              </div>
              <div className="col-2">내용 펼치기</div>
            </div>
          </div>
        </div>

        <h3 className="sangmin_reserve_payment_subtitle">탑승자 정보</h3>

        {/* 정보입력 */}
        <div className="accordion mb-5" id="accordionPanelsStayOpenExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseOne"
                aria-expanded="true"
                aria-controls="panelsStayOpen-collapseOne"
              >
                탑승자 정보 입력창
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseOne"
              className="accordion-collapse collapse show"
            >
              {/* 사용자 정보 */}
              <div className="accordion-body">
                {/* 성별 선택 */}
                <div className="row g-3 align-items-center mb-3">
                  {/* 성별 라벨 시작 */}
                  <div className="col-3">
                    <label htmlFor="fullName" className="col-form-label">
                      성별
                    </label>
                  </div>
                  {/* 라벨 끝 */}
                  {/* 성별 라디오 박스 */}
                  <div className="sangmin_gender col-9">
                    <label htmlFor="male">남성</label>
                    <input
                      className="sangmin_gender_check"
                      id="male"
                      type="radio"
                      name="gender"
                      value="man"
                    />
                    <label htmlFor="female">여성</label>
                    <input
                      className="sangmin_gender_check"
                      id="female"
                      type="radio"
                      name="gender"
                      value="woman"
                    />
                  </div>
                </div>
                {/* 이름 입력 */}
                <div className="row g-3 align-items-center mb-3">
                  {/* 이름 라벨 시작 */}
                  <div className="col-3">
                    <label htmlFor="fullName" className="col-form-label">
                      이름
                    </label>
                  </div>
                  {/* 라벨 끝 */}
                  {/* 이름 입력창 */}
                  <div className="col-9">
                    <input
                      type="text"
                      id="fullName"
                      required
                      className="form-control"
                      value={reservation.EnName}
                      onChange={handleInputChange}
                      placeholder="이름"
                      name="fullName"
                    />
                  </div>
                </div>
                {/* 생년월일 */}
                <div className="row g-3 align-items-center mb-3">
                  {/* 생년월일 라벨 시작 */}
                  <div className="col-3">
                    <label htmlFor="birth" className="col-form-label">
                      생년월일
                    </label>
                  </div>
                  {/* 라벨 끝 */}
                  {/* 생년월일 입력창 */}
                  <div className="col-9">
                    <div className="info" id="info__birth">
                      <select className="box" id="birth-year">
                        <option>출생 연도</option>년
                      </select>
                      <select className="box" id="birth-month">
                        <option>월</option>월
                      </select>
                      <select className="box" id="birth-day">
                        <option>일</option>일
                      </select>
                    </div>
                  </div>
                </div>

                {/* 회원번호 입력 */}
                <div className="row g-3 align-items-center mb-3">
                  {/* 이름 라벨 시작 */}
                  <div className="col-3">
                    <label htmlFor="UserId" className="col-form-label">
                      회원번호
                    </label>
                  </div>
                  {/* 라벨 끝 */}
                  {/* 이름 입력창 */}
                  <div className="col-9">
                    <input
                      type="text"
                      id="memberCode"
                      required
                      className="form-control"
                      value={reservation.UserId}
                      onChange={handleInputChange}
                      placeholder="회원 번호"
                      name="UserId"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseTwo"
                aria-expanded="false"
                aria-controls="panelsStayOpen-collapseTwo"
              >
                예약자 연락처 입력
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseTwo"
              className="accordion-collapse collapse"
            >
              <div className="accordion-body">
                {/* 이메일 */}
                <div className="row g-3 align-items-center mb-3">
                  {/* 이름 라벨 시작 */}
                  <div className="col-3">
                    <label htmlFor="Email" className="col-form-label">
                      이름
                    </label>
                  </div>
                  {/* 라벨 끝 */}
                  {/* 이름 입력창 */}
                  <div className="col-9">
                    <input
                      type="text"
                      id="email"
                      required
                      className="form-control"
                      value={reservation.Email}
                      onChange={handleInputChange}
                      placeholder="이메일"
                      name="fullName"
                    />
                  </div>
                </div>
                {/* 연락처 */}
                <div className="row g-3 align-items-center mb-3">
                  {/* 이름 라벨 시작 */}
                  <div className="col-3">
                    <label htmlFor="PhoneNum" className="col-form-label">
                      연락처
                    </label>
                  </div>
                  {/* 라벨 끝 */}
                  {/* 이름 입력창 */}
                  <div className="col-9">
                    <input
                      type="text"
                      id="PhoneNum"
                      required
                      className="form-control"
                      value={reservation.PhoneNum}
                      onChange={handleInputChange}
                      placeholder="연락처"
                      name="PhoneNum"
                    />
                  </div>
                </div>

                {/* 비밀번호 */}
                <div className="row g-3 align-items-center mb-3">
                  {/* 이름 라벨 시작 */}
                  <div className="col-3">
                    <label htmlFor="PassWord" className="col-form-label">
                      비밀번호
                    </label>
                  </div>
                  {/* 라벨 끝 */}
                  {/* 이름 입력창 */}
                  <div className="col-9">
                    <input
                      type="password"
                      id="PassWord"
                      required
                      className="form-control"
                      value={reservation.PassWord}
                      onChange={handleInputChange}
                      placeholder="비밀번호 숫자"
                      name="PassWord"
                    />
                  </div>
                </div>
                {/* 비밀번호 확인 */}
                <div className="row g-3 align-items-center mb-3">
                  {/* 이름 라벨 시작 */}
                  <div className="col-3">
                    <label htmlFor="fullName" className="col-form-label">
                      비밀번호 확인
                    </label>
                  </div>
                  {/* 라벨 끝 */}
                  {/* 이름 입력창 */}
                  <div className="col-9">
                    <input
                      type="password"
                      id="password"
                      required
                      className="form-control"
                      value={reservation.EnName}
                      onChange={handleInputChange}
                      placeholder="이름"
                      name="fullName"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 모달 불러오기 */}
      <MyareaModal show={modalShow} onHide={() => setModalShow(false)} />
      <ForiareaModal
        show={foriModalShow}
        onHide={() => foriSetModalShow(false)}
      />
    </>
  );
}

export default ReservePayment;
