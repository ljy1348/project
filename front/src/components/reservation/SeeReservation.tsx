import { useNavigate, useParams } from "react-router-dom";
import ReservationService from "../../services/reservation/ReservationService";
import React, { useEffect, useState } from "react";
import ISearchReservation from "../../types/searchReservation/ISearchReservation";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

function SeeReservation() {
  // todo: 변수 정의
  // 전체조회 페이지에서 전송한 기본키(airlineReservationNumber)
  const { airlineReservationNumber } = useParams();

  // 강제 페이지 이동 변수
  let navigate = useNavigate();

  // 유저 정보 가져오기 함수
  const { user: currentUser } = useSelector((state: RootState) => state.auth);

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

  useEffect(() => {
    if (!currentUser) navigate("/login");
  }, [currentUser])

  const backToSearchReservation = () => {
    navigate("/search-reservation");
  };

  return (
    <>
      <form className="seeReservationForm">
        <div className="blankBox3">&nbsp;</div>
        <div className="row mb-2">
          <div className="seeReservationNo1">
            <h6 className="seeReservationNo4">예약 번호</h6>
            <div className="seeReservationNo3">
              <input
                name=""
                type="type"
                className="seeReservationInput"
                value={reservation.airlineReservationNumber}
              />
            </div>
          </div>

          <div className="seeReservationNo2">
            <h6 className="seeReservationNo4">성인</h6>
            <div className="seeReservationNo3">
              <input
                name=""
                type="type"
                className="seeReservationInput"
                value={reservation.adultCount}
              />
            </div>
          </div>

          <div className="seeReservationNo1">
            <h6 className="seeReservationNo4">소아</h6>
            <div className="seeReservationNo3">
              <input
                name=""
                type="type"
                className="seeReservationInput"
                value={reservation.childCount}
              />
            </div>
          </div>

          <div className="seeReservationNo2">
            <h6 className="seeReservationNo4">마일리지 사용</h6>
            <div className="seeReservationNo3">
              <input
                name=""
                type="type"
                className="seeReservationInput"
                value={reservation.mileUseYn}
              />
            </div>
          </div>

          <div className="seeReservationNo1">
            <h6 className="seeReservationNo4">회원 ID</h6>
            <div className="seeReservationNo3">
              <input
                name=""
                type="type"
                className="seeReservationInput"
                value={reservation.memberId}
              />
            </div>
          </div>

          <div className="seeReservationNo2">
            <h6 className="seeReservationNo4">항공사</h6>
            <div className="seeReservationNo3">
              <input
                name=""
                type="type"
                className="seeReservationInput"
                value={reservation.airline}
              />
            </div>
          </div>

          <div className="seeReservationNo1">
            <h6 className="seeReservationNo4">항공편명</h6>
            <div className="seeReservationNo3">
              <input
                name=""
                type="type"
                className="seeReservationInput"
                value={reservation.flightName}
              />
            </div>
          </div>

          <div className="seeReservationNo2">
            <h6 className="seeReservationNo4">출발 공항</h6>
            <div className="seeReservationNo3">
              <input
                name=""
                type="type"
                className="seeReservationInput"
                value={reservation.startAirport}
              />
            </div>
          </div>

          <div className="seeReservationNo1">
            <h6 className="seeReservationNo4">도착 공항</h6>
            <div className="seeReservationNo3">
              <input
                name=""
                type="type"
                className="seeReservationInput"
                value={reservation.finalAirport}
              />
            </div>
          </div>

          <div className="seeReservationNo2">
            <h6 className="seeReservationNo4">출발 시간</h6>
            <div className="seeReservationNo3">
              <input
                name=""
                type="type"
                className="seeReservationInput"
                value={reservation.startTime}
              />
            </div>
          </div>

          <div className="seeReservationNo1">
            <h6 className="seeReservationNo4">도착 시간</h6>
            <div className="seeReservationNo3">
              <input
                name=""
                type="type"
                className="seeReservationInput"
                value={reservation.finalTime}
              />
            </div>
          </div>

          <div className="seeReservationNo2">
            <h6 className="seeReservationNo4">출발 일자</h6>
            <div className="seeReservationNo3">
              <input
                name=""
                type="type"
                className="seeReservationInput"
                value={reservation.startDate}
              />
            </div>
          </div>

          <div className="seeReservationNo1">
            <h6 className="seeReservationNo4">도착 일자</h6>
            <div className="seeReservationNo3">
              <input
                name=""
                type="type"
                className="seeReservationInput"
                value={reservation.finalDate}
              />
            </div>
          </div>

          <div className="seeReservationNo2">
            <h6 className="seeReservationNo4">국내 - 국제</h6>
            <div className="seeReservationNo3">
              <input
                name=""
                type="type"
                className="seeReservationInput"
                value={reservation.domesticInternational}
              />
            </div>
          </div>

          <div className="seeReservationNo1">
            <h6 className="seeReservationNo4">예약자명</h6>
            <div className="seeReservationNo3">
              <input
                name=""
                type="type"
                className="seeReservationInput"
                value={reservation.memberName}
              />
            </div>
          </div>

          <div className="seeReservationNo2">
            <h6 className="seeReservationNo4">체크인 여부</h6>
            <div className="seeReservationNo3">
              <input
                name=""
                type="type"
                className="seeReservationInput"
                value={reservation.checkYn}
              />
            </div>
          </div>

          <div className="seeReservationNo5">
            <div>
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


        </div>
      </form>

      <div className="blankBox2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
    </>
  );
}

export default SeeReservation;
