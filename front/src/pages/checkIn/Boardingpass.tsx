import React from "react";
import { Link } from "react-router-dom";

function Boardingpass() {
  return (
    <>
       <div className="hero hero-inner">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="intro-wrap">
                <h1 className="mb-5">
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
     
    
      <div className="untree_co-section">
      <div className="container">
        <h1>GreenAir</h1>
        <div className="underline"></div>
        <div className="line_row_wrap">
          <dl className="line_row">
            <dt>
              <h4>
                 고객님의 체크인이 확정되었습니다!
              </h4>
            </dt>
            <div>
              <h6 className="tit">
                예약 정보
              </h6>
              <p>예약자명</p> 
              <div className="finalboadingpass">
              <table className="table">
           
                {/* 항공편정보 */}
                <tr className="finalInfo">
                  <td scope="col">항공편 정보</td>
                  <td scope="col">여정</td>
                  <td scope="col">출국일자</td>
                </tr>
                <tr>
                  <td scope="col"></td>
                  <td scope="col"></td>
                  <td scope="col"></td>
                </tr>
                {/* 항공편정보 */}

                {/* 좌석 정보 */}
                <tr className="finalInfo">
                  <td scope="col">좌석번호</td>
                  <td scope="col">좌석등급</td>
                  <td scope="col"> </td>
                </tr>
                <tr>
                  <td scope="col"></td>
                  <td scope="col"></td>
                  <td scope="col"></td>
                </tr>
                 {/* 좌석 정보 */}


               {/* 수화물 정보 */}
                <tr className="finalInfo">
                  <td scope="col">수화물 </td>
                  <td scope="col">휴대수화물</td>
                  <td scope="col">위탁수화물</td>
                </tr>
                <tr>
                  <td scope="col"></td>
                  <td scope="col"></td>
                  <td scope="col"></td>
                </tr>
                {/* 수화물 정보 */}
                
              </table>
              </div>


            </div>
          </dl>
          <dl className="line_row">
            <dt>
              <span className="tit">결제까지 완료해주시기 바랍니다.<br/> (결제 다음 이메일 전송)</span>
            </dt>
            <div>
            <button type="button" className="btn btn-primary">
               결제
                 </button>
            </div>
          </dl>
        </div>
      </div>

     
       
    </div>

     
     
     

    </>
  );
}

export default Boardingpass;
