import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PaymentService from '../../services/payment/paymentService';
import initCustom from '../../assets/js/custom';
import initScripts from '../../assets/js/scripts';
import ReservationService from '../../services/reservation/ReservationService';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import AuthService from '../../services/auth/authService';
import IPayment from '../../types/payment/IPayment';

function PaymentSuccess() {

  const { user: currentUser } = useSelector((state:RootState)=> state.auth);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let orderId = queryParams.get('orderId');
  let paymentKey = queryParams.get('paymentKey');
  let amount = queryParams.get('amount');
  const navi = useNavigate();
  const [payment, setPayment] = useState<IPayment>();

  useEffect(()=>{
    // initCustom();
    // initScripts();
    let reserveNum;
    if (orderId)
    reserveNum = orderId.split("-");
  if (reserveNum) {
    ReservationService.get(Number(reserveNum[0]))
    .catch((e:Error)=>{console.log(e)})
    ReservationService.get(Number(reserveNum[1]))
    .catch((e:Error)=>{console.log(e)})
  }

  },[])

  useEffect(()=>{
    // alert(orderId+"\n"+paymentKey+"\n"+amount)
    if (orderId === null) {navi("/payment/fail"); orderId=""}
    if (paymentKey === null) {navi("/payment/fail"); paymentKey=""}
    if (amount === null) {navi("/payment/fail"); amount=""}
    

    if (paymentKey === "mile") {

      PaymentService.paymentMile(orderId, paymentKey, amount)
      .then((response:any)=>{
        setPayment(response.data);
      })
      .catch((e:Error)=>{console.log(e)})
    } else {
      PaymentService.paymentMember(orderId, paymentKey, amount)
    .then((response:any)=>{
      setPayment(response.data);
    })
    .catch((e:Error)=>{console.log(e)})
    }

  },[])

return (
    <div>       
      <div className="hero hero-inner">
        <div className="container">
          <div className=" align-items-center">
            <div className="col-lg-6 mx-auto text-center">
              <div className="intro-wrap">
                <h1 className="mb-0 text-white">결제 성공</h1>
                <h5 className="mb-0 text-success">결제 번호 : {payment?.payId}</h5>
                <h5 className="mb-0 text-success">출발 예약 번호 : {payment?.startReservationNumber}</h5>
                <h5 className="mb-0 text-success">도착 예약 번호 : {payment?.finalReservationNumber}</h5>
                <br/>
                <Link to={"/"}><div className='badge bg-success'><h5 className='mx-auto my-auto'>메인화면으로</h5></div></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
    {/* <div id="overlayer">
          <div className="loader">
            <div className="spinner-border" role="status" />
              <span className="sr-only">Loading...</span>
            </div>
          </div> */}

          </div>
      </div>

      
  )
}

export default PaymentSuccess