import { Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import AdminService from '../../../services/auth/adminService';

function AdminBaggage() {
  // reservation 배열 변수
  const [baggage, setBaggage] = useState<Array<any>>([]);

  // 유저 정보 가져오기 함수
  const { user: currentUser } = useSelector((state:RootState)=> state.auth);

  
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [totalPages, setTotalPages] = useState(1);
  const pageSizes = [3,6,9]
  let searchTitle = "";
  const [searchText, setSearchText] = useState("");

  useEffect(()=>{
    retrieveBaggage()
  },[page,pageSize])

  const searchCheckin = () => {
   }

  // 전체조회
  const retrieveBaggage = () => {
    if (currentUser?.memberId)
    AdminService.getBagAll(searchText,page-1, pageSize) // 벡엔드 전체조회요청
      .then((response: any) => {
        const {content, totalPages} = response.data;
        setBaggage(content);
        setTotalPages(totalPages);
        // setPage(1);
        console.log("response", response);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const deleteBag = (reservaionNumber:number) => {
    AdminService.deleteBag(reservaionNumber)
    .then((response:any)=>{retrieveBaggage();})
    .catch((e:Error)=>{console.log(e)})
  }

  //   input 태그 수동바인딩
  const onChangeSearchKeyword = (e: any) => {
    setSearchText(e.target.value); // 화면값 -> 변수저장
  };

  return (
    <>
      <div className="searchRow">
        <div className="col-md-8 adminSearch">
              <div className="col-12 input-group mb-3">
              <div>
                <p className="input-group-text">예약 번호</p>
              </div>
                <input
                  type="text"
                  className="searchNumber"
                  placeholder="예약번호"
                  value={searchText}
                  onChange={onChangeSearchKeyword}
                />
              </div>
            </div>

            <div className="col-2 mx-auto">
              <div>
                <input
                  type="button"
                  className="btn btn-primary btn-block"
                  value="조회하기"
                  onClick={()=>{retrieveBaggage(); setPage(1)}}
                />
              </div>
        </div>
      </div>

      <div className="mt-3">
        {"Items per Page: "}
        <select onChange={(e:any)=>{setPageSize(e.target.value); setPage(1)}} value={pageSize}>
          {pageSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

      <Pagination
          className="my-3"
          count={totalPages}
          page={page}
          siblingCount={1}
          boundaryCount={1}
          variant="outlined"
          shape="rounded"
          onChange={(e:any, value:number)=>{setPage(value); console.log(value)}}
        />
        </div>
      {/* table start(본문) */}
        <table className="table">
          <thead>
            <tr className="tableText">
              <th scope="col">수하물 번호</th>
              <th scope="col">예약 번호</th>
              <th scope="col">결제 금액</th>
              <th scope="col">결제 여부</th>
              <th scope="col">취소</th>
            </tr>
          </thead>
          <tbody className="tabText">
            {baggage &&
              baggage.map((data) => (
                <tr key={data.bagNumber}>
                  <td>{data.bagNumber}</td>
                  <td>
                         {data.airlineReservationNumber}
                    </td>
                  
                  <td>
                
                    {data.bagPrice}
                    </td>
                  <td>{data.paymentYn}</td>
                  {data.deleteYn==="Y"?<td>{data.deleteYn}</td>:<td><a href='#'><span className='badge text-bg-danger' onClick={()=>{deleteBag(data.airlineReservationNumber)}}>취소</span></a></td>}
                </tr>
              ))}
          </tbody>
        </table>
      {/* table end */}
      {/* select + table 끝 */}
    </>
  );
}

export default AdminBaggage