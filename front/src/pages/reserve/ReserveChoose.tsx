import React, { useEffect, useState } from "react";
import IReservation from "../../types/reserve/IReservation";
import initScripts from "../../assets/js/scripts";
import initCustom from "../../assets/js/custom";
import MyareaModal from "../modal/MyareaModal";
import ForiareaModal from "../modal/ForiareaModal";
import { Link } from "react-router-dom";

function ReserveChoose() {
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
  };
  //   add 함수
  const [reservation, setReservation] =
    useState<IReservation>(initiaReservaionl);
  //   조회 함수
  const [reservationList, setReservationList] = useState<Array<IReservation>>(
    []
  );
  const [departure, setDeparture] = useState<Date>();

  // modalcontrol
  const [modalShow, setModalShow] = useState(false);
  const [foriModalShow, foriSetModalShow] = useState(false);

  useEffect(() => {
    initScripts();
    initCustom();
  }, []);
  // const myMo

  return (
    <>
      <div className="hero hero-inner">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mx-auto text-center">
              <div className="intro-wrap">
                <h1 className="mb-0">항공권 조회</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 상단 바 */}
      <div className="sangmin_choose_top">
        <div className="container">
          {/* 출발지 */}
          <div className="sangmin_choose_top_itineary_select text-start">
            <input
              type="text"
              title="출발지"
              className="sangmin_choose_top_myArea"
              value="출발지"
              onClick={() => setModalShow(true)}
            />
          </div>
          {/* 도착지 */}
          <div className="sangmin_choose_top_itineary_select">
            <input
              type="text"
              title="도착지"
              className="sangmin_choose_top_arriveArea"
              value="도착지"
              onClick={() => foriSetModalShow(true)}
            />
          </div>
          {/* 탑승일 */}
          <div className="sangmin_choose_top_itineary_select">
            <input
              type="text"
              title="탑승일"
              className="sangmin_choose_top_date"
              value="탑승일"
              // className="form-control"
              name="daterange"
            />
          </div>
          {/* 탑승 인원 */}
          <div className="sangmin_choose_top_itineary_select">
            <input
              type="text"
              title="탑승인원"
              className="sangmin_choose_top_passanger_count"
              value="탑승인원"
            />
          </div>
          {/* 좌석등급 */}
          <div className="sangmin_choose_top_itineary_select">
            <input
              type="text"
              title="좌석등급"
              className="sangmin_choose_top_class"
              value="좌석등급"
            />
          </div>
        </div>
      </div>

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
          <span className="badge rounded-pill text-bg-danger">2 항공편</span>
          {/* <span> 검색 </span> */}
          {/* <span></span> */}
        </div>
        <div className="sangmin_step_bedge">
          <span className="badge rounded-pill text-bg-danger">3</span>
          {/* <span> 검색 </span> */}
          {/* <span></span> */}
        </div>
      </div>
      {/* subTitle */}
      <div className="container">
        <h3 className="sangmin_reserve_choose_subTitle d-flex justify-content-center mt-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="air_icon bi bi-airplane-fill"
            viewBox="0 0 16 16"
          >
            <path d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849Z" />
          </svg>
          첫 번째 여정
        </h3>
      </div>
      <div className="container">
        {/* 출/도착 */}
        <div className="sangmin_choose_airport d-flex justify-content-center mt-5">
          <span>서울</span>
          <span> &gt; </span>
          <span>광저우</span>
        </div>
        {/* 반복문 */}
        <div className="sangmin_choose_airport_pee_date mt-5">
          <div className="sangmin_bottom_solid">
            {reservationList &&
              reservationList.map((data) => (
                // 키값 추가 않하면 react 에서 경고를 추가 : 키는 내부적으로 리액트가 rerending 할때 체크하는 값임
                <tr key={data.AirlineReservaitonNumber}>
                  {/* 날짜 */}
                  <td>{data.Departure} + 월</td>
                  <td>{data.AirportFee}</td>
                  
                </tr>
              ))}
            <table className="sangmin_choose_datepicker text-center">
              <tr>
                <td>11.27 (월)</td>
                <td>11.27 (화)</td>
                <td>11.27 (수)</td>
                <td>11.27 (목)</td>
                <td>11.27 (금)</td>
                <td>11.27 (토)</td>
                <td>11.27 (일)</td>
              </tr>
              <tr className="mt-5">
                <td>257,000</td>
                <td>257,000</td>
                <td>257,000</td>
                <td>257,000</td>
                <td>257,000</td>
                <td>257,000</td>
                <td>257,000</td>
              </tr>
            </table>
            {/* <p className="sangmin_choose_airport_data">11.27 (월)</p>

          <p className="sangmin_choose_airport_price">
            KRW<span className="currency"> 257,000</span>
          </p> */}
          </div>
        </div>

        {/* 조회 page */}
        <table className="table text-center mt-5">
          <tr className="sangmin_choose_table_head">
            <th className="sangmin_gray_bg">출도착시간 (비행시간)</th>
            <th className="sangmin_unleftline gray_bg">편명/기종</th>
            <th className="sangmin_economy_bg">이코노미</th>

            <th className="sangmin_business_bg">비즈니스</th>
            <th className="sangmin_first_bg">퍼스트</th>
          </tr>
          <tr className="sangmin_choose_table_content">
            <td>
              <ul className="sangmin_choose_time d-flex justify-content-between  mt-3">
                <li>20:50</li>

                <li className="sang_min_arrow_icon">
                  <i className="sang_min_arrow_icon bi bi-arrow-right"></i>
                </li>
                <li>23:40</li>
              </ul>
            </td>
            <td>비행기 코드</td>
            <td>237,000</td>
            <td>637,000</td>
            <td>2,130,000</td>
          </tr>
        </table>

        {/* 왕복일 경우만 표시 */}
        {/* subTitle */}
        <div className="container">
          <h3 className="sangmin_reserve_choose_subTitle d-flex justify-content-center mt-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="air_icon bi bi-airplane-fill"
              viewBox="0 0 16 16"
            >
              <path d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849Z" />
            </svg>
            두 번째 여정
          </h3>
        </div>
        {/* 출/도착  */}
        <div className="sangmin_choose_airport d-flex justify-content-center mt-5">
          <span>서울</span>
          <span> &gt; </span>
          <span>광저우</span>
        </div>
        {/* 반복문 */}
        <div className="sangmin_choose_airport_pee_date mt-5">
          <div className="sangmin_bottom_solid">
            {reservationList &&
              reservationList.map((data) => (
                // 키값 추가 않하면 react 에서 경고를 추가 : 키는 내부적으로 리액트가 rerending 할때 체크하는 값임
                <tr key={data.AirlineReservaitonNumber}>
                  {/* 날짜 */}
                  <td>{data.Departure} + 월</td>
                  <td>{data.AirportFee}</td>
                </tr>
              ))}
            <table className="sangmin_choose_datepicker text-center">
              <tr>
                <td>11.27 (월)</td>
                <td>11.27 (화)</td>
                <td>11.27 (수)</td>
                <td>11.27 (목)</td>
                <td>11.27 (금)</td>
                <td>11.27 (토)</td>
                <td>11.27 (일)</td>
              </tr>
              <tr className="mt-5">
                <td>257,000</td>
                <td>257,000</td>
                <td>257,000</td>
                <td>257,000</td>
                <td>257,000</td>
                <td>257,000</td>
                <td>257,000</td>
              </tr>
            </table>
            {/* <p className="sangmin_choose_airport_data">11.27 (월)</p>

          <p className="sangmin_choose_airport_price">
            KRW<span className="currency"> 257,000</span>
          </p> */}
          </div>
        </div>
        {/* 조회 page */}
        <table className="table text-center mt-5">
          <tr className="sangmin_choose_table_head">
            <th className="sangmin_gray_bg">출도착시간 (비행시간)</th>
            <th className="sangmin_unleftline gray_bg">편명/기종</th>
            <th className="sangmin_economy_bg">이코노미</th>

            <th className="sangmin_business_bg">비즈니스</th>
            <th className="sangmin_first_bg">퍼스트</th>
          </tr>
          <tr className="sangmin_choose_table_content">
            <td>
              <ul className="sangmin_choose_time d-flex justify-content-between  mt-3">
                <li>20:50</li>

                <li className="sang_min_arrow_icon">
                  <i className="sang_min_arrow_icon bi bi-arrow-right"></i>
                </li>
                <li>23:40</li>
              </ul>
            </td>
            <td>비행기 코드</td>
            <td>237,000</td>
            <td>637,000</td>
            <td>2,130,000</td>
          </tr>
        </table>

        {/* 유의 상황 */}
        <div className="sangmin_choose_notice mt-5">
          <h5> 유의사항</h5>
          <ul>
            <li className="mt-4 mb-3">
              국제선 항공권 온라인 예약은 조회일로부터 최대 361일, 최소 항공편
              출발 2시간 전까지 예약이 가능합니다.
            </li>
            <li>
              항공편 스케줄 및 기종은 부득이한 사유로 예고없이 변경될 수
              있습니다.
            </li>
          </ul>
        </div>

        

        <div className="d-flex justify-content-end mt-5 mb-5 no-gutters">
          <button className="sangmin_choose_btn">
            <Link to="/reserve-payment">비회원 결제</Link>
          </button>
          <button className="sangmin_choose_btn">
            <Link to="/reserve-payment">회원 결제</Link>
          </button>
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

export default ReserveChoose;
