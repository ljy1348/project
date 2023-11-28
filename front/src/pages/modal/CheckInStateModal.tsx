import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

import ICheckin from "../../types/checkin/ICheckin";
import CheckinService from "../../services/checkin/CheckinService";
import IReservation from "../../types/reservation/ISearchReservation";
import ISearchReservation from "../../types/reservation/ISearchReservation";

function CheckInStateModal(props: any) {
  const initChckStt = {
    airlinereservation: null,
    // 좌석등급
    seatType: "",
    // 성인
    adultCount: "",
    // 어린이
    childCount: "",
    // 마일리지 여부
    mileuseYn: "",
    // 체크인 여부
    checkYn: "",
    memberId: "",
    userNumber: "",
    operationId: 0,

    // 운항정보
    startAirport: "",
    finalAirport: ""

 
  };

  // 변수정의
  const [checkInState, setCheckinState] = useState(false);
  const [checkStt, setCheckStt] = useState<any>(initChckStt);
  // 국제선, 국내선
  const [selectedOption, setSelectedOption] = useState(null);

  // 승객수, 체크인 유무
  // 검색어 변수
  const [searchAirlinereservationnumber, setSearchAirlinereservationnumber] =
    useState<number>(0);

  useEffect(() => {
    // console.log(props);
    // 전체 조회 실행
    retrieveCheckin(props.searchAirlinereservationnumber); 
  }, [props]);

  // 체크인버튼


  // 체크인 버튼 클릭 이벤트 핸들러
  const handleCheckinButtonClick = () => {
    setCheckinState(true);

    if (checkStt.checkYn === "Y") {
      alert("체크인 상태를 다시 확인해주시길 바랍니다.");
    } else if (checkStt.checkYn === "N") {
      if (checkStt.startAirport === "국제") {
        window.location.href = "/passport";
      } else if (checkStt.startAirport === "국내") {
        window.location.href = "/passengerInfo";
      }
    }
  };


  // todo: 전체 조회 함수
  const retrieveCheckin = (airlinereservationnumber: any) => {
    CheckinService.getAll(airlinereservationnumber) // backend 요청
      .then((response: any) => {
        // todo: 성공 처리
        // setSearchAirlinereservationnumber(response.data);
        setCheckStt(response.data);
        // 로그
        console.log("response", response);
      })
      .catch((e: Error) => {
        // todo: 실패 처리
        console.log(e);
      });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <div className="state_modal_header modal-header">
            <h3 className="modal-title">탑승객 선택</h3>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="modal-body">
          <div className="row mx-0">
            <div className="checkin_state_modal_fori_country">
            
              <table className="table">
                <tr>
                  <th scope="col">승객</th>
                  <th scope="col">운항정보</th>
                  <th scope="col">체크인 상태</th>
                  <th scope="col">체크인 등록</th>
                </tr>
                <tr>
                  <td scope="col">
                    어른 : {checkStt.adultCount} 어린이 : {checkStt.childCount}
                  </td>
                  <td scope="col">
                    출발지: {checkStt.startAirport} - 도착지: {checkStt.finalAirport}
                  </td>
                  <td scope="col">{checkStt.checkYn}</td>

                  <td scope="col">
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox1"
                        value="option1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineCheckbox1"
                      >
                        선택하기
                      </label>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td scope="col"></td>
                  <td></td>
                  <td></td>
                  <td>
                    <Button
                      name="checkinbutton"
                      variant="primary"
                      onClick={handleCheckinButtonClick}
                      disabled={checkInState || !selectedOption} 
                    >
                      체크인
                    </Button>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>

        <div className="checkinstateButton"></div>
      </Modal.Body>
    </Modal>
  );
}

export default CheckInStateModal;
