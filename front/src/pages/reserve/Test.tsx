import React from "react";

function Test() {
  const adultCount = 3;
  const childCount = 0;
  return (
    <>
      <div className="accordion mb-5" id="accordionPanelsStayOpenExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseOne"
              aria-expanded="true"
              aria-controls="panelsStayOpen-collapseOne"
            >
              탑승자 정보 입력창
            </button>
          </h2>

          <div
            id="panelsStayOpen-collapseOne"
            className="accordion-collapse collapse show"
          >
            {/* 사용자 정보 */}
            <div className="accordion-body row">
              <div className="col">
                {/* 성별 선택 */}
                <div className="row g-3 align-items-center mb-3">
                  {/* 성별 라벨 시작 */}
                  <div className="col-3">
                    <label htmlFor="fullName" className="col-form-label">
                      성별
                    </label>
                  </div>
                  {/* 라벨 끝 */}
                  {/* 성별 라디오 박스 */}
                  <div className="sangmin_gender col-9">
                    <label htmlFor="male">남성</label>
                    <input
                      className="sangmin_gender_check"
                      id="male"
                      type="radio"
                      name="gender"
                      value="man"
                    />
                    <label htmlFor="female">여성</label>
                    <input
                      className="sangmin_gender_check"
                      id="female"
                      type="radio"
                      name="gender"
                      value="woman"
                    />
                  </div>
                </div>
                {/* 이름 입력 */}
                <div className="row g-3 align-items-center mb-3">
                  {/* 이름 라벨 시작 */}
                  <div className="col-3">
                    <label htmlFor="fullName" className="col-form-label">
                      이름
                    </label>
                  </div>
                  {/* 라벨 끝 */}
                  {/* 이름 입력창 */}
                  <div className="col-9">
                    <input
                      type="text"
                      id="fullName"
                      required
                      className="form-control"
                    //   value={reservation.EnName}
                    //   onChange={handleInputChange}
                      placeholder="이름"
                      name="fullName"
                    />
                  </div>
                </div>

                <div className="row g-3 align-items-center mb-3">
                  {/* 국적 라벨 시작 */}
                  <div className="col-3">
                    <label htmlFor="fullName" className="col-form-label">
                      국적
                    </label>
                  </div>
                  {/* 이름 라벨 끝 */}
                  {/* 국적 입력창 */}
                  <div className="col-9">
                    <input
                      type="text"
                      id="fullName"
                      required
                      className="form-control"
                    //   value={reservation.EnName}
                    //   onChange={handleInputChange}
                      placeholder="국적"
                      name="fullName"
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
                      <select className="box" id="birth-year">
                        <option>출생 연도</option>년
                      </select>
                      <select className="box" id="birth-month">
                        <option>월</option>월
                      </select>
                      <select className="box" id="birth-day">
                        <option>일</option>일
                      </select>
                    </div>
                  </div>
                </div>

                {/* 전화번호 입력 */}
                <div className="row g-3 align-items-center mb-3">
                  {/* 이름 라벨 시작 */}
                  <div className="col-3">
                    <label htmlFor="UserId" className="col-form-label">
                      전화번호
                    </label>
                  </div>
                  {/* 라벨 끝 */}
                  {/* 이름 입력창 */}
                  <div className="col-9">
                    <input
                      type="text"
                      id="memberCode"
                      required
                      className="form-control"
                    //   value={reservation.UserId}
                    //   onChange={handleInputChange}
                      placeholder="번호만 입력해 주세요"
                      name="UserId"
                    />
                  </div>
                </div>

                <div className="row g-3 align-items-center mb-3">
                  {/* 국적 라벨 시작 */}
                  <div className="col-3">
                    <label htmlFor="fullName" className="col-form-label">
                      이메일
                    </label>
                  </div>
                  {/* 이름 라벨 끝 */}
                  {/* 국적 입력창 */}
                  <div className="col-9">
                    <input
                      type="text"
                      id="fullName"
                      required
                      className="form-control"
                    //   value={reservation.EnName}
                    //   onChange={handleInputChange}
                      placeholder="이메일"
                      name="fullName"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <button onClick={() => setModalShow(true)}>a</button> */}
      </div>
    </>
  );
}

export default Test;
