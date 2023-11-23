import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

function PaymentSuccess() {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get('orderId');
  const paymentKey = queryParams.get('paymentKey');
  const amount = queryParams.get('amount');

  useEffect(()=>{
    alert(orderId+"\n"+paymentKey+"\n"+amount)
  },[])

  return (
    <div>PaymentSuccess</div>
  )
}

export default PaymentSuccess