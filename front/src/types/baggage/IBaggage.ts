export default interface IBaggage {
    // 수화물 번호
    bagNumber?: any | null,
    // 수화물 개수
    bagCount:  number,
    // 수화물 면적
    bagArea:  number,
    // 수화물 무게
    bagWeight: number,
    // 추가 금액 
    bagPrice:  number,
    // 체크인 id
    checkId: string,
    // 수화물 등록 여부 
    bagYn : string
    }
    
    