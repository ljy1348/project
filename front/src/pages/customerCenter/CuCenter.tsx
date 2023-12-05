// CuCenter.tsx : 고객센터 홈화면

import { useEffect } from "react";
import initScripts from "../../assets/js/scripts";
import initCustom from "../../assets/js/custom";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap/lib/InputGroup";

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
                <p className="text-white">그린에어 고객센터 입니다.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 고객센터 메뉴 */}
      <div className="untree_co-section_jw">
        <div className="container">
          <div className="row">
            {/* 공지 사항 */}
            <div className="feature-1 mr-3 col">
              <Link to={"/notice"} style={{ textDecoration: "none"}}>
              <div className="align-self-center">
                <p className="jw_icon_title display-4">공지사항</p>
                <p className="pTag">새소식과 운임 공지를 확인해보세요.</p>
              </div>
              </Link>
            </div>
            {/* 공지 사항 끝 */}

            {/* 자주 찾는 질문 */}
            <div className="feature-2 mr-3 col">
              <Link to={"/question"} style={{ textDecoration: "none"}}>
              <div className="align-self-center">
                <p className="jw_icon_title display-4">자주 찾는 질문</p>
                <p className="pTag">
                  자주 찾는 질문을 이용하시면 원하는 답변을<br/> 빠르게
                  찾으실 수
                  있습니다.
                </p>
              </div>
              </Link>
            </div>
            {/* 자주 찾는 질문 끝 */}

            {/* 1:1 문의 */}
            <div className="feature-3 mr-3 col">
              <Link to={"/question-board"} style={{ textDecoration: "none"}}>
              <div className="align-self-center">
                <p className="jw_icon_title display-4">1:1 문의</p>
                <p className="pTag">
                  고객님의 문의, 제언, 불편사항을 남겨주세요.
                </p>
              </div>
              </Link>
            </div>
            {/* 1:1 문의 끝 */}
          </div>
        </div>
      </div>
    </>
  );
}

export default CuCenter;
