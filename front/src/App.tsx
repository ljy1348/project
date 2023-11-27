import React, { useEffect } from "react";
// todo: 외부 lib import
// aos css import(npm 설치)
import "aos/dist/aos.css";
// 개발자가 직접 만든 css
import "./assets/css/style.css";

// todo: 리액트 import
import Nav from "./components/common/Nav";
import Home from "./pages/Home";
import Footer from "./components/common/Footer";
import { Routes, Route, useLocation } from "react-router-dom";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Elements from "./pages/Elements";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Oauth from "./pages/auth/KakaoLogin";
import KakaoLogin from "./pages/auth/KakaoLogin";
import UserInfo from "./pages/auth/user/UserInfo";
import ErrorBoundary from "./components/ErrorBoundary";
import AdminPage from "./pages/auth/user/AdminPage";
import AdminMemberList from "./pages/auth/admin/AdminMemberList";

// import CustomerPage from './pages/customer/CustomerPage';

import CheckIn from './pages/checkIn/CheckIn';
import Reserve from './pages/reserve/Reserve';
import ForiareaModal from './pages/modal/ForiareaModal';
import Passport from './pages/checkIn/Passport';
import ReserveChoose from './pages/reserve/ReserveChoose';
import ReservePayment from './pages/reserve/ReservePayment';
import PaymentResult from './pages/payment/PaymentResult';
import PaymentSuccess from './pages/payment/PaymentSuccess';
import PaymentFail from './pages/payment/PaymentFail';
// todo: 리액트 import

function App() {
  return (
    <div className="App">


      {/* 머리말 */}                 
      <Nav/>

      {/* 본문 */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/elements" element={<Elements />} />

        {/* 체크인 */}
        <Route path="/checkin" element={<CheckIn />} />
        <Route path="/passport" element={<Passport />} />
        <Route path="/foriareamodal" element={<ForiareaModal />} />

        {/* 회원 */}
        <Route path="/register" element={<Register />} />
        <Route
          path="/login/auth/:app"
          element={
            <ErrorBoundary>
              <KakaoLogin />
            </ErrorBoundary>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/user-info" element={<UserInfo />} />
        <Route path="/admin" element={<AdminPage />} />

        {/* 결제 */}

        <Route path="/payment/success" element={<PaymentSuccess/>} />
        <Route path="/aa/fail" element={<PaymentFail/>} />


        <Route path="/reserve" element={<Reserve />} />
        <Route
          path="/reserve-choose/:selectedAbbr/:selectedFori/:adultCount/:childCount/:seatClass/:startDate/:endDate"
          element={<ReserveChoose />}
        />
        <Route
          path="/reserve-payment/:firstId/:secoundId/:startDate2/:endDate2/:startDayName/:endDayName/:adultCount/:childCount/:seatClass"
          element={<ReservePayment />}
        />

        {/* <Route path="/test" element={<Test />} /> */}
      </Routes>

      {/* 꼬리말 */}
      <Footer />
    </div>
  );
}

export default App;
