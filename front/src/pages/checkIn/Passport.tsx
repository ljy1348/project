import React, { useEffect } from "react";
import initScripts from "../../assets/js/scripts";
import initCustom from "../../assets/js/custom";

function Passport() {
  useEffect(() => {
    initScripts();
    initCustom();
  }, []);
  return (
    <>
      <div className="hero hero-inner">
        <div className="container">
          <div className="row align-items-center"></div>
        </div>
      </div>
      {/* 여권정보입력  */}
      <div>
        <div>
          <form className="form">
            <div>
          
              <h6>국적</h6>
              <div
                className="col-sm-12 col-md-6 mb-3 mb-lg-2 col-lg-6"
              >
                <input
                  name=""
                  type="type"
                  className="form-control"
                  placeholder="국적"
                />
                
              </div>
              <h6>* 성별</h6>
              <div className="col-sm-12 col-md-6 mb-3 mb-lg-2 col-lg-3">
                <select name="" id="" className="form-control custom-select">
                  <option value="">성별</option>
                  <option value="">여성</option>
                  <option value="">남성</option>
                </select>
              </div>

              <h6>* 생년월일 </h6>
              <br />
              <div className="col-sm-12 col-md-6 mb-3 mb-lg-2 col-lg-3">
                <input
                  type="date"
                  className="form-control"
                  placeholder="생년월일"
                />
              </div>

              <h6>* 여권발급국가 </h6>
              <br />
              <div className="col-sm-12 col-md-6 mb-3 mb-lg-2 col-lg-5">
                <input
                  name=""
                  type="type"
                  className="form-control"
                  placeholder="여권발급국가"
                />
              </div>

              <h6>* 여권번호 </h6>
              <br />
              <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-5">
                <input
                  name=""
                  type="type"
                  className="form-control"
                  placeholder="여권번호"
                />
              </div>

              <h6>* 여권만료일 </h6>
              <br />
              <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-3">
                <input
                  type="date"
                  className="form-control"
                  placeholder="여권 만료일 "
                />
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-4">
                <input
                  type="submit"
                  className="btn btn-primary btn-block"
                  value="조회하기"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* 여권정보입력  */}
    </>
  );
}

export default Passport;
