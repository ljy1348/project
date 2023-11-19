// IReservation.ts
export default interface IReservation {
    airlineReservationNumber?: any | null, // 예약 번호
    flightName: string,                    // 운항편명
    userId: string,                        // 유저ID
    roundOrOne: string,                    // 왕복 여부
    enName: string,                        // 영문 이름
    departure: string,                     // 출발 일자
    arrival: string,                       // 도착 일자
    operationDay: string,                  // 운항 요일
    airline: string,                       // 항공사
    seatType: string,                      // 좌석 등급
    adultCount?: number,                    // 성인 인수
    childCount?: number,                    // 소아 인수
    mileUseStatus: string,                 // 마일리지 사용여부
    membershipStatus: string,              // 회원 여부
    domesticInternational: string,         // 국내 - 국제 여부
    startAirport: string,                  // 출발 공항
    finalAirport: string,                  // 도착 공항
}