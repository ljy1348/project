import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import INotice from "../../types/notice/INotice";
import NoticeService from "../../services/notice/NoticeService";

function Notice() {

  // 페이지 이동
  const navigate = useNavigate();
  
  
  const { noticeId } = useParams();
  const initialNotice = {
    noticeId: 0,
    noticeWriter: "",
    noticeContent: "",
    noticeTitle: "",
    memberId: "",
    insertTime: "",
    updateTime: "",
    memberName: "",
  };
  const [a , setA] = useState<string>("");

  const [notice, setNotice] = useState<INotice>(initialNotice);

  const getNotice = (noticeId: any) => {
    NoticeService.getOne(noticeId)
      .then((response: any) => {
        setNotice(response.data);
        setA(response.data.noticeContent);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (noticeId) getNotice(noticeId)
  }, [noticeId]);

  const onChangeBackList = () => {
    navigate("/notice");
  };

  return (
    <>
      <div className="noticeContainer">
        {notice ? (
          
          <div className="notice-content-container">
            <h1 className="noticeTitle">{notice.noticeTitle}</h1>
            <div className="noticeDiv">
            <div className="notice-info">
              <p className="noticeInsertTime">작성일: {notice.insertTime}</p>
              <p className="noticeMemberName">작성자: {notice.memberName}</p>
            </div>
            <div className="noticeContent1">
            <div className="noticeContent2"><p dangerouslySetInnerHTML={{ __html:a.replaceAll("\n", "<br>").replaceAll(" ", "&nbsp;")}}></p></div>
            </div>
            </div>
            </div>
        ) : (
          <>
          <br/>
            <h1 className="noticeTitle">삭제된 게시글입니다.</h1>
          <br/>
          </>
        )}
      </div>
      <button
        className="noticeBackBtn"
        type="button"
        onClick={onChangeBackList}
      >
        목록으로
      </button>
    </>
  );
}

export default Notice;
