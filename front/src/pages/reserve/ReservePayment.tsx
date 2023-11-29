import React, { useEffect, useState } from "react";
import initScripts from "../../assets/js/scripts";
import initCustom from "../../assets/js/custom";
import { useParams } from "react-router-dom";
import IOperationinfo from "../../types/IOperationinfo";
import OperationService from "../../services/OperationService";
import ICount from "./../../types/reserve/ICount";
import NonmemberService from "../../services/NonmemberService";
import { info } from "console";
import ReservationService from "../../services/ReservationService";
import IRdata from "../../types/reserve/IRdata";
import OperationInfo from "./../auth/admin/OperationInfo/OperationInfo";

function ReservePayment() {
  // 기본키
  const {
    firstId,
    secoundId,
    startDate2,
    endDate2,
    startDayName,
    endDayName,
    adultCount,
    childCount,
    seatClass,
  } = useParams();
  // 사용 X?
  // const [icount, setICount] = useState<ICount>();
  
  const initICount = {
    adult: false,
    name: "",
  };

  const [temp, setTemp] = useState<ICount[]>([initICount]);
  const [reInfo, setReInfo] = useState<IRdata[]>([]);
  // operationinfo 객체 초기화

  const initialOperationinfo = {
    operationId: null,
    airline: "",
    flightName: "",
    startAirport: "",
    finalAirport: "",
    startTime: "",
    finalTime: "",
    operationDate: "",
    startDate: "",
    finalDate: "",
    domesticInternational: "",
    price: "",
  };
  const initialOperationinfo2 = {
    operationId: null,
    airline: "",
    flightName: "",
    startAirport: "",
    finalAirport: "",
    startTime: "",
    finalTime: "",
    operationDate: "",
    startDate: "",
    finalDate: "",
    domesticInternational: "",
    price: "",
  };

  // 저장 : 비회원 객체 초기화
  const initialNonmemberinfo = temp.map(() => ({
    userNumber: null,
    userName: "",
    userSex: "",
    userCountry: "",
    userDate: "1983-1-1",
    userPhone: "",
    userEmail: "",
  }));

  // 저장 : 예약 객체 초기화
  const initialReservation = {
    airlineReservationNumber: null,
    adultCount: adultCount,
    childCount: childCount,
    mileUseYn: "N",
    seatType: seatClass,
    memberYn: "N",
    memberId: "",
    userNumber: "",
    operationId: 0,
    checkYn: "N",
  };

  // operationinfo 객체 정의

  const [operationinfo, setOperationinfo] =
    useState<IOperationinfo>(initialOperationinfo);
  const [operationinfo2, setOperationinfo2] = useState<IOperationinfo>(
    initialOperationinfo2
  );
  // 저장 : 비회원 객체정의
  const [nonmemberinfo, setNonmemberinfo] = useState(initialNonmemberinfo);

  // 저장 : 예약 객체 정의
  const [reservation, setReservation] = useState(initialReservation);

  // todo: input 태그에 수동 바인딩
  const handleInputChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target; // 화면값
    setReservation({ ...reservation, [name]: value }); // 변수저장
  };

  // 사용자 번호 배열
  const [userNumbers, setUserNumbers] = useState<number[]>([]);
  // 도착 날짜 저장 함수
  const [day, setDay] = useState<string>("");
  const [day2, setDay2] = useState<string>("");

  // 가격
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const days = ["일", "월", "화", "수", "목", "금", "토"];
  // startDate2와 endDate2를 Date 객체로 변환
  const startDateObj = new Date(day ?? new Date());
  const endDateObj = new Date(day2 ?? new Date());

  // getDay() 메서드로 요일 인덱스를 얻음
  const startDayIndex = startDateObj.getDay();
  const endDayIndex = endDateObj.getDay();

  // days 배열에서 요일 이름을 얻음
  const startDayName2 = days[startDayIndex];
  const endDayName2 = days[endDayIndex];

  // type 선언
  // modalcontrol
  const [modalShow, setModalShow] = useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let { name, value } = event.target;
    if (name === "radio+" + index) name = "userSex";
    setNonmemberinfo((prevNonmemberinfo) => {
      const updatedNonmemberinfo = [...prevNonmemberinfo];
      updatedNonmemberinfo[index] = {
        ...updatedNonmemberinfo[index],
        [name]: name === "userSex" ? value : value, // 성별은 value 그대로 사용
      };
      return updatedNonmemberinfo;
    });
  };

  const handleBirthdateChange = (idx: number) => {
    // 선택된 년도, 월, 일 값을 가져옵니다.
    const selectedYear = (
      document.getElementById(`birth-year${idx}`) as HTMLSelectElement
    ).value;
    const selectedMonth = (
      document.getElementById(`birth-month${idx}`) as HTMLSelectElement
    ).value;
    const selectedDay = (
      document.getElementById(`birth-day${idx}`) as HTMLSelectElement
    ).value;

    // 이 값을 nonmemberinfo.userDate에 저장합니다.
    const selectedDate = `${selectedYear}-${selectedMonth}-${selectedDay}`;
    setNonmemberinfo((prevInfo) => {
      const updatedInfo = [...prevInfo];
      updatedInfo[idx] = {
        ...updatedInfo[idx],
        userDate: selectedDate,
      };
      return updatedInfo;
    });
  };

  // 년도 옵션들 생성
  const renderYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 150; // 100년 전부터
    const endYear = currentYear; // 18세까지 허용

    const yearOptions = [];
    for (let year = startYear; year <= endYear; year++) {
      yearOptions.push(
        <option key={year} value={year}>
          {year}
        </option>
      );
    }

    return yearOptions;
  };

  // 월 옵션들 생성
  const renderMonthOptions = () => {
    const monthOptions = [];
    for (let month = 1; month <= 12; month++) {
      monthOptions.push(
        <option key={month} value={month}>
          {month}
        </option>
      );
    }

    return monthOptions;
  };

  // 일 옵션들 생성
  const renderDayOptions = () => {
    const dayOptions = [];
    for (let day = 1; day <= 31; day++) {
      dayOptions.push(
        <option key={day} value={day}>
          {day}
        </option>
      );
    }

    return dayOptions;
  };

  // 상세조회 함수
  const getoperationinfo = (operationId: string) => {
    OperationService.get(operationId) // 벡엔드로 상세조회 요청
      .then((response: any) => {
        setOperationinfo(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const getoperationinfo2 = (operationId: string) => {
    OperationService.get(operationId) // 벡엔드로 상세조회 요청
      .then((response: any) => {
        setOperationinfo2(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
        setNonmemberinfo(initialNonmemberinfo);
      });
  };
  // 저장 비회원
  const saveNonmemberinfo = async () => {
    const promises = nonmemberinfo.map((info) => {
      const data = {
        userName: info.userName,
        userSex: info.userSex,
        userCountry: info.userCountry,
        userDate: info.userDate,
        userPhone: info.userPhone,
        userEmail: info.userEmail,
      };

      return NonmemberService.create(data)
        .then((response) => response.data.userNumber)
        .catch((e) => {
          console.error(e);
          return null; // 오류가 발생한 경우 null 반환
        });
    });

    const userNumbersArray = await Promise.all(promises);
    return userNumbersArray.filter((number) => number !== null); // null이 아닌 번호들만 반환
  };

  // 저장 예약
  const saveReservation = (
    userNumbersArray: any,
    operation: IOperationinfo
  ) => {
    // 임시 부서 객체

    const data = {
      adultCount: adultCount ?? 0,
      childCount: childCount ?? 0,
      mileUseYn: reservation.mileUseYn,
      seatType: seatClass ?? "이코노미",
      memberYn: reservation.memberYn,
      memberId: reservation.memberId,
      userNumber: userNumbersArray.join(","), // 배열을 쉼표로 구분된 문자열로 변환
      operationId: operation.operationId, // 여정에 해당하는 operationId 사용
      checkYn: reservation.checkYn,
    };

    const totalPrice = calculateTotalPrice(data.seatType, operation);

    ReservationService.create(data).then((response: any) => {
      console.log(response.data);
      // 가격 정보를 활용할 수 있도록 원하는 작업 수행
      console.log("가격:", totalPrice);

      // ReservationService.create가 성공한 경우에만 실행
      // response.data에서 필요한 정보를 추출하여 reInfo 업데이트

      // reInfo 업데이트
      setReInfo((prevReInfo) => {
        const updatedReInfo = [...prevReInfo];
        updatedReInfo[0] = {
          ...updatedReInfo[0],
          reservenum: response.data.airlineReservationNumber, // 수정 필요
          price: totalPrice.toString(),
        };
        console.log()
        return updatedReInfo;
      });
    });
  };


  const handlePayment = async () => {
    const userNumbersArray = await saveNonmemberinfo();
    if (userNumbersArray.length > 0) {
      await saveReservation(userNumbersArray, operationinfo);
      // 여정 2에 대한 예약 저장
      await saveReservation(userNumbersArray, operationinfo2);

      setModalShow(true);
    } else {
      console.log("비회원 정보 저장에 실패했습니다.");
    }
  };
  useEffect(() => {
    initScripts();
    initCustom();

    // 로그인이 되어있는지 판단하고
    // 로그인이 안되어있으면, 비회원으로 진행할지, 로그인페이지로 이동할지 선택창 뜸,
    // 로그인이 되어 있으면 결제 진행

    if (firstId) {
      getoperationinfo(firstId);
      inputdays(startDate2);
    }
    if (secoundId) {
      getoperationinfo2(secoundId);
      inputdays2(endDate2);
    }
  }, []);
  // 어른 아이 인원수에 따라 저장창 생성
  useEffect(() => {
    let arr: ICount[] = [];
    for (let i = 0; i < Number(adultCount); i++) {
      const data = { adult: true, name: "" };
      arr = [...arr, data];
    }

    for (let i = 0; i < Number(childCount); i++) {
      const data = { adult: false, name: "" };
      arr = [...arr, data];
    }

    setTemp(arr);
  }, []);

  const inputdays = (startDate2: any) => {
    // 현재 날짜를 포함하는 Date 객체 생성
    const currentDate = new Date(startDate2);

    // 시작 시간과 종료 시간을 Date 객체로 변환
    const startDateTime = new Date(
      currentDate.toDateString() + " " + operationinfo.startTime
    );
    const finalDateTime = new Date(
      currentDate.toDateString() + " " + operationinfo.finalTime
    );

    if (startDateTime > finalDateTime) {
      const nextDay = new Date(currentDate);
      nextDay.setDate(nextDay.getDate() + 1);

      setDay(nextDay.toLocaleDateString()); // Update the state with the next day
      console.log("날짜 증가" + nextDay.toLocaleDateString());
    } else {
      setDay(startDate2);
      console.log(startDate2);
    }
  };

  const inputdays2 = (endDate2: any) => {
    // 현재 날짜를 포함하는 Date 객체 생성
    const currentDate = new Date(endDate2);

    // 시작 시간과 종료 시간을 Date 객체로 변환
    const startDateTime = new Date(
      currentDate.toDateString() + " " + operationinfo2.startTime
    );
    const finalDateTime = new Date(
      currentDate.toDateString() + " " + operationinfo2.finalTime
    );

    if (startDateTime > finalDateTime) {
      const nextDay = new Date(currentDate);
      nextDay.setDate(nextDay.getDate() + 1);

      setDay2(nextDay.toLocaleDateString()); // Update the state with the next day
      console.log("날짜 증가" + nextDay.toLocaleDateString());
    } else {
      setDay2(endDate2);
      console.log(endDate2);
    }
  };

  // 2번
  // 가격 계산 함수
  const calculatePrice = (
    basePrice: number,
    adultCount: number,
    childCount: number,
    multiplier: number
  ) => {
    if (adultCount !== undefined && childCount !== undefined) {
      return (
        (basePrice * adultCount + basePrice * 0.9 * childCount) * multiplier
      );
    }
    return 0;
  };

  // 총 가격 계산 함수
  const calculateTotalPrice = (
    seatClass: string,
    OperationInfo: IOperationinfo
  ) => {
    const multiplier =
      seatClass === "비지니스" ? 3 : seatClass === "퍼스트" ? 9 : 1;

    const price = calculatePrice(
      Number(OperationInfo.price),
      Number(adultCount),
      Number(childCount),
      multiplier
    );
    return price;
  };
  console.log(reInfo)
  // useEffect(() => {
  //   const price = calculateTotalPrice(seatClass || "이코노미");
  //   setTotalPrice(price);
  //   // console.log(price);
  // }, [
  //   seatClass,
  //   adultCount,
  //   childCount,
  //   operationinfo.price,
  //   operationinfo2.price,
  // ]);

  console.log(totalPrice);

  // 다른 부분에서 totalPrice를 참조해야 할 때
  // console.log(totalPrice);
  return (
    <>
      {/* 공통 */}
      <div className="hero hero-inner">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mx-auto text-center">
              <div className="intro-wrap">
                <h1 className="mb-0">결제 페이지</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 상단바 */}

      {/* 본문 */}
      <div className="container">
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
            <span className="badge rounded-pill text-bg-danger">2</span>
            {/* <span> 검색 </span> */}
            {/* <span></span> */}
          </div>
          <div className="sangmin_step_bedge">
            <span className="badge rounded-pill text-bg-danger">3 결제</span>
            {/* <span> 검색 </span> */}
            {/* <span></span> */}
          </div>
        </div>

        <h3 className="sangmin_reserve_payment_subtitle">여정 정보</h3>

        {/* 안내상황 */}

        <div className="mt-5 mb-5">
          <div className="sangmin_payment_reserve_info">
            <div className="row text-left">
              <div className="sangmin_payment_reserve_info_first col-2">
                첫 번째 여정
              </div>
              <div className="sangmin_payment_reserve_info_secound col-8">
                <div className="col">
                  <span className="sangmin_payment_loca">
                    {operationinfo.startAirport}
                  </span>
                  <span className="sangmin_payment_loca">
                    <i className="sang_min_arrow_icon bi bi-arrow-right"></i>
                  </span>
                  <span className="sangmin_payment_loca">
                    {operationinfo.finalAirport}
                  </span>
                </div>
                <div className="sangmin_payment_reserve_info_last col">
                  <span>
                    {startDate2}({startDayName})
                  </span>{" "}
                  <span>{operationinfo.startTime}</span> <span>~</span>{" "}
                  <span>
                    {day}({startDayName2})
                  </span>{" "}
                  <span>{operationinfo.finalTime}</span>
                  <span className="sangmin_aircode">
                    {operationinfo.flightName}
                  </span>
                  <span>이코노미(L)</span>
                </div>
              </div>

              <div className="col-2"></div>
            </div>
          </div>
          <div className="sangmin_payment_reserve_two_info">
            <div className="row text-left">
              <div className="sangmin_payment_reserve_info_first col-2">
                두 번째 여정
              </div>

              <div className="sangmin_payment_reserve_info_secound col-8">
                <div className="col">
                  <span className="sangmin_payment_loca">
                    {operationinfo2.startAirport}
                  </span>
                  <span className="sangmin_payment_loca">
                    <i className="sang_min_arrow_icon bi bi-arrow-right"></i>
                  </span>
                  <span className="sangmin_payment_loca">
                    {operationinfo2.finalAirport}
                  </span>
                </div>
                <div className="sangmin_payment_reserve_info_last col">
                  <span>
                    {endDate2}({endDayName})
                  </span>{" "}
                  <span>{operationinfo2.startTime}</span> <span>~</span>{" "}
                  <span>
                    {day2}({endDayName2})
                  </span>{" "}
                  <span>{operationinfo2.finalTime}</span>
                  <span className="sangmin_aircode">
                    {operationinfo2.flightName}
                  </span>
                  <span>이코노미(L)</span>
                </div>
              </div>

              <div className="col-2"></div>
            </div>
          </div>
        </div>

        <h3 className="sangmin_reserve_payment_subtitle">탑승자 정보</h3>

        {/* 정보입력 */}

        <div className="accordion" id="accordionExample">
          {temp &&
            temp.map((val, idx) => {
              return (
                <div className="accordion-item" key={idx}>
                  <h2 className="accordion-header" id={"head" + idx}>
                    <button
                      className={
                        idx == 0
                          ? "accordion-button"
                          : "accordion-button collapsed"
                      }
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={"#collapse" + idx}
                      aria-expanded={idx == 0 ? "true" : "false"}
                      aria-controls={"#collapse" + idx}
                    >
                      {val.name != "" ? (
                        <>{val.name}</>
                      ) : val.adult ? (
                        <>탑승자 정보 입력창: 성인</>
                      ) : (
                        <> 탑승자 정보 입력창: 어린이</>
                      )}
                    </button>
                  </h2>

                  <div
                    id={"collapse" + idx}
                    className={
                      idx === 0
                        ? "accordion-collapse collapse show"
                        : "accordion-collapse collapse"
                    }
                    aria-labelledby={"heading" + idx}
                    // data-bs-parent="#accordionExample"
                  >
                    {/* 사용자 정보 */}

                    <div className="accordion-body row">
                      <div className="col">
                        {/* 성별 선택 */}
                        <div className="row g-3 align-items-center mb-3">
                          {/* 성별 라벨 시작 */}
                          <div className="col-3">
                            <label
                              htmlFor={`userSex-${idx}`}
                              className="col-form-label"
                            >
                              성별
                            </label>
                          </div>
                          <div className="col-9">
                            <label htmlFor={"radio+" + idx}>남성</label>
                            <input
                              className="sangmin_gender_check"
                              type="radio"
                              name={"radio+" + idx}
                              value={"male"}
                              id={"radio+" + idx}
                              onChange={(e) => handleInputChange(e, idx)}
                            />

                            <label htmlFor={"radio+" + idx}>여성</label>
                            <input
                              className="sangmin_gender_check"
                              type="radio"
                              name={"radio+" + idx}
                              value={"female"}
                              onChange={(e) => handleInputChange(e, idx)}
                            />
                          </div>
                        </div>
                        {/* 이름 입력 */}
                        <div className="row g-3 align-items-center mb-3">
                          {/* 이름 라벨 시작 */}
                          <div className="col-3">
                            <label
                              htmlFor="userName"
                              className="col-form-label"
                            >
                              이름
                            </label>
                          </div>
                          {/* 라벨 끝 */}
                          {/* 이름 입력창 */}
                          <div className="col-9">
                            <input
                              type="text"
                              id="userName"
                              required
                              className="form-control"
                              value={nonmemberinfo[idx]?.userName}
                              onChange={(e) => handleInputChange(e, idx)} // index 전달
                              placeholder="이름"
                              name="userName"
                            />
                          </div>
                        </div>
                        {/* 국적 입력 */}
                        <div className="row g-3 align-items-center mb-3">
                          {/* 국적 라벨 시작 */}
                          <div className="col-3">
                            <label
                              htmlFor="userCountry"
                              className="col-form-label"
                            >
                              국적
                            </label>
                          </div>
                          {/* 국적 입력창 */}
                          <div className="col-9">
                            <input
                              type="text"
                              id="userCountry"
                              required
                              className="form-control"
                              value={nonmemberinfo[idx]?.userCountry}
                              onChange={(e) => handleInputChange(e, idx)} // index 전달
                              placeholder="국적"
                              name="userCountry"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col">
                        {/* 생년월일 */}
                        <div className="row g-3 align-items-center mb-3">
                          {/* 생년월일 라벨 시작 */}
                          <div className="col-3">
                            <label htmlFor="birth" className="col-form-label">
                              생년월일
                            </label>
                          </div>
                          {/* 라벨 끝 */}
                          {/* 생년월일 입력창 */}
                          <div className="col-9">
                            <div className="info" id="info__birth">
                              <select
                                className="box"
                                id={`birth-year${idx}`}
                                onChange={(e) => {
                                  handleBirthdateChange(idx);
                                }}
                              >
                                {renderYearOptions()}
                              </select>
                              <select
                                className="box"
                                id={`birth-month${idx}`}
                                onChange={(e) => {
                                  handleBirthdateChange(idx);
                                }}
                              >
                                {renderMonthOptions()}
                              </select>
                              <select
                                className="box"
                                id={`birth-day${idx}`}
                                onChange={(e) => {
                                  handleBirthdateChange(idx);
                                }}
                              >
                                {renderDayOptions()}
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* 전화번호 입력 */}
                        <div className="row g-3 align-items-center mb-3">
                          {/* 전화번호 라벨 시작 */}
                          <div className="col-3">
                            <label
                              htmlFor="userPhone"
                              className="col-form-label"
                            >
                              전화번호
                            </label>
                          </div>
                          {/* 전화번호 입력창 */}
                          <input
                            type="text"
                            id="userPhone"
                            required
                            className="form-control"
                            value={nonmemberinfo[idx]?.userPhone}
                            onChange={(e) => handleInputChange(e, idx)} // index 전달
                            placeholder="번호만 입력해 주세요"
                            name="userPhone"
                          />
                        </div>
                        {/* 이메일 입력 */}
                        <div className="row g-3 align-items-center mb-3">
                          {/* 이메일 라벨 시작 */}
                          <div className="col-3">
                            <label
                              htmlFor="userEmail"
                              className="col-form-label"
                            >
                              이메일
                            </label>
                          </div>
                          {/* 이메일 입력창 */}
                          <div className="col-9">
                            <input
                              type="text"
                              id="userEmail"
                              required
                              className="form-control"
                              value={nonmemberinfo[idx]?.userEmail}
                              onChange={(e) => handleInputChange(e, idx)} // index 전달
                              placeholder="이메일"
                              name="userEmail"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="d-flex justify-content-end ">
          <button
            className="sangmin_choose_btn mt-5 mb-5"
            onClick={handlePayment}
            // onClick={() => setModalShow(true)}
          >
            결제
          </button>
        </div>
      </div>

      {/* 모달 불러오기 */}
    </>
  );
}

export default ReservePayment;
