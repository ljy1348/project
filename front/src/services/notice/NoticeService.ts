// axios 공통함수 : 벡엔드 연동
import INotice from "../../types/tour/INotice";
import http from "../../utils/http-common";

// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const getAll = (noticeTitle:string) => {
  return http.get<Array<INotice>>(`/tour/write-notice?noticeTitle=${noticeTitle}`);
};

// 상세 조회
const get = (noticeId:any) => {
  return http.get<INotice>(`/tour/write-notice/${noticeId}`);
};

// 저장함수
const create = (data:INotice) => {
  return http.post<INotice>("/tour/write-notice", data);
};
// 수정함수
const update = (noticeId:any, data:INotice) => {
  return http.put<any>(`/tour/write-notice/${noticeId}`, data);
};
// 삭제함수
const remove = (noticeId:any) => {
  return http.delete<any>(`/tour/write-notice/deletion/${noticeId}`);
};

const NoticeService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default NoticeService;