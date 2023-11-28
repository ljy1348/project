import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import PaymentService from '../../services/payment/paymentService';
import initCustom from '../../assets/js/custom';
import initScripts from '../../assets/js/scripts';

function PaymentSuccess() {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let orderId = queryParams.get('orderId');
  let paymentKey = queryParams.get('paymentKey');
  let amount = queryParams.get('amount');
  const navi = useNavigate();

  useEffect(()=>{
    initCustom();
    initScripts();
  },[])

  useEffect(()=>{
    // alert(orderId+"\n"+paymentKey+"\n"+amount)
    // if (orderId === null) {navi("/payment/fail"); orderId=""}
    // if (paymentKey === null) {navi("/payment/fail"); paymentKey=""}
    // if (amount === null) {navi("/payment/fail"); amount=""}
    // PaymentService.paymentMember(orderId, paymentKey, amount)
    // .then((response:any)=>{console.log(response);
    // })
    // .catch((e:Error)=>{console.log(e)})
  },[])

return (
    <div>       
      <div className="hero hero-inner">
        <div className="container">
          <div className=" align-items-center">
            <div className="col-lg-6 mx-auto text-center">
              <div className="intro-wrap">
                <h1 className="mb-0">결제 성공</h1>
                <h5 className="mb-0">결제 번호</h5>
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