// IUser.ts : 인터페이스
export default interface IUser {
    userId?: string | null,
    userPassword: string,
    userName: string,
    enName: string,       
    userEmail: string,       
    userPhone: string,      
    userSex: string,       
    userAdd: string,       
    right: string,       
    birthDate: Date | null,       
    userNationality: string,       
    milePoint: number, 
}