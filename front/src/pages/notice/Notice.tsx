import React, { useEffect, useState } from "react";
import NoticeService from "../../services/NoticeService";
import INotice from "../../types/INotice";

function Notice() {
  const [notice, setNotice] = useState<Array<INotice>>([]);
  // 검색어 변수

  // 함수 정의
  // TODO: 1) 컴포넌트가 mounted 될때 한번만 실행됨 : useEffect(() => {실행문},[])
  // TODO: 2) 컴포넌트의 변수값이 변할때 실행됨 : useEffect(() => {실행문},[감시변수])
  useEffect(() => {
    retrieveNotice(); // 전체 조회
  }, []);

  //   전체조회 함수
  const retrieveNotice = () => {
    NoticeService.getAll() // 벡엔드 전체조회요청
      .then((response: any) => {
        setNotice(response.data);
        // 로그 출력
        console.log("response", response.data);
      })
      .catch((e: Error) => {
        // 벡엔드 실패시 실행됨
        console.log(e);
      });
  };

  return (
    // 여기
    <>
     
     {/* 추천 여행지, 공지사항 사이 공간 */}
      <div className="row mb-3">
      </div>

      <div className="container" id="notice-bottom-gap">
      <div className="col-md-12 row">
        <table className="table">
          <thead>
            <tr className="top-line-bold">
              <th scope="col">No</th>
              <th scope="col" id="home-notice-title">제목</th>
              <th scope="col">날짜</th>
              <th scope="col">작성자</th>
            </tr>
          </thead>
          <tbody>
            {notice &&
              notice.map((data, index) => (
                // 리스트 3개만 나올 수 있게 조건문 걸기
                index < 5 &&(
                <tr key={data.noticeId}>
                  <td id="home-noticeId">{data.noticeId}</td>
                  <td id="home-notice-title-location">{data.noticeTitle}</td>
                  <td>{data.insertTime}</td>
                  <td>{data.noticeWriter}</td>
                </tr>
                )
              ))}
          </tbody>
        </table>
        
        {/* table end */}
      </div>
      </div>
      {/* table end */}
    </>
  );
}

export default Notice;
