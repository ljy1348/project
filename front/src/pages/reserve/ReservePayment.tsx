import React, { useState } from "react";
import MyareaModal from "../modal/MyareaModal";
import ForiareaModal from "../modal/ForiareaModal";
import IReservation from "../../types/reserve/IReservation";

function ReservePayment() {
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
              <div className="accordion-body">
                <div className="row g-3 align-items-center mb-3">
                  {/* 라벨 시작 */}
                  <div className="col-3">
                    <label htmlFor="fullName" className="col-form-label">
                      이름
                    </label>
                  </div>
                  {/* 라벨 끝 */}

                  <div className="col-9">
                    <input
                      type="text"
                      id="fullName"
                      required
                      className="form-control"
                      value={reservation.EnName}
                      onChange={handleInputChange}
                      placeholder="fullName"
                      name="fullName"
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
                <strong>This is the second item's accordion body.</strong> It is
                hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions. You can modify any of this with
                custom CSS or overriding our default variables. It's also worth
                noting that just about any HTML can go within the{" "}
                <code>.accordion-body</code>, though the transition does limit
                overflow.
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
