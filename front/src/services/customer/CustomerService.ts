// axios 공통함수 : 벡엔드 연동

import ICustomer from "../../types/customer/ICustomer";
import http from "../../utils/http-common";


// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const getAll = (titleId:string, page:number, size:number) => {
  return http.get<Array<ICustomer>>(`/tour/addquestion-board?titleId=${titleId}&page=${page}&size=${size}`);
};

// 상세 조회
const get = (titleId:any) => {
  return http.get<ICustomer>(`/tour/addquestion-board/${titleId}`);
};

// 저장함수
const create = (data:ICustomer) => {
  return http.post<ICustomer>("/tour/addquestion-board", data);
};
// 수정함수
const update = (titleId:any, data:ICustomer) => {
  return http.put<any>(`/tour/cu-center/${titleId}`, data);
};
// 삭제함수
const remove = (titleId:any) => {
  return http.delete<any>(`/tour/cu-center/deletion/${titleId}`);
};

const CustomerService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default CustomerService;
