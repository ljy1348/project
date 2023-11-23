//QnaService.ts : axios 공통 함수 (벡엔드 CRUD 연동 함수)
// axios 공통함수 : 백엔드 연동

import IOperationinfo from "../types/IOperationinfo";
import http from "../utils/http-common";

// 전체 조회 + Like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
// 셀렉트박스 : (question) 입력창 : 질문 like 검색
// 셀렉트박스 : (questioner) 입력창 : 질문자 like 검색
//      변수 : searchSelect (question,questioner)
//      변수 : searchKeyword: 검색어

const getAll = (
  StartAirport: string,
  FinalAirport: string,
  StartDate: string,
  OperationDate: string,
  page: number,
  pagesize: number
) => {
  return http.get<Array<IOperationinfo>>(
    `/ksm/reserve?startAirport=${encodeURIComponent(
      StartAirport
    )}&page=${page}&pagesize=${pagesize}&finalAirport=${encodeURIComponent(
      FinalAirport
    )}&operationDate=${encodeURIComponent(
      OperationDate
    )}&sysdate=${encodeURIComponent(StartDate)}`
  );
};

// 상세 조회
const get = (operationId: any) => {
  return http.get<IOperationinfo>(`/ksm/reserve/${operationId}`);
};

const OperationService = {
  getAll,
  get,
  //   create,
  //   update,
  //   remove,
};

export default OperationService;
