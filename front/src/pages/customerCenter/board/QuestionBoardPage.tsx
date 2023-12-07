// 1:1 문의 홈 화면

import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import IQboard from "../../../types/Center/IQboard";
import CustomerService from "../../../services/customer/CustomerService";

import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { Pagination } from "@mui/material";

function QuestionBoardPage() {

  const [question, setQuestion] = useState<Array<IQboard>>([]);

  const [title, setTitle] = useState<string>("");

  const navi = useNavigate();

  // 유저 정보 가져오기 함수
  const { user: currentUser } = useSelector((state: RootState) => state.auth);

  // todo: 공통 페이징 변수 4개
  // todo: 공통 변수 : page(현재페이지번호), count(총페이지건수), pageSize(3,6,9 배열)
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(1);
  const [size, setSize] = useState<number>(10); // 1페이지당개수

  // 함수 정의
  //   화면이 뜰때 실행되는 이벤트 + 감시변수
  useEffect(() => {
    retrieveQuestion(); // 전체조회 실행
  }, [page]);

  // 전체조회
  const retrieveQuestion = () => {
    if (currentUser?.memberId != undefined && currentUser?.memberId != null)
    CustomerService.getAll(currentUser.memberId, page - 1, size)
      .then((response: any) => {
        const { question, totalPages } = response.data;
        setQuestion(question);
        setCount(totalPages);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  // 검색
  const searchTitleContaining = () => {
    if (currentUser?.memberId != undefined && currentUser?.memberId != null)
    CustomerService.getSearch(title, currentUser.memberId, page -1, size)
    .then((response: any) => {
      const { question, totalPages } = response.data;
        setQuestion(question);
        setCount(totalPages);
    })
    .catch((e: Error) => {
      console.log(e);
    });
  }

  useEffect(() => {
    if (!currentUser) navi("/login");
  }, [currentUser])
  

  
  //  검색어 수동 바인딩 함수
  const onChangeSearchTitle = (e: any) => {
    const title = e.target.value;
    setTitle(title);
  };

  const deleteQuestion = (titleId: number) => {
    // QuestionBoardService에서 실제로 삭제를 담당하는 메서드를 사용해야 합니다.
    // 아래는 예시로 작성한 코드입니다.
    // 실제로는 QuestionBoardService에서 제공하는 메서드를 사용해야 합니다.
    CustomerService.remove(titleId)
      .then((response: any) => {
        // 삭제 후 전체 목록을 다시 불러오기
        retrieveQuestion();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const handlePageChange = (event: any, value: number) => {
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

      <div>
        {/* w-50 : 크기 조정, mx-auto : 중앙정렬(margin: 0 auto), justify-content-center */}
        <div className="userQuestionDiv1">
          <input
            type="text"
            className="userQuestionInput"
            placeholder="제목"
            value={title}
            onChange={onChangeSearchTitle}
          />

          <button
            className="userQuestionSearchBtn"
            type="button"
            onClick={searchTitleContaining}
          >
            검색
          </button>
        </div>
      </div>

      {/* 본문 시작 */}
      <div className="untree_co-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div>
                <p className="answer-text-big">1대1 문의하기</p>
                <p className="answer-text-small">나의 문의/답변 내역</p>
              </div>

              {/* table start(본문) */}
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col" className="userQuestionTd1">제목</th>
                    <th scope="col">문의 일자</th>
                    <th scope="col">답변 여부</th>
                    <th scope="col">삭제</th>
                  </tr>
                </thead>
                <tbody>
                  {question &&
                    question.map((data) => (
                      <tr key={data.titleId}>
                        <td>{data.titleId}</td>
                        <td className="userQuestionTd1">
                          <a href={`/question-board/${data.titleId}`}>{data.title}</a>
                        </td>
                        <td>{data.insertTime.split(' ')[0]}</td>
                        {data.answerYn === "N" && currentUser?.memberAuth === "ROLE_ADMIN" ? <td><a href={`/question-board/${data.titleId}`}><button className="userQuestionDeleteBtn">답변달기</button></a></td>:<td>{data.answerYn}</td>}
                        <td>
                          <button
                            className="userQuestionDeleteBtn"
                            onClick={() => deleteQuestion(data.titleId)}
                          >
                            삭제
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
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
              {/* table end */}
            </div>

            {/* table start(본문) */}

            {/* table end */}

            <div className="container">
              <div className="answer-careful-notes">
                <p className="answer-text-middle">작성 시 유의사항</p>
                <ul className="answer-carful-list">
                  <li>
                    코로나19 및 비운항으로 인한 항공권 환불 문의는 구매하신
                    발권처로 문의하여 주시기 바랍니다.
                  </li>
                  <li>
                    [비회원 작성하기]의 경우 답변은 등록하신 이메일로 회신되며,
                    홈페이지에서 본인 작성글 확인은 불가합니다.
                  </li>
                  <li>
                    고객님의 소중한 말씀은 공휴일을 제외한 평일 근무시간에
                    담당자에게 전달되며 주말 및 공휴일에 문의하신 내용은 정상
                    근무일에 처리되기 때문에 답변이 다소 지연될 수 있음을 양해해
                    주시기 바랍니다.
                  </li>
                  <li>
                    욕설, 폭언, 성희롱, 근거 없는 음해, 타인의 인격 모욕, 명예를
                    훼손하는 표현이 포함되거나 당사와 무관한 사안으로 고객의
                    말씀을 남겨주실 경우 예고없이 임의로 답변 제외될 수 있음을
                    안내드립니다.
                  </li>
                  <li>
                    계좌정보, 카드정보, 연락처 등 중요한 개인정보는 당사가 별도
                    요청한 경우를 제외하고는 내용상에 기재하지 않도록
                    요청드립니다.
                  </li>
                </ul>
              </div>
            </div>

            {/* 자주찾는 질문 바로가기 문구 */}
            <div className="shortcuts-often-question">
              문의 사항은 자주 찾는 질문에서 먼저 확인하여 주시기 바랍니다.
              <a href={"/question"}>
                <button className="shortcuts-often-question-btn">
                  자주찾는 질문 바로가기 ▷
                </button>
              </a>
            </div>

            {/* 자주찾는 질문 바로가기 버튼 */}

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
