// axios 공통함수 : 벡엔드 연동

import IReservation from "../types/reserve/IReservation";
import http from "../utils/http-common";

// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const getAll = (seatType:string, page:number, size:number) => {
  return http.get<Array<IReservation>>(`/ksm/reservation?seatType=${seatType}&page=${page}&size=${size}`);
};


// 저장함수
const create = (data:IReservation) => {
  return http.post<IReservation>("/ksm/reservation", data);
};

const ReservationService = {
  getAll,
  create,
};

export default ReservationService;
