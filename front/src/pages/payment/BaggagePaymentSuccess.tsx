import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PaymentService from '../../services/payment/paymentService';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import IPayment from '../../types/payment/IPayment';
import BaggageService from '../../services/baggage/BaggageService';
import IBaggage from '../../types/baggage/IBaggage';

function BaggagePaymentSuccess() {
    const { user: currentUser } = useSelector((state:RootState)=> state.auth);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    let orderId = queryParams.get('orderId');
    let paymentKey = queryParams.get('paymentKey');
    let amount = queryParams.get('amount');
    const navi = useNavigate();
    const [baggage, setBaggage] = useState<IBaggage>()
  
    useEffect(()=>{
        if (orderId)
        BaggageService.getBag(orderId)
        .then((response:any)=>{
            const data = response.data;
            data.paymentYn = "Y";
            BaggageService.create(data)
            .then(()=>{})
            .catch(()=>{navi("/payment/fail")})    
        })
        .catch((e:Error)=>{console.log(e)})
    },[])
  
    useEffect(()=>{
      if (orderId === null) {navi("/payment/fail"); orderId=""}
      if (paymentKey === null) {navi("/payment/fail"); paymentKey=""}
      if (amount === null) {navi("/payment/fail"); amount=""}
    },[])
  
  return (
      <div>       
        <div className="hero hero-inner">
          <div className="container">
            <div className=" align-items-center">
              <div className="col-lg-6 mx-auto text-center">
                <div className="intro-wrap">
                  <h1 className="mb-0 text-white">결제 성공</h1>
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

export default BaggagePaymentSuccess