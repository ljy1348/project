// 공지사항 첫화면

import { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import IWriteNotice from "../../types/writeNotice/IWriteNotice";
import NoticeService from "../../services/notice/NoticeService";

function NoticeList() {
  // 변수 정의
  // customer 배열 변수
  const [notice, setNotice] = useState<Array<IWriteNotice>>([]);
  // select 태그에 선택된 값을 저장할 변수 : 기본 (question)
  const [searchSelect, setSearchSelect] = useState<string>("tltle");
  // 검색어(input) 변수
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  // todo: 공통 페이징 변수 4개
  // todo: 공통 변수 : page(현재페이지번호), count(총페이지건수), pageSize(3,6,9 배열)
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(1);
  const [size, setSize] = useState<number>(10); // 1페이지당개수

  // todo: 함수 정의
  useEffect(() => {
    retrieveNotice(); // 전체조회 실행
  }, [page]);

  // 전체조회
  const retrieveNotice = () => {
    // 벡엔드 매개변수 전송 : + 현재페이지(page), 1페이지당개수(pageSize)
    NoticeService.getAllNotice(searchSelect, searchKeyword, page - 1, size) // 벡엔드 전체조회요청
      .then((response: any) => {
        const { notice, totalPages } = response.data;
        setNotice(notice);
        setCount(totalPages);
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

  //  todo: Pagination 수동 바인딩(공통)
  const handlePageChange = (event: any, value: number) => {
    setPage(value);
  };
  
  return (
    <div>
      {/* 테마 디자인 적용 : 컨택트 소스 */}
      {/* 테마 제목 시작 */}
      <div>
        <div className="userNoticeDiv1">
          <select
            className="userNoticeSelectBox"
            onChange={onChangeSearchSelect}
            value={searchSelect}
          >
            <option key="제목 + 내용" value="제목 + 내용">
              제목 + 내용
            </option>
            <option key="제목" value="제목">
              제목
            </option>
            <option key="내용" value="내용">
              내용
            </option>
          </select>

          <input
            type="text"
            className="userNoticeTextInput"
            placeholder="검색어를 입력하세요."
            value={searchKeyword}
            onChange={onChangeSearchKeyword}
          />
          <button
            className="userNoticeSearchBtn"
            type="button"
            onClick={retrieveNotice}
          >
            검색
          </button>
        </div>
      </div>

      {/* 테마 제목 끝 */}

      {/* 내용 */}
      <div className="container">
        <div>
          <table className="table">
            <thead>
              <tr className="jwNoticeTr">
                <th scope="col">No</th>
                <th scope="col">제목</th>
                <th scope="col">날짜</th>
                <th scope="col">작성자</th>
              </tr>
            </thead>
            <tbody>
              {notice &&
                notice.map((data) => (
                  <tr key={data.noticeId}>
                    <td className="jwNoticeNumber">{data.noticeId}</td>
                    <td className="jwNoticeTitle">
                      <a href={`/notice/${data.noticeId}`} className="jwNoticeA">
                        {data.noticeTitle}
                      </a>
                    </td>
                    <td className="jwNoticeTime">{data.insertTime}</td>
                    <td className="jwNoticeWriter">{data.memberName}</td>
                  </tr>
                ))}
            </tbody>
          </table>

          {/* table end */}
        </div>

        {/* 페이지네이션 시작 */}
        <div className="noticePageBtn">
          <Pagination
            className="my-3"
            count={count}
            page={page}
            siblingCount={1}
            boundaryCount={1}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
          />
        </div>
        {/* 페이지네이션 끝 */}
      </div>
      {/* table end */}
    </div>
  );
}

export default NoticeList;
