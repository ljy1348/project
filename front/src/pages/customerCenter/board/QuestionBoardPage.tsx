// 1:1 문의 홈 화면

import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import QuestionBoardService from "../../../services/center/QuestionBoardService";
import IQboard from "../../../types/Center/IQboard";

function QuestionBoardPage() {
  // let navigate = useNavigate(titleId);

  const [question, setQuestion] = useState<Array<IQboard>>([]);

  const [searchTitle, setSearchTitle] = useState<string>("");

  // 함수 정의
  //   화면이 뜰때 실행되는 이벤트 + 감시변수
  useEffect(() => {
    retrieveQuestion(); // 전체조회 실행
  }, []);

  // 전체조회
  const retrieveQuestion = () => {
    // 벡엔드 매개변수 전송 : + 현재페이지(page), 1페이지당개수(pageSize)
    QuestionBoardService.getAll(searchTitle) // 벡엔드 전체조회요청
      .then((response: any) => {
        const { question } = response.data;
        setQuestion(question);

        // 로그 출력
        console.log("response", response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  //  검색어 수동 바인딩 함수
  const onChangeSearchTitle = (e: any) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const deleteQuestion = (titleId: number) => {
    // QuestionBoardService에서 실제로 삭제를 담당하는 메서드를 사용해야 합니다.
    // 아래는 예시로 작성한 코드입니다.
    // 실제로는 QuestionBoardService에서 제공하는 메서드를 사용해야 합니다.
    QuestionBoardService.remove(titleId)
      .then((response: any) => {
        console.log(response.data);
        // 삭제 후 전체 목록을 다시 불러오기
        retrieveQuestion();
      })
      .catch((e: Error) => {
        console.log(e);
      });
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

      <div className="row mb-5 justify-content-center">
        {/* w-50 : 크기 조정, mx-auto : 중앙정렬(margin: 0 auto), justify-content-center */}
        <div className="col-12 w-50 input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by ename"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={retrieveQuestion}
            >
              Search
            </button>
          </div>
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
                  <tr className="answer-bold-line">
                    <th scope="col">No</th>
                    <th scope="col">제목</th>
                    <th scope="col">날짜</th>
                    <th scope="col">[답변여부]</th>
                    <th scope="col">삭제</th>
                  </tr>
                </thead>
                <tbody>
                  {question &&
                    question.map((data) => (
                      // 키값 추가 않하면 react 에서 경고를 추가 : 키는 내부적으로 리액트가 rerending 할때 체크하는 값임
                      <tr className="line-sorting" key={data.titleId}>
                        <td id="notice-id-location">{data.titleId}</td>
                        <td id="notice-title-location">
                          <a
                            href={`/question-board/${data.titleId}`}
                            className="k_jull"
                          >
                            [문의내역] {data.title}
                          </a>
                        </td>
                        <td id="notice-insertTime-location">
                          {data.insertTime}
                        </td>
                        <td id="notice-writer-location">{data.answerYn}</td>
                        <td>
                          {/* 삭제 버튼을 누르면 deleteQuestion 함수가 호출됩니다. */}
                          <button
                            className="btn btn-outline-primary"
                            onClick={() => deleteQuestion(data.titleId)}
                          >
                            삭제
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
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
