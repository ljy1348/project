import React, { useEffect, useState } from "react";
import WriteNoticeService from '../../../../services/notice/WriteNoticeService';
import { Pagination } from "@mui/material";
import { Link } from "react-router-dom";
import IWriteNotice from "../../../../types/writeNotice/IWriteNotice";

function AdminNotice() {

  // todo: 변수 정의
// 부서 배열 변수
const [notice, setNotice] = useState<Array<IWriteNotice>>([]);
// 검색어 변수
const [searchTitle, setSearchTitle] = useState<string>("");

// todo: 공통 변수 : page(현재페이지번호), count(총페이지건수), pageSize(3,6,9 배열)
const [page, setPage] = useState<number>(1);
const [count, setCount] = useState<number>(1);
const [pageSize, setPageSize] = useState<number>(6); // 1페이지당개수
// todo: 공통 pageSizes : 배열 (셀렉트 박스 사용)
const pageSizes = [3, 6, 9];

// todo: 함수 정의
useEffect(() => {
  retrieveNotice(); // 전체 조회
}, [page, pageSize]);

//   전체조회 함수
const retrieveNotice = () => {
  WriteNoticeService.getAdminNoticeAll(searchTitle, page -1, pageSize) // 벡엔드 전체조회요청
  .then((response: any)=>{
    const { notice, totalPages } = response.data;
    setNotice(notice);
    setCount(totalPages);
    console.log("response", response.data);
  })
  .catch((e: Error)=>{
    // 벡엔드 실패시 실행됨
    console.log(e);
  })
};

//  검색어 수동 바인딩 함수
const onChangeSearchTitle = (e: any) => {
  const searchTitle = e.target.value;
  setSearchTitle(searchTitle);
};

// todo: handlePageSizeChange(공통) : pageSize 값 변경시 실행되는 함수
//  select 태그 수동 바인딩 : 화면값 -> 변수에 저장
const handlePageSizeChange = (event: any) => { 
    setPageSize(event.target.value); // 1페이지당 개수저장(3,6,9)
    setPage(1); // 현재페이지번호 : 1로 강제설정
 }

//  todo: Pagination 수동 바인딩(공통)
//  페이지 번호를 누르면 => page 변수에 값 저장
const handlePageChange = (event:any, value:number) => { 
    // value == 화면의 페이지번호
    setPage(value);
 }

return (
  <>
      {/* dname start */}
    <div className="row mb-5 justify-content-center">
      {/* w-50 : 크기 조정, mx-auto : 중앙정렬(margin: 0 auto), justify-content-center */}
      <div className="col-12 w-50 input-group mb-3">
        <input
          type="text"
          className="adminForm"
          placeholder="제목 검색"
          value={searchTitle}
          onChange={onChangeSearchTitle}
        />
        <div className="input-group-append">
          <button
            className="adminNoticeBtn"
            type="button"
            onClick={retrieveNotice}
          >
            Search
          </button>
        </div>
      </div>
    </div>
    {/* dname end */}

    

    {/* table start */}
    <div className="col-md-12">
      {/* table start */}
      <table className="table">
        <thead className="table-light">
          <tr>
            <th scope="col" id="adminTh1">제목</th>
            <th scope="col" id="adminTh2">작성자</th>
            <th scope="col" id="adminTh3">작성 일자</th>
            <th scope="col" id="adminTh4">수정 / 삭제</th>
          </tr>
        </thead>
        <tbody>
          {notice &&
            notice.map((data) => (
              <tr key={data.noticeId}>
                <td id="adminTd1">{data.noticeTitle}</td>
                <td id="adminTd2">{data.memberName}</td>
                <td id="adminTd3">{data.insertTime}</td>
                <td id="adminTd4">
                  <Link to={"/notice/edit/" + data.noticeId}>
                    <span className="badge bg-success">Edit</span>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {/* table end */}
    </div>
    {/* table end */}

    {/* paging 시작 */}
    <div className="adminNoticePageBtn">
      

      {/* 사용법 : count={1페이지당개수} , page={현재페이지번호} */}
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
    {/* paging 끝 */}
  </>
)
}

export default AdminNotice;
