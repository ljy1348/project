// CuCenter.tsx : rfce
import React from "react";
import { useEffect } from "react";
import initScripts from "../../assets/js/scripts";
import initCustom from "../../assets/js/custom";
import { Link } from "react-router-dom";

function CuCenter() {
  useEffect(() => {
    initScripts();
    initCustom();
  }, []);

  return (
    <>
      
      {/* 머리말 */}
      <div className="hero hero-inner">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mx-auto text-center">
              <div className="intro-wrap">
                <h1 className="mb-0">고객 센터</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 고객센터 메뉴 */}
      <div className="untree_co-section">
        <div className="container">
          <div className="row align-items-stretch">

            {/* 공지, 말씀 */}
            <div className="col-12 col-sm-6 col-lg-6">
              {/* 공지 사항 */}
              <div className="feature-1 d-md-flex">
                <Link to={"/cu-notice"}>
                  <div className="align-self-center">
                  <span className="flaticon-house display-4 text-primary"></span>
                  <h3>공지사항</h3>
                  <p className="mb-0">
                    자주 찾는 질문을 이용하시면 원하는 답변을 빠르게 찾으실 수
                    있습니다.
                  </p>
                </div>
                </Link>
              </div>
              {/* 공지 사항 끝 */}

              {/* 고객의 말씀 */}
              <div className="feature-1 d-md-flex">
                <Link to={"/cutomer-sound"}>
                <div className="align-self-center">
                  <span className="flaticon-restaurant display-4 text-primary"></span>
                  <h3>고객의 말씀</h3>
                  <p className="mb-0">
                    고객님의 문의, 제언, 불편사항을 남겨주세요.
                  </p>
                </div>
                </Link>
              </div>
            </div>
            {/* 고객의 말씀 끝 */}

            {/* 질문, 서비스 */}
            <div className="col-6 col-sm-6 col-lg-6">
              {/* 자주 찾는 질문 */}
              <div className="feature-1 d-md-flex">
              <Link to={"/question"}>
                <div className="align-self-center">
                  <span className="flaticon-mail display-4 text-primary"></span>
                  <h3>자주 찾는 질문</h3>
                  <p className="mb-0">
                    자주 찾는 질문을 이용하시면 원하는 답변을 빠르게 찾으실 수 있습니다.
                  </p>
                </div>
                </Link>
              </div>
              {/* 자주 찾는 질문 끝 */}

              {/* 기타 서비스 */}
              <div className="feature-1 d-md-flex">
              <Link to={"/other-service"}>
                <div className="align-self-center">
                  <span className="flaticon-phone-call display-4 text-primary"></span>
                  <h3>기타 서비스</h3>
                  <p className="mb-0">
                    Even the all-powerful Pointing has no control about the
                    blind texts.
                  </p>
                </div>
                </Link>
              </div>
              {/* 기타 서비스 끝 */}
            </div>
          </div>
        </div>
      </div>

      {/* 게시글 문의 */}
      {/* <div className="untree_co-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <form
                className="contact-form"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label className="text-black" htmlFor="fname">
                        제목
                      </label>
                      <input type="text" className="form-control" id="fname" />
                    </div>
                  </div>
                  <br/>
                  <div className="col-6">
                    <div className="form-group">
                      <label className="text-black" htmlFor="lname">
                        ID
                      </label>
                      <input type="text" className="form-control" id="lname" />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="text-black" htmlFor="email">
                    Email address
                  </label>
                  <input type="email" className="form-control" id="email" />
                </div>

                <div className="form-group">
                  <label className="text-black" htmlFor="message">
                    내용
                  </label>
                  <textarea
                    name=""
                    className="form-control"
                    id="message"
                    cols={30}
                    rows={5}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">
                  Send Message
                </button>
              </form>
            </div>
            <div className="col-lg-5 ml-auto">
              <div className="quick-contact-item d-flex align-items-center mb-4">
                <span className="flaticon-house"></span>
                <address className="text">
                  155 Market St #101, Paterson, NJ 07505, United States
                </address>
              </div>
              <div className="quick-contact-item d-flex align-items-center mb-4">
                <span className="flaticon-phone-call"></span>
                <address className="text">+1 202 2020 200</address>
              </div>
              <div className="quick-contact-item d-flex align-items-center mb-4">
                <span className="flaticon-mail"></span>
                <address className="text">@info@mydomain.com</address>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* <!-- 5 --> */}
      {/* <div className="py-5 cta-section">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-12">
              <h2 className="mb-2 text-white">
                Lets you Explore the Best. Contact Us Now
              </h2>
              <p className="mb-4 lead text-white text-white-opacity">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Excepturi, fugit?
              </p>
              <p className="mb-0">
                <a
                  href="booking.html"
                  className="btn btn-outline-white text-white btn-md font-weight-bold"
                >
                  Get in touch
                </a>
              </p>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default CuCenter;
