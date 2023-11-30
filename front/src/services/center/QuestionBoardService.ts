// 1:1 문의
import IQboard from "../../types/Center/IQboard";
import http from "../../utils/http-common";

// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const getAll = (title:string) => {
  return http.get<Array<IQboard>>(`/tour/question-board?title=${title}`);
};

// 상세 조회
const get = (titleId:any) => {
  return http.get<IQboard>(`/tour/question-board/${titleId}`);
};

// 저장함수
const create = (data:IQboard) => {
  return http.post<IQboard>("/tour/question-board", data);
};

// 삭제함수
const remove = (titleId:number) => {
  return http.delete<any>(`/tour/question-board/deletion/${titleId}`);
};

const QuestionBoardService = {
  getAll,
  get,
  create,
  remove,
};

export default QuestionBoardService;
