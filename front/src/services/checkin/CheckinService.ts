// axios 공통함수 : 벡엔드 연동

import ICheckin from "../../types/checkin/ICheckin";
import IReservation from "../../types/reservation/IReservation";
import http from "../../utils/http-common";



// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const getAll = (airlinereservationnumber: any) => { 
    // 조회요청 : .get("/url")
    // 사용법 : http.get<리턴타입>("url")
    return http.get<Array<IReservation>>(`/tour/checkin/${airlinereservationnumber}`);
 }



// 상세 조회
const get = (airlinereservationnumber: any) => {
  return http.get<IReservation>(`/tour/boardingpass/${airlinereservationnumber}`);
};

// 상세 조회
const dtogetAll = (airlinereservationnumber:number) => {
  return http.get(`/tour/checkin2/${airlinereservationnumber}`);
};

// 저장 함수
const create = (data:Array<ICheckin>) => {
  return http.post<Array<ICheckin>>("/tour/checkin", data);
};

const getSeat = (id:number) => {
  return http.get("/tour/checkin/sheat/"+id);
};

const CheckinService = {
  dtogetAll,
  getAll,
  get,
  create,
  getSeat

};

export default CheckinService;