export default interface IOperationinfo {
    operationId : any | null,
    airline: string,
    flightName: string,
    startAirport : string,
    finalAirport : string,
    startTime : string,
    finalTime : string,
    operationDate : string,
    startDate?: any | string,
    finalDate?: any | string,
    domesticInternational : string,
    price : string
}