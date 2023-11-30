import React, { useEffect, useState } from "react";
import "../../assets/css/sm/select.css";
import axios from "axios";
import { Modal } from "react-bootstrap";

const SelectSeat = (props: any) => {

  const { totalpeople } = props;
  console.log('Total People:', totalpeople);
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
    
    const selectedSeatCount = selectedSeats.length;

    // 클릭이 가능한 남은 좌석 수
    const remainingSeats = totalpeople - selectedSeatCount;
  
    // 이미 선택된 경우 또는 남은 좌석이 없는 경우 클릭 무시
    if (value === 3 || remainingSeats <= 0) {
      alert("총정원수 보다 많은 좌석은 예약이 불가능 합니다.")
      return;
    }

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
              ySeat === 0
                ? "load"
                : ySeat === 1
                ? "enable"
                : ySeat === 2
                ? "disable"
                : "soldout"
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

    let reqSeats = new Array();

    let temp;

    // 선택한 좌석의 value를 3으로 변경
    selectedSeats.forEach((seat) => {
      setSeats((prevSeats) => {
        const updatedSeats = [...prevSeats];
        updatedSeats[seat.x][seat.y] = 3;
        reqSeats.push(String.fromCharCode(65 + seat.x) + seat.y);
        console.log(reqSeats);
        props.onSeatsSelected(reqSeats);
        console.log('SelectSeat에서 선택된 좌석:', reqSeats);

        return updatedSeats;
      });
    });
    
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/tour/checkin/sheat/1544")
      .then((response) => {
        const data = response.data;
        console.log(response);
        data.map((val: any, idx: number) => {
          const str: string = val.seatNumber;

          let x = Number(str.charCodeAt(0));
          let y = Number(str.charAt(1));

          setSeats((prevSeats) => {
            const updatedSeats = [...prevSeats];
            updatedSeats[x - 65][y] = 3;
            return updatedSeats;
          });
        });
      })
      .catch((e) => {console.log(e)});
  }, [props,totalpeople,props.modalShow]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <div className="reserve_modal_header modal-header">
            <h3 className="modal-title">좌석 선택</h3>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
      <div id="app">
        <div id="selected_seats">
          선택한 좌석번호:{" "}
          {selectedSeats.map((seat) => `(${seat.x}, ${seat.y})`)}
        </div>
        <div id="seats">{createSeats()}</div>
        <button onClick={handleReservationComplete}>예약완료</button>
      </div>
      </Modal.Body>
    </Modal>
  );
};
export default SelectSeat;
