import IOperationinfo from "../../types/IOperationinfo";
import IUser from "../../types/auth/IMember";
import http from "../../utils/http-common";
import authHeader from "./authHeader";

const getMemberAll = (search:string, select:string, page:number, size:number) => {
    return http.get(`/admin/member?search=${search}&select=${select}&page=${page}&size=${size}`, {headers : authHeader()});
}

const deleteMember = (selectId:string) => {
    return http.delete(`/admin/member?selectId=${selectId}`, {headers : authHeader()});
}

const editUser = (user:IUser) => {
    return http.put("/admin/member",user, {headers : authHeader()});
 }

 const getOperationAll = (search:string, select:string, page:number, size:number) => {
    return http.get(`/admin/operation?search=${search}&select=${select}&page=${page}&size=${size}`, {headers : authHeader()});
 }

 const createOperationInfo = (data:IOperationinfo) => {
    return http.post(`/admin/operation`, data, {headers : authHeader()});
 }

 const getOperationInfo = (data:string) => {
    return http.get(`/admin/operation/${data}`, {headers : authHeader()});
 }

 const deleteOperationInfo = (id:number) => {
    return http.delete(`/admin/operation/`+id, {headers : authHeader()})
 }

 const getNociceAll = () => {
   return http.get(`/admin/board/notice`, {headers : authHeader()});
}

const getPayAll = (page:number, size:number) => {
   return http.get(`/admin/payment?page=${page}&size=${size}`, {headers : authHeader()})
}

const SearchPayAdmin = (payId:number, page:number, size:number) => {
   return http.get(`/admin/payment/${payId}?page=${page}&size=${size}`, {headers : authHeader()})
}


const AdminService = {
    getMemberAll,
    deleteMember,
    editUser,
    getOperationAll,
    createOperationInfo,
    getOperationInfo,
    deleteOperationInfo,
    getNociceAll,
    getPayAll,
    SearchPayAdmin
}

export default AdminService;