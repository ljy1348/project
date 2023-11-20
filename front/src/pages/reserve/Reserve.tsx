import React, { useEffect, useState } from "react";
import initScripts from "../../assets/js/scripts";
import initCustom from "../../assets/js/custom";
import { Button, Modal } from "react-bootstrap";
import MyareaModal from "../modal/MyareaModal";
import ForiareaModal from "../modal/ForiareaModal";
import IReservation from "../../types/reserve/IReservation";
import { Link } from "react-router-dom";

function Reserve() {
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
    AirportFee:""
  };

  // type 선언
  const [reservation, setReservation] =
    useState<IReservation>(initiaReservaionl);


  // modalcontrol
  const [modalShow, setModalShow] = useState(false);
  const [foriModalShow, foriSetModalShow] = useState(false);

  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  useEffect(() => {
    initScripts();
    initCustom();
  }, []);
  // const myModal = document.getElementById("myModal");
  // const myInput = document.getElementById("myInput");

  // myModal?.addEventListener("shown.bs.modal", () => {
  //   myInput?.focus();
  // });
  const handleDecrement = (category: any) => {
    switch (category) {
      case "adult":
        setReservation((prevReservation) => ({
          ...prevReservation,
          AdultCount: prevReservation.AdultCount - 1,
        }));
        break;
      case "child":
        setReservation((prevReservation) => ({
          ...prevReservation,
          ChildCount: prevReservation.ChildCount - 1,
        }));
        break;
      case "infant":
        setReservation((prevReservation) => ({
          ...prevReservation,
          InfantCount: prevReservation.InfantCount - 1,
        }));
        break;
    }
  };

  const handleIncrement = (category: any) => {
    switch (category) {
      case "adult":
        setReservation((prevReservation) => ({
          ...prevReservation,
          AdultCount: prevReservation.AdultCount + 1,
        }));
        break;
      case "child":
        setReservation((prevReservation) => ({
          ...prevReservation,
          ChildCount: prevReservation.ChildCount + 1,
        }));
        break;
      case "infant":
        setReservation((prevReservation) => ({
          ...prevReservation,
          InfantCount: prevReservation.InfantCount + 1,
        }));
        break;
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
                <h1 className="mb-0">예약 하다</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="col-12">
          {/* 마일리지 항공권 예약 버튼 */}
          <div className="d-flex justify-content-end mt-5 no-gutters">
            <button className="sangmin_reserve_btn">
              마일리지 항공권 예약하기
            </button>
          </div>

          {/* step bedge */}
          <div className="d-flex justify-content-center mt-5 col-12">
            <div className="sangmin_step_bedge">
              <span className="badge rounded-pill text-bg-danger">
                {" "}
                1 검색{" "}
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
              <span className="badge rounded-pill text-bg-danger">3</span>
              {/* <span> 검색 </span> */}
              {/* <span></span> */}
            </div>
          </div>

          {/* 안내상황 */}
          <div className="sangmin_reserve_notice mt-5">
            <ul>
              <li>
                개인정보보호법 시행령 제39조의3 제④항 강화 시행령에 따라 만 14세
                미만 미성년자 예매 시 법정대리인의 동의 및 인증이 불가피하므로
                14세 이상의 성인께서 로그인 후 예매진행을 해 주시기 바랍니다.
              </li>
            </ul>
          </div>

          {/* trip_type 타이틀 */}
          <div className="sangmin_reserve_sub_title mt-5">
            <h4>여정/날짜 선택</h4>
          </div>
          {/* trip_type */}
          <div className="mt-3 d-flex justify-content-left">
            {/* 버튼 */}

            <div
              className="btn-group d-flex justify-content-left"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <input
                type="radio"
                className="btn-check "
                name="btnradio"
                id="btnradio1"
                autoComplete="off"
                checked
              />
              <label
                className="btn btn-outline-primary rounded-0"
                htmlFor="btnradio1"
              >
                왕복
              </label>

              <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="btnradio2"
                autoComplete="off"
              />
              <label
                className="btn btn-outline-primary rounded-0"
                htmlFor="btnradio2"
              >
                편도
              </label>

              {/* 다구간 */}
              {/* <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="btnradio3"
                autoComplete="off"
              />
              <label
                className="btn btn-outline-primary rounded-0"
                htmlFor="btnradio3"
              >
                다구간
              </label> */}
              {/* 다구간 끝 */}
            </div>
          </div>

          {/* 출발,도착,탑승일 */}
          <div className="sangmin_reserve_itineary">
            <div className="sangmin_reserve_itineary_select text-start">
              <input
                type="text"
                title="출발지"
                className="sangmin_reserve_myArea"
                value="출발지"
              />
              <a
                className="sangmin_modal_click"
                onClick={() => setModalShow(true)}
              ></a>
            </div>
            {/* <i className="sangmin_map_icon bi bi-geo-alt-fill"></i> */}

            <div className="sangmin_reserve_itineary_select">
              <input
                type="text"
                title="도착지"
                className="sangmin_reserve_arriveArea"
                value="도착지"
              />
              <a
                className="sangmin_modal_click"
                onClick={() => foriSetModalShow(true)}
              ></a>
            </div>

            <div className="sangmin_reserve_itineary_select">
              <input
                type="text"
                title="탑승일"
                className="sangmin_reserve_date"
                value="탑승일"
                // className="form-control"
                name="daterange"
              />
            </div>
          </div>

          {/* 인원 입력 타이틀*/}
          <div className="sangmin_reserve_sub_title mt-5">
            <h4>탑승 인원 선택</h4>
          </div>
          {/* 인원 입력 */}
          <div className="sangmin_reserve_passanger_count ">
            <div className="sangmin_reserve_area" id="sangmin_reserve_adult">
              <h5>
                성인
                <span id="sangmin_reserve_adultAge">(만 12세 이상)</span>
              </h5>

              <div className="sangmin_reserve_button_numbox  d-flex justify-content-left">
                <button
                  className="sangmin_btn_number minus"
                  name="sangmin_btn_number"
                  disabled={reservation.AdultCount === 0}
                  onClick={() => handleDecrement("adult")}
                >
                  <span className="hidden">-</span>
                </button>
                <input
                  type="text"
                  title="성인"
                  className="sangmin_reserve_adult_count"
                  value={reservation.AdultCount}
                />
                <button
                  className="sangmin_btn_number plus"
                  name="sangmin_btn_number"
                  onClick={() => handleIncrement("adult")}
                >
                  <span className="hidden">+</span>
                </button>
              </div>
            </div>

            <div className="sangmin_reserve_area" id="sangmin_reserve_child">
              <h5>
                유아
                <span id="sangmin_reserve_childAge">(만 2세 ~ 12세 미만)</span>
              </h5>

              <div className="sangmin_reserve_button_numbox  d-flex justify-content-left">
                <button
                  className="sangmin_btn_number minus"
                  name="sangmin_btn_number"
                  disabled={reservation.ChildCount === 0}
                  onClick={() => handleDecrement("child")}
                >
                  <span className="hidden">-</span>
                </button>
                <input
                  type="text"
                  title="유아"
                  className="sangmin_reserve_adult_count"
                  value={reservation.ChildCount}
                />
                <button
                  className="sangmin_btn_number plus"
                  name="sangmin_btn_number"
                  onClick={() => handleIncrement("child")}
                >
                  <span className="hidden">+</span>
                </button>
              </div>
            </div>

            <div className="sangmin_reserve_area" id="sangmin_reserve_infant">
              <h5>
                소아
                <span id="sangmin_reserve_infantAge">(만 2세 미만)</span>
              </h5>

              <div className="sangmin_reserve_button_numbox  d-flex justify-content-left">
                <button
                  className="sangmin_btn_number minus"
                  name="sangmin_btn_number"
                  disabled={reservation.InfantCount === 0}
                  onClick={() => handleDecrement("infant")}
                >
                  <span className="hidden">-</span>
                </button>
                <input
                  type="text"
                  title="소아"
                  className="sangmin_reserve_adult_count"
                  value={reservation.InfantCount}
                />
                <button
                  className="sangmin_btn_number plus"
                  name="sangmin_btn_number"
                  disabled={reservation.InfantCount === 0}
                  onClick={() => handleIncrement("infant")}
                >
                  <span className="hidden">+</span>
                </button>
              </div>
            </div>
          </div>

          {/* 좌석 등급 선택 타이틀*/}
          <div className="sangmin_reserve_sub_title mt-5">
            <h4>좌석 등급 선택</h4>
          </div>

          {/* 좌석등급 선택 */}
          <div className="sangmin_reserve_class">
            <div
              className="btn-group"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <input
                type="radio"
                className="btn-check"
                name="class_btnradio"
                id="class_btnradio1"
                autoComplete="off"
                checked
              />
              <label
                className="btn btn-outline-primary col-3"
                htmlFor="class_btnradio1"
              >
                이코노미 특가
              </label>

              <input
                type="radio"
                className="btn-check"
                name="class_btnradio"
                id="class_btnradio2"
                autoComplete="off"
              />
              <label
                className="btn btn-outline-primary col-3"
                htmlFor="class_btnradio2"
              >
                이코노미
              </label>

              <input
                type="radio"
                className="btn-check"
                name="class_btnradio"
                id="class_btnradio3"
                autoComplete="off"
              />
              <label
                className="btn btn-outline-primary col-3"
                htmlFor="class_btnradio3"
              >
                비지니스
              </label>

              <input
                type="radio"
                className="btn-check"
                name="class_btnradio"
                id="class_btnradio4"
                autoComplete="off"
              />
              <label
                className="btn btn-outline-primary col-3 rounded-0"
                htmlFor="class_btnradio4"
              >
                퍼스트
              </label>
            </div>
          </div>

          <div className="d-flex justify-content-end mt-5 no-gutters">
            <button className="sangmin_reserve_btn">
              <Link to="/reserve-choose">항공권 조회</Link>
            </button>
          </div>

          {/* <Button variant="primary" onClick={() => setModalShow(true)}>
            모달 실행
          </Button> */}

          <MyareaModal show={modalShow} onHide={() => setModalShow(false)} />
          <ForiareaModal
            show={foriModalShow}
            onHide={() => foriSetModalShow(false)}
          />
        </div>
      </div>
      {/* </div>
        </div>
      </div> */}
    </>
  );
}

export default Reserve;
