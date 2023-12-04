// axios 공통함수 : 벡엔드 연동

import ICustomer from "../../types/customer/ICustomer";
import http from "../../utils/http-common";


// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const getAll = (memberId:string, page:number, size:number) => {
  return http.get<Array<ICustomer>>(`/tour/question-board/${memberId}?page=${page}&size=${size}`);
};

// 검색
const getSearch = (title:string,memberId: string, page:number, size:number) => {
  return http.get<Array<ICustomer>>(`/tour/question-board?title=${title}&memberId=${memberId}&page=${page}&size=${size}`);
};

// 검색
const getSearchAdmin = (title:string, page:number, size:number) => {
  return http.get<Array<ICustomer>>(`/tour/question-board?title=${title}&page=${page}&size=${size}`);
};

// 상세 조회
const get = (titleId:any) => {
  return http.get<ICustomer>(`/tour/question-board/see/${titleId}`);
};

// 저장함수
const create = (data:ICustomer) => {
  return http.post<ICustomer>("/tour/question-board", data);
};

// 삭제함수
const remove = (titleId:any) => {
  return http.delete<any>(`/tour/question-board/deletion/${titleId}`);
};

const CustomerService = {
  getAll,
  getSearch,
  getSearchAdmin,
  get,
  create,
  remove,
};

export default CustomerService;
