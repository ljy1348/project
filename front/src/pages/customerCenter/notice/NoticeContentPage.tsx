
// 공지사항 내용

// import React, { useEffect } from "react";
// import Notice from "../../../components/center/notice/Notice";
// import initScripts from "../../../assets/js/scripts";
// import initCustom from "../../../assets/js/custom";

import React, { useEffect } from 'react'
import Notice from '../../../components/notice/Notice'
import initScripts from '../../../assets/js/scripts';
import initCustom from '../../../assets/js/custom';


function NoticeContentPage() {
  useEffect(() => {
    initScripts();
    initCustom();
  }, []);
  return (
    <>
      {/* 테마 제목 시작 */}
      <div className="hero hero-customer">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mx-auto text-center">
              <div className="intro-wrap">
                <h1 className="mb-0">공지 사항</h1>
                <p className="text-white">새소식과 운임 공지를 확인해보세요.</p>
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
            <Notice />
          </div>
        </div>
      </div>
      {/* 본문 끝 */}
    </>
  );
}

export default NoticeContentPage;
