export default interface IBaggage {
    // 수화물 번호
    bagNumber?: any | null,
    // 수화물 개수
    bagCount:  number,
    // 추가 금액 
    bagPrice:  number,
    // 체크인 id
    airlineReservationNumber: number,
    paymentYn: string
}
    
    