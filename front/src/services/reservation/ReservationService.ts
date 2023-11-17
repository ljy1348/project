// ReservationService.ts : axios 공통 crud 함수
import IReservation from "../../types/tour/IReservation";
import http from "../../utils/http-common";

// 전체 조회 + like 검색
// 셀렉트박스 : (fullName)   입력창 : 이름 like 검색
// 셀렉트박스 : (email) 입력창      : 이메일 like 검색
//   변수 : searchSelect (fullName, email)
//   변수 : searchKeyword : 검색어
const getAll = (searchSelect:string, searchKeyword:string) => {
    return http.get<Array<IReservation>>(`/tour/search-reservation?searchSelect=${searchSelect}&searchKeyword=${searchKeyword}`);
    // return http.get<Array<IReservation>>(`/tour/search-reservation`);
  };
  
  // 상세 조회
  const get = (airlineReservationNumber:any) => {
    return http.get<IReservation>(`/tour/search-reservation/${airlineReservationNumber}`);
  };
  
  const CustomerService = {
    getAll,
    get,
  };
  
  export default CustomerService;