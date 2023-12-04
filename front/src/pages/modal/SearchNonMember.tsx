import React, { useEffect, useState } from 'react'
import ISearchReservation from '../../types/searchReservation/ISearchReservation';
import { Modal } from 'react-bootstrap';

function SearchNonMember(props:any) {
  
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
  

  
    useEffect(() => {
        setReservation(props.reservation);
    }, [props.reservation]);
  
    const backToSearchReservation = () => {
      props.nonMemberModalShow(false);
    };
  
    return (

      
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
      {reservation ? 
      
          <>
          <form className="seeReservationForm col-8 mx-auto">
            <div className="blankBox3 mx-auto">&nbsp;</div>
            <div className="row mb-2 mx-auto">
              <div className="seeReservationNo1 mx-auto">
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
    
              <div className="seeReservationNo2 mx-auto">
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
    
              <div className="seeReservationNo1 mx-auto">
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
    
              <div className="seeReservationNo2 mx-auto">
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
    
              <div className="seeReservationNo1 mx-auto">
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
    
              <div className="seeReservationNo2 mx-auto">
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
    
              <div className="seeReservationNo1 mx-auto">
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
    
              <div className="seeReservationNo2 mx-auto">
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
    
              <div className="seeReservationNo1 mx-auto">
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
    
              <div className="seeReservationNo2 mx-auto">
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
    
              <div className="seeReservationNo1 mx-auto">
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
    
              <div className="seeReservationNo2 mx-auto">
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
    
              <div className="seeReservationNo1 mx-auto">
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
    
              <div className="seeReservationNo2 mx-auto">
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
    
              <div className="seeReservationNo1 mx-auto">
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
    
              <div className="seeReservationNo2 mx-auto">
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
    
              <div className="seeReservationNo5 mx-auto">
                <div>
                  <div className="col-sm-10 mx-auto">
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
    : <>일치하는 데이터가 없습니다.</>}
    </Modal.Body>
    <Modal.Footer>
    </Modal.Footer>
  </Modal>
    );
  }
  
  export default SearchNonMember;
  