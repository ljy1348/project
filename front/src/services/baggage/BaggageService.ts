import IBaggage from "../../types/baggage/IBaggage";
import ICheckin from "../../types/checkin/IResOperation";
import IPassport from "../../types/passport/IPassport";
import http from "../../utils/http-common";



// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const getAll = (bagNumber: number) => { 
    // 조회요청 : .get("/url")
    // 사용법 : http.get<리턴타입>("url")
    return http.get<IBaggage>(`/passport?bagNumber=${bagNumber}`);
 }

// 상세 조회
const get = (bagYn:string) => {
  return http.get<IBaggage>(`/passport/${bagYn}`);
};

const create = (data:IBaggage) => {
    return http.post<IBaggage>(`/passport`, data);
}

const BaggageService = {
  getAll,
  get,
  create

};

export default BaggageService;