// axios 공통함수 : 벡엔드 연동
import IWriteNotice from "../../types/writeNotice/IWriteNotice";
import http from "../../utils/http-common";


// 지우

// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const getAll = () => {
  return http.get<Array<IWriteNotice>>(`/tour/home-notice`);
};

// 상세 조회
const get = (noticeId:any) => {
  return http.get<IWriteNotice>(`/tour/admin/notice/${noticeId}`);
};

// 저장함수
const create = (data:IWriteNotice) => {
  return http.post<IWriteNotice>("/tour/write-notice", data);
};
// 수정함수
const update = (noticeId:any, data:IWriteNotice) => {
  return http.put<any>(`/tour/admin/notice/${noticeId}`, data);
};
// 삭제함수
const remove = (noticeId:any) => {
  return http.delete<any>(`/tour/admin/notice/deletion/${noticeId}`);
};

// 진욱

// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const getAllNotice = (searchSelect:string, searchKeyword:string, page:number, size:number) => {
  return http.get<Array<IWriteNotice>>(`/tour/notice?searchSelect=${searchSelect}&searchKeyword=${searchKeyword}&page=${page}&size=${size}`);
};

// 상세 조회
const getOne = (noticeId:any) => {
  return http.get<IWriteNotice>(`/tour/notice/${noticeId}`);
};

const NoticeService = {
  getAll,
  get,
  create,
  update,
  remove,
  getAllNotice,
  getOne
};

export default NoticeService;