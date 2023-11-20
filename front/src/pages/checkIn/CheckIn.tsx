import React, { useEffect, useState } from "react";
import initScripts from "../../assets/js/scripts";
import initCustom from "../../assets/js/custom";
import { Link } from "react-router-dom";

import { Button } from "react-bootstrap";
import ForiareaModal from "../modal/ForiareaModal";

function CheckIn() {
  const [foriModalShow, foriSetModalShow] = useState(false);
  useEffect(() => {
    initScripts();
    initCustom();
  }, []);

  return (
    <>
      <div className="hero hero-inner">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="intro-wrap">
                <h1 className="mb-5">
                  <span className="d-block text-center">체크인</span>
                  <h3 className="mb-5" color="white">
                    조회
                  </h3>
                </h1>
                {/* 조회 */}
 
                <div className="row">
                  <div className="col-12">
                    <form className="form">
                      <div className="row mb-2">
                      <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
  <label className="form-check-label" htmlFor="inlineRadio1">온라인체크인</label>
</div>
<div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
  <label className="form-check-label" htmlFor="inlineRadio2">오토체크인</label>
                      

</div>
                        <div className="recordlocator">
                          <select
                            name=""
                            id=""
                            className="form-control custom-select"
                          >
                            <option value="">예약번호</option>
                          </select>
                        </div>

                        <div className="inputnumber">
                          <input
                            name=""
                            type="type"
                            className="form-control"
                            placeholder="영문/숫자 조합 6자리 또는 숫자 8자리"
                          />
                        </div>
                      </div>
                      <div className="row align-items-center">
                        <div className="checkInButton">
                          <input
                            type="text"
                            className="btn btn-primary btn-block"
                            value="조회하기"
                            onClick={() => foriSetModalShow(true)}
                          />

                        </div>

                      </div>
                    </form>
                  </div>
                </div>
                {/* 조회 끝 */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 테마 제목 끝 /}

      {/* 본문 시작 */}
      <div className="untree_co-section">
        <div className="container">
          <h4>체크인 안내</h4>
          <div className="line_row_wrap">
            <dl className="line_row">
              <dt>
                <span className="tit">
                  사전 체크인이란? : 공항에 오지 않아도 체크인을 할 수 있습니다.
                  사전 체크인 방법을 안내해 드립니다.
                </span>
              </dt>
              <div>
                <p>
                  체크인은 항공기 탑승을 위해 누구나 거쳐야 하는 필수
                  과정입니다.
                </p>
                <p className="col_black">
                  원하는 좌석으로 미리 체크인하고, 탑승권까지 사전에 받으세요 !
                  공항에서의 대기 시간을 줄일 수 있습니다.{" "}
                </p>
                <p>모든 준비를 마쳤다면, 공항에서는 짐만 부치시면 됩니다.</p>
              </div>
            </dl>
            <dl className="line_row">
              <dt>
                <span className="tit">다양한 체크인 방법</span>
              </dt>
              <div>
                <p>
                  체크인은 집이나 사무실에서 또는 이동 중 모바일 기기에서도
                  언제든지 가능합니다.
                </p>
                <p className="col_black">
                  어디서나 편리한 방법으로 체크인하세요~
                </p>
              </div>
            </dl>
          </div>
        </div>

        <table className="table table-bordered">
          <thead className="table-blue">
            <tr className="text-center">
              <th scope="col">서비스 구분</th>
              <th scope="col">국제선</th>
              <th scope="col">국내선</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <th scope="row">온라인 체크인</th>
              <td>출발 48시간 전 ~ 1시간 전</td>
              <td>출발 361일 전 ~ 48시간 전</td>
            </tr>
            <tr className="text-center">
              <th scope="row">좌석배정/오토체크인</th>
              <td>출발 24시간 전 ~ 30분 전</td>
              <td>출발 30일 전 ~ 24시간 전</td>
            </tr>
          </tbody>
        </table>
      </div>
    
      <ForiareaModal
            show={foriModalShow}
            onHide={() => foriSetModalShow(false)}
          />
    </>
  );
}

export default CheckIn;
