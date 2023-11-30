// axios 공통함수 : 벡엔드 연동
import INotice from "../../types/Center/INotice";
import http from "../../utils/http-common";

// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const getAll = (
  searchSelect: string,
  searchKeyword: string,
  page: number,
  size: number
) => {
  return http.get<Array<INotice>>(
    `/tour/notice2?searchSelect=${searchSelect}&searchKeyword=${searchKeyword}&page=${page}&size=${size}`
  );
};

// 상세 조회
const get = (noticeId: any) => {
  return http.get<INotice>(`/tour/notice2/${noticeId}`);
};

const NoticeService = {
  getAll,
  get,
};

export default NoticeService;
