import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import IPayment from '../../../types/payment/IPayment';
import PaymentService from '../../../services/payment/paymentService';
import { Pagination } from '@mui/material';
import { Link } from 'react-router-dom';
import AdminService from '../../../services/auth/adminService';
import ReservationService from '../../../services/reservation/ReservationService';
import MyareaModal from '../../modal/MyareaModal';
import SearchNonMember from '../../modal/SearchNonMember';
import ISearchReservation from '../../../types/searchReservation/ISearchReservation';

function AdminPayment() {
// 변수 정의
  // reservation 배열 변수
  const [payment, setPayment] = useState<Array<any>>([]);

  // 유저 정보 가져오기 함수
  const { user: currentUser } = useSelector((state:RootState)=> state.auth);

  // 검색어(input) 변수
  const [airlinePaymentNumber, setAirlinePaymentNumber] = useState<any>("");
  const [nonMemberModalShow, setNonMemberModalShow] = useState(false);
  const [reservation, setReservation] = useState<ISearchReservation>();
  
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [totalPages, setTotalPages] = useState(1);
  const pageSizes = [3,6,9]

  useEffect(()=>{
    retrievePayment()
  },[page,pageSize])

  // 전체조회
  const retrievePayment = () => {
    if (currentUser?.memberId)
    AdminService.getPayAll(page-1, pageSize) // 벡엔드 전체조회요청
      .then((response: any) => {
        const {content, totalPages} = response.data;
        setPayment(content);
        setTotalPages(totalPages);
        console.log("response", response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const searchPayment = () => { 
    if (currentUser?.memberId)
    AdminService.SearchPayAdmin(airlinePaymentNumber, page-1, pageSize)
    .then((response: any) => {
      const {content, totalPages} = response.data;
      setPayment(content);
      setTotalPages(totalPages);
      setPage(1);
      console.log("response", response.data);
    })
    .catch((e: Error) => {
      console.log(e);
    });
   }

  const deletePay = (payId:number) => { 
    PaymentService.deletePay(payId)
    .then((response: any) => {
      retrievePayment()
    })
    .catch((e: Error) => {
      console.log(e);
    });
   }

   console.log(Number('a'));

  //   input 태그 수동바인딩
  const onChangeSearchKeyword = (e: any) => {
    setAirlinePaymentNumber(e.target.value); // 화면값 -> 변수저장
  };

  const handleNonMember = (startAirport:any, finalAirport:any, memberName:any, airlineReservationNumber:any) => { 

    const data = {
      startAirport : startAirport,
      finalAirport : finalAirport,
      memberName : memberName,
      airlineReservationNumber : airlineReservationNumber
    }

    console.log(data);

    ReservationService.findNonMember(data)
    .then((response:any)=>{console.log(response); setReservation(response.data); setNonMemberModalShow(true)})
    .catch((e:Error)=>{console.log(e)})
  }

  return (
    <>
      <div className="searchRow">
        <div className="col-md-8 offset-2">
              <div className="col-12 input-group mb-3">
              <div>
                <p className="input-group-text">예약 번호</p>
              </div>
                <input
                  type="text"
                  className="searchNumber"
                  placeholder="예약 번호"
                  value={airlinePaymentNumber}
                  onChange={onChangeSearchKeyword}
                />
              </div>
            </div>

            <div className="searchButton">
              <div>
                <input
                  type="button"
                  className="btn btn-primary btn-block"
                  value="조회하기"
                  onClick={searchPayment}
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
              <th scope="col">결제 번호</th>
              <th scope="col">출발 예약 번호</th>
              <th scope="col">도착 예약 번호</th>
              <th scope="col">마일리지 사용 여부</th>
              <th scope="col">결제 금액</th>
              <th scope="col">아이디</th>
              <th scope="col">예약자</th>
              <th scope="col">예약 취소</th>
              <th scope="col">취소 여부</th>
              
            </tr>
          </thead>
          <tbody className="tabText">
            {payment &&
              payment.map((data) => (
                <tr key={data.payId}>
                  <td>{data.payId}</td>
                  <td>
                  <Link to="#" onClick={()=>{handleNonMember(data.startAirport, data.finalAirport, data.userName, data.startReservationNumber)}}>
                    {data.startReservationNumber}
                  </Link>
                    </td>
                  
                  <td>
                    
                  <Link to="#" onClick={()=>{handleNonMember(data.finalAirport, data.startAirport, data.userName, data.finalReservationNumber)}}>
                    {data.finalReservationNumber}
                  </Link>
                    </td>
                  <td>{data.milePrice}</td>
                  <td>{data.productPrice}</td>
                  <td>{data.memberId}</td>
                  <td>{data.userName}</td>
                  <td>{data.deleteYn === "N" && <a href='#'><span className='badge text-bg-danger' onClick={()=>{deletePay(data.payId)}}>취소</span></a>}</td>
                  <td>{data.deleteYn}</td>

                </tr>
              ))}
          </tbody>
        </table>
                <SearchNonMember
            show={nonMemberModalShow}
            onHide={() => {setNonMemberModalShow(false);
            }}
            nonMemberModalShow={setNonMemberModalShow}
            reservation={reservation}
          />
      {/* table end */}
      {/* select + table 끝 */}
    </>
  );
}

export default AdminPayment