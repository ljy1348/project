// ReservationService.ts : axios 공통 crud 함수

import IReservation from "../../types/reservation/IReservation";
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


// 유빈 
const getChseat = (airlineReservationNumber: any) => {
  return http.get<IReservation>(`/tour/boardingpass/${airlineReservationNumber}`);
}

// 상세 조회
const get2 = (airlineReservationNumber: any) => {

  // return http.get<IReservation>(`/tour/search-reservation/payment/${airlineReservationNumber}`);

  return http.get<ISearchReservation>(`/tour/search-reservation/checkInReservation/${airlineReservationNumber}`);
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

// 수정 함수
const update = (airlineReservationNumber:any, data:IReserve) => {
  return http.put<any>(`/tour/reservation/${airlineReservationNumber}`, data);
};

// 주영
// 삭제 함수
const deleteRoundTrip = (start:number|string, final:number|string) => {
  return http.delete(`/tour/deleteRoundTrip/${start}/${final}`);
}

const findNonMember = (data:any) => {
  return http.post(`/tour/search-reservation/non-member`, data);
}

const ReservationService = {
  getAll,
  gett,
  getChseat,
  get,
  create,
  getAllSeat,
  deleteRoundTrip,
  findNonMember,
  update,
  get2
};
  
export default ReservationService;