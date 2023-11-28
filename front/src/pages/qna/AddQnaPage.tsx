// AddQnaPage.tsx : rfce
import React, { useEffect } from "react";
import initScripts from "../../assets/js/scripts";
import initCustom from "../../assets/js/custom";
import AddQna from "../../components/basic/qna/AddQna";

function AddQnaPage() {
  useEffect(() => {
    initScripts();
    initCustom();
  }, []);
  return (
    <>
      {/* 테마 제목 시작 */}
      <div className="hero hero-inner">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mx-auto text-center">
              <div className="intro-wrap">
                <h1 className="mb-0">Q & A 추가</h1>
                <p className="text-white">
                  여기에서 Q & A를 추가하실 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 테마 제목 끝 */}

      {/* 본문 시작 */}
      <div className="untree_co-section">
        <div className="container">
          <div className="row">
            {/* 여기 */}
            <AddQna />
          </div>
        </div>
      </div>
      {/* 본문 끝 */}
    </>
  );
}

export default AddQnaPage;
