export default interface ICheckin {
        // 체크인 id
        checkId ?: any | null,
        // 좌석 번호
        seatNumber : string,
        // 예약 번호
        airlineReservationNumber?: any | null,
        // 여권 번호 
        passportId : string,
        // 성인
        adultCount: string,
        // 소아
        childCount: string,
        // 체크인 여부
        checkYn: string,
    //    회원 여부
        memberYn : string

      
    }