// 1:1 문의 화면

import React, { useEffect, useState } from "react";
import ICenter from "../../../types/Center/IQboard";

import { Link } from "react-router-dom";
import QuestionBoardService from "../../../services/center/QuestionBoardService";
import IQboard from "../../../types/Center/IQboard";

function QuestionBoardPage() {
  // 변수 정의
  // qna 배열 변수
  const [question, setQuestion] = useState<Array<IQboard>>([]);
  // select 태그에 선택된 값을 저장할 변수 : 기본 (question)
  const [searchSelect, setSearchSelect] = useState<string>("question");

  // todo: 공통 페이징 변수 4개
  // todo: 공통 변수 : page(현재페이지번호), count(총페이지건수), pageSize(3,6,9 배열)
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(3); // 1페이지당개수

  // 함수 정의
  //   화면이 뜰때 실행되는 이벤트 + 감시변수
  useEffect(() => {
    retrieveQuestion(); // 전체조회 실행
  }, [page, pageSize]);

  // 전체조회
  const retrieveQuestion = () => {
    // 벡엔드 매개변수 전송 : + 현재페이지(page), 1페이지당개수(pageSize)
    QuestionBoardService.getAll(
      searchSelect,

      page - 1,
      pageSize
    ) // 벡엔드 전체조회요청
      .then((response: any) => {
        const { question, totalPages } = response.data;
        setQuestion(question);
        setCount(totalPages);
        // 로그 출력
        console.log("response", response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  //  todo: Pagination 수동 바인딩(공통)
  //  페이지 번호를 누르면 => page 변수에 값 저장
  const handlePageChange = (event: any, value: number) => {
    // value == 화면의 페이지번호
    setPage(value);
  };

  return (
    <div>
      {/* 테마 */}
      <div className="hero hero-customer">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mx-auto text-center">
              <div className="intro-wrap">
                <h1 className="mb-0">1:1 문의</h1>
                <p className="text-white">문의해주세요.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 테마 끝 */}

      {/* question end */}

      {/* 본문 시작 */}
      <div className="untree_co-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {/* page control start(페이징 html) */}

              {/* page control end */}

              {/* table start(본문) */}
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">번호</th>
                    <th scope="col">제목</th>
                    <th scope="col">날짜</th>
                    <th scope="col">[답변여부]</th>
                  </tr>
                </thead>
                <tbody>
                  {question &&
                    question.map((data) => (
                      // 키값 추가 않하면 react 에서 경고를 추가 : 키는 내부적으로 리액트가 rerending 할때 체크하는 값임
                      <tr key={data.titleId}>
                        <td>{data.title}</td>
                        <td>{data.insertTime}</td>
                        <td>{data.answerYn}</td>

                        {/* <td>
                    <Link to={"/qna/" + data.answerYn}>
                      <span className="badge bg-success">Edit</span>
                    </Link>
                  </td> */}
                      </tr>
                    ))}
                </tbody>
              </table>
              {/* table end */}
            </div>
            {/* 본문 끝 */}

            {/* 페이지네이션 시작 */}

            <div className="button1">
              <div className="gray_box3">
                <Link
                  to="/addquestion-board"
                  className="btn btn-primary"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                >
                  작성하기
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionBoardPage;
