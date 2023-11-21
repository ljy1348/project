import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import IReservation from "../../types/reserve/IReservation";
function MyareaModal(props: any) {
    const [reservation, setReservation] = useState<Array<IReservation>>([]);

  return (
    
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <div className="reserve_modal_header modal-header">
            <h3 className="modal-title">공항 선택</h3>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-body">
            <h5>국내선</h5>

            {/* 국내 공항 도시 */}
          <table className="sangmin_modal_table table">
          {reservation &&
              reservation.map((data) => (
                // 키값 추가 않하면 react 에서 경고를 추가 : 키는 내부적으로 리액트가 rerending 할때 체크하는 값임
                <tr key={data.AirlineReservaitonNumber}>
                  <td>{data.KorCity}</td>
                </tr>
              ))}
          </table>

          <h5 className="mt-2">국제선</h5>

          <div className="row mx-0">
            <div className="sangmin_reserve_modal_fori_country">
                {/* 해외 나라 */}
              <table className="table">
              {reservation &&
              reservation.map((data) => (
                // 키값 추가 않하면 react 에서 경고를 추가 : 키는 내부적으로 리액트가 rerending 할때 체크하는 값임
                <tr key={data.AirlineReservaitonNumber}>
                  <td>{data.ForiCountry}</td>
                </tr>
              ))}

                <tr>
                  <td scope="col">1 번국</td>
                </tr>
                <tr>
                  <td scope="col">2 번국</td>
                </tr>
                <tr>
                  <td scope="col">3 번국</td>
                </tr>
                <tr>
                  <td scope="col">4 번국</td>
                </tr>
              </table>
            </div>
            <div className="sangmin_modal_body_fori_city">
              <h6 className="mt-3">공항</h6>
              <table className="sangmin_modal_table table">

              {reservation &&
            //   해외 공항
              reservation.map((data) => (
                // 키값 추가 않하면 react 에서 경고를 추가 : 키는 내부적으로 리액트가 rerending 할때 체크하는 값임
                <tr key={data.AirlineReservaitonNumber}>
                  <td>{data.ForiCity}</td>
                </tr>
              ))}
              

                <tr>
                  <td scope="col">1 번 지역</td>
                </tr>
                <tr>
                  <td scope="col">2 번 지역</td>
                </tr>
                <tr>
                  <td scope="col">3 번 지역</td>
                </tr>
                <tr>
                  <td scope="col">4 번 지역</td>
                </tr>
                <tr>
                  <td scope="col">5 번 지역</td>
                </tr>
                <tr>
                  <td scope="col">6 번 지역</td>
                </tr>
              </table>
            </div>
          </div>
          
        </div>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default MyareaModal;
