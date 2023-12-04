import React, { useEffect, useState } from "react";
// import NoticeService from "../../services/NoticeService";
// import INotice from "../../types/INotice";
import INotice from "../../types/notice/INotice";
import NoticeService from "../../services/notice/NoticeService";

function Notice() {
  // 공지사항 객체
  const [notice, setNotice] = useState<Array<INotice>>([]);

  // select 태그에 선택된 값을 저장할 변수 : 기본 (question)
  const [searchSelect, setSearchSelect] = useState<string>("tltle");
  // 검색어(input) 변수
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  // todo: 공통 페이징 변수 4개
  // todo: 공통 변수 : page(현재페이지번호), count(총페이지건수), pageSize(3,6,9 배열)
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(1);
  const [size, setSize] = useState<number>(10); // 1페이지당개수

  // 함수 정의
  // TODO: 1) 컴포넌트가 mounted 될때 한번만 실행됨 : useEffect(() => {실행문},[])
  // TODO: 2) 컴포넌트의 변수값이 변할때 실행됨 : useEffect(() => {실행문},[감시변수])
  useEffect(() => {
    retrieveNotice(); // 전체 조회
  }, [page]);

  //   전체조회 함수
  const retrieveNotice = () => {
    NoticeService.getAllNotice(searchSelect, searchKeyword, page - 1, size) // 벡엔드 전체조회요청
      .then((response: any) => {
        const { notice, totalPages } = response.data;
        setNotice(notice);
        setCount(totalPages);

        // 로그 출력
        console.log("response", response.data.notice);
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
              notice.map((data, idx) => (
                idx < 5 &&(
                <tr className="line-sorting" key={data.noticeId}>
                  <td id="notice-id-location">{data.noticeId}</td>
                  <td id="notice-title-location"><a href={`/notice/${data.noticeId}`}>{data.noticeTitle}</a></td>
                  <td id="notice-insertTime-location">{data.insertTime}</td>
                  <td id="notice-writer-location">{data.memberName}</td>
                </tr>
                )
              ))}
          </tbody>
        </table>
        
        {/* table end */}
      </div>

        {/* <div className="col-md-12 row">
          <table className="table">
            <thead>
              <tr className="homeNotice1">
                <th scope="col">No</th>
                <th scope="col" id="home-notice-title">
                  제목
                </th>
                <th scope="col">날짜</th>
                <th scope="col">작성자</th>
              </tr>
            </thead>
            <tbody>
              {notice &&
                notice.map(
                  (data, idx) =>
                    idx < 5 && (
                      <tr className="homeNotice2" key={data.noticeId}>
                        <td id="homeNoticeNumber">{data.noticeId}</td>
                        <td id="homeNoticeTitle">
                          <a href={`/notice/${data.noticeId}`} className="homeNoticeTitleA">
                            {data.noticeTitle}
                          </a>
                        </td>
                        <td id="homeNoticeTime">{data.insertTime}</td>
                        <td id="homeNoticeWriter">{data.memberName}</td>
                      </tr>
                    )
                )}
            </tbody>
          </table> */}

      </div>
      {/* table end */}
    </>
  );
}

export default Notice;
