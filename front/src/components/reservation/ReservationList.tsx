// 예약 조회 페이지
import { useState } from "react";
import ReservationService from "../../services/reservation/ReservationService";
import IReservation from "../../types/tour/IReservation";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

function ReservationList() {
  // 변수 정의
  // reservation 배열 변수
  const [reservation, setReservation] = useState<Array<IReservation>>([]);

  // 유저 정보 가져오기 함수
  const { user: currentUser } = useSelector((state:RootState)=> state.auth);

  // 검색어(input) 변수
  const [airlineReservationNumber, setAirlineReservationNumber] = useState<any>("");

  // 전체조회
  const retrieveReservation = () => {
    if (airlineReservationNumber <= 99999 || airlineReservationNumber >= 200000) {
      alert("예약번호 6 자리를 입력해 주세요.");
      return;
    }
    if (currentUser?.memberId != undefined && currentUser?.memberId != null)
    // 벡엔드 매개변수 전송
    ReservationService.getAll(airlineReservationNumber, currentUser.memberId) // 벡엔드 전체조회요청
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
    setAirlineReservationNumber(e.target.value); // 화면값 -> 변수저장
  };

  return (
    <>
      <div className="searchRow">
        <div className="col-md-8 offset-2">
              <div className="col-12 input-group mb-3">
              <div>
                <p className="input-group-text">예약 번호</p>
              </div>
              {/* <div className="blankBox">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div> */}
                <input
                  type="text"
                  className="searchNumber"
                  placeholder="예약번호 6자리"
                  value={airlineReservationNumber}
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

      {/* table start(본문) */}
        <table className="table">
          <thead>
            <tr className="tableText">
              <th scope="col">예약 번호</th>
              <th scope="col">성인</th>
              <th scope="col">소아</th>
              <th scope="col">회원 여부</th>
              <th scope="col">체크인 여부</th>
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
                  <td>{data.checkYn}</td>
                  <td>{data.mileUseYn}</td>
                  <td>
                    <a href={"/search-reservation/seeReservation/" + data.airlineReservationNumber}>
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