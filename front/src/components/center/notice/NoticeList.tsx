// NoticeList.tsx : rfce
import { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import { Link } from "react-router-dom";
import NoticeService from "../../../services/center/NoticeService";
import INotice from "../../../types/Center/INotice";

function NoticeList() {
  // 변수 정의
  // customer 배열 변수
  const [notice, setNotice] = useState<Array<INotice>>([]);
  // select 태그에 선택된 값을 저장할 변수 : 기본 (question)
  const [searchSelect, setSearchSelect] = useState<string>("tltle");
  // 검색어(input) 변수
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  // todo: 공통 페이징 변수 4개
  // todo: 공통 변수 : page(현재페이지번호), count(총페이지건수), pageSize(3,6,9 배열)
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10); // 1페이지당개수

  // todo: 함수 정의
  useEffect(() => {
    retrieveNotice(); // 전체조회 실행
  }, [page]);

  // 전체조회
  const retrieveNotice = () => {
    // 벡엔드 매개변수 전송 : + 현재페이지(page), 1페이지당개수(pageSize)
    NoticeService.getAll(searchSelect, searchKeyword, page - 1, pageSize) // 벡엔드 전체조회요청
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
  //  페이지 번호를 누르면 => page 변수에 값 저장
  const handlePageChange = (event: any, value: number) => {
    // value == 화면의 페이지번호
    setPage(value);
  };
  return (
    <div>
      {/* 테마 디자인 적용 : 컨택트 소스 */}
      {/* 테마 제목 시작 */}
      <div className="col-md-8 offset-2">
        <div className="col-12 input-group mb-3">
          <select
            className="form-select"
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
            className="form-control"
            placeholder="검색어를 입력하세요."
            value={searchKeyword}
            onChange={onChangeSearchKeyword}
          />

          <div className="input-group-append">
            <button
              className="btn btn-danger"
              type="button"
              onClick={retrieveNotice}
            >
              검색
            </button>
          </div>
        </div>
      </div>

      {/* 테마 제목 끝 */}

      {/* 내용 */}

      {/* table start(본문) */}
      <div className="col-12">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">number</th>
              <th scope="col">제목</th>
            </tr>
          </thead>
          <tbody>
            {notice &&
              notice.map((data) => (
                // 키값 추가 않하면 react 에서 경고를 추가 : 키는 내부적으로 리액트가 rerending 할때 체크하는 값임
                <tr key={data.noticeId}>
                  <td>
                    <Link to={`/notice/${data.noticeId}`}>
                      {data.noticeTitle}
                    </Link>
                  </td>
                  <td>{data.insertTime}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {/* table end */}

      {/* 페이지네이션 시작 */}

      <div className="col-md-4 offset-5">
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
  );
}

export default NoticeList;
