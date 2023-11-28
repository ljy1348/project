// pages/Home.tsx : rfce
import React, { useEffect, useRef, useState } from "react";
import initScripts from "../assets/js/scripts";
import initCustom from "../assets/js/custom";
import { Overlay } from "react-bootstrap";

import Airport from "../components/airport/Airport";
import Notice from "./notice/Notice";


/* eslint-disable */
function Home() {

  const [adultCount, setAdultCount] = useState(0);
  // const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);

  const [q, setQ] = useState(false);

  const [도착공항, set도착공항] = useState("ㅁ");
  const [출발공항, set출발공항] = useState("ㅠ");

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
            daysOfWeek: ["일", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            monthNames: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ],
            firstDay: 1,
          },
          "singleDatePicker": q,
          // startDate: startDate,
          // endDate: endDate,
        },
        function (start: any, end: any, label: any) {
          // setStartDate(start.format("YYYY-MM-DD"));
          // setEndDate(end.format("YYYY-MM-DD"));
        }
      );
    }


  }, [q]);

  const clickNone = (event:any) => {
    event.stopPropagation();
    setShow(!show), setShow2(false), setShow3(false), setShow4(false)
  }

  const clickNone2 = (event:any) => {
    event.stopPropagation();
    setShow2(!show2), setShow(false), setShow3(false), setShow4(false)
  }

  const clickNone3 = (event:any) => {
    event.stopPropagation();
    setShow(false), setShow2(false), setShow3(false), setShow4(false)
  }

  const clickNone4 = (event:any) => {
    event.stopPropagation();
    setShow3(!show3), setShow(false), setShow2(false), setShow4(false)
  }

  const clickNone5 = (event:any) => {
    event.stopPropagation();
    setShow4(!show4), setShow(false), setShow2(false), setShow3(false)
  }

  const divClick = () => { setShow(false); setShow2(false); setShow3(false); setShow4(false) }

  const AirportChange = () => { 
    const 출발 = 출발공항;
    const 도착 = 도착공항;

    set출발공항(도착);
    set도착공항(출발);
   }

  return (
    <div onClick={divClick}>
      {/* 여기 */}
      {/* 1 */}
      <div className="hero">
        <div className="container">
          <div className="row align-items-center">
            {/* 서브 메뉴 */}
            <div className="col-md-12">
              <div id="sub_menu">
                <div>
                  <form className="form" id="submenu">
                    GreenAir 항공권 예매
                  </form>
                </div>
              </div>
            </div>
            {/* 예약바 너비 조절 */}

            {/* <div className="row align-items-center">
            </div> */}
            <div className="col-md-12">
              <div className="intro-wrap">
                <div className="row">
                  <div className="col-12">
                    <form className="form">
                      {/* 예약바 높이 조절 */}
                      <div className="row mb-4">
                        <div>
                          <div
                            className="btn-group"
                            role="group"
                            aria-label="Basic radio toggle button group"
                          >
                            <input
                              type="radio"
                              className="btn-check"
                              name="btnradio"
                              id="oneWay"
                              autoComplete="off"
                              onClick={()=>{setQ(true); console.log(q)}}
                            />
                            <label
                              className="btn btn-outline-primary rounded-left"
                              htmlFor="oneWay"
                            >
                              편도
                            </label>

                            <input
                              type="radio"
                              className="btn-check"
                              name="btnradio"
                              id="goBack"
                              autoComplete="off"
                              onClick={()=>{setQ(false);  console.log(q)}}
                            />
                            <label
                              className="btn btn-outline-primary rounded-right"
                              htmlFor="goBack"
                            >
                              왕복
                            </label>
                          </div>
                        </div>
                        {/* 출발지 */}
                        <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-2">
                          <input
                            type="text"
                            className="form-control"
                            ref={target}
                            onClick={(e) => clickNone(e)}
                            value={출발공항}
                          ></input>
                        </div>

                        <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-1">
                          <input
                            type="button"
                            className="form-control"
                            value={"⮂"}
                            onClick={AirportChange}
                          ></input>
                        </div>

                        {/* 도착지 */}
                        <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-2">
                          <input
                            type="text"
                            className="form-control"
                            ref={target2}
                            onClick={(e) => clickNone2(e)}
                            value={도착공항}
                          ></input>
                        </div>

                        {/* 달력 */}
                        <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-3">
                          <input
                            type="text"
                            className="form-control"
                            name="daterange"
                            onClick={(e) => clickNone3(e)}
                          />
                        </div>

                        {/* 인원 */}
                        <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-1">
                          <input
                            type="text"
                            className="form-control"
                            ref={target3}
                            onClick={(e) => clickNone4(e)}
                            value={`어른:${adultCount}, 어린이:${infantCount}`}
                          ></input>
                        </div>

                        {/* 좌석등급 */}
                        <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-2">
                          <input
                            type="text"
                            className="form-control"
                            ref={target4}
                            onClick={(e) => clickNone5(e)}
                            value={"좌석등급"}
                          ></input>
                        </div>

                        {/* 검색 */}
                        <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-1">
                          <input
                            type="button"
                            className="form-search-control"
                            value={"조회"}
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
                              onClick={(e)=>{e.stopPropagation();}}
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
                              <Airport setShow={setShow} set공항={set출발공항} />
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
                              onClick={(e)=>{e.stopPropagation();}}
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
                              <Airport setShow={setShow2} set공항={set도착공항} />
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
                            onClick={(e)=>{e.stopPropagation();}}
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
                                <button className="person-choice" onClick={(e)=>{setShow3(false); }}>
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
                            onClick={(e)=>{e.stopPropagation();}}
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
                                <button className="seat-rating" type="button">
                                  이코노미
                                </button>
                                <button className="seat-rating" type="button">
                                  비지니스
                                </button>
                                <button className="seat-rating" type="button">
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
      </div>

      {/* 여행추천지 */}
      <div className="untree_co-section">
        <div className="container">
          <div className="row text-center justify-content-center mb-5">
            <div className="col-lg-7">
              <h2 className="section-title text-center">여행 추천지</h2>
            </div>
          </div>

          <div className="owl-carousel owl-3-slider">
            {/* 1 */}
            <div className="item">
              <a
                className="media-thumb"
                href="images/hero-slider-1.jpg"
                data-fancybox="gallery"
              >
                <div className="media-text">
                  <h3>골든게이트 교</h3>
                </div>
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
                <div className="attraction">
                  골든게이트 교
              </div>
              </div>
            </div>

            {/* 2 */}
            <div className="item">
              <a
                className="media-thumb"
                href="images/hero-slider-2.jpg"
                data-fancybox="gallery"
              >
                <div className="media-text">
                  <h3>에펠 탑</h3>
                </div>
                <img
                  src="images/hero-slider-2.jpg"
                  alt="Image"
                  className="img-fluid"
                />
              </a>
              <div className="media-1">
                <span className="d-flex align-items-center loc mb-2">
                  <span className="icon-room mr-3"></span>
                  <span className="location-font-size">프랑스</span>
                </span>
                <div className="attraction">
                  에펠 탑
              </div>
              </div>
            </div>

            {/* 3 */}
            <div className="item">
              <a
                className="media-thumb"
                href="images/hero-slider-3.jpg"
                data-fancybox="gallery"
              >
                <div className="media-text">
                  <h3>오클랜드</h3>
                </div>
                <img
                  src="images/hero-slider-3.jpg"
                  alt="Image"
                  className="img-fluid"
                />
              </a>
              <div className="media-1">
                <span className="d-flex align-items-center loc mb-2">
                  <span className="icon-room mr-3"></span>
                  <span className="location-font-size">뉴질랜드</span>
                </span>
                <div className="attraction">
                  오클랜드
                </div>
              </div>
            </div>

            {/* 4 */}
            <div className="item">
              <a
                className="media-thumb"
                href="images/hero-slider-4.jpg"
                data-fancybox="gallery"
              >
                <div className="media-text">
                  <h3>쁘렌띠안 섬</h3>
                </div>
                <img
                  src="images/hero-slider-4.jpg"
                  alt="Image"
                  className="img-fluid"
                />
              </a>
              <div className="media-1">
                <span className="d-flex align-items-center loc mb-2">
                  <span className="icon-room mr-3"></span>
                  <span className="location-font-size">말레이시아</span>
                </span>
                <div className="attraction">
                  쁘렌띠안 섬
                </div>
              </div>
            </div>

            {/* 5 */}
            <div className="item">
              <a
                className="media-thumb"
                href="images/hero-slider-5.jpg"
                data-fancybox="gallery"
              >
                <div className="media-text">
                  <h3>빅 벤</h3>
                </div>
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
                <div className="attraction">
                  빅 벤
                </div>
              </div>
            </div>

            {/* 6 */}
            <div className="item">
              <a
                className="media-thumb"
                href="images/오사카성.jpg"
                data-fancybox="gallery"
              >
                <div className="media-text">
                  <h3>오사카성</h3>
                </div>
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
                <div className="attraction">
                  오사카성
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h3 className="notice-title">공지사항</h3>
      <Notice />

    </div>
  );
}

export default Home;