// axios 공통함수 : 벡엔드 연동
import IWriteNotice from "../../types/tour/IWriteNotice";
import http from "../../utils/http-common";

// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const getAll = (noticeTitle:string, page: number, size: number) => {
  return http.get<Array<IWriteNotice>>(`/tour/write-notice?noticeTitle=${noticeTitle}&page=${page}&size=${size}`);
};

const getAdminNoticeAll = (noticeTitle:string, page: number, size: number) => {
  return http.get<Array<IWriteNotice>>(`/tour/admin?noticeTitle=${noticeTitle}&page=${page}&size=${size}`);
};

// 상세 조회
const get = (noticeId:any) => {
  return http.get<IWriteNotice>(`/tour/admin/write-notice/${noticeId}`);
};

// 저장함수
const create = (data:IWriteNotice) => {
  return http.post<IWriteNotice>(`/tour/admin/write-notice`, data);
};
// 수정함수
const update = (noticeId:any, data:IWriteNotice) => {
  return http.put<any>(`/tour/admin/write-notice/edit/${noticeId}`, data);
};
// 삭제함수
const remove = (noticeId:any) => {
  return http.delete<any>(`/tour/admin/write-notice/deletion/${noticeId}`);
};

const WriteNoticeService = {
  getAll,
  getAdminNoticeAll,
  get,
  create,
  update,
  remove,
};

export default WriteNoticeService;