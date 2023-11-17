// 예약 조회 페이지
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReservationService from "../../services/reservation/ReservationService";
import IReservation from "../../types/tour/IReservation";

function SearchList() {
  // 변수 정의
  // customer 배열 변수
  const [reservation, setReservation] = useState<Array<IReservation>>([]);
  // select 태그에 선택된 값을 저장할 변수 : 기본 (question)
  const [searchSelect, setSearchSelect] = useState<string>(
    "airlineReservationNumber"
  );
  // 검색어(input) 변수
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  // 전체조회
  const retrieveReservation = (event:any) => {

    if(searchKeyword === "") {
      event?.preventDefault(); // 다른곳으로 이동하는것 막기
      alert("예약번호 또는 회원ID를 입력해 주세요.");
      return;
    }

    console.log(searchKeyword)
    // 벡엔드 매개변수 전송 : + 현재페이지(page), 1페이지당개수(pageSize)
    ReservationService.getAll(searchSelect, searchKeyword) // 벡엔드 전체조회요청
      .then((response: any) => {
        const { reservation } = response.data;
        setReservation(reservation);
        // 로그 출력
        console.log("response", response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  //   select 태그 수동바인딩
  const onChangeSearchSelect = (e: any) => {
    setSearchSelect(e.target.value); // 화면값 -> 변수저장
  };

  //   input 태그 수동바인딩
  const onChangeSearchKeyword = (e: any) => {
    setSearchKeyword(e.target.value); // 화면값 -> 변수저장
  };

  return (
    <>
      <div className="searchRow">
        <div>
          <div>
            <div>
              <div>
                <select
                  className="searchSelect"
                  onChange={onChangeSearchSelect}
                  value={searchSelect}
                >
                  <option
                    key="airlineReservationNumber"
                    value="airlineReservationNumber"
                  >
                    예약 번호
                  </option>
                  <option key="userId" value="userId">
                    회원 ID
                  </option>
                </select>
              </div>

              <div className="blankBox">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>

              <div>
                <input
                  name=""
                  type="string"
                  className="searchNumber"
                  placeholder="예약번호 또는 회원ID"
                  value={searchKeyword}
                  onChange={onChangeSearchKeyword}
                />
              </div>
            </div>

            <div className="searchButton">
              <div>
                <input
                  type="submit"
                  className="btn btn-primary btn-block"
                  value="조회하기"
                  onClick={retrieveReservation}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* table start(본문) */}
      <table className="table">
        <thead>
          <tr className="tableText">
            <th scope="col">회원 ID</th>
            <th scope="col">예약 번호</th>
            <th scope="col">항공사</th>
            <th scope="col">출발 일자</th>
            <th scope="col">도착 일자</th>
          </tr>
        </thead>
        <tbody>
          {reservation &&
            reservation.map((data) => (
              // 키값 추가 않하면 react 에서 경고를 추가 : 키는 내부적으로 리액트가 rerending 할때 체크하는 값임
              <tr key={data.userId}>
                <td>{data.airlineReservationNumber}</td>
                <td>{data.airline}</td>
                <td>{data.departure}</td>
                <td>{data.arrival}</td>
                <td>
                  <Link to={"/reservation/" + data.airlineReservationNumber}>
                    <span className="badge bg-success">Edit</span>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {/* table end */}
      {/* select + table 끝 */}
    </>
  );
}
export default SearchList;
