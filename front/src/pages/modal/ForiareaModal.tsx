import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import IReservation from "../../types/reserve/IReservation";
import { Link } from "react-router-dom";

function ForiareaModal(props: any) {
  const [foriModalShow, foriSetModalShow] = useState(false);
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
                  <td scope="col">출도착시간 </td>
                  <td scope="col">편명/기종 </td>
                  <td scope="col">좌석배정/체크인 </td>
                </tr>
                <tr>
                  <td scope="col">출발</td>
                  <td></td>
                  <Link to={"/passport"}>
                    <Button
                      variant="primary"
                      onClick={() => foriSetModalShow(true)}
                    >
                      체크인
                    </Button>
                  </Link>
                </tr>

                <tr>
                  <td scope="col">출도착시간 </td>
                  <td scope="col">편명/기종 </td>
                  <td scope="col">좌석배정/체크인 </td>
                </tr>
                <tr>
                  <td scope="col">출발</td>
                  <td></td>
                  <Link to={"/passport"}>
                    <Button
                      variant="primary"
                      onClick={() => foriSetModalShow(true)}
                    >
                      체크인
                    </Button>
                  </Link>
                </tr>
              </table>
            </div>
          </div>
        </div>

        <div className="foriareaButton"></div>
      </Modal.Body>
      {/* <Modal.Footer>
      <Button onClick={props.onHide}>Close</Button>
    </Modal.Footer> */}
    </Modal>
  );
}

export default ForiareaModal;
