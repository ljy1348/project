import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BoardingPassService from "../../services/boardingPass/BoardingPassService";
import initScripts from "../../assets/js/scripts";
import initCustom from "../../assets/js/custom";
import IOperationinfo from "../../types/operationInfo/IOperationinfo";
import OperationService from "../../services/operation/OperationService";
import IReservation from "../../types/reservation/IReservation";
import ICheckin from "../../types/checkin/ICheckin";
import CheckinService from "../../services/checkin/CheckinService";
import ReservationService from "../../services/reservation/ReservationService";
import IBoardingPass from "../../types/boardingPass/IBoardingPass";

function Boardingpass() {
  const {
    operID,
    searchAirlinereservationnumber,
    bagCount1,
    adcount,
    chcount,
  } = useParams();

  // 객체 초기화(상세조회 : 기본키 있음)
  const initialOperation = {
    operationId: null,
    airline: "",
    flightName: "",
    startAirport: "",
    finalAirport: "",
    startTime: "",
    finalTime: "",
    operationDate: "",
    startDate: "",
    finalDate: "",
    domesticInternational: "",
    price: "",
  };

  const initialCheckReserve = {
    airlinereservationnumber: null,
    adultCount: "",
    childCount: "",
    mileuseYn: "",
    seatType: "",
    memberYn: "",
    checkYn: "",
    memberId: "",
    userNumber: "",
    operationId: 0 as const,

    startAirport: "",
    finalAirport: "",
  };

  const initialCheckSeat = {
    seatNumber: "",
    airlineReservationNumber: 0,
    seatType: "",
  };

  const [operation, setOperation] = useState<IOperationinfo>(initialOperation);
  const [checkReserve, setCheckReserve] =
    useState<IReservation>(initialCheckReserve);
  const [checkSeat, setCheckSeat] = useState<Array<IBoardingPass>>([
    initialCheckSeat,
  ]);

  // todo: 함수 정의
  // 상세조회 함수
  const getOperation = (operationId: any) => {
    OperationService.get(operationId)
      .then((response: any) => {
        setOperation(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const getCheckReserve = (airlinereservationnumber: any) => {
    ReservationService.getChseat(airlinereservationnumber)
      .then((response: any) => {
        setCheckReserve(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const getCheckSeat = (airlinereservationnumber: any) => {
    BoardingPassService.getAll(airlinereservationnumber)
      .then((response: any) => {
        setCheckSeat(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getOperation(operID);
    getCheckReserve(searchAirlinereservationnumber);
    getCheckSeat(searchAirlinereservationnumber);
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
                <h1 className="mb-5"></h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="untree_co-section_yb">
        <div className="container">
          <div className="checkinlog">
            <img src="/images/그린에어로고.png" className="main-logo-image" />
            GreenAir
          </div>
          <div className="underline"></div>
          <div className="line_row_wrap">
            <div className="line_row">
              
                <h4 className="nimcheckin">&nbsp; 고객님의 체크인이 확정되었습니다!</h4>

              <div className="container_boardingpass">
                <h3 className="checkin_reserve_choose_subTitle d-flex justify-content-center mt-3 ms-4">
                 
                  항공 여정
                </h3>
              </div>
              <div className="sangmin_choose_airport d-flex justify-content-center mt-5">
                <span>{operation.startAirport}</span>
                <span> &gt; </span>
                <span>{operation.finalAirport}</span>
              </div>

              <div>
                <h6 className="tit">
                  예약 번호 : {searchAirlinereservationnumber}
                </h6>

                <div className="finalboadingpass">
                  <table className="table">
                    {/* 좌석 정보 */}
                    <tr className="finalInfo">
                      <td scope="col">예약인원</td>
                      <td scope="col">좌석번호</td>
                      <td scope="col">좌석등급</td>
                    </tr>
                    <tr>
                      <td scope="col">
                        성인:{adcount} 소아 :{chcount}
                      </td>
                      <td scope="col">
                        {checkSeat.map((seat, index) => (
                          <span key={index}>
                            {seat.seatNumber}
                            {index < checkSeat.length - 1 && ", "}
                          </span>
                        ))}
                      </td>
                        {/* 좌석 정보 */}
                      <td scope="col">{checkSeat[0].seatType}</td>
                    </tr>

                    {/* 수화물 정보 */}
                    <tr className="finalInfo">
                      <td scope="col">항공편명</td>
                      <td scope="col">추가수화물개수</td>
                      <td scope="col">금액</td>
                    </tr>
                    <tr>
                      <td scope="col">{operation.flightName}</td>
                      <td scope="col">{bagCount1}</td>
                      <td scope="col">{Number(bagCount1) * 100000} ￦</td>
                    </tr>
                    {/* 수화물 정보 */}
                  </table>
                </div>
              </div>
            </div>
            {Number(bagCount1) > 0&& <dl className="line_row">
              <dt>
                <span className="tit">결제까지 완료해주시기 바랍니다.</span>
              </dt>
              <div>
                <br />
                <button type="button" className="btn btn-primary">
                  결제
                </button>
              </div>
            </dl>}
          </div>
        </div>
      </div>
    </>
  );
}

export default Boardingpass;
