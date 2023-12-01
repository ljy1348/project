import http from "../../utils/http-common";
import authHeader from "../auth/authHeader";

const paymentMember = (orderId:string, paymentKey:string, amount:string) => {
    return http.post(`/payment?orderId=${orderId}&paymentKey=${paymentKey}&amount=${amount}`, {headers : authHeader()});
}

const paymentMile = (orderId:string, paymentKey:string, amount:string) => {
    return http.post(`/payment/mile?orderId=${orderId}&paymentKey=${paymentKey}&amount=${amount}`, {headers : authHeader()});
}

const paymentNonMember = (orderId:string, paymentKey:string, amount:string) => {
    return http.post(`/payment?orderId=${orderId}&paymentKey=${paymentKey}&amount=${amount}`);
}

const getPayMember = (memberId:string, page:number, size:number) => {
    return http.get(`/payment/${memberId}?page=${page}&size=${size}`)
}

const deletePay = (payId:number) => {
    return http.delete(`/payment/${payId}`, {headers : authHeader()})
}

const SearchPayMember = (memberId:string,payId:number, page:number, size:number) => {
    return http.get(`/payment/${memberId}/${payId}?page=${page}&size=${size}`)
}



const PaymentService = {
    paymentMember,
    paymentNonMember,
    getPayMember,
    paymentMile,
    deletePay,
    SearchPayMember
}

export default PaymentService;