import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import INotice from "../../../types/Center/INotice";
import NoticeService from "../../../services/center/NoticeService";


function Notice() {
  const { noticeId } = useParams();
  const initialNotice = {
    noticeId: "",
    noticeWriter: "",
    noticeContent: "",
    noticeTitle: "",
    memberId: "",
    insertTime: "",
  };
  const [notice, setNotice] = useState<INotice>(initialNotice);

  const getNotice = (noticeId: string) => {
    NoticeService.get(noticeId)
      .then((response: any) => {
        setNotice(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (noticeId) {
      getNotice(noticeId);
    }
  }, [noticeId]);

  return (
    <div className="notice-container">
      {notice ? (
        <div className="notice-content-container">
          <h1 className="notice-title">{notice.noticeTitle}</h1>
          <div className="notice-info">
            <p className="insert-time">작성일: {notice.insertTime}</p>
          </div>
          <div className="notice-content">{notice.noticeContent}</div>
        </div>
      ) : (
        <div className="col-6 mx-auto">
          <br />
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}

export default Notice;