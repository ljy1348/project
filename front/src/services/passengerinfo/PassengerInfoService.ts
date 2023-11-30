import INonMemberInfo from "../../types/nonmemberInfo/INonMembersInfo";
import http from "../../utils/http-common";



// 저장함수
const create = (data:INonMemberInfo) => {
    return http.post<INonMemberInfo>("/tour/passengerinfo", data);
};

const PassengerInfoService = {
  create
};
  

export default PassengerInfoService;