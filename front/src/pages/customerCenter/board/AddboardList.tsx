// 1:1 문의작성양식

import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import CustomerService from "../../../services/customer/CustomerService";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { useEffect } from 'react';
import ICustomer from "../../../types/customer/ICustomer";


function AddboardList() {

  const navi = useNavigate();

  // 유저 정보 가져오기 함수
  const { user: currentUser } = useSelector((state: RootState) => state.auth);

  const initialQuestion = {
    titleId: null,
    title: "",
    content: "",
    answerYn: "N",
    memberId: currentUser?.memberId,
    insertTime: "",
    parentBid: 0,
    answer: "",
    memberName: ""
  };



  const [question, setQuestion] = useState<ICustomer>(initialQuestion);


  useEffect(() => {
    if (!currentUser) navi("/login");
  }, [currentUser])

  // 제목 저장
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setQuestion({ ...question, [name]: value });
  };

  // 내용 저장
  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      parentBid: question.parentBid,
      titleId: null,
      memberName: null,
    };
    CustomerService.create(data) // 저장 요청

      .then((response: any) => {
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  

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
                className="userQustionTitleInput"
                id="title"
                name="title"
                value={question.title}
                onChange={handleTitleChange}
                placeholder="문의 제목을 입력하세요"
              />
            </div>
          </div>
          <div className="form-group">
            <label className="add-answer-content-gap">내용</label>
            <textarea
              className="userQuestionContentInput"
              name="content"
              value={question.content}
              onChange={handleContentChange}
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

        <div className="container">
          <div className="answer-careful-notes">
            <p className="answer-text-middle">개인정보 수집/이용 유의사항</p>
            <ul className="answer-carful-list">
              <li>1. 개인정보의 수집/이용 목적: 1:1문의 고객응대</li>
              <li>
                2. 수집하는 개인정보의 항목
                <br />
                &nbsp;&nbsp; 1) 필수항목 : 이름, 전화번호, 이메일, 문의내용
                <br />
                &nbsp;&nbsp; 2) 문의유형 별 추가항목
                <br />
                &nbsp;&nbsp;&nbsp;- 항공권 영문 정정 : 예약번호, 탑승자명, 변경할 영문성명
                <br />
                &nbsp;&nbsp;&nbsp;- 수하물 파손 : 출발지, 도착지, 탑승일
              </li>
              <li>3. 개인정보의 보유 및 이용 기간 : 관련 법령에 따름
                 동의를 거부할 수 있으며, 거부하실 경우 1:1 문의가 불가합니다.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddboardList;
