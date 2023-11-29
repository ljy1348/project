import React, { useEffect, useState } from "react";
import initScripts from "../../assets/js/scripts";
import initCustom from "../../assets/js/custom";
import { Accordion } from "react-bootstrap";
import PassportService from "../../services/passport/PassportService";
import { Button } from "@mui/material";
import { Form, Link, useParams } from "react-router-dom";
import { ClassNames } from "@emotion/react";
// import About from './../About';
import IPassport from "../../types/passport/IPassport";
import IMemberInfo from "../../types/memberInfo/IMemberInfo";
import INonMemberInfo from "../../types/nonmemberInfo/INonMembersInfo";
import IBaggage from "../../types/baggage/IBaggage";
import BaggageService from "../../services/checkin/BaggageService";
import ReservationService from "../../services/reservation/ReservationService";

function Passport() {
const{airlinereservationnumber}= useParams();

  // 예약번호를 받아옴
  const {
    searchAirlinereservationnumber,
  } = useParams();

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
  const [totalpeople, setTotalPeople] = useState<number>(5);


  console.log("총인원수",totalpeople)
  


  // todo : 여권정보 
  //  객체 초기화 
  const initialPassport = {
    // 여권번호
    passportId: null,
    //회원 id
    memberId:"",
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
    bagArea: 0,
    bagWeight: 0,
    bagPrice: 0,
    checkId: "",
    bagYn: ""

  }


  // 여권 객체
  const [passport, setPassport] = useState<IPassport>(initialPassport);
  const [baggage, setBaggage] = useState<IBaggage>(initialBaggage);

   // 저장버튼 클릭후 submitted = true 변경됨
  //  const [submitted, setSubmitted] = useState<boolean>(false);
 

  // 저장버튼 클릭후 submitted = true 변경됨
  // const [submitted, setSubmitted] = useState<boolean>(false);
  // input 태그에 수동 바인딩
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target; // 화면값
    setPassport({ ...passport, [name]: value });  // 변수 저장
  };
  
  // 예약정보 상세조회 함수
  const getReservation = (airlineReservationNumber: string) => {
    ReservationService.get(airlineReservationNumber)         // 벡엔드로 상세조회 요청
      .then((response: any) => {
        setReservation(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  
    // 저장 함수
    const savePassport = () => {
      // 임시 객체
      var data = {
        passportId: passport.passportId,
        passportCounrty: passport.passportCounrty,
        passportDate: passport.passportDate,
        userNumber: passport.userNumber,
        memberId: passport.memberId,
      
      };
  
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
  
   bagNumber: baggage.bagNumber,
   bagCount: baggage.bagCount,
   bagArea: baggage.bagArea,
   bagWeight: baggage.bagWeight,
   bagPrice: baggage.bagPrice,
   checkId: baggage.checkId,
   bagYn: baggage.bagYn
      };

      BaggageService.create(data)
      .then((response: any) => {
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
    


  // todo: 수화물 저장할 변수
  let [bagCount1, setBagCount1] = useState<number>(0);

  const [array, setArray] = useState<Array<string>>(["a"]);

  useEffect(() => {
    // 화면이 생성될때 받아온 예약번호를 상세조회하는 조건문
    if (searchAirlinereservationnumber) getReservation(searchAirlinereservationnumber);
    initScripts();
    initCustom();
  }, []);
  //reservation이 변경될 때마다 totalCount 수가변함
  useEffect(() => {
    // adultCount와 childCount를 합산하여 totalpeople 업데이트
    setTotalPeople(Number(reservation.adultCount) + Number(reservation.childCount));
    const newArray = array.length < totalpeople ? [...array, ...Array(totalpeople - array.length).fill("a")] : array.slice(0, totalpeople);
    setArray(newArray);
  }, [reservation,totalpeople]); // reservation이 변경될 때마다 useEffect가 실행







  //  todo: 증가 함수
//  todo: 증가 함수
const increaseCount = () => {
  if (bagCount1 < 2) {
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



  return (
    <>
      <div className="hero hero-inner">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="intro-wrap">
                <h1 className="mb-5">
                  <span className="d-block text-center">체크인</span>
                  <h3 className="mb-5" color="white">
                    등록
                  </h3>
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
            {array &&
              array.map((val, idx) => {
                return (
                  <form className="form" id="passengerForm">
                    <div className="row mb-2">
                      {/* <div className="col-10"> */}
           
                      <div className="input-group">

                        <div className="col-sm-10 col-md-6 mb-3 mb-lg-0 col-lg-2">
                          <div className="was-validated">
                            <h6>국적</h6>
                            <select
                              name=""
                              id=""
                              className="form-control custom-select"
                
                              required
                              aria-label="select example"
                            >
                              <option value="">국적</option>
                              <option value="">페루</option>
                              <option value="">일본</option>
                              <option value="">태국</option>
                              <option value="">브라질</option>
                              <option value="">미국</option>
                              <option value="">일본</option>
                              <option value="">한국</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-sm-10 col-md-3 mb-3 mb-lg-2 col-lg-2">
                          <div className="was-validated">
                            <h6>성별</h6>
                            <select
                              name=""
                              id=""
                              className="form-control custom-select"
                       
                              required
                              aria-label="select example"
                            >
                              <option value="">성별</option>
                              <option value="">여성</option>
                              <option value="">남성</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-sm-10 col-md-3 mb-3 mb-lg-2 col-lg-2">
                          <div className="was-validated">
                            <h6>생년월일</h6>
                            <input
                              className="form-control"
                              id="validation Input"
                              placeholder="YYYYMMDD"
          
                              required
                            ></input>
                          </div>
                        </div>

                        <div className="col-sm-10 col-md-6 mb-3 mb-lg-0 col-lg-2">
                          <div className="was-validated">
                            <h6>여권발급국가</h6>
                            <select
                              name=""
                              id=""
                              className="form-control custom-select"
                              required
                            >
                              <option value="">여권발급국가</option>
                              <option value={passport.passportCounrty}>페루</option>
                              <option value={passport.passportCounrty}>일본</option>
                              <option value={passport.passportCounrty}>태국</option>
                              <option value={passport.passportCounrty}>브라질</option>
                              <option value={passport.passportCounrty}>미국</option>
                              <option value={passport.passportCounrty}>일본</option>
                              <option value={passport.passportCounrty}>대한민국</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-sm-12 col-md-6 mb-3 mb-lg-2 col-lg-2">
                          <div className="was-validated">
                            <h6>여권번호</h6>
                            <input
                              name=""
                              type="type"
                              id="validation Input"
                              className="form-control"
                              value={passport.passportId}
                              placeholder="여권번호"
                              required
                            />
                          </div>
                        </div>

                        <div className="col-sm-12 col-md-6 mb-3 mb-lg-2 col-lg-2">
                          <div className="was-validated">
                            <h6>여권만료일</h6>
                            <input
                              name=""
                              type="type"
                              id="validation Input"
                              className="form-control"
                              value={passport.passportDate}
                              placeholder="YYYY-MM-DD"
                              required
                            />
                          </div>
                        </div>

{/* 
                        <div className="passengerbutton">
                            <button
                              type="button"
                              className="btn btn-outline-dark"
                              onClick={() => onClickAdd(idx)}
                            >
                              승객 추가
                            </button>

                            <button
                              type="button"
                              className="btn btn-dark"
                              onClick={() => onClickRemove(idx)}
                            >
                              제거
                            </button>                            
                          </div>                      */}


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
          <Accordion.Header>좌석 선택 #2</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          </Accordion.Body>
        </Accordion.Item>
        {/* 좌석지정 */}

        {/* 수화물 사전 구매  */}
        <Accordion.Item eventKey="2">
          <Accordion.Header>수화물추가 (선택사항) #3</Accordion.Header>
          <Accordion.Body>
            <div className="bagage">
            <p>기본 수화물 : 휴대수화물 1 (5kg) + 위탁수화물 1(20kg)  
                    추가없이는 위탁 1 + 휴대 1</p>
                    <p>추가 수화물 1인당 2개씩 추가가능 </p>
    
              <table className="table">

                
                <thead className="test1">
                  <tr>
                    <th scope="col">예약자</th>
                    <th scope="col">수화물 추가</th>
                    <th scope="col">금액</th>
                  </tr>
                </thead>
                {/* <tbody> */}
                {array &&
                  array.map((val, idx) => {
                    return (

                  <tr>
                    <td className="passengername"></td>
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
                    <td className="bagprice">{new Intl.NumberFormat('ko-KR').format(bagCount1 * 100000)}</td>
                  </tr>



);
              })}






                 
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
                      <strong>{new Intl.NumberFormat('ko-KR').format(bagCount1 * 100000)}</strong>
                    </td>
                  </tr>
                  
                  
                {/* </tbody> */}
              </table>

              
              <div className="toboardingpass">
                <Link to={"/boardingpass"}>
                  <button type="button" className="btn btn-outline-dark">
                    완료
                  </button>
                </Link>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        {/* 수화물 사전 구매  */}
      </Accordion>
    </>
  );
            }

export default Passport;
