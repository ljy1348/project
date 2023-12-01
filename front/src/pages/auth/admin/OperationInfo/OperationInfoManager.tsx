import React, { useEffect, useState } from 'react'
import IUser from '../../../../types/auth/IMember';
import { Pagination } from '@mui/material';
import AdminService from '../../../../services/auth/adminService';
import { Link } from 'react-router-dom';
import IOperationinfo from '../../../../types/operationInfo/IOperationinfo';

function OperationInfoManager({setSelectTab, setDataId}:{setSelectTab:any, setDataId:any}) {
  // 부서 배열 변수
  const [dept, setDept] = useState<Array<IOperationinfo>>([]);
  // 검색어 변수
  const [search, setSearch] = useState<string>("");
  const [select, setSelect] = useState<string>("operationId");

  // todo: 공통 변수 : page(현재페이지번호), count(총페이지건수), pageSize(3,6,9 배열)
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(3); // 1페이지당개수
  // todo: 공통 pageSizes : 배열 (셀렉트 박스 사용)
  const pageSizes = [3, 6, 9];

  // todo: 함수 정의
  // 1) 컴포넌트가 mounted 될때 한번만 실행됨 : useEffect(() => {실행문},[])
  // 2) 컴포넌트의 변수값이 변할때 실행됨 : useEffect(() => {실행문},[감시변수])
  useEffect(() => {
    retrieveDept(); // 전체 조회
  }, [page, pageSize]);

  //   전체조회 함수
  const retrieveDept = () => {
    // 벡엔드 매개변수 전송 : + 현재페이지(page), 1페이지당개수(pageSize)
    AdminService.getOperationAll(search, select, page-1, pageSize)
    .then((response:any)=>{console.log(response)
        const {data, totalPages} = response.data;
    setDept(data);
    setCount(totalPages);
    // setPage(1);
    })
    .catch((e:Error)=>{console.log(e)})

  };

  //  검색어 수동 바인딩 함수
  const onChangeSearchDname = (e: any) => {
    setSearch(e.target.value);
  };

  // todo: handlePageSizeChange(공통) : pageSize 값 변경시 실행되는 함수
  //  select 태그 수동 바인딩 : 화면값 -> 변수에 저장
  const handlePageSizeChange = (event: any) => { 
      setPageSize(event.target.value); // 1페이지당 개수저장(3,6,9)
      setPage(1); // 현재페이지번호 : 1로 강제설정
   }

  //  todo: Pagination 수동 바인딩(공통)
  //  페이지 번호를 누르면 => page 변수에 값 저장
  const handlePageChange = (event:any, value:number) => { 
      // value == 화면의 페이지번호
      setPage(value);
   }

   const onChangeSelect = (e:any) => {
    setSelect(e.target.value);
   }

  return (
    // 여기
    <>
      {/* 제목 start */}
      {/* 제목 end */}

      {/* dname start */}
      <div className="row mb-5 justify-content-center">
        {/* w-50 : 크기 조정, mx-auto : 중앙정렬(margin: 0 auto), justify-content-center */}
        <div className="col-8 w-50 input-group mb-3 mt-5">
          <select value={select} onChange={onChangeSelect} className='me-3'>
            <option value="operationId">ID</option>
            <option value="startAirport">출발공항</option>
            <option value="finalAirport">도착공항</option>
            <option value="airline">항공사</option>
            <option value="flightName">편명</option>
          </select>
          <input
            type="text"
            className="form-control"
            placeholder="Search by dname"
            value={search}
            onChange={onChangeSearchDname}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={()=> {retrieveDept(); setPage(1)}}
            >
              Search
            </button>
            <div>
            
            <button className="btn btn-outline-secondary ms-3" onClick={()=>{setSelectTab("항공기 추가")}}>추가</button>
            </div>
          </div>
        </div>
      </div>
      {/* dname end */}

      {/* paging 시작 */}
      <div className="mt-3 " >
        {"Items per Page: "}
        <select onChange={handlePageSizeChange} value={pageSize}>
          {pageSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        {/* 사용법 : count={1페이지당개수} , page={현재페이지번호} */}
        <div className=''>

        <Pagination
          className="my-3 col-6"
          count={count}
          page={page}
          siblingCount={1}
          boundaryCount={1}
          variant="outlined"
          shape="rounded"
          onChange={handlePageChange}
          
          />
            
          </div>
      </div>
      
      {/* paging 끝 */}

      {/* table start */}
      <div className="col-md-12">
        {/* table start */}
        <table className="table">
          <thead className="table-light">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">항공사</th>
              <th scope="col">항공기</th>
              <th scope="col">출발시간</th>
              <th scope="col">도착시간</th>
              <th scope="col">출발공항</th>
              <th scope="col">도착공항</th>
              <th scope="col">운행시작</th>
              <th scope="col">운행종료</th>
              <th scope="col">운임</th>
              <th scope="col">국제</th>
              <th scope="col">액션</th>
            </tr>
          </thead>
          <tbody>
            {dept &&
              dept.map((data, idx) => {
                const startDate = data.startDate.toString().split("T");
                const finalDate = data.finalDate.toString().split("T");
                return (<tr key={idx}>
                  <td>{data.operationId}</td>
                  <td>{data.airline}</td>
                  <td>{data.flightName}</td>
                  <td>{data.startTime}</td>
                  <td>{data.finalTime}</td>
                  <td>{data.startAirport}</td>
                  <td>{data.finalAirport}</td>
                  <td>{startDate[0]}</td>
                  <td>{finalDate[0]}</td>
                  <td>{data.price}</td>
                  <td>{data.domesticInternational}</td>
                  <td>
                    <Link to="#" onClick={()=>{setSelectTab("항공기 상세"); setDataId(data.operationId)}}>
                      <span className="badge bg-success">Edit</span>
                    </Link> 
                  </td>
                </tr>)
})}
          </tbody>
        </table>
        {/* table end */}
      </div>
      {/* table end */}
    </>
  )
}

export default OperationInfoManager