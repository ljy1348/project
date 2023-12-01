import React, { useEffect, useState } from "react";
import initScripts from "../../assets/js/scripts";
import initCustom from "../../assets/js/custom";
import { Accordion } from "react-bootstrap";
import PassportService from "../../services/passport/PassportService";

import { Button } from "@mui/material";
import { Form, Link, useNavigate, useParams } from "react-router-dom";
import { ClassNames } from "@emotion/react";
// import About from './../About';
import IPassport from "../../types/passport/IPassport";

import IMemberInfo from "../../types/memberInfo/IMemberInfo";
import INonMemberInfo from "../../types/nonmemberInfo/INonMembersInfo";
import IBaggage from "../../types/baggage/IBaggage";
import BaggageService from "../../services/baggage/BaggageService";
import ReservationService from "../../services/reservation/ReservationService";
import SelectSeat from "../modal/SelectSeat";
// import ICheckin from "../../types/checkin/ICheckin";
import CheckinService from "../../services/checkin/CheckinService";
import ICheckin from "../../types/checkin/ICheckin";

function Passport() {
  // 모달 창
  const [modalShow, setModalShow] = useState(false);

  // 예약번호를 받아옴
  const { searchAirlinereservationnumber } = useParams();

  // 예약 상세조회 객체 초기화
  const initialReservation = {
    airlineReservationNumber: null,
    adultCount: 0,
    childCount: 0,
    mileUseYn: "N",
    seatType: "이코노미",
    memberYn: "N",
    memberId: "",
    userNumber: "",
    operationId: 0,
    checkYn: "N",
  };
  // 예약 변수 생성
  const [reservation, setReservation] = useState(initialReservation);
  const [totalpeople, setTotalPeople] = useState<number>(0);
  // 예약좌석
  const [selectedSeatsInfo, setSelectedSeatsInfo] = useState([]);
  // console.log(selectedSeatsInfo)
  const operID = reservation.operationId;
  const adcount = reservation.adultCount;
  const chcount = reservation.childCount;

  console.log("총인원수", reservation.userNumber);

  // todo : 여권정보
  //  객체 초기화
  const initialPassport = {
    // 여권번호
    passportId: null,
    //회원 id
    memberId: "",
    // 여권발행국가
    passportCounrty: "",
    // 여권만료일
    passportDate: "",
    // 비회원ID
    userNumber: 0,
  };

  const initialBaggage = {
    bagNumber: null,
    bagCount: 0,
    bagPrice: 0,
    airlineReservationNumber: Number(searchAirlinereservationnumber)
  };

  const initialCheckin = {
    // 여권번호
    checkId: null,
    seatNumber : "",
    airlineReservationNumber: Number(searchAirlinereservationnumber),
    passportId : "0123"
  };

  // 여권 객체
  const [passport, setPassport] = useState<IPassport[]>([initialPassport]);
  const [baggage, setBaggage] = useState<IBaggage>(initialBaggage);
  const [checkin, setCheckin] = useState<ICheckin[]>([initialCheckin]);

  // 저장버튼 클릭후 submitted = true 변경됨
  //  const [submitted, setSubmitted] = useState<boolean>(false);

  // 저장버튼 클릭후 submitted = true 변경됨
  // const [submitted, setSubmitted] = useState<boolean>(false);
  // input 태그에 수동 바인딩
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    passportIndex: number,
    fieldName: keyof IPassport
  ) => {
    const { value } = event.target;
    console.log(fieldName, passportIndex, value);

    setPassport((prevPassport) => {
      const updatedPassports = [...prevPassport];
      updatedPassports[passportIndex] = {
        ...updatedPassports[passportIndex],
        [fieldName]: value,
        // passportIndex에 해당하는 위치의 userNumber를 할당
        userNumber:
          parseInt(reservation.userNumber.split(",")[passportIndex]) || 0,
      };
      return updatedPassports;
    });
  };

   // input 태그에 수동 바인딩
   const handleInputChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target; // 화면 값
    setBaggage({ ...baggage, [name]: value });  // 변수 저장
  };


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
  //  저장 함수
  const savePassport = () => {
    // 임시 객체
    var data = passport;
    // {
    //   passportCounrty: passport.passportCounrty,
    //   passportDate: passport.passportDate,
    //   userNumber: passport.userNumber,
    //   memberId: passport.memberId,
    // };

    PassportService.create(data)
      .then((response: any) => {
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const saveBaggage = () => {
    var data = {
      bagNumber: null,
      bagCount: baggage.bagCount,
      bagPrice: baggage.bagCount * 100000,
      airlineReservationNumber: Number(searchAirlinereservationnumber)
    };

    console.log(data);

    BaggageService.create(data)
      .then((response: any) => {
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const saveCheckin = () => {
    // selectedSeatsInfo와 passport 배열이 동일한 길이를 가정합니다.
    console.log(checkin);
    let arr = [];
    for (let i = 0; i < selectedSeatsInfo.length; i++) {

      let initData:ICheckin = {
        checkId: null,
        seatNumber : "",
        airlineReservationNumber: 0,
        passportId : "0123"
      }
      initData.seatNumber = selectedSeatsInfo[i];
      initData.passportId = passport[i].passportId;
      initData.airlineReservationNumber = Number(searchAirlinereservationnumber);
      arr.push(initData);
    }
    CheckinService.create(arr)
      .then((response: any) => {
        console.log(response.data);
        // 여기에서 필요한 네비게이션 처리를 추가하세요.
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  const navi = useNavigate();
  const handleSave = () => {
  
    savePassport();
    saveCheckin();
    saveBaggage();

    navi(`/boardingpass/${operID}/${searchAirlinereservationnumber}/${adcount}/${chcount}/${bagCount1}`)
  };

  // todo: 수화물 저장할 변수
  let [bagCount1, setBagCount1] = useState<number>(0);

  const [array, setArray] = useState<Array<string>>(["a"]);

  useEffect(() => {
    // 화면이 생성될때 받아온 예약번호를 상세조회하는 조건문
    if (searchAirlinereservationnumber)
      getReservation(searchAirlinereservationnumber);
    initScripts();
    initCustom();
  }, []);
  //reservation이 변경될 때마다 totalCount 수가변함
  useEffect(() => {
    // adultCount와 childCount를 합산하여 totalpeople 업데이트
    setTotalPeople(
      Number(reservation.adultCount) + Number(reservation.childCount)
    );

    const tempArray = new Array();

    for (
      let i = 0;
      i < Number(reservation.adultCount) + Number(reservation.childCount);
      i++
    ) {
      tempArray.push(initialPassport);
    }

    setPassport(tempArray);
  }, [reservation, totalpeople]); // reservation이 변경될 때마다 useEffect가 실행

  //  todo: 증가 함수
  //  todo: 증가 함수
  const increaseCount = () => {
    if (bagCount1 < totalpeople * 2) {
      // bagCount1을 1 증가시킵니다.
      const updatedCount = bagCount1 + 1;
      setBagCount1(updatedCount);

      // baggage.bagCount 값을 업데이트합니다.
      setBaggage((prevBaggage) => ({
        ...prevBaggage,
        bagCount: updatedCount,
      }));
    } else {
      // 이미 2 이상이면 경고 메시지를 표시합니다.
      alert("1인당 초과수화물은 2개까지 가능합니다");
    }
  };
  // 수화물

  //  todo: 감소 함수
  const decreaseCount = () => {
    if (bagCount1 > 0) {
      bagCount1 -= 1;
      setBagCount1(bagCount1);

      // baggage.bagCount 값을 업데이트합니다.
      setBaggage((prevBaggage) => ({
        ...prevBaggage,
        bagCount: bagCount1,
      }));
    }
  };

  // 좌석 저장함수
  const handleSeatsSelected = (selectedSeats: any) => {
    setSelectedSeatsInfo(selectedSeats);
    console.log("Passport에서 선택된 좌석:", selectedSeats);
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <Accordion className="testtttttttt1" defaultActiveKey={["0"]} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>여권정보 #1</Accordion.Header>
          <Accordion.Body>
            {/* 여권 정보 입력    */}
            {passport &&
              passport.map((val, idx) => {
                return (
                  <form className="form" id="passengerForm">
                    <div className="row mb-2">
                      {/* <div className="col-10"> */}

                      <div className="input-group">
                        <div className="col-sm-12 col-md-6 mb-3 mb-lg-2 col-lg-3">
                          <div className="was-validated">
                            <h6>여권 발급 국가</h6>
                            <input
                              name={`passportCounrty${idx}`}
                              type="text"
                              id={`passportCounrty${idx}`}
                              className="form-control"
                              value={val.passportCounrty}
                              placeholder="여권 발급 국가"
                              onChange={(e) =>
                                handleInputChange(e, idx, "passportCounrty")
                              }
                              required
                            />
                          </div>
                        </div>

                        <div className="col-sm-12 col-md-6 mb-3 mb-lg-2 col-lg-3">
                          <div className="was-validated">
                            <h6>여권번호</h6>
                            <input
                              name={`passportId${idx}`}
                              type="text"
                              id={`passportId${idx}`}
                              className="form-control"
                              value={val.passportId}
                              onChange={(e) =>
                                handleInputChange(e, idx, "passportId")
                              }
                              placeholder="여권번호"
                              required
                            />
                          </div>
                        </div>

                        <div className="col-sm-12 col-md-6 mb-3 mb-lg-2 col-lg-3">
                          <div className="was-validated">
                            <h6>여권만료일</h6>
                            <input
                              name={`passportDate${idx}`}
                              type="text"
                              id={`passportDate${idx}`}
                              className="form-control"
                              value={val.passportDate}
                              onChange={(e) =>
                                handleInputChange(e, idx, "passportDate")
                              }
                              placeholder="YYYY-MM-DD"
                              required
                            />
                          </div>
                        </div>

                        <div className="col-sm-12 col-md-6 mb-3 mb-lg-2 col-lg-3">
                          <div className="was-validated">
                            <h6>회원 ID</h6>
                            <input
                              name={`memberId${idx}`}
                              type="text"
                              id={`memberId${idx}`}
                              className="form-control"
                              value={val.memberId}
                              onChange={(e) =>
                                handleInputChange(e, idx, "memberId")
                              }
                              placeholder="회원 ID 입력"
                              required
                            />
                          </div>
                        </div>
                     
                      </div>
                    </div>
                  </form>
                );
              })}
            {/* </div> */}
            {/* 여권정보입력  */}
          </Accordion.Body>
        </Accordion.Item>

        {/* 좌석지정 */}
        <Accordion.Item eventKey="1">
          <Accordion.Header onClick={() => setModalShow(true)}>
            좌석 선택 / 선택된 좌석: {selectedSeatsInfo.join(" ")}
          </Accordion.Header>
        </Accordion.Item>
        {/* 수화물 사전 구매  */}
        <Accordion.Item eventKey="2">
          <Accordion.Header>수화물추가 (선택사항) #3</Accordion.Header>
          <Accordion.Body>
            <div className="bagage">
              <p>
                기본 수화물 : 휴대수화물 1 (5kg) + 위탁수화물 1(20kg) 
              </p>
              <p>추가 수화물 1인당 2개씩 추가가능 </p>

              <table className="table">
                <thead className="test1">
                  <tr>
                    <th scope="col">예약 번호</th>
                    <th scope="col">수화물 추가</th>
                    <th scope="col">금액</th>
                  </tr>
                </thead>
                {/* <tbody> */}

                <tr>
                  <td className="passengername">
                    {searchAirlinereservationnumber}
                  </td>
                  <td className="bagcount">
                    <div
                      className="btn-group-col"
                      role="group"
                      aria-label="Basic outlined example"
                    >
                      <button
                        type="button"
                        className="btn btn-outline-secondary opacity-50"
                        value={baggage.bagCount}
                        onClick={decreaseCount}
                      >
                        -
                      </button>

                      <button
                        type="button"
                        className="btn btn-outline-dark"
                        disabled
                      >
                        {bagCount1}
                      </button>

                      <button
                        type="button"
                        className="btn btn-outline-secondary opacity-50"
                        value={baggage.bagCount}
                        onClick={increaseCount}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="bagprice">

                    {new Intl.NumberFormat("ko-KR").format(bagCount1 * 100000)}
                  </td>
                </tr>

                <tr>
                  <td></td>
                  <td>
                    <strong>총 수량</strong>
                  </td>
                  <td>
                    <strong>총 금액</strong>
                  </td>
                </tr>

                <tr>
                  <td></td>
                  <td>
                    <strong>{bagCount1}</strong>
                  </td>
                  <td>
                    <strong>
                      {new Intl.NumberFormat("ko-KR").format(
                        bagCount1 * 100000
                      )}
                    </strong>
                  </td>
                </tr>

                {/* </tbody> */}
              </table>

              <div className="toboardingpass">
                {/* <Link to={"/boardingpass/"}> */}
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  onClick={handleSave}
                >
                  완료
                </button>
                {/* </Link> */}
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        {/* 수화물 사전 구매  */}
      </Accordion>

      <SelectSeat
        show={modalShow}
        onHide={() => setModalShow(false)}
        onSeatsSelected={handleSeatsSelected}
        totalpeople={totalpeople}
        modalShow={modalShow}
      />
    </>
  );
}

export default Passport;
