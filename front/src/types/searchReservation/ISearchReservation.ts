// IReservation.ts
export default interface ISearchReservation {
    airlineReservationNumber?: any | null,  // 예약 번호
    adultCount: string,                     // 성인 인수
    childCount: string,                     // 소아 인수
    mileUseYn: string,                      // 마일리지 사용 여부 Y/N
    memberYn: string,                       // 회원 여부
    checkYn: string,                       // 체크인 여부
    memberId: string,                       // 회원 ID
    userNumber: string,                     // 비회원 번호
    operationId: number,                    // 운항 ID
    airline: string,                        // 항공사
    flightName: string,                     // 항공편명
    startAirport: string,                   // 출발 공항
    finalAirport: string,                   // 도착 공항
    startTime: string,                      // 출발 시간
    finalTime: string,                      // 도착 시간
    startDate: string,                      // 출발 공항
    finalDate: string,                      // 도착 공항
    domesticInternational: string,          // 국제 - 국내
    price: number,                          // 운임
    memberName: string                      // 회원 이름
}