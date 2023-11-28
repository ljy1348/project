import React, { useEffect, useState } from "react";
import initScripts from "../../assets/js/scripts";
import initCustom from "../../assets/js/custom";
import { Accordion } from "react-bootstrap";
import { Button } from "@mui/material";
import { Form, Link } from "react-router-dom";
import { ClassNames } from "@emotion/react";
import About from "./../About";

function PassengerInfo() {
  // todo: 장바구니 물품 개수를 저장할 변수
  let [bagCount3, setBagCount3] = useState<number>(0);
  let [bagCount4, setBagCount4] = useState<number>(0);

  const [array, setArray] = useState<Array<string>>(["a"]);

  useEffect(() => {
    initScripts();
    initCustom();
  }, []);

  // todo : 여권 정보
  const onClickAdd = (idx: number) => {
    setArray([...array, "a"]);
  };
  const onClickRemove = (idx: number) => {
    if (array.length > 1) {
      setArray(array.slice(0, -1));
    }
  };

  //  todo: 증가 함수
  const increaseCount3 = () => {
    if (bagCount3 < 2) {
      // bagCount1을 1 증가시킵니다.
      const updatedCount3 = bagCount3 + 1;

      setBagCount3(updatedCount3);
    } else {
      // 이미 2 이상이면 경고 메시지를 표시합니다.
      alert("1인당 초과수화물은 2개까지 가능합니다");
    }
  };
  // 수화물

  //  todo: 감소 함수
  const decreaseCount3 = () => {
    if (bagCount3 > 0) {
      bagCount3 -= 1;
      setBagCount3(bagCount3); // 현재 감소값 저장
    }
  };

  //  todo: 증가 함수
  const increaseCount4 = () => {
    if (bagCount4 < 2) {
      // bagCount1을 1 증가시킵니다.
      const updatedCount4 = bagCount4 + 1;

      // 상태를 업데이트합니다.
      setBagCount4(updatedCount4);
    } else {
      // 이미 2 이상이면 경고 메시지를 표시합니다.
      alert("1인당 초과수화물은 2개까지 가능합니다");
    }
  };

  //  todo: 감소 함수
  const decreaseCount4 = () => {
    if (bagCount4 > 0) {
      bagCount4 -= 1;
      setBagCount4(bagCount4); // 현재 감소값 저장
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
          <Accordion.Header>탑승자 정보 #1</Accordion.Header>
          <Accordion.Body>
            {/* 탑승자 정보 입력    */}
            {array &&
              array.map((val, idx) => {
                return (
                  <form className="form" id="domesticpassengerForm">
                    <div className="row mb-2">
                      {/* <div className="col-10"> */}
                      <div>승객 </div>
                      <div className="input-group">
                        

                        <div className="col-sm-10 col-md-6 mb-3 mb-lg-2 col-lg-2">
                          <div className="was-validated">
                            <h6>Full Name</h6>
                            <input
                              name=""
                              type="type"
                              id="validation Input"
                              className="form-control"
                              required
                            />
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

                        <div className="col-sm-10 col-md-6 mb-3 mb-lg-2 col-lg-2 passengernameinfo">
                          <div className="was-validated">
                            <h6>주민등록번호</h6>
                            <input
                              type="type"
                              className="form-control"
                              id="validation Input"
                              required
                            />
                          </div>
                        </div>

                        <div className="col-sm-10 col-md-6 mb-3 mb-lg-2 col-lg-3 passengernameinfo">
                          <div className="was-validated">
                            <h6>주소</h6>
                            <input
                              type="type"
                              className="form-control"
                              id="validation Input"
                              required
                            />
                          </div>
                        </div>


                      
                        <div className="pluspassenger">
                          <button
                            type="button"
                            className="btn btn-outline-dark"
                            onClick={() => onClickAdd(idx)}
                          >
                            승객 추가
                          </button>
                        </div>
                        <div className="minuspassenger">
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
              <p>
                기본 수화물 : 휴대수화물 1 (5kg) + 위탁수화물 1(20kg) 추가없이는
                위탁 1 + 휴대 1
              </p>
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
                          onClick={decreaseCount3}
                        >
                          -
                        </button>

                        <button
                          type="button"
                          className="btn btn-outline-dark"
                          disabled
                        >
                          {bagCount3}
                        </button>

                        <button
                          type="button"
                          className="btn btn-outline-secondary opacity-50"
                          onClick={increaseCount3}
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
                          onClick={decreaseCount4}
                        >
                          -
                        </button>

                        <button
                          type="button"
                          className="btn btn-outline-dark"
                          disabled
                        >
                          {bagCount4}
                        </button>

                        <button
                          type="button"
                          className="btn btn-outline-secondary opacity-50"
                          onClick={increaseCount4}
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

export default PassengerInfo;
