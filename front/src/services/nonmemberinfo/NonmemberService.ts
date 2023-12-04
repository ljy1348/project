// axios 공통함수 : 벡엔드 연동


import INonMemberInfo from "../../types/nonmemberInfo/INonMembersInfo";
import http from "../../utils/http-common";




// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const getAll = (userName:string, page:number, size:number) => {
  return http.get<Array<INonMemberInfo>>(`/tour/nonmemberinfo?userName=${userName}&page=${page}&size=${size}`);
};


// 저장함수
const create = (data:INonMemberInfo) => {
  return http.post<INonMemberInfo>("/tour/nonmemberinfo", data);
};


const NonmemberService = {
  getAll,
  create,
};

export default NonmemberService;
