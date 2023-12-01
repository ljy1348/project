// authService.ts : axios 벡엔드 통신 공통 함수(register, login ,logout)
// http 헤더에 웹토큰 넣어 벡엔드로 조회요청 해야함(인증 성공이 뜸)
import IUser from "../../types/auth/IMember"
import http from "../../utils/http-common"
import authHeader from "./authHeader";
import ForgotPassword from './../../pages/auth/ForgotPassword';

// 회원가입(register, signup) 함수(insert)
const register = (user: IUser) => { 
    return http.post("/auth/signup", user);
 }

// 로그아웃 함수 : 로컬스토리지에서 값 제거
const logout = () => { 
    localStorage.removeItem("user");
 }

 const getUserInfo = (userId:string) => {
    return http.get("/auth/info/"+userId);
 }

// todo: 로그인 함수(login, signin) : 조회(post) why? 보안
// get -> 웹브라우저 주소창에 요청 변수 또는 주소값이 나타남
// post -> 웹브라우저 주소창에 정보가 나타나지 않음
const login = (user:IUser) => { 
    return http.post("/auth/signin", user) // 벡엔드 함수 실행
    .then((response: any)=>{
        // 성공 : 벡엔드에서 웹토큰(accessToken) 발행해서 전송해줌
        // 벡엔드 : 웹토큰 + 유저이름 + 유저권한 등
        if(response.data.accessToken) {
            // 로컬 스토리지에(객체 -> 문자열변환) 저장
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data; // 벡엔드 정보
    });
 }

 const kakaoLogin = (code:string) => { 
    return http.post("/oauth/kakao", code) // 벡엔드 함수 실행
    .then((response: any)=>{
        // 성공 : 벡엔드에서 웹토큰(accessToken) 발행해서 전송해줌
        // 벡엔드 : 웹토큰 + 유저이름 + 유저권한 등
        if(response.data.accessToken) {
            // 로컬 스토리지에(객체 -> 문자열변환) 저장
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data; // 벡엔드 정보
    });
 }

 const naverLogin = (code:string) => { 
    return http.post("/oauth/naver/"+code) // 벡엔드 함수 실행
    .then((response: any)=>{
        // 성공 : 벡엔드에서 웹토큰(accessToken) 발행해서 전송해줌
        // 벡엔드 : 웹토큰 + 유저이름 + 유저권한 등
        if(response.data.accessToken) {
            // 로컬 스토리지에(객체 -> 문자열변환) 저장
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data; // 벡엔드 정보
    });
 }

 const googleLogin = (code:string) => { 
    return http.post("/oauth/google/"+code) // 벡엔드 함수 실행
    .then((response: any)=>{
        // 성공 : 벡엔드에서 웹토큰(accessToken) 발행해서 전송해줌
        // 벡엔드 : 웹토큰 + 유저이름 + 유저권한 등
        if(response.data.accessToken) {
            // 로컬 스토리지에(객체 -> 문자열변환) 저장
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data; // 벡엔드 정보
    }).catch((e:Error)=>{console.log(e)});
 }

 const editUser = (user:IUser) => {
    return http.put("/auth/info",user, {headers : authHeader()});
 }

 const changePw = (data:any) => {
    return http.put("/auth/pchange", data, {headers : authHeader()});
 }

 const forgotPassword = (data:{memberId:string,memberPw:string,memberEmail:string,repassword:string}) => {
    return http.post("/auth/forgot", data);
 }

 const AuthService = {
    register,
    login,
    logout,
    kakaoLogin,
    naverLogin,
    googleLogin,
    getUserInfo,
    editUser,
    changePw,
    forgotPassword
 }
 export default AuthService;