import React, { useEffect, useState } from "react";
import "../../assets/css/sm/select.css";
import axios from "axios";

const SelectSeat = () => {
  const initialSeats: number[][] = [
    [1, 1, 1, 0, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 1],
  ];

//   좌석 테이블
//  number = 기본키
//  좌석 번호 - 문자열
//  항공기 번호
//  좌석 수만큼 반복문을 돌림 ;
//  배열에 들어가는 value값은 : 좌석 상태 : 컬럼 number


  const [seats, setSeats] = useState<number[][]>(initialSeats);
  const [selectedSeats, setSelectedSeats] = useState<
    { x: number; y: number; value: number }[]
  >([]);

  const handleSeatClick = (x: number, y: number, value: number) => {
    if (value === 1) {
      setSeats((prevSeats) => {
        const updatedSeats = [...prevSeats];
        updatedSeats[x][y] = 2;
        return updatedSeats;
      });

      setSelectedSeats((prevSelectedSeats) => [
        ...prevSelectedSeats,
        { x, y, value },
      ]);
    } else if (value === 2) {
      setSeats((prevSeats) => {
        const updatedSeats = [...prevSeats];
        updatedSeats[x][y] = 1;
        return updatedSeats;
      });

      

      setSelectedSeats((prevSelectedSeats) =>
        prevSelectedSeats.filter((seat) => !(seat.x === x && seat.y === y))
      );
    }
  };

  const createSeats = () => {
    return seats.map((xSeats, x) => (
        <div key={x} className="line" style={{ marginBottom: "5px" }}>
        {xSeats.map((ySeat, y) => (
          <div
            key={`${x}-${y}`}
            className={`seat ${
             ySeat === 0 ? "load" : ySeat === 1 ? "enable" : ySeat === 2 ? "disable" : "soldout"
            }`}
            onClick={() => handleSeatClick(x, y, ySeat)}
          ></div>
        ))}
      </div>
    ));
  };

  const handleReservationComplete = () => {
    // 예약 완료 버튼을 클릭했을 때 호출되는 함수
    setSelectedSeats([]); // 선택 목록 초기화

    let reqSeats = new Array;


    // 선택한 좌석의 value를 3으로 변경
    selectedSeats.forEach((seat) => {
      setSeats((prevSeats) => {
        const updatedSeats = [...prevSeats];
        updatedSeats[seat.x][seat.y] = 3;
        reqSeats.push(String.fromCharCode(65+seat.x)+seat.y);
        console.log(reqSeats);
        return updatedSeats;
      });
    });
  };

  useEffect(()=>{
    axios.get("http://localhost:8000/api/test")
  },[])

  return (
    <div id="app">
      <div className="hero hero-inner">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mx-auto text-center">
              <div className="intro-wrap">
                <h1 className="mb-0">예약 하다</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="selected_seats">
        선택한 좌석번호: {selectedSeats.map((seat) => `(${seat.x}, ${seat.y})`)}
      </div>
      <div id="seats">{createSeats()}</div>
      <button onClick={handleReservationComplete}>예약완료</button>

    </div>
  );
};
export default SelectSeat;
