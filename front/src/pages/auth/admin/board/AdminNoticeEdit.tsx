import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import WriteNoticeService from '../../../../services/notice/WriteNoticeService';

function AdminNoticeEdit() {

  // 회원 ID 변수
  const { user: currentUser } = useSelector((state:RootState)=> state.auth);

  //   저장버튼
  const [submitted, setSubmitted] = useState<boolean>(false);

  // 객체 초기화
  const initNotice = {
    noticeId: "",
    noticeWriter: "",
    noticeContent: "",
    noticeTitle: "",
    memberId: "",
    insertTime: "",
    updateTime: "",
    memberName: "",
  }

  // 객체 변수
  const [notice, setNotice] = useState(initNotice)

  // 회원 ID 받는 변수
  const {id} = useParams();

  useEffect(()=>{
    if (id != undefined && id)
      setNotice({...notice, noticeId:id})
  },[])

  // 저장
  const saveNotice = () => {
    // 임시 부서 객체

    var data = {
      noticeTitle: notice.noticeTitle,
      noticeContent: notice.noticeContent,
      noticeWriter: "",
      memberId: "",
      insertTime: notice.insertTime,
      updateTime: notice.updateTime,
      memberName: notice.memberName
    };
    if (currentUser?.memberId) data.memberId = currentUser.memberId
    if (currentUser?.memberName) data.noticeWriter = currentUser.memberName

    WriteNoticeService.create(data)
      .then((response: any) => {
        setSubmitted(true);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  // 새폼 보여주기 함수 : 변수값 변경 -> 화면 자동 갱신(리액트 특징)
  const newNotice = () => {
    setNotice(initNotice); // 부서 초기화
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
        <div className="adminEditSubmitText">
          <h4>공지사항 추가 완료</h4>
          <button className="adminEditSubmitBtn" onClick={newNotice}>
            추가하기
          </button>
        </div>
      ) : (
        <>
      <form >
        <input
          placeholder="공지사항 제목"
          name="text"
          id="editor1"
          value={notice.noticeTitle}
          onChange={onChangeTitle}
        ></input>
        <textarea
          placeholder="공지사항 내용"
          name="text"
          id="editor2"
          value={notice.noticeContent}
          onChange={onChangeContent}
        ></textarea>
        <p>
            
        </p>
      </form>
          <button className="adminEditBtn" value="전송" onClick={saveNotice}>
            저장
          </button>
          </>
      )}
    </>
  );
}

export default AdminNoticeEdit