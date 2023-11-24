import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import PaymentService from '../../services/payment/paymentService';

function PaymentSuccess() {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let orderId = queryParams.get('orderId');
  let paymentKey = queryParams.get('paymentKey');
  let amount = queryParams.get('amount');
  const navi = useNavigate();

  useEffect(()=>{
    // alert(orderId+"\n"+paymentKey+"\n"+amount)
    if (orderId === null) {navi("/payment/fail"); orderId=""}
    if (paymentKey === null) {navi("/payment/fail"); paymentKey=""}
    if (amount === null) {navi("/payment/fail"); amount=""}
    PaymentService.paymentMember(orderId, paymentKey, amount)
    .then((response:any)=>{console.log(response);
    navi("/");
    })
    .catch((e:Error)=>{console.log(e)})
  },[])

  return (
    <div>PaymentSuccess</div>
  )
}

export default PaymentSuccess