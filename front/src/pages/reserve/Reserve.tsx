import React, { useEffect, useRef, useState } from "react";
import initScripts from "../../assets/js/scripts";
import initCustom from "../../assets/js/custom";
import MyareaModal from "../modal/MyareaModal";
import ForiareaModal from "../modal/ForiareaModal";
import { Link, useNavigate } from "react-router-dom";

function Reserve(props: any) {
  // 출도착 설정
  const [selectedAbbr, setSelectedAbbr] = useState(undefined);
  const [selectedFori, setSelectedFori] = useState(undefined);
  // 인원체크
  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);

  // const [infantCount, setInfantCount] = useState(0);
  // 라디오 박스 여행 타입, 좌석
  const [tripType, setTripType] = useState("round-trip"); // 기본값 설정
  const [seatClass, setSeatClass] = useState("이코노미"); // 기본값 설정

  // 출발날짜
  const daterange = useRef<HTMLInputElement>(null);



  // 모달 창
  const [modalShow, setModalShow] = useState(false);
  const [foriModalShow, foriSetModalShow] = useState(false);

  useEffect(() => {
    initScripts();
    initCustom();



  }, []);

  // 인원수 증가 감소 설정
  const handleDecrement = (category: any) => {
    switch (category) {
      case "adult":
        setAdultCount(adultCount - 1);
        break;
      case "child":
        setChildCount(childCount - 1);
        break;
      default:
        break;
    }
  };

  const handleIncrement = (category: any) => {
    switch (category) {
      case "adult":
        setAdultCount(adultCount + 1);
        break;
      case "child":
        setChildCount(childCount + 1);
        break;
      default:
        break;
    }
  };

  // 모달창 실습
  // 모달창 공항선택 관련
  const handleAbbrSelection = (selectedAbbr: any) => {
    setSelectedAbbr(selectedAbbr);
    setModalShow(false);
  };
  const handleForiAbbrSelection = (selectedFori: any) => {
    setSelectedFori(selectedFori);
    foriSetModalShow(false);
  };
  // 왕복 편도 설정
  const handleTripTypeChange = (event: any) => {
    setTripType(event.target.value);
    // 여기서 다른 작업 수행 가능
  };

  // 좌석
  const handleSeatClassChange = (event: any) => {
    setSeatClass(event.target.value);
    // 여기서 다른 작업 수행 가능
  };


  const navi = useNavigate();

  const onclickpage = () => { 
  let value = null;
  value = daterange.current?.value;
    const a = value?.split(" - ");
    let startDate;
    let endDate;
    if (a) {
        if (a[0])startDate = a[0];

    }
    if (a) {
        if (a[1])endDate = a[1];

    }



    navi(`/reserve-choose/${selectedAbbr}/${selectedFori}/${adultCount}/${childCount}/${seatClass}/${startDate}/${endDate}`)
   }

  return (
    <>
      {/* 공통 */}
      <div className="hero hero-inner">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mx-auto text-center">
              <div className="intro-wrap">
                <h1 className="mb-0">예약 하다</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="col-12">
          {/* 마일리지 항공권 예약 버튼 */}
          <div className="d-flex justify-content-end mt-5 no-gutters">
            <button className="sangmin_reserve_btn">
              마일리지 항공권 예약하기
            </button>
          </div>

          {/* step bedge */}
          <div className="d-flex justify-content-center mt-5 col-12">
            <div className="sangmin_step_bedge">
              <span className="badge rounded-pill text-bg-danger">
                {" "}
                1 검색{" "}
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
              <span className="badge rounded-pill text-bg-danger">3</span>
              {/* <span> 검색 </span> */}
              {/* <span></span> */}
            </div>
          </div>

          {/* 안내상황 */}
          <div className="sangmin_reserve_notice mt-5">
            <ul>
              <li>
                개인정보보호법 시행령 제39조의3 제④항 강화 시행령에 따라 만 14세
                미만 미성년자 예매 시 법정대리인의 동의 및 인증이 불가피하므로
                14세 이상의 성인께서 로그인 후 예매진행을 해 주시기 바랍니다.
              </li>
            </ul>
          </div>

          {/* trip_type 타이틀 */}
          <div className="sangmin_reserve_sub_title mt-5">
            <h4>여정/날짜 선택</h4>
          </div>
          {/* trip_type */}
          <div className="mt-3 d-flex justify-content-left">
            {/* 왕복 편도 버튼 시작 */}
            <div
              className="btn-group d-flex justify-content-left"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <input
                type="radio"
                className="trip_type btn-check "
                name="trip_type btnradio"
                id="trip_type btnradio1"
                autoComplete="off"
                value="round-trip"
                checked={tripType === "round-trip"} // 현재 선택된 값에 따라 checked 속성 설정
                onChange={handleTripTypeChange}
              />
              <label
                className="btn btn-outline-primary rounded-0"
                htmlFor="trip_type btnradio1"
              >
                왕복
              </label>

              <input
                type="radio"
                className="trip_type btn-check"
                name="trip_type btnradio"
                id="trip_type btnradio2"
                autoComplete="off"
                value="one-way"
                checked={tripType === "one-way"} // 현재 선택된 값에 따라 checked 속성 설정
                onChange={handleTripTypeChange} //
              />
              <label
                className="btn btn-outline-primary rounded-0"
                htmlFor="trip_type btnradio2"
              >
                편도
              </label>
            </div>
            {/* 왕복 편도 버튼 끝 */}
          </div>

          {/* 출발,도착,탑승일 */}
          <div className="sangmin_reserve_itineary">
            <div className="sangmin_reserve_itineary_select text-start">
              <input
                type="text"
                title="출발지"
                className="sangmin_reserve_myArea"
                value={selectedAbbr}
                onClick={() => setModalShow(true)}
                placeholder="출발지"
              />
            </div>

            <div className="sangmin_reserve_itineary_select">
              <input
                type="text"
                title="도착지"
                className="sangmin_reserve_arriveArea"
                value={selectedFori}
                onClick={() => foriSetModalShow(true)}
                placeholder="도착지"
              ></input>
            </div>

            <div className="sangmin_reserve_itineary_select">
              <input
                type="text"
                title="탑승일"
                className="sangmin_reserve_date"
                name="daterange"
                placeholder="탑승일"
                ref={daterange}  

              />
            </div>
          </div>

          {/* 인원 입력 타이틀*/}
          <div className="sangmin_reserve_sub_title mt-5">
            <h4>탑승 인원 선택</h4>
          </div>
          {/* 인원 입력 */}
          <div className="sangmin_reserve_passanger_count ">
            <div className="sangmin_reserve_area" id="sangmin_reserve_adult">
              <h5 className="text-lg-start">
                성인
                <span id="sangmin_reserve_adultAge">(만 12세 이상)</span>
              </h5>

              <div className="sangmin_reserve_button_numbox  d-flex justify-content-left">
                <button
                  className="sangmin_btn_number minus"
                  name="sangmin_btn_number"
                  disabled={adultCount === 0}
                  onClick={() => handleDecrement("adult")}
                >
                  <span className="hidden">-</span>
                </button>
                <input
                  type="text"
                  title="성인"
                  className="sangmin_reserve_adult_count"
                  value={adultCount}
                />
                <button
                  className="sangmin_btn_number plus"
                  name="sangmin_btn_number"
                  onClick={() => handleIncrement("adult")}
                >
                  <span className="hidden">+</span>
                </button>
              </div>
            </div>

            <div className="sangmin_reserve_area" id="sangmin_reserve_child">
              <h5 className="ksm_left_word">
                소아
                <span id="sangmin_reserve_childAge">(12세 미만)</span>
              </h5>

              <div className="sangmin_reserve_button_numbox  d-flex justify-content-left">
                <button
                  className="sangmin_btn_number minus"
                  name="sangmin_btn_number"
                  disabled={childCount === 0}
                  onClick={() => handleDecrement("child")}
                >
                  <span className="hidden">-</span>
                </button>
                <input
                  type="text"
                  title="소아"
                  className="sangmin_reserve_adult_count"
                  value={childCount}
                />
                <button
                  className="sangmin_btn_number plus"
                  name="sangmin_btn_number"
                  onClick={() => handleIncrement("child")}
                >
                  <span className="hidden">+</span>
                </button>
              </div>
            </div>

         
          </div>

          {/* 좌석 등급 선택 타이틀*/}
          <div className="sangmin_reserve_sub_title mt-5">
            <h4>좌석 등급 선택</h4>
          </div>
          {/* 좌석등급 선택 */}
          <div className="sangmin_reserve_class">
            <div
              className="btn-group"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <input
                type="radio"
                className="btn-check"
                name="class_btnradio"
                id="class_btnradio2"
                autoComplete="off"
                value="이코노미"
                checked={seatClass === "이코노미"} // 현재 선택된 값에 따라 checked 속성 설정
                onChange={handleSeatClassChange} //
              />
              <label
                className="btn btn-outline-primary col-4"
                htmlFor="class_btnradio2"
              >
                이코노미
              </label>

              <input
                type="radio"
                className="btn-check"
                name="class_btnradio"
                id="class_btnradio3"
                autoComplete="off"
                value="비지니스"
                checked={seatClass === "비지니스"} // 현재 선택된 값에 따라 checked 속성 설정
                onChange={handleSeatClassChange} //
              />
              <label
                className="btn btn-outline-primary col-4"
                htmlFor="class_btnradio3"
              >
                비지니스
              </label>

              <input
                type="radio"
                className="btn-check"
                name="class_btnradio"
                id="class_btnradio4"
                autoComplete="off"
                value="퍼스트"
                checked={seatClass === "퍼스트"} // 현재 선택된 값에 따라 checked 속성 설정
                onChange={handleSeatClassChange} //
              />
              <label
                className="btn btn-outline-primary col-4 rounded-0"
                htmlFor="class_btnradio4"
              >
                퍼스트
              </label>
            </div>
          </div>

          <div className="d-flex justify-content-end mt-5 no-gutters">
            <button
              className="sangmin_reserve_btn"
              onClick={onclickpage}
            >
              항공권 조회
            </button>
          </div>

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

 
        </div>
      </div>

    </>
  );
}

export default Reserve;
