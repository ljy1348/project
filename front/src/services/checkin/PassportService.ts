import IPassport from "../../types/passport/IPassport";
import http from "../../utils/http-common";

// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const getAll = (passportId : any) => {
  return http.get<Array<IPassport>>(`/passport/${passportId}`);
};



// 저장함수
const create = (data:IPassport) => {
    return http.post<IPassport>("/passport", data);
  };

  const PassportService = {
    getAll,
    create
  };

  export default PassportService;