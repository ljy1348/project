import { useParams } from "react-router-dom";
import ReservationService from "../../services/reservation/ReservationService";
import React, { useEffect, useState } from "react";
import IReservation from "../../types/tour/IReservation";
import { NOTFOUND } from "dns";

function SeeReservation() {
  // todo: 변수 정의
  // 전체조회 페이지에서 전송한 기본키(airlineReservationNumber)
  const { airlineReservationNumber } = useParams();

  // 객체 초기화
  const initialReservation = {
    airlineReservationNumber: "",
    flightName: "",
    userId: "",
    roundOrOne: "",
    enName: "",
    departure: "",
    arrival: "",
    operationDay: "",
    airline: "",
    seatType: "",
    adultCount: 0,
    childCount: 0,
    mileUseStatus: "",
    membershipStatus: "",
    domesticInternational: "",
    startAirport: "",
    finalAirport: "",
  };

  // reservation 변수
  const [reservation, setReservation] =
    useState<IReservation>(initialReservation);

  const getReservation = (airlineReservationNumber: string) => {
    ReservationService.get(airlineReservationNumber) // 벡엔드로 상세조회 요청
      .then((response: any) => {
        setReservation(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (airlineReservationNumber) getReservation(airlineReservationNumber);
  }, [])

  return (
    <>
    <div className="blankBox2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
      {/* table start(본문) */}
      <table className="table">
          <thead>
            <tr className="tableText">
              <th scope="col">예약 번호</th>
              <th scope="col">운항편명</th>
              <th scope="col">회원 ID</th>
              <th scope="col">왕복 여부</th>
              <th scope="col">영문명</th>
              <th scope="col">출발 일자</th>
              <th scope="col">도착 일자</th>
              <th scope="col">운항 요일</th>
              <th scope="col">항공사</th>
            </tr>
          </thead>
          <tbody className="tabText">
                <tr>
                  <td>{reservation.airlineReservationNumber}</td>
                  <td>{reservation.flightName}</td>
                  <td>{reservation.userId}</td>
                  <td>{reservation.roundOrOne}</td>
                  <td>{reservation.enName}</td>
                  <td>{reservation.departure}</td>
                  <td>{reservation.arrival}</td>
                  <td>{reservation.operationDay}</td>
                  <td>{reservation.airline}</td>
                </tr>
          </tbody>

          <div className="blankBox2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>

          <thead>
            <tr className="tableText">
              <th scope="col">좌석 등급</th>
              <th scope="col">성인 인수</th>
              <th scope="col">소아 인수</th>
              <th scope="col">마일리지 사용 여부</th>
              <th scope="col">회원 여부</th>
              <th scope="col">국내 - 국제</th>
              <th scope="col">출발 공항</th>
              <th scope="col">도착 공항</th>
              <th scope="col">예약 조회</th>
            </tr>
          </thead>
          <tbody className="tabText">
                <tr>
                  <td>{reservation.seatType}</td>
                  <td>{reservation.adultCount}</td>
                  <td>{reservation.childCount}</td>
                  <td>{reservation.mileUseStatus}</td>
                  <td>{reservation.membershipStatus}</td>
                  <td>{reservation.domesticInternational}</td>
                  <td>{reservation.startAirport}</td>
                  <td>{reservation.finalAirport}</td>
                  <td>
                    <a href={"/search-reservation"}>
                      <a className="badge bg-success">예약 조회</a>
                    </a>
                  </td>
                </tr>
          </tbody>
        </table>
      {/* table end */}
    </>
  );
}

export default SeeReservation;
