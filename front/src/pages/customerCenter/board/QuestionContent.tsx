// 1:1 문의 내용

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IQboard from "../../../types/Center/IQboard";
import QuestionBoardService from "../../../services/center/QuestionBoardService";

function QuestionContent() {
  const { titleId } = useParams();
  const initialQuestion = {
    titleId: "",
    title: "",
    content: "",
    answerYn: "",
    memberId: "",
    insertTime: "",
    paraentBid: 0,
    answer: "",
  };
  const [question, setQuestion] = useState<IQboard>(initialQuestion);

  const getQuestion = (titleId: string) => {
    QuestionBoardService.get(titleId)
      .then((response: any) => {
        setQuestion(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  useEffect(() => {
    if (titleId) {
      getQuestion(titleId);
    }
  }, [titleId]);
  return (
    <>
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

      <div className="untree_co-section">
        {/* <div className="col-md-12">
          <div>
            <p className="answer-text-big">1대1 문의하기</p>
            <p className="answer-text-small">나의 문의/답변 내역</p>
          </div>
          </div> */}
          <div className="container">
            <div className="row">
              <div>
                <hr />
                <div>
                  <h2 className="notice-content-title">
                    [문의 내역] {question.title}
                  </h2>
                </div>
                <hr />
                <p className="notice-content-date">{question.insertTime}</p>
                <div className="notice-content-content">{question.content}</div>
                <hr />
                <div>
                  <h2 className="notice-content-answer">
                    [답변] {question.answer}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      
    </>
  );
}

export default QuestionContent;
