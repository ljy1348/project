// 1:1 문의 내용

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomerService from "../../../services/customer/CustomerService";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import ICustomer from "../../../types/customer/ICustomer";

function QuestionContent() {
  const { titleId } = useParams();

  const navigate = useNavigate();

  // 유저 정보 가져오기 함수
  const { user: currentUser } = useSelector((state: RootState) => state.auth);

  const initialQuestion = {
    titleId: null,
    title: "",
    content: "",
    answerYn: "",
    memberId: currentUser?.memberId,
    insertTime: "",
    parentBid: 0,
    answer: "",
    memberName: "",
  };



  const [question, setQuestion] = useState<ICustomer>(initialQuestion);


  const getQuestion = (titleId: string) => {
    CustomerService.get(titleId)
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

  useEffect(() => {
    if (!currentUser) navigate("/login");
  }, [currentUser])


  const answerTextSave = () => {

    const data = question
    data.answerYn="Y";
    data.memberName = "관리자";

    CustomerService.create(data)
    .then((response:any) => {
      setQuestion(question);
      console.log("response", response.data);
      navigate(-1);
    })
    .catch((e: Error) => {
      console.log(e);
    });
  }

  const adminTextSave = (e:any) => {
    setQuestion({...question, answer:e.target.value})
    console.log(e.target.value);
  }

  const backBtn = () => {
    navigate("/question-board");
  }

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
          <div  className="userQuestionContentContainer">
            <div className="row">
              <div>
                <hr />
                <div>
                  <h2 className="userQuestionTitle">{question.title}</h2>
                </div>
                <hr />
                <div className="userQuestionDiv2"><div className="userQuestionDiv3"><p className="userQuestionP1">[질문]</p><p className="userQuestionTime">{question.insertTime}</p></div> <br/><br/><p className="userQuestionContent" dangerouslySetInnerHTML={{ __html:question.content.replaceAll("\n", "<br>").replaceAll(" ", "&nbsp;")}}></p></div>
                <hr />
                {currentUser?.memberAuth === "ROLE_ADMIN" && question.answerYn==="N" ?
                <div className="adminQuestionDiv2">
                  <div className="adminQuestionDiv3">
                <h2 className="adminQuestionAnswer">
                  [답변]</h2></div> <br/><br/><textarea className="adminTextInput" onChange={adminTextSave} value={question.answer}></textarea>
                
                
                <button className="userQuestionDeleteBtn" onClick={answerTextSave}>저장</button>
              </div>
                :
                question.answerYn === "N" ?  <p className="adminNoAnswer">관리자가 확인 중입니다.....</p>:
                <div className="adminQuestionDiv2"><div className="adminQuestionDiv3"><p className="adminQuestionP1">[답변]</p><p className="adminAnswerName">&nbsp;답변자 : 관리자&nbsp;</p></div> <br/><br/><p className="adminAnswer" dangerouslySetInnerHTML={{ __html:question.answer.replaceAll("\n", "<br>").replaceAll(" ", "&nbsp;")}}></p></div>}
              </div>
            </div>
            <button className="userQuestionBackBtn" onClick={backBtn}>목록으로</button>
          </div>
        </div>
      
    </>
  );
}

export default QuestionContent;
