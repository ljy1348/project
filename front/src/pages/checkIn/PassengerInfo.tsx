import React, { useEffect, useState } from "react";
import initScripts from "../../assets/js/scripts";
import initCustom from "../../assets/js/custom";
import { Accordion } from "react-bootstrap";
import { Button } from "@mui/material";
import { Form, Link } from "react-router-dom";
import { ClassNames } from "@emotion/react";
// import About from "./../About";

function PassengerInfo() {
  // todo: 장바구니 물품 개수를 저장할 변수
  let [bagCount2, setBagCount2] = useState<number>(0);
  

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
      setArray((prevArray) => prevArray.filter((_, i) => i !== idx));
    }
  };

  //  todo: 수화물 

  const increaseCount2 = () => {
    if (bagCount2 < 2) {
      // bagCount1을 1 증가시킵니다.
      const updatedCount2 = bagCount2 + 1;

      setBagCount2(updatedCount2);
    } else {
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
          <Accordion.Header>좌석선택 #1</Accordion.Header>
          <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          </Accordion.Body>
        </Accordion.Item>

        {/* 수화물 사전 구매  */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>수화물추가 (선택사항) #3</Accordion.Header>
          <Accordion.Body>
            <div className="bagage">
              <p>
                기본 수화물 : 휴대수화물 1 (5kg) + 위탁수화물 1(20kg) 가능 
                추가수화물 기준 : 캐리어당 20kg
              </p>
              <p>추가 수화물 1인당 2개씩 추가가능 </p>
              <table className="table">
                <thead className="test1">
                  <tr>
                    <th scope="col">예약번호</th>
                    <th scope="col">수화물 추가</th>
                    <th scope="col">금액</th>
                  </tr>
                </thead>
                <tbody>
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
                    <td className="bagprice">ㅇ</td>
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
