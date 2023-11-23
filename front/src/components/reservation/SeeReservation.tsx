import { useParams } from "react-router-dom";
import ReservationService from "../../services/reservation/ReservationService";
import React, { useEffect, useState } from "react";
import IReservation from "../../types/tour/IReservation";

function SeeReservation() {
  // todo: 변수 정의
  // 전체조회 페이지에서 전송한 기본키(airlineReservationNumber)
  const { airlineReservationNumber } = useParams();

  // 객체 초기화
  const initialReservation = {
    airlineReservationNumber: 0,
    adultCount: "",
    childCount: "",
    mileUseYn: "",
    memberYn: "", // 회원여부
    memberId: "",
    userNumber: 0, // 비회원 번호
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
    useState<IReservation>(initialReservation);

  const getReservation = (airlineReservationNumber: any) => {
    ReservationService.get(airlineReservationNumber) // 벡엔드로 상세조회 요청
      .then((response: any) => {
        setReservation(response.data);
        console.log(reservation.airlineReservationNumber);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (airlineReservationNumber) getReservation(airlineReservationNumber);
  }, [airlineReservationNumber]);

  return (
    <>
      <form className="form-ex">
        <div className="mb-3 row">
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
            예약 번호
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              readOnly
              className="form-ex2"
              id="staticEmail"
              value={reservation.airlineReservationNumber}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
            성인
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              readOnly
              className="form-ex2"
              id="staticEmail"
              value={reservation.adultCount}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
            소아
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              readOnly
              className="form-ex2"
              id="staticEmail"
              value={reservation.childCount}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
            예약 번호
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              readOnly
              className="form-ex2"
              id="staticEmail"
              value={reservation.mileUseYn}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
            예약 번호
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              readOnly
              className="form-ex2"
              id="staticEmail"
              value={reservation.memberId}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
            예약 번호
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              readOnly
              className="form-ex2"
              id="staticEmail"
              value={reservation.airline}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
            예약 번호
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              readOnly
              className="form-control-plaintext"
              id="staticEmail"
              value={reservation.domesticInternational}
            />
          </div>
        </div>
      </form>
      <div className="blankBox2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
      

        
      
    </>
  );
}

export default SeeReservation;
