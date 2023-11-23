// IReservation.ts
export default interface IReservation {
    airlineReservationNumber?: any | null,  // 예약 번호
    adultCount: string,                     // 성인 인수
    childCount: string,                     // 소아 인수
    mileUseYn: string,                      // 마일리지 사용 여부 Y/N
    memberYn: string,                       // 회원 여부
    memberId: string,                       // 회원 ID
    userNumber: number,                     // 비회원 번호
    operationId: number                     // 운항 ID
}