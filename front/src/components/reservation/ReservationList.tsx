// 예약 조회 페이지
import { useState } from "react";
import ReservationService from "../../services/reservation/ReservationService";
import IReservation from "../../types/tour/IReservation";

function ReservationList() {
  // 변수 정의
  // reservation 배열 변수
  const [reservation, setReservation] = useState<Array<IReservation>>([]);

  // 검색어(input) 변수
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  // 전체조회
  const retrieveReservation = () => {
    if (searchKeyword === "") {
      alert("예약번호 전체 또는 회원ID를 입력해 주세요.");
      return;
    }
    // 벡엔드 매개변수 전송 : + 현재페이지(page), 1페이지당개수(pageSize)
    ReservationService.getAll( searchKeyword) // 벡엔드 전체조회요청
      .then((response: any) => {
        setReservation(response.data);
        // 로그 출력
        console.log("response", response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
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
              <div>
                <p className="input-group-text">예약 번호</p>
              </div>
              <div className="blankBox">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <input
                  type="text"
                  className="searchNumber"
                  placeholder="예약번호 6자리"
                  value={searchKeyword}
                  onChange={onChangeSearchKeyword}
                />
              </div>
            </div>

            <div className="searchButton">
              <div>
                <input
                  type="button"
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
              <th scope="col">예약 번호</th>
              <th scope="col">성인</th>
              <th scope="col">소아</th>
              <th scope="col">회원 여부</th>
              <th scope="col">마일리지 사용여부</th>
              <th scope="col">상세 조회</th>
            </tr>
          </thead>
          <tbody className="tabText">
            {reservation &&
              reservation.map((data) => (
                <tr key={data.airlineReservationNumber}>
                  <td>{data.airlineReservationNumber}</td>
                  <td>{data.adultCount}</td>
                  <td>{data.childCount}</td>
                  <td>{data.memberYn}</td>
                  <td>{data.mileUseYn}</td>
                  <td>
                    <a href={"/search-reservation/" + data.airlineReservationNumber}>
                      <a className="badge bg-success">자세히</a>
                    </a>
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
export default ReservationList;
