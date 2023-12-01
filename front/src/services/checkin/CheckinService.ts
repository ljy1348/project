// axios 공통함수 : 벡엔드 연동

import ICheckin from "../../types/checkin/IResOperation";
import IResOperation from "../../types/checkin/IResOperation";
import IPassport from "../../types/passport/IPassport";
import IReservation from "../../types/reservation/IReservation";
import http from "../../utils/http-common";



// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const getAll = (airlinereservationnumber: any) => { 
    // 조회요청 : .get("/url")
    // 사용법 : http.get<리턴타입>("url")
    return http.get<Array<IReservation>>(`/tour/checkin/${airlinereservationnumber}`);
 }

// 상세 조회
const get = (checkYn:string) => {
  return http.get<IReservation>(`/tour/checkin/${checkYn}`);
};


// 저장 함수
const create = (data:Array<ICheckin>) => {
  return http.post<Array<ICheckin>>("/tour/checkin", data);
};








const CheckinService = {
  getAll,
  get,
  create,

};

export default CheckinService;