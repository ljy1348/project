import React, { useEffect, useState } from "react";
import MyareaModal from "../modal/MyareaModal";
import ForiareaModal from "../modal/ForiareaModal";
import IReservation from "../../types/reserve/IReservation";
import initScripts from "../../assets/js/scripts";
import initCustom from "../../assets/js/custom";
import PaymentModal from "../modal/PaymentModal";
import { useParams } from "react-router-dom";
import IOperationinfo from "../../types/IOperationinfo";
import OperationService from "../../services/OperationService";
import ICount from "./../../types/reserve/ICount";

function ReservePayment() {
  // 기본키
  const {
    firstId,
    secoundId,
    startDate2,
    endDate2,
    startDayName,
    endDayName,
    adultCount,
    childCount,
  } = useParams();

  const [icount, setICount] = useState<ICount>();

  const initICount = {
    adult: false,
    name: "",
  };
  const [temp, setTemp] = useState<ICount[]>([initICount]);

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
    domesticInternational: "",
    price: "",
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
    domesticInternational: "",
    price: "",
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

  const [operationinfo, setOperationinfo] =
    useState<IOperationinfo>(initialOperationinfo);
  const [operationinfo2, setOperationinfo2] = useState<IOperationinfo>(
    initialOperationinfo2
  );

  // 도착 날짜 저장 함수
  const [day, setDay] = useState<string>("");
  const [day2, setDay2] = useState<string>("");

  const days = ["일", "월", "화", "수", "목", "금", "토"];
  // startDate2와 endDate2를 Date 객체로 변환
  const startDateObj = new Date(day ?? new Date());
  const endDateObj = new Date(day2 ?? new Date());

  // getDay() 메서드로 요일 인덱스를 얻음
  const startDayIndex = startDateObj.getDay();
  const endDayIndex = endDateObj.getDay();

  // days 배열에서 요일 이름을 얻음
  const startDayName2 = days[startDayIndex];
  const endDayName2 = days[endDayIndex];

  // 상세조회 함수
  const getoperationinfo = (operationId: string) => {
    OperationService.get(operationId) // 벡엔드로 상세조회 요청
      .then((response: any) => {
        setOperationinfo(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const getoperationinfo2 = (operationId: string) => {
    OperationService.get(operationId) // 벡엔드로 상세조회 요청
      .then((response: any) => {
        setOperationinfo2(response.data);
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
    if (firstId) {
      getoperationinfo(firstId);
      inputdays(startDate2);
    }
    if (secoundId) {
      getoperationinfo2(secoundId);
      inputdays2(endDate2);
    }
  }, []);

  useEffect(() => {
    let arr: ICount[] = [];
    for (let i = 0; i < Number(adultCount); i++) {
      const data = { adult: true, name: "" };
      arr = [...arr, data];
    }

    for (let i = 0; i < Number(childCount); i++) {
      const data = { adult: false, name: "" };
      arr = [...arr, data];
    }

    setTemp(arr);
  }, []);

  const inputdays = (startDate2: any) => {
    // 현재 날짜를 포함하는 Date 객체 생성
    const currentDate = new Date(startDate2);

    // 시작 시간과 종료 시간을 Date 객체로 변환
    const startDateTime = new Date(
      currentDate.toDateString() + " " + operationinfo.startTime
    );
    const finalDateTime = new Date(
      currentDate.toDateString() + " " + operationinfo.finalTime
    );

    if (startDateTime > finalDateTime) {
      const nextDay = new Date(currentDate);
      nextDay.setDate(nextDay.getDate() + 1);

      setDay(nextDay.toLocaleDateString()); // Update the state with the next day
      console.log("날짜 증가" + nextDay.toLocaleDateString());
    } else {
      setDay(startDate2);
      console.log(startDate2);
    }
  };

  const inputdays2 = (endDate2: any) => {
    // 현재 날짜를 포함하는 Date 객체 생성
    const currentDate = new Date(endDate2);

    // 시작 시간과 종료 시간을 Date 객체로 변환
    const startDateTime = new Date(
      currentDate.toDateString() + " " + operationinfo2.startTime
    );
    const finalDateTime = new Date(
      currentDate.toDateString() + " " + operationinfo2.finalTime
    );

    if (startDateTime > finalDateTime) {
      const nextDay = new Date(currentDate);
      nextDay.setDate(nextDay.getDate() + 1);

      setDay2(nextDay.toLocaleDateString()); // Update the state with the next day
      console.log("날짜 증가" + nextDay.toLocaleDateString());
    } else {
      setDay2(endDate2);
      console.log(endDate2);
    }
  };
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
                  <span className="sangmin_payment_loca">
                    {operationinfo.startAirport}
                  </span>
                  <span className="sangmin_payment_loca">
                    <i className="sang_min_arrow_icon bi bi-arrow-right"></i>
                  </span>
                  <span className="sangmin_payment_loca">
                    {operationinfo.finalAirport}
                  </span>
                </div>
                <div className="sangmin_payment_reserve_info_last col">
                  <span>
                    {startDate2}({startDayName})
                  </span>{" "}
                  <span>{operationinfo.startTime}</span> <span>~</span>{" "}
                  <span>
                    {day}({startDayName2})
                  </span>{" "}
                  <span>{operationinfo.finalTime}</span>
                  <span className="sangmin_aircode">
                    {operationinfo.flightName}
                  </span>
                  <span>이코노미(L)</span>
                </div>
              </div>

              <div className="col-2"></div>
            </div>
          </div>
          <div className="sangmin_payment_reserve_two_info">
            <div className="row text-left">
              <div className="sangmin_payment_reserve_info_first col-2">
                두 번째 여정
              </div>

              <div className="sangmin_payment_reserve_info_secound col-8">
                <div className="col">
                  <span className="sangmin_payment_loca">
                    {operationinfo2.startAirport}
                  </span>
                  <span className="sangmin_payment_loca">
                    <i className="sang_min_arrow_icon bi bi-arrow-right"></i>
                  </span>
                  <span className="sangmin_payment_loca">
                    {operationinfo2.finalAirport}
                  </span>
                </div>
                <div className="sangmin_payment_reserve_info_last col">
                  <span>
                    {endDate2}({endDayName})
                  </span>{" "}
                  <span>{operationinfo2.startTime}</span> <span>~</span>{" "}
                  <span>
                    {day2}({endDayName2})
                  </span>{" "}
                  <span>{operationinfo2.finalTime}</span>
                  <span className="sangmin_aircode">
                    {operationinfo2.flightName}
                  </span>
                  <span>이코노미(L)</span>
                </div>
              </div>

              <div className="col-2"></div>
            </div>
          </div>
        </div>

        <h3 className="sangmin_reserve_payment_subtitle">탑승자 정보</h3>

        {/* 정보입력 */}

        <div className="accordion" id="accordionExample">
          {temp &&
            temp.map((val, idx) => {
              return (
                <div className="accordion-item" key={idx}>
                  <h2 className="accordion-header" id={"head" + idx}>
                    <button
                      className={
                        idx == 0
                          ? "accordion-button"
                          : "accordion-button collapsed"
                      }
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={"#collapse" + idx}
                      aria-expanded={idx == 0 ? "true" : "false"}
                      aria-controls={"#collapse" + idx}
                    >
                      {val.name != "" ? (
                        <>{val.name}</>
                      ) : val.adult ? (
                        <>탑승자 정보 입력창: 성인</>
                      ) : (
                        <> 탑승자 정보 입력창: 어린이</>
                      )}
                    </button>
                  </h2>

                  <div
                    id={"collapse" + idx}
                    className={
                      idx === 0
                        ? "accordion-collapse collapse show"
                        : "accordion-collapse collapse"
                    }
                    aria-labelledby={"heading" + idx}
                    // data-bs-parent="#accordionExample"
                  >
                    {/* 사용자 정보 */}

                    <div className="accordion-body row">
                      <div className="col">
                        {/* 성별 선택 */}
                        <div className="row g-3 align-items-center mb-3">
                          {/* 성별 라벨 시작 */}
                          <div className="col-3">
                            <label
                              htmlFor="fullName"
                              className="col-form-label"
                            >
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
                            <label
                              htmlFor="fullName"
                              className="col-form-label"
                            >
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

                        <div className="row g-3 align-items-center mb-3">
                          {/* 국적 라벨 시작 */}
                          <div className="col-3">
                            <label
                              htmlFor="fullName"
                              className="col-form-label"
                            >
                              국적
                            </label>
                          </div>
                          {/* 이름 라벨 끝 */}
                          {/* 국적 입력창 */}
                          <div className="col-9">
                            <input
                              type="text"
                              id="fullName"
                              required
                              className="form-control"
                              value={reservation.EnName}
                              onChange={handleInputChange}
                              placeholder="국적"
                              name="fullName"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col">
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

                        {/* 전화번호 입력 */}
                        <div className="row g-3 align-items-center mb-3">
                          {/* 이름 라벨 시작 */}
                          <div className="col-3">
                            <label htmlFor="UserId" className="col-form-label">
                              전화번호
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
                              placeholder="번호만 입력해 주세요"
                              name="UserId"
                            />
                          </div>
                        </div>

                        <div className="row g-3 align-items-center mb-3">
                          {/* 국적 라벨 시작 */}
                          <div className="col-3">
                            <label
                              htmlFor="fullName"
                              className="col-form-label"
                            >
                              이메일
                            </label>
                          </div>
                          {/* 이름 라벨 끝 */}
                          {/* 국적 입력창 */}
                          <div className="col-9">
                            <input
                              type="text"
                              id="fullName"
                              required
                              className="form-control"
                              value={reservation.EnName}
                              onChange={handleInputChange}
                              placeholder="이메일"
                              name="fullName"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>


        <div className="d-flex justify-content-end ">
          <button
            className="sangmin_choose_btn mt-5 mb-5"
            onClick={() => setModalShow(true)}
          >
            결제
          </button>
        </div>
      </div>

      {/* 모달 불러오기 */}
    </>
  );
}

export default ReservePayment;
