import axios from "axios";
// todo: baseURL: "http://스프링ip주소:스프링포트번호/공통url"
export default axios.create({
  baseURL: "http://59.28.90.58:8000/api",
  headers: {
    "Content-Type": "application/json"
  }
});
