// pages/Home.tsx : rfce
import React, { useEffect, useRef, useState } from "react";
import initScripts from "../assets/js/scripts";
import initCustom from "../assets/js/custom-home";
import { Overlay } from "react-bootstrap";

// import Airport from "../components/airport/Airport";
import Notice from "./notice/Notice";
import { Link } from "react-router-dom";
import HomeAirport from "./homeAirport/HomeAirport";
import { Value } from "sass";

/* eslint-disable */
function Home() {
  const [adultCount, setAdultCount] = useState(0);
  // const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);

  // 싱글데이터피커
  const [picker, setPicker] = useState(false);

  // 왕복, 편도 버튼
  const [isChecked, setChecked] = useState(true);

  const [departureAirport, setDepartureAirport] = useState("출발공항"); // 출발공항
  const [arrivalAirport, setArrivalAirport] = useState("도착공항"); // 도착공항

  const [departureDate, setDepartureDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [arrivalDate, setArrivalDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [seatClass, setSeatClass] = useState("좌석등급");

  const handleIncrement = (category: any) => {
    switch (category) {
      case "adult":
        setAdultCount(adultCount + 1);
        break;
      case "infant":
        setInfantCount(infantCount + 1);
        break;
      default:
        break;
    }
  };
  const handleDecrement = (category: any) => {
    switch (category) {
      case "adult":
        setAdultCount(adultCount > 0 ? adultCount - 1 : 0);
        break;
      case "infant":
        setInfantCount(infantCount > 0 ? infantCount - 1 : 0);
        break;
      default:
        break;
    }
  };

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const target = useRef(null);
  const target2 = useRef(null);
  const target3 = useRef(null);
  const target4 = useRef(null);

  useEffect(() => {
    initScripts();
    initCustom();

    if ($('input[name="daterange"]').length) {
      ($('input[name="daterange"]') as any).daterangepicker(
        {
          // singleDatePicker: true,
          locale: {
            format: "YYYY-MM-DD",
            separator: " - ",
            applyLabel: "Apply",
            cancelLabel: "Cancel",
            fromLabel: "From",
            toLabel: "To",
            customRangeLabel: "Custom",
            weekLabel: "W",
            daysOfWeek: ["일", "월", "화", "수", "목", "금", "토"],
            monthNames: [
              "1월",
              "2월",
              "3월",
              "4월",
              "5월",
              "6월",
              "7월",
              "8월",
              "9월",
              "10월",
              "11월",
              "12월",
            ],
            firstDay: 1,
          },
          singleDatePicker: picker,
          startDate: departureDate,
          endDate: arrivalDate,
        },
        function (start: any, end: any, label: any) {
          setDepartureDate(start.format("YYYY-MM-DD"));
          setArrivalDate(end.format("YYYY-MM-DD"));
        }
      );
    }
  }, [picker]);

  const clickNone = (event: any) => {
    event.stopPropagation();
    setShow(!show), setShow2(false), setShow3(false), setShow4(false);
  };

  const clickNone2 = (event: any) => {
    if (departureAirport == "출발공항") {
      alert("출발지를 입력해주세요.");
      return;
    }
    else {
      event.stopPropagation();
      setShow2(!show2), setShow(false), setShow3(false), setShow4(false);
    }
  };

  const clickNone3 = (event: any) => {
    event.stopPropagation();
    setShow(false), setShow2(false), setShow3(false), setShow4(false);
  };

  const clickNone4 = (event: any) => {
    if (departureAirport == "출발공항") {
      alert("출발지를 입력해주세요.");
      return;
    } else if (arrivalAirport == "도착공항") {
      alert("도착지를 입력해주세요.");
      return;
    } else {
      event.stopPropagation();
      setShow3(!show3), setShow(false), setShow2(false), setShow4(false);
    }
  };

  const clickNone5 = (event: any) => {
    if (departureAirport == "출발공항") {
      alert("출발지를 입력해주세요.");
      return;
    } else if (arrivalAirport == "도착공항") {
      alert("도착지를 입력해주세요.");
      return;
    } else if (adultCount == 0 && infantCount == 0) {
      alert("탑승인을 입력해주세요.");
      return;
    } else {
      event.stopPropagation();
      setShow4(!show4), setShow(false), setShow2(false), setShow3(false);
    }
  };

  const airlineClickSearch = () => {
    if (departureAirport == "출발공항") {
      alert("출발지를 입력해주세요.");
      return;
    } else if (arrivalAirport == "도착공항") {
      alert("도착지를 입력해주세요.");
      return;
    } else if (adultCount == 0 && infantCount == 0) {
      alert("탑승인을 입력해주세요.");
      return;
    } else if (seatClass == "좌석등급") {
      alert("좌석등급을 입력해주세요.");
      return;
    } else {
      // 모든 조건이 충족되면 페이지 이동
      window.location.href = `/reserve-choose/${departureAirport}/${arrivalAirport}/${adultCount}/${infantCount}/${seatClass}/${departureDate}/${arrivalDate}`;
    }
  }

  const divClick = () => {
    setShow(false);
    setShow2(false);
    setShow3(false);
    setShow4(false);
  };

  const AirportChange = () => {
    if (departureAirport == "출발공항") {
      alert("출발지를 입력해주세요.");
      return;
    } else if (arrivalAirport == "도착공항") {
      alert("도착지를 입력해주세요.");
      return;
    }
    else {
      const departue = departureAirport;
      const arrival = arrivalAirport;
      setDepartureAirport(arrival);
      setArrivalAirport(departue);
    }
  };

  return (
    <div onClick={divClick}>
      {/* 여기 */}
      {/* 1 */}
      <div className="hero" id="home-reservation-backimage">
        <div className="container">
          <div className="row align-items-center">
            {/* 서브 메뉴 */}
            <div className="col-md-12">
              <div>
                <form className="form" id="submenu">
                  GreenAir 항공권 예매
                </form>
              </div>
            </div>
            {/* 예약바 너비 조절 */}

            {/* <div className="row align-items-center">
            </div> */}
            <div className="col-md-12">
              <div className="intro-wrap">
                <div className="row">
                  <div className="col-12">
                    <form className="form"
                      id="home-big-reservation-form"
                    >
                      {/* 예약바 높이 조절 */}
                      <div className="row mb-2">
                        {/* <div className="radio-search-gap"> */}
                        {/* <div className="nhhLabelTag col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-1">
                          <input
                            type="radio"
                            className="btn-check"
                            name="btnradio"
                            id="goBack"
                            autoComplete="off"
                            onClick={() => {
                              setPicker(false);
                              console.log(picker);
                              setChecked(true);
                            }}
                            checked={isChecked}
                          />
                          <label className="trip-button" htmlFor="goBack">
                            왕복
                          </label>
                        </div>

                        <div className="nhhLabelTag col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-7">
                          <input
                            type="radio"
                            className="btn-check"
                            name="btnradio"
                            id="oneWay"
                            autoComplete="off"
                            onClick={() => {
                              setPicker(true);
                              console.log(picker);
                              setChecked(false);
                            }}
                            checked={!isChecked}
                          />
                          <label className="trip-button" htmlFor="oneWay">
                            편도
                          </label>
                        </div> */}

                        {/* 검색 */}
                        {/* <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-4">
                          <Link
                            to={`/reserve-choose/${departureAirport}/${arrivalAirport}/${adultCount}/${infantCount}/${seatClass}/${departureDate}/${arrivalDate}`}
                          >
                            <input
                              type="button"
                              className="form-search-control"
                              value={"항공권 조회"}
                            ></input>
                          </Link>
                        </div> */}
                        {/* </div> */}

                        {/* 출발지 */}
                        <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-2">
                          <input
                            type="text"
                            className="form-control form-control-nhh"
                            ref={target}
                            onClick={(e) => clickNone(e)}
                            value={departureAirport}
                          ></input>
                        </div>

                        <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-1">
                          <input
                            type="button"
                            className="form-control form-control-nhh"
                            value={"⮂"}
                            onClick={AirportChange}
                          ></input>
                        </div>

                        {/* 도착지 */}
                        <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-2">
                          <input
                            type="text"
                            className="form-control form-control-nhh"
                            ref={target2}
                            onClick={(e) => clickNone2(e)}
                            value={arrivalAirport}
                          ></input>
                        </div>

                        {/* 달력 */}
                        <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-3">
                          <input
                            type="text"
                            className="form-control form-control-nhh"
                            name="daterange"
                            onClick={(e) => clickNone3(e)}
                          />
                        </div>

                        {/* 인원 */}
                        <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-2">
                          <input
                            type="text"
                            className="form-control form-control-nhh"
                            ref={target3}
                            onClick={(e) => clickNone4(e)}
                            value={`어른 : ${adultCount} 소아 : ${infantCount}`}
                          ></input>
                        </div>

                        {/* 좌석등급 */}
                        <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-2">
                          <input
                            type="text"
                            className="form-control form-control-nhh"
                            ref={target4}
                            onClick={(e) => clickNone5(e)}
                            value={seatClass}
                          ></input>
                        </div>

                        {/* 항공권 조회 버튼 */}
                        <div className="search-control-gap">
                          <input
                            type="button"
                            className="form-search-control"
                            value={"항공권 조회"}
                            onClick={() => airlineClickSearch()}
                            ></input>
                        </div>

                        <Overlay
                          target={target.current}
                          show={show}
                          placement="bottom"
                        >
                          {({
                            placement: _placement,
                            arrowProps: _arrowProps,
                            show: _show,
                            popper: _popper,
                            hasDoneInitialMeasure: _hasDoneInitialMeasure,
                            ...props
                          }) => (
                            <div
                              className="boader_passenger"
                              {...props}
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              style={{
                                position: "absolute",
                                // backgroundColor: "white",
                                width: "530px",
                                // 길이 지정
                                margin: "20px 0px 0px 30px",
                                padding: "20px 0px 0px 0px",
                                color: "black",
                                borderRadius: 3,
                                ...props.style,
                              }}
                            >
                              <HomeAirport
                                setShow={setShow}
                                set공항={setDepartureAirport}
                              />
                            </div>
                          )}
                        </Overlay>

                        <Overlay
                          target={target2.current}
                          show={show2}
                          placement="bottom"
                        >
                          {({
                            placement: _placement,
                            arrowProps: _arrowProps,
                            show: _show,
                            popper: _popper,
                            hasDoneInitialMeasure: _hasDoneInitialMeasure,
                            ...props
                          }) => (
                            <div
                              className="boader_passenger"
                              {...props}
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              style={{
                                position: "absolute",
                                // backgroundColor: "white",
                                width: "530px",
                                // 길이 지정
                                margin: "20px 0px 0px 30px",
                                padding: "20px 0px 0px 0px",
                                color: "black",
                                borderRadius: 3,
                                ...props.style,
                              }}
                            >
                              <HomeAirport
                                setShow={setShow2}
                                set공항={setArrivalAirport}
                              />
                            </div>
                          )}
                        </Overlay>

                        {/* 인원 */}
                        <Overlay
                          target={target3.current}
                          show={show3}
                          placement="bottom"
                        >
                          {({
                            placement: _placement,
                            arrowProps: _arrowProps,
                            show: _show,
                            popper: _popper,
                            hasDoneInitialMeasure: _hasDoneInitialMeasure,
                            ...props
                          }) => (
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              className="boader_passenger"
                              {...props}
                              style={{
                                position: "absolute",
                                // backgroundColor: "white",
                                width: "200px",
                                // 길이 지정
                                margin: "20px 0px 0px 0px",
                                padding: "20px 0px 10px 40px",
                                color: "black",
                                borderRadius: 3,
                                ...props.style,
                              }}
                            >
                              <div>
                                <div className="style-personel">
                                  <button
                                    className="style-personel-button"
                                    onClick={() => handleDecrement("adult")}
                                  >
                                    -
                                  </button>
                                  <span> 성인: {adultCount} </span>
                                  <button
                                    className="style-personel-button"
                                    onClick={() => handleIncrement("adult")}
                                  >
                                    +
                                  </button>
                                </div>

                                <div className="style-personel">
                                  <button
                                    className="style-personel-button"
                                    onClick={() => handleDecrement("infant")}
                                  >
                                    -
                                  </button>
                                  <span> 소아: {infantCount} </span>
                                  <button
                                    className="style-personel-button"
                                    onClick={() => handleIncrement("infant")}
                                  >
                                    +
                                  </button>
                                </div>
                                <button
                                  className="person-choice"
                                  onClick={(e) => {
                                    setShow3(false);
                                  }}
                                >
                                  선택
                                </button>
                              </div>
                            </div>
                          )}
                        </Overlay>

                        {/* 좌석등급 */}
                        <Overlay
                          target={target4.current}
                          show={show4}
                          placement="bottom"
                        >
                          {({
                            placement: _placement,
                            arrowProps: _arrowProps,
                            show: _show,
                            popper: _popper,
                            hasDoneInitialMeasure: _hasDoneInitialMeasure,
                            ...props
                          }) => (
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              className="boader_passenger"
                              {...props}
                              style={{
                                position: "absolute",
                                // backgroundColor: "white",
                                width: "250px",
                                // 길이 지정
                                margin: "20px 0px 0px 0px",
                                padding: "30px 0px 30px 50px",
                                color: "black",
                                borderRadius: 3,
                                ...props.style,
                              }}
                            >
                              {/* 여기 */}
                              <div className="d-grid gap-3">
                                <button
                                  className="seat-rating"
                                  type="button"
                                  onClick={() => {
                                    setSeatClass("이코노미");
                                    setShow4(false);
                                  }}
                                >
                                  이코노미
                                </button>
                                <button
                                  className="seat-rating"
                                  type="button"
                                  onClick={() => {
                                    setSeatClass("비지니스");
                                    setShow4(false);
                                  }}
                                >
                                  비지니스
                                </button>
                                <button
                                  className="seat-rating"
                                  type="button"
                                  onClick={() => {
                                    setSeatClass("퍼스트");
                                    setShow4(false);
                                  }}
                                >
                                  퍼스트
                                </button>
                              </div>
                            </div>
                          )}
                        </Overlay>
                      </div>
                      <div className="row align-items-center">
                        <div className="col-lg-8">
                          {/* <label className="control control--checkbox mt-3"> */}
                          {/* <span className="caption">Save this search</span>
                            <input type="checkbox" checked={true} />
                            <div className="control__indicator"></div> */}
                          {/* </label> */}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >

      {/* 여행추천지 */}
      <div className="untree_co-section" >
        <div className="container">
          <div className="row travel-recommendations-text justify-content-center mb-5">
            <div className="col-lg-7">
              <h2 className="section-title">여행 추천지</h2>
            </div>
          </div>

          <div className="owl-carousel owl-3-slider">
            {/* 1 */}
            <div className="item" style={{height:"600px"}}>
              <a href={`/reserve-choose/ICN/SFO/1/0/이코노미/${departureDate}/${arrivalDate}`}
                className="media-thumb"
              >
                <img
                  src="images/hero-slider-1.jpg"
                  alt="Image"
                  className="img-fluid"
                />
              </a>
              <div className="media-1">
                <span className="d-flex align-items-center loc mb-2">
                  <span className="icon-room mr-3"></span>
                  <span className="location-font-size">미국, 샌프란시스코</span>
                </span>
                <div className="attraction">골든게이트 교</div>
              </div>
            </div>

            {/* 2 */}
            <div className="item">
              <a href={`/reserve-choose/ICN/PEK/1/0/이코노미/${departureDate}/${arrivalDate}`}
                className="media-thumb"
              >
                <img
                  src="images/베이징.jpg"
                  alt="Image"
                  className="img-fluid"
                />
              </a>
              <div className="media-1">
                <span className="d-flex align-items-center loc mb-2">
                  <span className="icon-room mr-3"></span>
                  <span className="location-font-size">중국</span>
                </span>
                <div className="attraction">베이징</div>
              </div>
            </div>

            {/* 3 */}
            <div className="item">
              <a href={`/reserve-choose/ICN/SPN/1/0/이코노미/${departureDate}/${arrivalDate}`}
                className="media-thumb"
              >
                <img
                  src="images/사이판.jpg"
                  alt="Image"
                  className="img-fluid"
                />
              </a>
              <div className="media-1">
                <span className="d-flex align-items-center loc mb-2">
                  <span className="icon-room mr-3"></span>
                  <span className="location-font-size">사이판</span>
                </span>
                <div className="attraction">롤라우 비치</div>
              </div>
            </div>

            {/* 4 */}
            <div className="item">
              <a href={`/reserve-choose/ICN/LAX/1/0/이코노미/${departureDate}/${arrivalDate}`}
                className="media-thumb"
              >
                <img
                  src="images/할리우드.jpg"
                  alt="Image"
                  className="img-fluid"
                />
              </a>
              <div className="media-1">
                <span className="d-flex align-items-center loc mb-2">
                  <span className="icon-room mr-3"></span>
                  <span className="location-font-size">로스앤젤레스</span>
                </span>
                <div className="attraction">할리우드</div>
              </div>
            </div>

            {/* 5 */}
            <div className="item">
              <a href={`/reserve-choose/ICN/LHR/1/0/이코노미/${departureDate}/${arrivalDate}`}
                className="media-thumb"
              >
                <img
                  src="images/hero-slider-5.jpg"
                  alt="Image"
                  className="img-fluid"
                />
              </a>
              <div className="media-1">
                <span className="d-flex align-items-center loc mb-2">
                  <span className="icon-room mr-3"></span>
                  <span className="location-font-size">런던</span>
                </span>
                <div className="attraction">빅 벤</div>
              </div>
            </div>

            {/* 6 */}
            <div className="item">
              <a href={`/reserve-choose/ICN/KIX/1/0/이코노미/${departureDate}/${arrivalDate}`}
                className="media-thumb"
              >
                <img
                  src="images/오사카성.jpg"
                  alt="Image"
                  className="img-fluid"
                />
              </a>
              <div className="media-1">
                <span className="d-flex align-items-center loc mb-2">
                  <span className="icon-room mr-3"></span>
                  <span className="location-font-size">일본</span>
                </span>
                <div className="attraction">오사카성</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="col-md-12 row">
          <h3 className="homeNoticeTitle"><a href={`/notice`}>공지사항</a></h3>
          <div className="home-notice-link">
            <Link to={"/notice"}>+</Link>
          </div>
        </div>
      </div>

      <Notice />
      {/* <a
        href="#"
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short button-click-top-move"></i>
      </a> */}
    </div >
  );
}

export default Home;
