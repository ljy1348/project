import http from "../../utils/http-common";
import authHeader from "../auth/authHeader";

const paymentMember = (orderId:string, paymentKey:string, amount:string) => {
    return http.post(`/payment?orderId=${orderId}&paymentKey=${paymentKey}&amount=${amount}`, {headers : authHeader()});
}

const paymentNonMember = (orderId:string, paymentKey:string, amount:string) => {
    return http.post(`/payment?orderId=${orderId}&paymentKey=${paymentKey}&amount=${amount}`);
}


const PaymentService = {
    paymentMember,
    paymentNonMember
}

export default PaymentService;