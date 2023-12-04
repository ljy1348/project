import React, { useEffect, useState } from "react";
import initScripts from "../../assets/js/scripts";
import initCustom from "../../assets/js/custom";
import { Link, useParams } from "react-router-dom";

import { Button } from "react-bootstrap";

import CheckInState from "../modal/CheckInStateModal";

import IResOperation from "../../types/checkin/IResOperation";
import CheckinService from "../../services/checkin/CheckinService";

function CheckIn() {




   // 부서 배열 변수
  const [checkIn, setCheckIn] = useState<Array<IResOperation>>([]);
  // 검색어 변수
  const [searchAirlinereservationnumber, setSearchAirlinereservationnumber] = useState<number>(0);

  // 객체초기화 이니셜 기본키 
  //  모달이동
   const [checkInState, setCheckinstate] = useState(false);
  //  const [show, setShow] = useState(false);

 

// todo : 함수 정의 
const onChangeSearchAirlinereservationnumber = (e: any) => {
  setSearchAirlinereservationnumber(e.target.value);
  console.log()
};


   // todo: 검색어 조회 함수
  const retrieveCheckin = () => {

    CheckinService.getAll(searchAirlinereservationnumber) // backend 요청
      .then((response: any) => {
        // todo: 성공 처리
        setSearchAirlinereservationnumber(response.data);
        // 로그
        console.log("response", response.data);
        setCheckinstate(true)
      })
      .catch((e: Error) => {
        // todo: 실패 처리
        console.log(e);
      });
  };




  return (
    <>
    <div className="hero hero-inner">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-12">
            <div className="intro-wrap">
              <h1 className="mb-5">
                <span className="d-block text-center">체크인</span>
                
              </h1>

              
              {/* 조회 */}
              <div className="row">
                <div className="col-12">
                  <form className="form">
                    <div className="row mb-2">
                      <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-4">
                        <select
                          name=""
                          id=""
                          className="form-control custom-select"
                          aria-label="Disabled select example" disabled
                        >
                          <option value="">예약번호</option>
                        </select>
                      </div>

                      <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-5">
                        <input
                          name=""
                          type="type"
                          className="form-control"  
                          placeholder="숫자 6자리"
                          value={searchAirlinereservationnumber}
                          onChange={onChangeSearchAirlinereservationnumber}
                        />
                      </div>
                      <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-3">
                        <input
                          type="text"
                          className="btn btn-primary btn-block"
                          value="조회하기"
                          onClick={() => setCheckinstate(true)}
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

    
       
    </div>
    <CheckInState
        show={checkInState}
        onHide={() => setCheckinstate(false)}
        searchAirlinereservationnumber={searchAirlinereservationnumber}
      />
    
  </>
);
}

export default CheckIn