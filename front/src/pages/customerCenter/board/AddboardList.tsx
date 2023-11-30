// 1:1 문의작성양식

import React, { useState } from "react";

import IQboard from "../../../types/Center/IQboard";
import { useNavigate } from "react-router-dom";
import QuestionBoardService from "../../../services/center/QuestionBoardService";

function AddboardList() {
  const initialQuestion = {
    titleId: null,
    title: "",
    content: "",
    memberId: "11",
    insertTime: "11",
    answerYn: "N",
    answer: "",
    paraentBid: 0,
  };

  const [question, setQuestion] = useState<IQboard>(initialQuestion);

  // todo: input 태그에 수동 바인딩
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setQuestion({ ...question, [name]: value });
  };

  // 저장 함수
  const saveQuestion = () => {
    var data = {
      title: question.title,
      content: question.content,
      memberId: question.memberId,
      insertTime: question.insertTime,
      answerYn: question.answerYn,
      answer: question.answer,
      paraentBid: question.paraentBid,
    };

    QuestionBoardService.create(data) // 저장 요청
      .then((response: any) => {
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const navi = useNavigate();

  const Onclinkev = () => {
    saveQuestion();
    navi(`/question-board`);
  };

  return (
    <>
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
      {/* 테마 */}

      <div className="gray_box">
        {/* 폼 표시 */}
        <form className="k_box">
          <div className="form_group">
            <div className="k_title">
              <label className="add-answer-title-gap">제목</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={question.title}
                onChange={handleInputChange}
                placeholder="문의 제목을 입력하세요"
              />
            </div>
            {/* <div className="k_id">
              <label className="add-answer-id-gap">회원 ID</label>
              <input
                type="text"
                className="form-control"
                id="memberId"
                name="memberId"
                value={question.memberId}
                onChange={handleInputChange}
                placeholder="회원 ID를 입력하세요"
              />
            </div> */}
          </div>
          <div className="form-group">
            <label className="add-answer-content-gap">내용</label>
            <input
              className="form-control"
              id="content"
              name="content"
              value={question.content}
              onChange={handleInputChange}
              placeholder="문의 내용을 입력하세요"
              style={{ height: "200px" }}
            />
          </div>
        </form>

        <div className="button1">
          <button
            type="button"
            className="btn btn-primary"
            onClick={Onclinkev}
            style={{ width: "10%", padding: "10px", borderRadius: "5px" }}
          >
            작성
          </button>
        </div>

        <div className="gray_box1">
          <h3>작성 시 유의사항</h3>
          <ul className="list_type2">
            <li>
              코로나19 및 비운항으로 인한 항공권 환불 문의는 구매하신 발권처로
              문의하여 주시기 바랍니다.
            </li>
            <li>
              고객님의 소중한 말씀은 공휴일을 제외한 평일 근무시간에 담당자에게
              전달되며 주말 및 공휴일에 문의하신 내용은 정상 근무일에 처리되기
              때문에 답변이 다소 지연될 수 있음을 양해해 주시기 바랍니다.
            </li>
            <li>
              욕설, 폭언, 성희롱 근거 없는 음해, 타인의 인격 모욕, 명예를
              회손하는 표현이 포함되거나 당사와 무관한 사안으로 고객의 말씀을
              남겨주실 경우 예고없이 임의로 답변 제외될 수 있음을 안내드립니다.
            </li>
            <li>
              계좌정보, 카드정보, 연락처 등 중요한 개인정보는 당사가 별도 요청한
              경우를 제외하고는 내용상에 기재하지 않도록 요청드립니다.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default AddboardList;
