import React from "react";

function Sangmin() {
  return (
    <>
      {/* 공통 */}
      <div className="hero hero-inner">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mx-auto text-center">
              <div className="intro-wrap">
                <h1 className="mb-0">예약 하다</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div>Sangmin</div>
        <div>Sangmin</div>
        <div>Sangmin</div>
        <div>Sangmin</div>
        <div>Sangmin</div>
        <div>Sangmin</div>
        <i className="sangmin_map_icon bi bi-geo-alt-fill"></i>
        <div className="address">
            <i className="bi bi-geo-alt"></i>
            <h4>address:</h4>
            <p>경상남도 창원시 진해구 용원동 일신 아파트 108동402호</p>
          </div>
      </div>
    </>
  );
}

export default Sangmin;
