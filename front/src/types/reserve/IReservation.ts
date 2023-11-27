export default interface IReservation {
    AirlineReservaitonNumber?: any | null,
    FlightName: string,
    UserId: string,
    RoundOrOne: string,
    EnName: string,
    Departure: string,
    Arrival: string,
    OperationDay: string,
    Airline: string,
    SeatType: string,
    AdultCount: number,
    ChildCount: number,
    InfantCount: number,
    MileUseStatus: string,
    MembershipStatus: string,
    DomesticInternational: string,
    KorCity:string
    ForiCountry:string
    ForiCity:string
    AirportFee:string
    Email:string
    PhoneNum:string
    PassWord:number | string

}

