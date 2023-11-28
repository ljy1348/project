// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
import IReservation from "../../types/reserve/IReservation";
import React, { useRef, useState } from "react";
// import AirportList from "./AirportList";
import "../../assets/css/sm/smAirport.css";
import AirportList from "../../utils/AirportList";
import { Modal } from "react-bootstrap";
// import AirportList from './../AirportList/AirportList';
function ForiareaModal(props: any) {
  const initAirport = {
    abbr: "",
  };
  const [airport, setAirport] = useState(initAirport);
  const [selectNational, setSelectNational] = useState("korea");
  const [airportList, setAirportList] = useState(AirportList.korea);
  const [koreaAirportList, setKoreaAirportList] = useState(AirportList.korea);
  const listBox = useRef<HTMLDivElement>(null);

  const onClickNationalList = (data: string) => {
    setSelectNational(data);
    if (data === "korea") setAirportList(AirportList.korea);
    if (data === "NortheastAsia") setAirportList(AirportList.NortheastAsia);
    if (data === "SoutheastAsia") setAirportList(AirportList.SoutheastAsia);
    if (data === "Americas") setAirportList(AirportList.Americas);
    if (data === "Europe") setAirportList(AirportList.Europe);
    if (data === "Oceanstate") setAirportList(AirportList.Oceanstate);
    if (data === "CentralAsia") setAirportList(AirportList.CentralAsia);

    if (listBox.current) {
      listBox.current.scrollTop = 0;
    }
  };

  const selectedAirport = (data: string) => {
    setAirport((airport) => ({ ...airport, abbr: data }));
    props.onForiAbbrSelect(data);
    console.log(data);
  };
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

          <div className="flights_list domestic mb-5">
            <ul className="city_list">
              {koreaAirportList &&
                koreaAirportList.map((val, idx) => {
                  return (
                    <li
                      key={idx}
                      onClick={() => {
                        selectedAirport(val.abbr);
                      }}
                    >
                      <span className="cname">{val.cname}</span>
                      <span className="abbr">{val.abbr}</span>
                    </li>
                  );
                })}
            </ul>
          </div>

          <h5 className="mt-2">국제선</h5>

          <div className="flights_list national row no-gutters r">
            <div className="list_nation col">
              <ul>
                <li
                  className={
                    "international_list " +
                    (selectNational == "korea" ? "active" : "")
                  }
                  onClick={() => {
                    onClickNationalList("korea");
                  }}
                >
                  한국
                </li>
                <li
                  className={
                    "international_list " +
                    (selectNational == "NortheastAsia" ? "active" : "")
                  }
                  onClick={() => {
                    onClickNationalList("NortheastAsia");
                  }}
                >
                  동북아시아
                </li>
                <li
                  className={
                    "international_list " +
                    (selectNational == "SoutheastAsia" ? "active" : "")
                  }
                  onClick={() => {
                    onClickNationalList("SoutheastAsia");
                  }}
                >
                  동남아시아/서남아시아
                </li>
                <li
                  className={
                    "international_list " +
                    (selectNational == "Americas" ? "active" : "")
                  }
                  onClick={() => {
                    onClickNationalList("Americas");
                  }}
                >
                  미주 (미국/캐나다/중남미)
                </li>
                <li
                  className={
                    "international_list " +
                    (selectNational == "Europe" ? "active" : "")
                  }
                  onClick={() => {
                    onClickNationalList("Europe");
                  }}
                >
                  유럽
                </li>
                <li
                  className={
                    "international_list " +
                    (selectNational == "Oceanstate" ? "active" : "")
                  }
                  onClick={() => {
                    onClickNationalList("Oceanstate");
                  }}
                >
                  대양주/괌/사이판/팔라우
                </li>
                <li
                  className={
                    "international_list " +
                    (selectNational == "CentralAsia" ? "active" : "")
                  }
                  onClick={() => {
                    onClickNationalList("CentralAsia");
                  }}
                >
                  몽골/중앙아시아
                </li>
              </ul>
              <div></div>
            </div>
            <div className="list_airport col">
              <div className="international_listbox" ref={listBox}>
                <ul className="city_list mx-auto">
                  {airportList.map((val, idx) => {
                    return (
                      <li key={idx} onClick={() => selectedAirport(val.abbr)}>
                        <span className="cname">{val.cname}</span>
                        <span className="abbr">{val.abbr}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
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

export default ForiareaModal;
