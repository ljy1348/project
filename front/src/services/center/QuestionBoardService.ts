// axios 공통함수 : 벡엔드 연동
import ICenter from "../../types/Center/IQboard";
import http from "../../utils/http-common";

// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const getAll = (titleId:string, page:number, size:number) => {
  return http.get<Array<ICenter>>(`/addquestion-board/addquestion-board?titleId=${titleId}&page=${page}&size=${size}`);
};

// 상세 조회
const get = (titleId:any) => {
  return http.get<ICenter>(`/cuCenter/cu-center/${titleId}`);
};

// 저장함수
const create = (data:ICenter) => {
  return http.post<ICenter>("/cuCenter/cu-center", data);
};
// 수정함수
const update = (titleId:any, data:ICenter) => {
  return http.put<any>(`/cuCenter/cu-center/${titleId}`, data);
};
// 삭제함수
const remove = (titleId:any) => {
  return http.delete<any>(`/cuCenter/cu-center/deletion/${titleId}`);
};

const QuestionBoardService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default QuestionBoardService;
