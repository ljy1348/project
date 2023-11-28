// pages/Home.tsx : rfce
import React, { useEffect, useRef, useState } from "react";
import initScripts from "../assets/js/scripts";
import initCustom from "../assets/js/custom";
import { Button, Overlay, Popover } from "react-bootstrap";
import ForiareaModal from "./modal/ForiareaModal";
// react-bootstrap import
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Airport from "./Airport/Airport";

/* eslint-disable */
function Home2() {
  // todo: overlay(===popover)
  // 팝오버 메세지 보이기 함수
  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      {/* 팝오버(tooltip) 메세지 보이기 */}
      여기 간단 메세지입니다.
    </Tooltip>
  );

  useEffect(() => {
    initScripts();
    initCustom();
  }, []);

  const [foriModalShow, foriSetModalShow] = useState(false);

  
  const [도착공항, set도착공항] = useState("도착공항");

  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event:any) => {
    event.stopPropagation();
    setShow(!show);
    setTarget(event.target);
  };
  
  const onClickOveray = (event:any) => {
    event.stopPropagation();
  }

  const setAirport = (data:any) => {
    set도착공항(data);
    setShow(false);
  }

  return (
    <div onClick={()=>{setShow(false)}}>
      {/* 여기 */}
      {/* 1 */}
      <div className="hero" >
        <div className="container">

          <div className="row align-items-center">
            {/* 서브 메뉴 */}
            <ul id="sub_menu">
              <li className="sub_menu_select">
                <a href="#" className="sub_menu_select">
                  <form className="form" id="submenu">
                    항공권 예약
                  </form>
                </a>
                <div ref={ref}>
      <Button onClick={handleClick}>Holy guacamole!</Button>

      <Overlay
        show={show}
        target={target}
        placement="bottom"
        container={ref}
        containerPadding={20}
        
      >
        <Popover id="popover-contained" onClick={onClickOveray}>
          <Popover.Header as="h3" onClick={onClickOveray}>Popover bottom</Popover.Header>
          <Popover.Body onClick={onClickOveray}>
            <Airport setAirport={setAirport}></Airport>
          </Popover.Body>
        </Popover>
      </Overlay>
    </div>
              </li>
            </ul>
            {/* 예약바 너비 조절 */}
            <div className="col-md-12">
              <div className="intro-wrap">
                <div className="row">
                  <div className="col-12">
                    <form className="form">
                      {/* 예약바 높이 조절 */}
                      <div className="row mb-4">
                        {/* 출발지 */}
                        <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-2">
                          <select
                            name=""
                            id=""
                            className="form-control custom-select"
                          >
                            <option value="">출발지</option>
                            <option value="">Peru</option>
                            <option value="">Japan</option>
                            <option value="">Thailand</option>
                            <option value="">Brazil</option>
                            <option value="">United States</option>
                            <option value="">Israel</option>
                            <option value="">China</option>
                            <option value="">Russia</option>
                          </select>
                        </div>
                        {/* 도착지 */}
                        <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-2">
                          <select
                            name=""
                            id=""
                            className="form-control custom-select"
                          >
                            <option value="">도착지</option>
                            <option value="">Peru</option>
                            <option value="">Japan</option>
                            <option value="">Thailand</option>
                            <option value="">Brazil</option>
                            <option value="">United States</option>
                            <option value="">Israel</option>
                            <option value="">China</option>
                            <option value="">Russia</option>
                          </select>
                        </div>

                        {/* 달력 */}
                        <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-4">
                          <input
                            type="text"
                            className="form-control"
                            name="daterange"
                          />
                        </div>

                        {/* 탑승객 */}
                        <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-2">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="탑승객"
                            onClick={handleClick}
                            value={도착공항}
                          />
                        </div>

                        {/* test */}
                        <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-2">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="테스트용"
                            onClick={() => foriSetModalShow(true)}
                          />
                        </div>
                      </div>
                      <div className="row align-items-center">
                        <div className="col-lg-8">
                          <label className="control control--checkbox mt-3">
                            <span className="caption">Save this search</span>
                            <input type="checkbox" checked={true} />
                            <div className="control__indicator"></div>
                          </label>
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

      {/* 부가서비스 */}
      <div className="untree_co-section">
        <div className="container">
          <div className="row mb-5 justify-content-center">
            <div className="col-lg-6 text-center">
              <h2 className="text-center mb-3">부가 서비스</h2>
            </div>
          </div>
          <div className="row align-items-stretch">
            <div className="col-lg-4 order-lg-1">
              <div className="h-100">
                <div className="frame h-100">
                  <div
                    className="feature-img-bg h-100"
                    style={{
                      backgroundImage: "url('images/부가서비스.jpg')",
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="col-6 col-sm-6 col-lg-4 feature-1-wrap d-md-flex flex-md-column order-lg-1">
              <div className="feature-1 d-md-flex">
                <div className="align-self-center">
                  <img
                    src="../images/돋보기.png"
                    className="sub_service_img"
                    alt=""
                  />
                  <h3>예약조회</h3>
                </div>
              </div>

              <div className="feature-1 ">
                <div className="align-self-center">
                  <span className="flaticon-restaurant display-4 text-primary"></span>
                  <h3>수화물</h3>
                  <p className="mb-0">
                    Even the all-powerful Pointing has no control about the
                    blind texts.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-6 col-sm-6 col-lg-4 feature-1-wrap d-md-flex flex-md-column order-lg-3">
              <div className="feature-1 d-md-flex">
                <div className="align-self-center">
                  <span className="flaticon-mail display-4 text-primary"></span>
                  <h3>체크인</h3>
                  <p className="mb-0">
                    Even the all-powerful Pointing has no control about the
                    blind texts.
                  </p>
                </div>
              </div>

              <div className="feature-1 d-md-flex">
                <div className="align-self-center">
                  <span className="flaticon-phone-call display-4 text-primary"></span>
                  <h3>마일리지</h3>
                  <p className="mb-0">
                    Even the all-powerful Pointing has no control about the
                    blind texts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 최저가 서비스 */}
      <div className="untree_co-section">
        <div className="container">
          <div className="row text-center justify-content-center mb-5">
            <div className="col-lg-7">
              <h2 className="section-title text-center">최적가 여행</h2>
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
        <OverlayTrigger
          placement="right"                // placement="right" : 오른쪽 보이기
          trigger={'click'}
          delay={{ show: 250, hide: 400 }} // show: 지속시간, hide: 숨김시간
          overlay={renderTooltip}          // renderTooltip : 팝오버 메세지 함수 설정
        >
          <Button variant="success">Hover me to see</Button>
        </OverlayTrigger>

        <ForiareaModal
          show={foriModalShow}
          onHide={() => foriSetModalShow(false)}
        />
      </div>
    </div>
  );
}

export default Home2;