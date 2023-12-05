import React, { useEffect, useState } from "react";
import initScripts from "../../assets/js/scripts";
import initCustom from "../../assets/js/custom";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Button } from "react-bootstrap";

import CheckInState from "../modal/CheckInStateModal";

import IResOperation from "../../types/checkin/ICheckin";
import CheckinService from "../../services/checkin/CheckinService";
import IReservation from "../../types/reservation/IReservation";
import ReservationService from "../../services/reservation/ReservationService";
import ICheckDto from "../../types/checkin/ICheckgetDto";
import BaggageService from "../../services/baggage/BaggageService";
import IBaggage from "../../types/baggage/IBaggage";
import BaggagePaymentModal from "../modal/BaggagePaymentModal";
// import CheckIn from './CheckIn';

function CheckIn() {
  // 상세조회 객체 초기화
  const initialReservation = {
    airlineReservationNumber: null,
    seatType: "",
    checkYn: "Y",
    startAirport:"",
    finalAirport:"",
    adultCount:"",
    childeCount:""
  };

  const [checkDto, setCheckDto] = useState<Array<ICheckDto>>([]);
  console.log(checkDto);

  const [reservation, setReservation] = useState(initialReservation);
  const [baggage, setBaggage] = useState<IBaggage>();
  const [paymentModalShow, setPaymentModalShow] = useState(false);

  // 검색어 변수
  const [searchAirlinereservationnumber, setSearchAirlinereservationnumber] =
    useState<number>(0);

  // 객체초기화 이니셜 기본키
  //  모달이동
  const [checkInState, setCheckinstate] = useState(false);
  //  const [show, setShow] = useState(false);

  // todo : 함수 정의
  const onChangeSearchAirlinereservationnumber = (e: any) => {
    setSearchAirlinereservationnumber(e.target.value);
    console.log();
  };

  // 상세조회 함수
  const getReservation = (airlineReservationNumber: number) => {
    // 백엔드 매개변수 전송 : + 현재페이지(page), 1페이지당개수(pageSize)
    ReservationService.get2(airlineReservationNumber) // 벡엔드로 상세조회 요청
      .then((response: any) => {
        setReservation(response.data);
        console.log("aa : "+response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  // todo: 검색어 조회 함수
  const retrieveCheckDto = () => {
    // 백엔드 매개변수 전송 : + 현재페이지(page), 1페이지당개수(pageSize)
    CheckinService.dtogetAll(searchAirlinereservationnumber)
      .then((response: any) => {
        setCheckDto(response.data);
        // 로그 출력
        console.log("response", response.data);
        console.log("setCheckDto", setCheckDto);
      })
      .catch((error: Error) => {
        console.error("Error retrieving check DTO information:", error.message);
        // 사용자에게 오류를 알리는 메시지 또는 다른 처리 추가 가능
      });
  };

  const getBaggage = (searchAirlinereservationnumber:number) => { 
    const data = {
      bagNumber : null,
      bagPrice : 0,
      bagCount : 0,
      airlineReservationNumber : 0,
      paymentYn : "Y"
    }

    BaggageService.getReserveNumber(searchAirlinereservationnumber)
    .then((response:any)=>{console.log(response); setBaggage(response.data);})
    .catch((e:Error)=>{console.log(e); setBaggage(data)})
   }

  // 조회 버튼 클릭 시 실행
  const onclickButton = () => {
    getReservation(searchAirlinereservationnumber);
    retrieveCheckDto();
    getBaggage(searchAirlinereservationnumber);
  };

  const navi = useNavigate();

  const onclickpage = () => {
    navi(`/passport/${searchAirlinereservationnumber}`, { state: { checkDto: checkDto } });
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
                    <form className="form-checkin" onSubmit={(event)=>{event.preventDefault(); onclickButton()}}>
                      <div className="row">
                        <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-4">
                          <div className="reservation-number">예약번호</div>
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
                            type="button"
                            className="btn btn-primary btn-block"
                            value="조회하기"
                            onClick={() => onclickButton()}
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
      <div className="untree_co-section_yb">
        <div className="container">
          {/* disable */}
          
          {reservation.airlineReservationNumber && (
            
  <div>
    {/* 예약이 존재할 때만 보여질 내용 */}
    <div className="sangmin_choose_airport d-flex justify-content-center mt-5 mb-5">
      <span>{reservation.startAirport}</span>
      <span> &gt; </span>
      <span>{reservation.finalAirport}</span>
    </div>
    <div className="sangmin_choose_airport d-flex justify-content-center mt-5 mb-5">
    </div>


              <div className="row mb-3">
                <div className="col-3">승객명</div>
                <div className="col-3">클래스</div>
                <div className="col-3">좌석번호</div>
                <div className="col-3">체크인 상태</div>
              </div>




    <div className="row mb-5">

  {checkDto ? (
    checkDto.map((item, index) => (
      <React.Fragment key={index}>
        <div className="col-3">{item.userName || ""}</div>
        <div className="col-3">{reservation.seatType}</div>
        <div className="col-3">{item.seatNumber || ""}</div>
        <div className="col-3">{reservation.checkYn}</div>
      </React.Fragment>
    ))
  ) : (
    <div>No data available</div>
  )}
</div>



              {reservation.checkYn === "N" && (
                <div className="d-flex justify-content-end mt-5 mb-5 no-gutters">
                  <button className="checkin_choose_btn" onClick={onclickpage}>
                    체크인
                  </button>
                </div>
              )}
            </div>
          )}


        <div className="mx-auto col-12">{baggage && (baggage?.bagPrice > 0 ? <><div className="mx-auto col-12">수하물 : {baggage.paymentYn === 'N' ? <button onClick={()=>{setPaymentModalShow(true)}}>결제</button>:"결제 완료"}</div></> : <></>)}</div>
        <BaggagePaymentModal
            show={paymentModalShow}
            onHide={() => {setPaymentModalShow(false);
            }}
            nonMemberModalShow={setPaymentModalShow}
            bagNumber={baggage ? baggage.bagNumber:0}
            price={baggage ? baggage.bagPrice:0}
          />
        <br></br>
          <h4>체크인 안내</h4>

          <div className="line_row_wrap">
            <dl className="line_row">
              <dt>
                <span className="tit">
                  사전 체크인이란? : &nbsp;공항에 오지 않아도 체크인을 할 수
                  있습니다. &nbsp; 사전 체크인 방법을 안내해 드립니다.
                </span>
              </dt>

              <br />
              <p>
                체크인은 항공기 탑승을 위해 누구나 거쳐야 하는 필수 과정입니다.
              </p>
              <p className="col_black">
                원하는 좌석으로 미리 체크인하고, 공항에서의 대기 시간을 줄이세요
                !
              </p>
              <p>모든 준비를 마쳤다면, 공항에서는 짐만 부치시면 됩니다.</p>
            </dl>
            <dl className="line_row">
              <dt>
                <span className="tit">다양한 체크인 방법</span>
              </dt>

              <br />
              <p>
                체크인은 집이나 사무실에서 또는 이동 중 모바일 기기에서도
                언제든지 가능합니다.
              </p>
              <p className="col_black">
                어디서나 편리한 방법으로 체크인하세요~
              </p>
            </dl>
            <dl className="line_row">
              <dt>
                <span className="tit"> ※ 유의사항</span>
              </dt>
              <br />
              <p>
              여권정보가 부정확하거나 유효하지 않을 경우 사전심사 결과에 따라 체크인 및 탑승권 발급이 불가할 수 있습니다.
              </p>
              <p>
              타사 항공기로 운항하는 공동운항편을 이용하실 경우 체크인 및 좌석배정 이용이 제한됩니다. (운항 항공사로 문의)
              </p>
              <p>이미 좌석배정 및 체크인을 마치신 경우에도 입력 정보 확인 및 변경이 가능합니다.</p>
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

export default CheckIn;
