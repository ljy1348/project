// 공지사항 내용

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
    <div>
      <hr />
      <div>
        <h2 className="notice-content-title">{notice.noticeTitle}</h2>
      </div>
      <hr />
      <p className="notice-content-date">{notice.insertTime}</p>
      <div className="notice-content-content">{notice.noticeContent}</div>
    </div>
  );
}

export default Notice;
