import React, { useEffect, useState } from "react";
import initScripts from "../../assets/js/scripts";
import initCustom from "../../assets/js/custom";
import { Accordion } from "react-bootstrap";
import { Button } from "@mui/material";
import { Form, Link } from "react-router-dom";
import { ClassNames } from "@emotion/react";
// import About from './../About';
import IPassport from "../../types/passport/IPassport";
import PassportService from "../../services/checkin/PassportService";
import IMemberInfo from "../../types/memberInfo/IMemberInfo";
import INonMemberInfo from "../../types/nonmemberInfo/INonMembersInfo";

function Passport() {

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

    userName: "",
    userSex: "",
    userCountry: "",
    userDate: "",

    memberEname: "",
    memberSex: "",
    memberCountry: "",
    memberDate : ""

  };


  // 여권 객체
  const [passport, setPassport] = useState<IPassport>(initialPassport);
 

  // 저장버튼 클릭후 submitted = true 변경됨
  // const [submitted, setSubmitted] = useState<boolean>(false);
  // input 태그에 수동 바인딩
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target; // 화면값
    setPassport({ ...passport, [name]: value });  // 변수 저장
  };
 
  
    // 저장 함수
    const savePassport = () => {
      // 임시 객체
      var data = {
        passportId: passport.passportId,
        memberId: passport.memberId,
        passportCounrty: passport.passportCounrty,
        passportDate: passport.passportDate,
        userNumber: passport.userNumber,

        memberEname: passport.memberEname ,
        memberSex: passport.memberSex,
        memberDate: passport.memberDate,
        memberCountry: passport.memberCountry,

        userName: passport.userName,
        userSex: passport.userSex,
        userDate: passport.userDate,
        userCountry: passport.userCountry
      
      };
  
      PassportService.create(data)
        .then((response: any) => {
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    };


  // todo: 수화물 저장할 변수
  let [bagCount1, setBagCount1] = useState<number>(0);
  let [bagCount2, setBagCount2] = useState<number>(0);

  const [array, setArray] = useState<Array<string>>(["a"]);

  useEffect(() => {
    initScripts();
    initCustom();
  }, []);




// todo : 승객추가,삭제 버튼

  // todo : 여권 정보
  const onClickAdd = (idx: number) => {
    setArray([...array, "a"]);
  };
  const onClickRemove = (idx:number) => {
    if (array.length > 1) {
      setArray(array.slice(0, -1));
    }
   
  };


  //  todo: 증가 함수
  const increaseCount = () => {
    if (bagCount1 < 2) {
      // bagCount1을 1 증가시킵니다.
      const updatedCount = bagCount1 + 1;
  
      setBagCount1(updatedCount);
    
  }else {
    // 이미 2 이상이면 경고 메시지를 표시합니다.
    alert("1인당 초과수화물은 2개까지 가능합니다");
}
};
// 수화물

  //  todo: 감소 함수
  const decreaseCount = () => {
    if (bagCount1 > 0) {
      bagCount1 -= 1;
      setBagCount1(bagCount1); // 현재 감소값 저장
    }
  };

  //  todo: 증가 함수
  const increaseCount2 = () => {
    if (bagCount2 < 2) {
      // bagCount1을 1 증가시킵니다.
      const updatedCount2 = bagCount2 + 1;
  
      // 상태를 업데이트합니다.
      setBagCount2(updatedCount2);
  }else {
    // 이미 2 이상이면 경고 메시지를 표시합니다.
    alert("1인당 초과수화물은 2개까지 가능합니다");
}
};

  //  todo: 감소 함수
  const decreaseCount2 = () => {
    if (bagCount2 > 0) {
      bagCount2 -= 1;
      setBagCount2(bagCount2); // 현재 감소값 저장
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
                              value={passport.memberCountry || passport.userCountry}
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
                              value={passport.memberSex || passport.userSex}
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
                             value={(passport?.memberDate || passport?.userDate)?.toString()}
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
                              value={passport.passportCounrty}
                              required
                            >
                              <option value="">여권발급국가</option>
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
                              type="type"
                              className="form-control"
                              value={passport.passportDate as string}
                              placeholder="YYYY-MM-DD"
                              id="validation Input"
                              required
                            />
                          </div>   
                        </div>

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
              <h5> 예약 번호 : </h5>
              <table className="table">
                <thead className="test1">
                  <tr>
                    <th scope="col">예약자</th>
                    <th scope="col">수화물 추가</th>
                    <th scope="col">금액</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="passengername">박유빈</td>
                    <td className="bagcount">
                      <div
                        className="btn-group-col"
                        role="group"
                        aria-label="Basic outlined example"
                      >
                        <button
                          type="button"
                          className="btn btn-outline-secondary opacity-50"
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
                          onClick={increaseCount}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="bagprice">ㅇ</td>
                  </tr>

                  <tr>
                    <td scope="col">승객1 </td>
                    <td scope="col">수화물 추가</td>
                    <td scope="col">금액</td>
                  </tr>

                  <tr className="trbutton">
                    <td scope="col"></td>
                    <td scope="col">
                      <div
                        className="btn-group-col"
                        role="group"
                        aria-label="Basic outlined example"
                      >
                        <button
                          type="button"
                          className="btn btn-outline-secondary opacity-50"
                          onClick={decreaseCount2}
                        >
                          -
                        </button>

                        <button
                          type="button"
                          className="btn btn-outline-dark"
                          disabled
                        >
                          {bagCount2}
                        </button>

                        <button
                          type="button"
                          className="btn btn-outline-secondary opacity-50"
                          onClick={increaseCount2}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td scope="col">ㅇ</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                      <strong>총수량</strong>
                    </td>
                    <td>
                      <strong>금액</strong>
                    </td>
                  </tr>
                  
                </tbody>
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
