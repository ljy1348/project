import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import IWriteNotice from '../../../../types/writeNotice/IWriteNotice';
import { useState } from 'react';
import NoticeService from '../../../../services/notice/NoticeService';
import { useEffect } from 'react';

function AdminNoticeFix() {

    // todo: 변수 정의
    // 전체조회 페이지에서 전송한 기본키(noticeId)
    const { noticeId } = useParams();
    // 강제페이지 이동 함수
    let navigate = useNavigate();
  
    // 객체 초기화(상세조회 : 기본키 있음)
    const initialNotice = {
        noticeId: 0,
        noticeTitle: "",
        noticeContent: "",
        noticeWriter: "",
        memberId: "",
        insertTime: "",
        updateTime: "",
        memberName: ""
    };
  
    // 수정될객체
    const [notice, setNotice] = useState<IWriteNotice>(initialNotice);
    // 화면에 수정 성공에 메세지 찍기 변수
    const [message, setMessage] = useState<string>("");
  
    // todo: 함수 정의
    // 상세조회 함수
    const getNotice = (noticeId: any) => {
      NoticeService.get(noticeId)         // 벡엔드로 상세조회 요청
        .then((response: any) => {
          setNotice(response.data);
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    };
  
    // 화면이 뜰때 실행되는 이벤트 + noticeId 값이 바뀌면 실행
    useEffect(() => {
      if (noticeId) getNotice(noticeId);
    }, [noticeId]);
  
    // input 공지 제목 태그 수동 바인딩
    const handleInputChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setNotice({ ...notice, [name]: value });
    };

    // input 공지 내용 태그 수동 바인딩
    const handleInputChangeContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setNotice({ ...notice, [name]: value });
      };
    
  
    // 수정 함수
    const updateNotice = () => {
      NoticeService.update(notice.noticeId, notice) // 벡엔드로 수정요청
        .then((response: any) => {
          console.log(response.data);
          navigate("/admin")
          alert("정상적으로 수정되었습니다.");
        })
        .catch((e: Error) => {
          console.log(e);
        });
    };
  
    // 삭제함수
    const deleteNotice = () => {
      NoticeService.remove(notice.noticeId) // 벡엔드로 삭제요청
        .then((response: any) => {
          console.log(response.data);
          alert("정상적으로 삭제되었습니다.");
          // 페이지 이동
          navigate("/admin");
        })
        .catch((e: Error) => {
          console.log(e);
        });
    };
  
    return (
      <>
        <>
          {notice ? (
            <div className="col-6 mx-auto">
              <form>
                <div className="row g-3 align-items-center mb-3">
                  <div className="col-9">
                    <input
                      type="text"
                      id="noticeTitle"
                      className="adminNoticeFix1"
                      value={notice.noticeTitle}
                      onChange={handleInputChangeTitle}
                      placeholder="제목"
                      name="noticeTitle"
                    />
                  </div>
                </div>
  
                <div className="row g-3 align-items-center mb-3">
                  <div className="col-9">
                    <textarea
                      id="noticeContent"
                      className="adminNoticeFix2"
                      value={notice.noticeContent}
                      onChange={handleInputChangeContent}
                      placeholder="내용"
                      name="noticeContent"
                    />
                  </div>
                </div>
              </form>
  
              <div className="row g-3 mt-3 mb-3">
                <button
                  onClick={deleteNotice}
                  className="btn btn-outline-danger ms-3 col"
                >
                  Delete
                </button>
  
                <button
                  type="submit"
                  onClick={updateNotice}
                  className="btn btn-outline-success ms-2 col"
                >
                  Update
                </button>
              </div>
  
              {message && (
                <p className="alert alert-success mt-3 text-center">{message}</p>
              )}
            </div>
          ) : (
            <div className="col-6 mx-auto">
              <br />
              <p>Please click on a Dept...</p>
            </div>
          )}
        </>
      </>
    );
  }

export default AdminNoticeFix