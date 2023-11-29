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
      <div className="hero hero-customer">
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
                <Link to={"/notice"}>
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
                <Link to={"/question-board"}>
                  <div className="align-self-center">
                    <span className="flaticon-restaurant display-4 text-primary"></span>
                    <h3>1:1 문의</h3>
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
                      자주 찾는 질문을 이용하시면 원하는 답변을 빠르게 찾으실 수
                      있습니다.
                    </p>
                  </div>
                </Link>
              </div>
              {/* 자주 찾는 질문 끝 */}

              {/* 1:1 문의 목록 */}
              <div className="feature-1 d-md-flex">
                <Link to={"/other-service"}>
                  <div className="align-self-center">
                    <span className="flaticon-phone-call display-4 text-primary"></span>
                    <h3>1:1 문의목록</h3>
                    <p className="mb-0">
                      Even the all-powerful Pointing has no control about the
                      blind texts.
                    </p>
                  </div>
                </Link>
              </div>
              {/* 1:1 문의 목록 끝 */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CuCenter;
