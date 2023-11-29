import INotice from "../types/INotice";
import http from "../utils/http-common";

// 전체 조회
const getAll = () => {
  return http.get<Array<INotice>>(`/tour/notice`);
};


const NoticeService = {
  getAll
};

export default NoticeService;