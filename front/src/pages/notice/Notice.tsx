import React, { useEffect, useState } from "react";
import NoticeService from "../../services/NoticeService";
import INotice from "../../types/INotice";
import { Link } from "react-router-dom";

function Notice() {
  
  const [notice, setNotice] = useState<Array<INotice>>([]);

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
      <div className="row mb-3"></div>

      <div className="container" id="notice-bottom-gap">
        <div className="col-md-12 row">
          <table className="table" id="table-bottom-gap">
            <thead>
              <tr className="top-line-bold">
                <th scope="col">No</th>
                <th scope="col">제목</th>
                <th scope="col">날짜</th>
                <th scope="col">작성자</th>
              </tr>
            </thead>
            <tbody>
              {notice &&
                notice.map((data) => (
                  <tr className="line-sorting" key={data.noticeId}>
                    <td id="notice-id-location">{data.noticeId}</td>
                    <td id="notice-title-location">{data.noticeTitle}</td>
                    <td id="notice-insertTime-location">{data.insertTime}</td>
                    <td id="notice-writer-location">{data.noticeWriter}</td>
                  </tr>
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
