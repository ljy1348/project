// ReservationService.ts : axios 공통 crud 함수

import IReserve from "../../types/reserve/IReserve";
import ISearchReservation from "../../types/searchReservation/ISearchReservation";
import http from "../../utils/http-common";


// 지우

// 회원ID 기준 조회 + 검색
const getAll = (airlineReservationNumber: any, memberId:string) => {
  return http.get<Array<ISearchReservation>>(`/tour/search-reservation?airlineReservationNumber=${airlineReservationNumber}&memberId=${memberId}`);
};

// 회원ID 기준 조회
const gett = (memberId: string) => {
  return http.get<Array<ISearchReservation>>(`/tour/search-reservation/${memberId}`);
}

// 상세 조회
const get = (airlineReservationNumber: any) => {

  // return http.get<IReservation>(`/tour/search-reservation/payment/${airlineReservationNumber}`);

  return http.get<ISearchReservation>(`/tour/search-reservation/seeReservation/${airlineReservationNumber}`);
};


// 상민

// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const getAllSeat = (seatType:string, page:number, size:number) => {
  return http.get<Array<IReserve>>(`/tour/reservation?seatType=${seatType}&page=${page}&size=${size}`);
};

// 저장함수
const create = (data:IReserve) => {
  return http.post<IReserve>("/tour/reservation", data);
};

const ReservationService = {
  getAll,
  gett,
  get,
  create,
  getAllSeat
};
  
export default ReservationService;