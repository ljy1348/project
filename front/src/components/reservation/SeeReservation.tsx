import { useNavigate, useParams } from "react-router-dom";
import ReservationService from "../../services/reservation/ReservationService";
import React, { useEffect, useState } from "react";
import ISearchReservation from "../../types/searchReservation/ISearchReservation";

function SeeReservation() {
  // todo: 변수 정의
  // 전체조회 페이지에서 전송한 기본키(airlineReservationNumber)
  const { airlineReservationNumber } = useParams();

  // 강제 페이지 이동 변수
  let navigate = useNavigate();

  // 객체 초기화
  const initialReservation = {
    airlineReservationNumber: 0,
    adultCount: "",
    childCount: "",
    mileUseYn: "",
    memberYn: "", // 회원여부
    checkYn: "", // 체크인 여부
    memberId: "",
    userNumber: "", // 비회원 번호
    operationId: 0, // 운항 ID
    airline: "",
    flightName: "", // 항공편명
    startAirport: "",
    finalAirport: "",
    startTime: "",
    finalTime: "",
    startDate: "",
    finalDate: "",
    domesticInternational: "",
    price: 0,
    memberName: "",
  };

  // reservation 변수
  const [reservation, setReservation] =
    useState<ISearchReservation>(initialReservation);

  const getReservation = (airlineReservationNumber: any) => {
    ReservationService.get(airlineReservationNumber) // 벡엔드로 상세조회 요청
      .then((response: any) => {
        setReservation(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (airlineReservationNumber) getReservation(airlineReservationNumber);
  }, [airlineReservationNumber]);

  const backToSearchReservation = () => {
    navigate("/search-reservation");
  };

  return (
    <>
    
      <form className="form">
        <div className="blankBox3">&nbsp;</div>
        <div className="row mb-2">
          <h6 className="test1">예약 번호</h6>
          <div className="col-sm-12 col-md-6 mb-3 mb-lg-2 col-lg-4">
            <input
              name=""
              type="type"
              className="form-control"
              value={reservation.airlineReservationNumber}
            />
          </div>

          <h6 className="test2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;성인</h6>
          <div className="col-sm-12 col-md-6 mb-3 mb-lg-2 col-lg-4">
            <input
              name=""
              type="type"
              className="form-control"
              value={reservation.adultCount}
            />
          </div>

          <h6 className="test1">소아&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h6>
          <div className="col-sm-12 col-md-6 mb-3 mb-lg-2 col-lg-4">
            <input
              name=""
              type="type"
              className="form-control"
              value={reservation.childCount}
            />
          </div>

          <h6 className="test2">마일리지 사용</h6>
          <div className="col-sm-12 col-md-6 mb-3 mb-lg-2 col-lg-4">
            <input
              name=""
              type="type"
              className="form-control"
              value={reservation.mileUseYn}
            />
          </div>

          <h6 className="test1">회원 ID&nbsp;&nbsp;&nbsp;</h6>
          <div className="col-sm-12 col-md-6 mb-3 mb-lg-2 col-lg-4">
            <input
              name=""
              type="type"
              className="form-control"
              value={reservation.memberId}
            />
          </div>

          <h6 className="test2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;항공사</h6>
          <div className="col-sm-12 col-md-6 mb-3 mb-lg-2 col-lg-4">
            <input
              name=""
              type="type"
              className="form-control"
              value={reservation.airline}
            />
          </div>

          <h6 className="test1">&nbsp;항공편명</h6>
          <div className="col-sm-12 col-md-6 mb-3 mb-lg-2 col-lg-4">
            <input
              name=""
              type="type"
              className="form-control"
              value={reservation.flightName}
            />
          </div>

          <h6 className="test2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;출발 공항</h6>
          <div className="col-sm-12 col-md-6 mb-3 mb-lg-2 col-lg-4">
            <input
              name=""
              type="type"
              className="form-control"
              value={reservation.startAirport}
            />
          </div>

          <h6 className="test1">도착 공항</h6>
          <div className="col-sm-12 col-md-6 mb-3 mb-lg-2 col-lg-4">
            <input
              name=""
              type="type"
              className="form-control"
              value={reservation.finalAirport}
            />
          </div>

          <h6 className="test2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;출발 시간</h6>
          <div className="col-sm-12 col-md-6 mb-3 mb-lg-2 col-lg-4">
            <input
              name=""
              type="type"
              className="form-control"
              value={reservation.startTime}
            />
          </div>

          <h6 className="test1">도착 시간</h6>
          <div className="col-sm-12 col-md-6 mb-3 mb-lg-2 col-lg-4">
            <input
              name=""
              type="type"
              className="form-control"
              value={reservation.finalTime}
            />
          </div>

          <h6 className="test2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;출발 일자</h6>
          <div className="col-sm-12 col-md-6 mb-3 mb-lg-2 col-lg-4">
            <input
              name=""
              type="type"
              className="form-control"
              value={reservation.startDate}
            />
          </div>

          <h6 className="test1">도착 일자</h6>
          <div className="col-sm-12 col-md-6 mb-3 mb-lg-2 col-lg-4">
            <input
              name=""
              type="type"
              className="form-control"
              value={reservation.finalDate}
            />
          </div>

          <h6 className="test2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;국내 - 국제</h6>
          <div className="col-sm-12 col-md-6 mb-3 mb-lg-2 col-lg-4">
            <input
              name=""
              type="type"
              className="form-control"
              value={reservation.domesticInternational}
            />
          </div>

          <h6 className="test1">&nbsp;예약자명</h6>
          <div className="col-sm-12 col-md-6 mb-3 mb-lg-2 col-lg-4">
            <input
              name=""
              type="type"
              className="form-control"
              value={reservation.memberName}
            />
          </div>

          <h6 className="test2">&nbsp;&nbsp;&nbsp;&nbsp;체크인 여부</h6>
          <div className="col-sm-12 col-md-6 mb-3 mb-lg-2 col-lg-4">
            <input
              name=""
              type="type"
              className="form-control"
              value={reservation.checkYn}
            />
          </div>

          <div className="btn1">
            <div className="col-sm-10">
              <input
                type="button"
                className="btn btn-primary btn-block"
                value="뒤로 가기"
                onClick={backToSearchReservation}
              />
            </div>
          </div>
        </div>
      </form>

      <div className="blankBox2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
    </>
  );
}

export default SeeReservation;
