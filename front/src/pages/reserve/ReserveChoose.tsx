import React, { useEffect, useRef, useState } from "react";
import initScripts from "../../assets/js/scripts";
import initCustom from "../../assets/js/custom";
import MyareaModal from "../modal/MyareaModal";
import ForiareaModal from "../modal/ForiareaModal";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Pagination } from "@mui/material";
import IOperationinfo from "../../types/operationInfo/IOperationinfo";
import OperationService from "../../services/operation/OperationService";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Button, Overlay } from "react-bootstrap";


/* eslint-disable */
function ReserveChoose(props: any) {
  const { user: currentUser } = useSelector((state: RootState) => state.auth);

  const [show, setShow] = useState(false);
  const target = useRef(null);

  const [show3, setShow3] = useState(false);
  const target3 = useRef(null);

  // todo: 공통 페이징 변수 4개
  // todo: 공통 변수 : page(현재페이지번호), count(총페이지건수), pageSize(3,6,9 배열)
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(1);
  // todo: 공통 변수 : page(현재페이지번호), count(총페이지건수), pageSize(3,6,9 배열)
  const [page2, setPage2] = useState<number>(1);
  const [count2, setCount2] = useState<number>(1);
  //   조회 함수
  const {
    selectedAbbr,
    selectedFori,
    adultCount,
    childCount,
    seatClass,
    startDate,
    endDate,
  } = useParams();

  // operationinfo 배열 변수 정의
  const [operationinfo, setOperationinfo] = useState<Array<IOperationinfo>>([]);
  const [operationinfo2, setOperationinfo2] = useState<Array<IOperationinfo>>(
    []
  );

  const daterange = useRef<HTMLInputElement>(null);
  console.log("operationinfo", operationinfo);
  // 출도착 공항 설정
  const [selectedAbbr2, setSelectedAbbr] = useState<string>(selectedAbbr || "");
  const [selectedFori2, setSelectedFori] = useState<string>(selectedFori || "");

  // 출발 날짜
  const [startDate2, setStartDate] = useState(startDate);
  const [endDate2, setEndDate] = useState(endDate);

  // 인원
  const [adultCount2, setAdultCount] = useState(adultCount);
  const [childCount2, setChildCount] = useState(childCount);


  const [seatClass2, setSeatClass] = useState(seatClass);



  // 요일을 나타내는 배열
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  // startDate2와 endDate2를 Date 객체로 변환
  const startDateObj = new Date(startDate2 ?? new Date());
  const endDateObj = new Date(endDate2 ?? new Date());

  // getDay() 메서드로 요일 인덱스를 얻음
  const startDayIndex = startDateObj.getDay();
  const endDayIndex = endDateObj.getDay();

  // days 배열에서 요일 이름을 얻음
  const startDayName = days[startDayIndex];
  const endDayName = days[endDayIndex];

  // 콘솔에 출력 (또는 다른 방식으로 사용)
  console.log("시작 날짜의 요일: " + startDayName);
  console.log("종료 날짜의 요일: " + endDayName);

  // modalcontrol
  const [modalShow, setModalShow] = useState(false);
  const [foriModalShow, foriSetModalShow] = useState(false);
  const [render, setRender] = useState<boolean>(false);

  // 선택 항공편 코드
  const [fisrtId, setFirstId] = useState<number>(0);
  const [secoundId, setSecoundId] = useState<number>(0);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [selectedRow2, setSelectedRow2] = useState<number | null>(null);

  useEffect(() => {
    initScripts();
    initCustom();
    // retrieveOperationInfo();
    if ($('input[name="daterange2"]').length) {
      ($('input[name="daterange2"]') as any).daterangepicker(
        {
          // singleDatePicker: true,
          locale: {
            format: "YYYY-MM-DD",
            separator: " - ",
            applyLabel: "Apply",
            cancelLabel: "Cancel",
            fromLabel: "From",
            toLabel: "To",
            customRangeLabel: "Custom",
            weekLabel: "W",
            daysOfWeek: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            monthNames: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ],
            firstDay: 1,
          },
          startDate: startDate,
          endDate: endDate,
        },
        function (start: any, end: any, label: any) {
          setStartDate(start.format("YYYY-MM-DD"));
          setEndDate(end.format("YYYY-MM-DD"));
        }
      );
    }
  }, []);
  useEffect(() => {
    retrieveOperationinfo();
    retrieveOperationinfo2();
  }, [
    selectedAbbr2,
    selectedFori2,
    startDate2,
    startDayName,
    endDate2,
    page,
    page2,
  ]);

  // 가는 날
  const retrieveOperationinfo = () => {
    const startDateParam = startDate2 || "defaultStartDate";
    console.log("selectedAbbr2", selectedAbbr2);
    console.log("selectedFori2", selectedFori2);
    console.log("startDateParam", startDateParam);
    console.log("startDayName", startDayName);
    OperationService.getAll(
      selectedFori2,
      selectedAbbr2,
      startDateParam,
      startDayName,
      page - 1,
      4
    )

      .then((response: any) => {
        const { operation, totalPages } = response.data;
        setOperationinfo(operation);
        setCount(totalPages);
        // 로그 출력
        console.log("response", response.data);
        console.log("true 실행");
        setRender(true);
        console.log(render, "래넏랜더");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  // 오는 날
  const retrieveOperationinfo2 = () => {
    const endDateParam = endDate2 || "defaultEndDate";
    console.log("selectedAbbr2", selectedAbbr2);
    console.log("selectedFori2", selectedFori2);
    console.log("endDateParam", endDateParam);
    console.log("startDayName", startDayName);
    OperationService.getAll(
      selectedAbbr2,
      selectedFori2,
      endDateParam,
      startDayName,
      page2 - 1,
      4
    )

      .then((response: any) => {
        const { operation, totalPages } = response.data;
        setOperationinfo2(operation);
        setCount2(totalPages);
        // 로그 출력
        console.log("response2", response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const handleAbbrSelection = (selectedAbbr2: any) => {
    setSelectedAbbr(selectedAbbr2);
    setModalShow(false);
  };
  const handleForiAbbrSelection = (selectedFori2: any) => {
    setSelectedFori(selectedFori2);
    foriSetModalShow(false);
  };

  //  달력 함수 받아오기
  const onclickdate = () => {
    let value = null;
    value = daterange.current?.value;
    const a = value?.split(" - ");
    let startDate;
    let endDate;
    if (a) {
      if (a[0]) startDate = a[0];
    }
    if (a) {
      if (a[1]) endDate = a[1];
    }

    setStartDate(startDate);
    setEndDate(endDate);
  };

  useEffect(() => {
    console.log("a");
  }, [daterange.current?.value]);

  const clickNone4 = (event: any) => {
    event.stopPropagation();
    setShow3(!show3);
  };

  const clickNone5 = (event: any) => {
    event.stopPropagation();
    setShow(!show);
  };


  const handleIncrement = (category: any) => {
    switch (category) {
      case "adult":
        setAdultCount((adultCount2) => String((Number(adultCount2) || 0) + 1));
        break;
      case "infant":
        setChildCount((childCount2) => String((Number(childCount2) || 0) + 1));

        break;
      default:
        break;
    }
  };
  const handleDecrement = (category: any) => {
    switch (category) {
      case "adult":
        setAdultCount((adultCount2) =>
          String(
            (Number(adultCount2) || 0) > 0 ? (Number(adultCount2) || 0) - 1 : 0
          )
        );

        break;
      case "infant":
        setChildCount((childCount2) =>
          String(
            (Number(childCount2) || 0) > 0 ? (Number(childCount2) || 0) - 1 : 0
          )
        );
        break;
      default:
        break;
    }
  };
  // const myMo
  //  todo: Pagination 수동 바인딩(공통)
  //  페이지 번호를 누르면 => page 변수에 값 저장
  const handlePageChange = (event: any, value: any) => {
    // value == 화면의 페이지번호
    setPage(value);
  };

  //  todo: Pagination 수동 바인딩(공통)
  //  페이지 번호를 누르면 => page 변수에 값 저장
  const handlePageChange2 = (event: any, value: any) => {
    // value == 화면의 페이지번호
    setPage2(value);
  };

  const handleSelectFlight = (operationId: number) => {
    setFirstId(operationId);
    setSelectedRow(operationId);
    console.log("firstID" + fisrtId + "SecoundID" + secoundId);
  };

  const handleSelectFlight2 = (operationId: number) => {
    setSecoundId(operationId);
    setSelectedRow2(operationId);
    console.log("firstID" + fisrtId + "SecoundID" + secoundId);
  };

  const navi = useNavigate();
  const onclickpage = () => {
    if (fisrtId !== 0 && secoundId !== 0) {
      // fisrtId와 secoundId가 모두 0이 아닌 경우에 실행할 코드
      navi(
        `/reserve-payment/${fisrtId}/${secoundId}/${startDate2}/${endDate2}/${startDayName}/${endDayName}/${adultCount2}/${childCount2}/${seatClass2}`
      );
    } else {
      // 아니면 0인 경우에 실행할 코드
      alert("여정을 선택해주세요");
    }
  };

  const onclickpage2 = () => {
    if (!currentUser) {
      navi("/login");
    } else if (fisrtId !== 0 && secoundId !== 0) {
      // fisrtId와 secoundId가 모두 0이 아닌 경우에 실행할 코드
      navi(
        `/reserve-payment/${fisrtId}/${secoundId}/${startDate2}/${endDate2}/${startDayName}/${endDayName}/${adultCount2}/${childCount2}/${seatClass2}`
      );
    } else {
      // 아니면 0인 경우에 실행할 코드
      alert("여정을 선택해주세요");
    }
  };

  const selectedRenderDateCell = (id:string, date:Date) =>{
    console.log(id);
    if (id==="startDate") setStartDate(date.toISOString().split("T")[0]);
    else setEndDate(date.toISOString().split("T")[0]);
  }

  const renderDateCell = (date: Date, dayIndex: number) => (
    
    <td key={dayIndex} onClick={(e:any)=>{selectedRenderDateCell(e.target.parentNode.id, date); e.stopPropagation()}} className={dayIndex==3?"reserve-choose-selected-day":""}>

      <div onClick={(e:any)=>{selectedRenderDateCell(e.target.parentNode.parentNode.id, date); e.stopPropagation()}} >{date.toISOString().split("T")[0]}</div>
      {days[(startDayIndex + dayIndex - 3 + 7) % 7]}
    </td>
  );

  // 날짜를 중앙에서부터 좌우로 표현하기 위한 함수
  const renderDateRow = (centerDate: Date, daysToShow: number) => {
    const halfDays = Math.floor(daysToShow / 2);

    return Array.from({ length: daysToShow }).map((_, index) => {
      const currentDate = new Date(centerDate);
      currentDate.setDate(centerDate.getDate() + index - halfDays);
      return renderDateCell(currentDate, index);
    });
  };
  return (
    <>
      <div className="hero hero-inner">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mx-auto text-center">
              <div className="intro-wrap">
                <h1 className="mb-0">항공권 조회</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 상단 바 */}

      <div className="sangmin_choose_top">
        <div className="container">
          {/* 출발지 */}
          <div className="sangmin_choose_top_itineary_select text-start">
            <input
              type="text"
              title="출발지"
              className="sangmin_choose_top_myArea"
              value={selectedAbbr2}
              onClick={() => setModalShow(true)}
              placeholder={selectedAbbr}
            />
          </div>
          {/* 도착지 */}
          <div className="sangmin_choose_top_itineary_select">
            <input
              type="text"
              title="도착지"
              className="sangmin_choose_top_arriveArea"
              value={selectedFori2}
              onClick={() => foriSetModalShow(true)}
              placeholder={selectedFori}
            />
          </div>
          {/* 탑승일 */}
          <div className="sangmin_choose_top_itineary_select">
            <input
              type="text"
              title="탑승일"
              className="sangmin_choose_top_date"
              name="daterange2"
              placeholder={` ${startDate} ~ ${endDate}`}
              onChange={onclickdate}
              ref={daterange}
            />
          </div>
          {/* 탑승 인원 */}
          <div className="sangmin_choose_top_itineary_select">
            <input
              type="text"
              title="탑승인원"
              className="sangmin_choose_top_passanger_count"
              ref={target3}
              value={`성인: ${adultCount2} 유아: ${childCount2}`}
              placeholder={`성인: ${adultCount2} 유아: ${childCount2}`}
              onClick={(e) => clickNone4(e)}
            />
          </div>
          {/* 좌석등급 */}
          <div className="sangmin_choose_top_itineary_select">
            <input
              type="text"
              title="좌석등급"
              ref={target}

              className="sangmin_choose_top_class"
              value={seatClass2}
              placeholder={seatClass2}
              onClick={(e) => clickNone5(e)}

            />
          </div>

          {/* 인원 */}
          <Overlay target={target3.current} show={show3} placement="bottom">
            {({
              placement: _placement,
              arrowProps: _arrowProps,
              show: _show,
              popper: _popper,
              hasDoneInitialMeasure: _hasDoneInitialMeasure,
              ...props
            }) => (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="boader_passenger"
                {...props}
                style={{
                  position: "absolute",
                  // backgroundColor: "white",
                  width: "200px",
                  // 길이 지정
                  margin: "20px 0px 0px 0px",
                  padding: "20px 0px 10px 40px",
                  color: "black",
                  borderRadius: 3,
                  ...props.style,
                }}
              >
                <div>
                  <div className="style-personel">
                    <button
                      className="style-personel-button"
                      onClick={() => handleDecrement("adult")}
                    >
                      -
                    </button>
                    <span> 성인: {adultCount2} </span>
                    <button
                      className="style-personel-button"
                      onClick={() => handleIncrement("adult")}
                    >
                      +
                    </button>
                  </div>

                  <div className="style-personel">
                    <button
                      className="style-personel-button"
                      onClick={() => handleDecrement("infant")}
                    >
                      -
                    </button>
                    <span> 소아: {childCount2} </span>
                    <button
                      className="style-personel-button"
                      onClick={() => handleIncrement("infant")}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="person-choice"
                    onClick={(e) => {
                      setShow3(false);
                    }}
                  >
                    선택
                  </button>
                </div>
              </div>
            )}
          </Overlay>

        </div>
      </div>

      {/* step bedge */}
      <div className="d-flex justify-content-center mt-5 col-12">
        <div className="sangmin_step_bedge">
          <span className="badge rounded-pill text-bg-danger">
            {/* {" "} */}
            {/* 1 검색 */}1
          </span>
          {/* <span> 검색 </span> */}
          {/* <span></span> */}
        </div>
        <div className="sangmin_step_bedge">
          <span className="badge rounded-pill text-bg-danger">2 항공편</span>
          {/* <span> 검색 </span> */}
          {/* <span></span> */}
        </div>
        <div className="sangmin_step_bedge">
          <span className="badge rounded-pill text-bg-danger">3</span>
          {/* <span> 검색 </span> */}
          {/* <span></span> */}
        </div>
      </div>
      {/* subTitle */}
      <div className="container">
        <h3 className="sangmin_reserve_choose_subTitle d-flex justify-content-center mt-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="air_icon bi bi-airplane-fill"
            viewBox="0 0 16 16"
          >
            <path d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849Z" />
          </svg>
          첫 번째 여정
        </h3>
      </div>
      <div className="container">
        {/* 출/도착 */}
        <div className="sangmin_choose_airport d-flex justify-content-center mt-5">
          <span>{selectedAbbr2}</span>
          <span> &gt; </span>
          <span>{selectedFori2}</span>
        </div>
        {/* 반복문 */}
        <div className="sangmin_choose_airport_pee_date mt-5">
          <div className="sangmin_bottom_solid">
            <table className="sangmin_choose_datepicker text-center" id="tableId">
              <tr id="startDate">{renderDateRow(startDateObj, 7)}</tr>
            </table>
            {/* <p className="sangmin_choose_airport_data">11.27 (월)</p>

          <p className="sangmin_choose_airport_price">
            KRW<span className="currency"> 257,000</span>
          </p> */}
          </div>
        </div>

        {/* 조회 page */}
        <table className="table text-center mt-3">
          <tr className="sangmin_choose_table_head">
            <th className="sangmin_gray_bg">출도착시간 (비행시간)</th>
            <th className="sangmin_unleftline gray_bg">편명/기종</th>
            <th className="sangmin_economy_bg">이코노미</th>

            <th className="sangmin_business_bg">비즈니스</th>
            <th className="sangmin_first_bg">퍼스트</th>
          </tr>

          {operationinfo &&
            operationinfo.map((data) => (
              // 키값 추가 않하면 react 에서 경고를 추가 : 키는 내부적으로 리액트가 rerending 할때 체크하는 값임
              <tr
                className="sangmin_choose_table_content"
                id={data.operationId}
                key={data.operationId}
                onClick={() => handleSelectFlight(data.operationId)}
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    selectedRow === data.operationId ? "lightblue" : "white",
                }}
              >
                {/* 날짜 */}
                <td>
                  <ul className="sangmin_choose_time d-flex justify-content-between  mt-2">
                    <li>{data.startTime}</li>

                    <li className="sang_min_arrow_icon">
                      <i className="sang_min_arrow_icon bi bi-arrow-right"></i>
                    </li>
                    <li>{data.finalTime}</li>
                  </ul>
                </td>
                <td className="ksm_airline_flightname">
                  <div>항공사: {data.airline}</div>{" "}
                  <div>기종: {data.flightName}</div>
                </td>
                <td>{data.price.toLocaleString()} 원</td>
                <td>{(Number(data.price) * 3).toLocaleString()} 원</td>
                <td>{(Number(data.price) * 9).toLocaleString()} 원</td>
              </tr>
            ))}
          <Pagination
            className="btn-main"
            color="standard"
            count={count}
            page={page}
            siblingCount={1}
            boundaryCount={1}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
          />
        </table>

        {/* 왕복일 경우만 표시 */}
        {/* subTitle */}
        <div className="container">
          <h3 className="sangmin_reserve_choose_subTitle d-flex justify-content-center mt-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="air_icon bi bi-airplane-fill"
              viewBox="0 0 16 16"
            >
              <path d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849Z" />
            </svg>
            두 번째 여정
          </h3>
        </div>
        {/* 출/도착  */}
        <div className="sangmin_choose_airport d-flex justify-content-center mt-5">
          <span>{selectedFori2}</span>
          <span> &gt; </span>
          <span>{selectedAbbr2}</span>
        </div>
        {/* 반복문 */}
        <div className="sangmin_choose_airport_pee_date mt-5">
          <div className="sangmin_bottom_solid">
            <table className="sangmin_choose_datepicker text-center">
              <tr id="endDate">
              {renderDateRow(endDateObj, 7)}

              </tr>
            </table>
            {/* <p className="sangmin_choose_airport_data">11.27 (월)</p>

          <p className="sangmin_choose_airport_price">
            KRW<span className="currency"> 257,000</span>
          </p> */}
          </div>
        </div>

        {/* 조회 page */}
        <table className="table text-center mt-5">
          <tr className="sangmin_choose_table_head">
            <th className="sangmin_gray_bg">출도착시간 (비행시간)</th>
            <th className="sangmin_unleftline gray_bg">편명/기종</th>
            <th className="sangmin_economy_bg">이코노미</th>

            <th className="sangmin_business_bg">비즈니스</th>
            <th className="sangmin_first_bg">퍼스트</th>
          </tr>
          {operationinfo2 &&
            render &&
            operationinfo2.map((data) => (
              // 키값 추가 않하면 react 에서 경고를 추가 : 키는 내부적으로 리액트가 rerending 할때 체크하는 값임

              <tr
                className="sangmin_choose_table_content"
                id={data.operationId}
                key={data.operationId}
                onClick={() => handleSelectFlight2(data.operationId)}
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    selectedRow2 === data.operationId ? "lightblue" : "white",
                }}
              >
                {/* 날짜 */}
                <td>
                  <ul className="sangmin_choose_time d-flex justify-content-between  mt-2">
                    <li>{data.startTime}</li>

                    <li className="sang_min_arrow_icon">
                      <i className="sang_min_arrow_icon bi bi-arrow-right"></i>
                    </li>
                    <li>{data.finalTime}</li>
                  </ul>
                </td>
                <td className="ksm_airline_flightname">
                  <div>항공사: {data.airline}</div>{" "}
                  <div>기종: {data.flightName}</div>
                </td>

                <td>{data.price.toLocaleString()} 원</td>
                <td>{(Number(data.price) * 3).toLocaleString()} 원</td>
                <td>{(Number(data.price) * 9).toLocaleString()} 원</td>
              </tr>
            ))}
          <Pagination
            className="btn-main"
            color="standard"
            count={count2}
            page={page2}
            siblingCount={1}
            boundaryCount={1}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange2}
          />
        </table>

        {/* 유의 상황 */}
        <div className="sangmin_choose_notice mt-5">
          <h5> 유의사항</h5>
          <ul>
            <li className="mt-4 mb-3">
              국제선 항공권 온라인 예약은 조회일로부터 최대 361일, 최소 항공편
              출발 2시간 전까지 예약이 가능합니다.
            </li>
            <li>
              항공편 스케줄 및 기종은 부득이한 사유로 예고없이 변경될 수
              있습니다.
            </li>
          </ul>
        </div>

        <div className="d-flex justify-content-end mt-5 mb-5 no-gutters">
          <div className="d-flex justify-content-end mt-5 no-gutters">
            {!currentUser && (
              <button
                className="sangmin_reserve_btn mb-5"
                onClick={onclickpage}
                // disabled={!areAllOptionsSelected()} // 선택 여부에 따라 버튼 활성화/비활성화
              >
                비회원 결제
              </button>
            )}
          </div>

          <button
            className="sangmin_choose_btn"
            onClick={onclickpage2}
            // to={`/reserve-payment/${fisrtId}/${secoundId}/${startDate2}/${endDate2}/${startDayName}/${endDayName}/${adultCount}/${childCount}/${seatClass}`}
          >
            회원 결제
          </button>
        </div>
      </div>
   

      {/* 모달 불러오기 */}
      <MyareaModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        onAbbrSelect={handleAbbrSelection}
      />

      <ForiareaModal
        show={foriModalShow}
        onHide={() => foriSetModalShow(false)}
        onForiAbbrSelect={handleForiAbbrSelection}
      />

            {/* 좌석등급 */}
            <Overlay
                          target={target.current}
                          show={show}
                          placement="bottom"
                        >
                          {({
                            placement: _placement,
                            arrowProps: _arrowProps,
                            show: _show,
                            popper: _popper,
                            hasDoneInitialMeasure: _hasDoneInitialMeasure,
                            ...props
                          }) => (
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              className="boader_passenger"
                              {...props}
                              style={{
                                position: "absolute",
                                // backgroundColor: "white",
                                width: "250px",
                                // 길이 지정
                                margin: "20px 0px 0px 0px",
                                padding: "30px 0px 30px 50px",
                                color: "black",
                                borderRadius: 3,
                                ...props.style,
                              }}
                            >
                              {/* 여기 */}
                              <div className="d-grid gap-3">
                                <button
                                  className="seat-rating"
                                  type="button"
                                  onClick={() => {
                                    setSeatClass("이코노미");
                                    setShow(false);
                                  }}
                                >
                                  이코노미
                                </button>
                                <button
                                  className="seat-rating"
                                  type="button"
                                  onClick={() => {
                                    setSeatClass("비지니스");
                                    setShow(false);
                                  }}
                                >
                                  비지니스
                                </button>
                                <button
                                  className="seat-rating"
                                  type="button"
                                  onClick={() => {
                                    setSeatClass("퍼스트");
                                    setShow(false);
                                  }}
                                >
                                  퍼스트
                                </button>
                              </div>
                            </div>
                          )}
                        </Overlay>
    </>
  );
}

export default ReserveChoose;
