import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";


import CheckinService from "../../services/checkin/CheckinService";


function CheckInStateModal(props: any) {
  const initChckStt = {

     // 예약 번호
     airlineReservationNumber: null,
    //  성인
     adultCount: "",
    //  소아
    childCount: "",
    // 마일리지
    mileUseYn: "",
    //  좌석번호 
    seatType: "",
   // 회원여부 
     memberYn: "",
    // 체크인 여부
    checkYn: "",
     // 회원 id
     memberId: "",
     // 비회원
     userNumber: "",
    //  운항id
     operationId: 0,
     // 조인 
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

    if (checkStt.checkYn === 'Y') {
      alert("체크인 상태를 다시 확인해주시길 바랍니다.");
    }else {
      // checkYn이 'N'일 때, 이동할 URL 설정
      const targetUrl = `/passport/${props.searchAirlinereservationnumber}`; // 또는 '/passengerinfo'
  
      // 실제로 페이지를 이동
      window.location.href = targetUrl;
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
                </tr>
                <tr>
                  <td scope="col">
                    어른 : {checkStt.adultCount} 어린이 : {checkStt.childCount}
                  </td>
                  <td scope="col">
                    출발지: {checkStt.startAirport} - 도착지: {checkStt.finalAirport}
                  </td>
                  <td scope="col">{checkStt.checkYn}</td>
                </tr>

                <tr>
                  <td></td>
                  <td></td>
                  <td>
                    <Button
                      name="checkinbutton"
                      // variant="primary"
                      onClick={handleCheckinButtonClick}
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