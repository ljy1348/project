import React, { useState } from "react";
import IWriteNotice from "../../types/tour/IWriteNotice";
import WriteNoticeService from "../../services/notice/WriteNoticeService";

function WriteNotice() {

  // todo: 객체 초기화
  const initialNotice = {
    noticeId: null,
    noticeTitle: "",
    noticeContent: "",
    memberId:"admin"
  };

  //   공지사항 객체
  const [notice, setNotice] = useState<IWriteNotice>(initialNotice);

  //   저장버튼
  const [submitted, setSubmitted] = useState<boolean>(false);

  // 출력 변수
  const [a , setA] = useState<string>("");

  // 저장
  const saveNotice = () => {
    // 임시 부서 객체
    var data = {
      noticeTitle: notice.noticeTitle,
      noticeContent: notice.noticeContent,
      memberId:"admin"
    };
    WriteNoticeService.create(data)
      .then((response: any) => {
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  // 새폼 보여주기 함수 : 변수값 변경 -> 화면 자동 갱신(리액트 특징)
  const newNotice = () => {
    setNotice(initialNotice); // 부서 초기화
    setSubmitted(false);  // submitted 변수 초기화
  };

  const onChangeTitle = (e: any) => {
    setNotice({ ...notice, noticeTitle: e.target.value });
  };
  const onChangeContent = (e: any) => {
    setNotice({ ...notice, noticeContent: e.target.value });
  };

  return (
    <>
    {submitted ? (
        <div className="col-6 mx-auto">
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newNotice}>
            Add
          </button>
        </div>
      ) : (
        <>
      <form >
        <h1>공지사항</h1>
        <input
          name="text"
          id="editor"
          value={notice.noticeTitle}
          onChange={onChangeTitle}
        ></input>
        <textarea
          name="text"
          id="editor"
          value={notice.noticeContent}
          onChange={onChangeContent}
        ></textarea>
        <p>
            
        </p>
      </form>
        <span>
            <div dangerouslySetInnerHTML={{ __html:a.replaceAll("\n", "<br>").replaceAll(" ", "&nbsp;")}}></div>
            </span>
        
          <button value="전송" onClick={saveNotice}>
            전송
          </button>
          </>
      )}
    </>
  );
}

export default WriteNotice;
