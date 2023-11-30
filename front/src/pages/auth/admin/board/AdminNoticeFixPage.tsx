import React from "react";
import AdminNoticeFix from "./AdminNoticeFix";

function AdminNoticeFixPage() {
  return (
    <>
      {/* 테마 디자인 적용 : 컨택트 소스 */}
      {/* 테마 제목 시작 */}
      <div className="hero hero-inner">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mx-auto text-center">
              <div className="intro-wrap">
                <h1 className="mb-0">공지사항 수정 / 삭제</h1>
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
            <AdminNoticeFix />
          </div>
        </div>
      </div>
      {/* 본문 끝 */}
    </>
  );
}

export default AdminNoticeFixPage;
