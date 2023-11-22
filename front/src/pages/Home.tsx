// pages/Home.tsx : rfce
import React, { useEffect, useRef, useState } from "react";
import initScripts from "../assets/js/scripts";
import initCustom from "../assets/js/custom";
import {Overlay } from "react-bootstrap";

import Airport from "../components/airport/Airport";

/* eslint-disable */
function Home() {
  // todo: overlay(===popover)
  // 팝오버 메세지 보이기 함수
  // const renderTooltip = (props: any) => (
  //   <Tooltip id="button-tooltip" {...props}>
  //     {/* 메세지 넣기 */}
  //   </Tooltip>
  // );

  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);

  const handleIncrement = (category: any) => {
    switch (category) {
      case "adult":
        setAdultCount(adultCount + 1);
        break;
      case "child":
        setChildCount(childCount + 1);
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
      case "child":
        setChildCount(childCount > 0 ? childCount - 1 : 0);
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
  }, []);

  const controllShow = (data:string) => { 
    if (data==="" && (show || show2 || show3 || show4)) {setShow(false); setShow2(false); setShow3(false); setShow4(false)}
    if (data==="1") {setShow(true); setShow2(false); setShow3(false); setShow4(false);}
   }

  // const [foriModalShow, foriSetModalShow] = useState(false);

  return (
    <>
      {/* 여기 */}
      {/* 1 */}
      <div className="hero" onClick={()=>{controllShow("")}}>
        <div className="container">
          <div className="row align-items-center">
            {/* 서브 메뉴 */}
            <ul id="sub_menu">
              <li className="sub_menu_select">
                <a href="#" className="hnn_none_deco_a">
                  <form className="form" id="submenu">
                    항공권 예약
                  </form>
                </a>
              </li>
            </ul>
            {/* 예약바 너비 조절 */}

            {/* <div className="row align-items-center">
            </div> */}
            <div className="col-md-12" onClick={()=>{controllShow("")}}>
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
                            />
                            <label
                              className="btn btn-outline-primary rounded-0"
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
                            />
                            <label
                              className="btn btn-outline-primary rounded-0"
                              htmlFor="goBack"
                            >
                              왕복
                            </label>
                          </div>

                          {/* 검색 버튼 */}
                          <button type="button" className="btn-fligh-search">
                            검색
                          </button>
                        </div>
                        {/* 출발지 */}

                        <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-2" style={{ position: "relative", zIndex: 100}}>
                          <input
                            type="text"
                            className="form-control"
                            ref={target}
                            onClick={() => setShow(!show)}
                            value={"출발지"}
                          ></input>
                        </div>

                        {/* 도착지 */}
                        <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-2">
                          <input
                            type="text"
                            className="form-control"
                            ref={target2}
                            onClick={() => setShow2(!show2)}
                            value={"도착지"}
                          ></input>
                        </div>

                        {/* 달력 */}
                        <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-4">
                          <input
                            type="text"
                            className="form-control"
                            name="daterange"
                          />
                        </div>

                        {/* 인원 */}
                        <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-2">
                          <input
                            type="text"
                            className="form-control"
                            ref={target3}
                            onClick={() => setShow3(!show3)}
                            value={"인원"}
                          ></input>
                        </div>

                        {/* 좌석등급 */}
                        <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-2">
                          <input
                            type="text"
                            className="form-control"
                            ref={target4}
                            onClick={() => setShow4(!show4)}
                            value={"좌석등급"}
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
                              <Airport setAirport={undefined} />
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
                              <Airport setAirport={undefined}  />
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
                                    onClick={() => handleDecrement("child")}
                                  >
                                    -
                                  </button>
                                  <span> 유아: {childCount} </span>
                                  <button
                                    className="style-personel-button"
                                    onClick={() => handleIncrement("child")}
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

      {/* 오류 방지 왜 에러 발생 하는지 모름*/}
      <div></div>

      {/* 최저가 서비스 */ }
      <div className="untree_co-section" onClick={()=>{controllShow("")}}>
        <div className="container">
          <div className="row text-center justify-content-center mb-5">
            <div className="col-lg-7">
              <h2 className="section-title text-center">최저가 여행</h2>
            </div>
          </div>

          <div className="owl-carousel owl-3-slider">
            <div className="item">
              <a
                className="media-thumb"
                href="images/hero-slider-1.jpg"
                data-fancybox="gallery"
              >
                <div className="media-text">
                  <h3>Pragser Wildsee</h3>
                  <span className="location">Italy</span>
                </div>
                <img
                  src="images/hero-slider-1.jpg"
                  alt="Image"
                  className="img-fluid"
                />
              </a>
              <div>
                <span className="d-flex align-items-center loc mb-2">
                  <span className="icon-room mr-3"></span>
                  <span>Italy</span>
                </span>
                <div className="d-flex align-items-center">
                  <div>
                    <h3>
                      <a className="hnn_none_deco_a" href="#">
                        Rialto Mountains
                      </a>
                    </h3>
                    <div className="price ml-auto">
                      <span>KRW 100,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="item">
              <a
                className="media-thumb"
                href="images/hero-slider-2.jpg"
                data-fancybox="gallery"
              >
                <div className="media-text">
                  <h3>Oia</h3>
                  <span className="location">Greece</span>
                </div>
                <img
                  src="images/hero-slider-2.jpg"
                  alt="Image"
                  className="img-fluid"
                />
              </a>
              <div>
                <span className="d-flex align-items-center loc mb-2">
                  <span className="icon-room mr-3"></span>
                  <span>Italy</span>
                </span>
                <div className="d-flex align-items-center">
                  <div>
                    <h3>
                      <a href="#">Rialto Mountains</a>
                    </h3>
                    <div className="price ml-auto">
                      <span>KRW 100,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="item">
              <a
                className="media-thumb"
                href="images/hero-slider-3.jpg"
                data-fancybox="gallery"
              >
                <div className="media-text">
                  <h3>Perhentian Islands</h3>
                  <span className="location">Malaysia</span>
                </div>
                <img
                  src="images/hero-slider-3.jpg"
                  alt="Image"
                  className="img-fluid"
                />
              </a>
              <div>
                <span className="d-flex align-items-center loc mb-2">
                  <span className="icon-room mr-3"></span>
                  <span>Italy</span>
                </span>
                <div className="d-flex align-items-center">
                  <div>
                    <h3>
                      <a href="#">Rialto Mountains</a>
                    </h3>
                    <div className="price ml-auto">
                      <span>KRW 100,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="item">
              <a
                className="media-thumb"
                href="images/hero-slider-4.jpg"
                data-fancybox="gallery"
              >
                <div className="media-text">
                  <h3>Rialto Bridge</h3>
                  <span className="location">Italy</span>
                </div>
                <img
                  src="images/hero-slider-4.jpg"
                  alt="Image"
                  className="img-fluid"
                />
              </a>
              <div>
                <span className="d-flex align-items-center loc mb-2">
                  <span className="icon-room mr-3"></span>
                  <span>Italy</span>
                </span>
                <div className="d-flex align-items-center">
                  <div>
                    <h3>
                      <a href="#">Rialto Mountains</a>
                    </h3>
                    <div className="price ml-auto">
                      <span>KRW 100,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="item">
              <a
                className="media-thumb"
                href="images/hero-slider-5.jpg"
                data-fancybox="gallery"
              >
                <div className="media-text">
                  <h3>San Francisco, United States</h3>
                  <span className="location">United States</span>
                </div>
                <img
                  src="images/hero-slider-5.jpg"
                  alt="Image"
                  className="img-fluid"
                />
              </a>
              <div>
                <span className="d-flex align-items-center loc mb-2">
                  <span className="icon-room mr-3"></span>
                  <span>Italy</span>
                </span>
                <div className="d-flex align-items-center">
                  <div>
                    <h3>
                      <a href="#">Rialto Mountains</a>
                    </h3>
                    <div className="price ml-auto">
                      <span>KRW 100,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="item">
              <a
                className="media-thumb"
                href="images/hero-slider-1.jpg"
                data-fancybox="gallery"
              >
                <div className="media-text">
                  <h3>Lake Thun</h3>
                  <span className="location">Switzerland</span>
                </div>
                <img
                  src="images/hero-slider-2.jpg"
                  alt="Image"
                  className="img-fluid"
                />
              </a>
              <div>
                <span className="d-flex align-items-center loc mb-2">
                  <span className="icon-room mr-3"></span>
                  <span>Italy</span>
                </span>
                <div className="d-flex align-items-center">
                  <div>
                    <h3>
                      <a href="#">Rialto Mountains</a>
                    </h3>
                    <div className="price ml-auto">
                      <span>KRW 100,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- 6 --> */}
      <div className="untree_co-section">
        <div className="container">
          <div className="row justify-content-center text-center mb-5">
            <div className="col-lg-6">
              <h2 className="section-title text-center mb-3">
                Special Offers &amp; Discounts
              </h2>
              <p>
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia, there live the blind texts. Separated
                they live in Bookmarksgrove right at the coast of the Semantics,
                a large language ocean.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-6 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
              <div className="media-1">
                <a href="#" className="d-block mb-3">
                  <img
                    src="images/hero-slider-1.jpg"
                    alt="Image"
                    className="img-fluid"
                  />
                </a>
                <span className="d-flex align-items-center loc mb-2">
                  <span className="icon-room mr-3"></span>
                  <span>Italy</span>
                </span>
                <div className="d-flex align-items-center">
                  <div>
                    <h3>
                      <a href="#">Rialto Mountains</a>
                    </h3>
                    <div className="price ml-auto">
                      <span>$520.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
              <div className="media-1">
                <a href="#" className="d-block mb-3">
                  <img
                    src="images/hero-slider-2.jpg"
                    alt="Image"
                    className="img-fluid"
                  />
                </a>
                <span className="d-flex align-items-center loc mb-2">
                  <span className="icon-room mr-3"></span>
                  <span>United States</span>
                </span>
                <div className="d-flex align-items-center">
                  <div>
                    <h3>
                      <a href="#">San Francisco</a>
                    </h3>
                    <div className="price ml-auto">
                      <span>$520.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
              <div className="media-1">
                <a href="#" className="d-block mb-3">
                  <img
                    src="images/hero-slider-3.jpg"
                    alt="Image"
                    className="img-fluid"
                  />
                </a>
                <span className="d-flex align-items-center loc mb-2">
                  <span className="icon-room mr-3"></span>
                  <span>Malaysia</span>
                </span>
                <div className="d-flex align-items-center">
                  <div>
                    <h3>
                      <a href="#">Perhentian Islands</a>
                    </h3>
                    <div className="price ml-auto">
                      <span>$750.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
              <div className="media-1">
                <a href="#" className="d-block mb-3">
                  <img
                    src="images/hero-slider-4.jpg"
                    alt="Image"
                    className="img-fluid"
                  />
                </a>

                <span className="d-flex align-items-center loc mb-2">
                  <span className="icon-room mr-3"></span>
                  <span>Switzerland</span>
                </span>

                <div className="d-flex align-items-center">
                  <div>
                    <h3>
                      <a href="#">Lake Thun</a>
                    </h3>
                    <div className="price ml-auto">
                      <span>$520.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* overlay(===popover) */}
        {/* <OverlayTrigger
          placement="right" // placement="right" : 오른쪽 보이기
          delay={{ show: 250, hide: 400 }} // show: 지속시간, hide: 숨김시간
          overlay={renderTooltip} // renderTooltip : 팝오버 메세지 함수 설정
        >
          <Button variant="success">Hover me to see</Button>
        </OverlayTrigger> */}

        {/* ************************************************************* */}
        {/* ************************************************************* */}
        {/* ************************************************************* */}
        {/* 테스트 */}
        {/* <input ref={target} onClick={() => setShow(!show)}></input>

          <Overlay target={target.current} show={show} placement="bottom">
          {({
            placement: _placement,
            arrowProps: _arrowProps,
            show: _show,
            popper: _popper,
            hasDoneInitialMeasure: _hasDoneInitialMeasure,
            ...props
          }) => (
            <div
              {...props}
              style={{
                position: "absolute",
                backgroundColor: "green",
                width: "1000px",
                margin: "20px 0px 0px 0px",

                padding: "20px 100px 0px ",
                color: "black",
                borderRadius: 3,
                ...props.style,
              }}
            >
              <Airport />
            </div>
          )}
        </Overlay>   */}

        {/* 형 소스 테스트 */}
        {/* <ForiareaModal
          show={foriModalShow}
          onHide={() => foriSetModalShow(false)}
        /> */}
      </div>
    </>
  );
}

export default Home;