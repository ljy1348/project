// axios 공통함수 : 벡엔드 연동


import IBoardingPass from "../../types/boardingPass/IBoardingPass";
import http from "../../utils/http-common";



// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const getAll = (airlinereservationnumber: any) => { 
    // 조회요청 : .get("/url")
    // 사용법 : http.get<리턴타입>("url")
    return http.get<Array<IBoardingPass>>(`/tour/boardingpass/${airlinereservationnumber}`);
 }




const CheckinService = {
  getAll,

};

export default CheckinService;