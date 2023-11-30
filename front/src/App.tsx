import CuCenter from "./pages/customerCenter/CuCenter";
import NoticeListPage from "./pages/customerCenter/notice/NoticeListPage";

import QuestionPage from "./pages/customerCenter/question/QuestionPage";
import QuestionBoardPage from "./pages/customerCenter/board/QuestionBoardPage";

import NoticeContentPage from "./pages/customerCenter/notice/NoticeContentPage";
import AddboardList from "./pages/customerCenter/board/AddboardList";

// todo: 외부 lib import
// aos css import(npm 설치)
import "aos/dist/aos.css";
// 개발자가 직접 만든 css
import "./assets/css/style.css";

import CheckInStateModal from "./pages/modal/CheckInStateModal";
import Boardingpass from "./pages/checkIn/Boardingpass";
import PassengerInfo from "./pages/checkIn/PassengerInfo";

// todo: 리액트 import
import Nav from "./components/common/Nav";
import Home from "./pages/Home";
import Footer from "./components/common/Footer";
import SearchReservationPage from "./pages/SearchReservation/SearchReservationPage";

import { Routes, Route, useLocation } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import KakaoLogin from "./pages/auth/KakaoLogin";
import UserInfo from "./pages/auth/user/UserInfo";
import ErrorBoundary from "./components/ErrorBoundary";
import AdminPage from "./pages/auth/user/AdminPage";
// import CustomerPage from './pages/customer/CustomerPage';

import CheckIn from "./pages/checkIn/CheckIn";
import Reserve from "./pages/reserve/Reserve";
import ForiareaModal from "./pages/modal/ForiareaModal";
import Passport from "./pages/checkIn/Passport";
import ReserveChoose from "./pages/reserve/ReserveChoose";
import ReservePayment from "./pages/reserve/ReservePayment";
import PaymentSuccess from "./pages/payment/PaymentSuccess";
import PaymentFail from "./pages/payment/PaymentFail";
import Home2 from "./pages/Home2";
import SelectSeat from "./pages/modal/SelectSeat";
import AdminNotice from "./pages/auth/admin/board/AdminNotice";
import ReservationListPage from "./pages/SearchReservation/ReservationListPage";
// todo: 리액트 import

function App() {
  return (
    <div className="App">
      {/* 머리말 */}
      <Nav />

      {/* 본문 */}
      <Routes>
        {/* 고객센터 */}
        <Route path="/cucenter" element={<CuCenter />} />

        {/* 공지사항 */}
        <Route path="/notice" element={<NoticeListPage />} />
        <Route path="/notice/:noticeId" element={<NoticeContentPage />} />

        {/* 자주 찾는 질문 */}
        <Route path="/question" element={<QuestionPage />} />

        {/* 1:1 문의 게시판 */}
        <Route path="/question-board" element={<QuestionBoardPage />} />
        <Route path="/addquestion-board" element={<AddboardList />} />

        <Route path="/" element={<Home />}></Route>

        {/* 체크인 */}
        <Route path="/checkin" element={<CheckIn />} />
        <Route path="/passengerinfo" element={<PassengerInfo />} />
        <Route path="/passport/:searchAirlinereservationnumber" element={<Passport />} />
        <Route path="/boardingpass" element={<Boardingpass />} />
        <Route path="/checkinstate" element={<CheckInStateModal />} />


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
        <Route path="/admin/*" element={<AdminPage />} />

        {/* 예약 조회 */}
        <Route path="/search-reservation" element={<ReservationListPage />} />
        <Route
          path="/search-reservation/seeReservation/:airlineReservationNumber"
          element={<SearchReservationPage />}
        />
        <Route path="/write-notice" element={<WriteNoticePage />} />
        <Route path="/search-reservation/seeReservation/:airlineReservationNumber" element={<SearchReservationPage />} />

        {/* 관리자 */}
        <Route path="/admin/notice" element={<AdminNotice />} />

        {/* 결제 */}

        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/aa/fail" element={<PaymentFail />} />

        <Route path="/reserve" element={<Reserve />} />
        <Route
          path="/reserve-choose/:selectedAbbr/:selectedFori/:adultCount/:childCount/:seatClass/:startDate/:endDate"
          element={<ReserveChoose />}
        />
        <Route
          path="/reserve-payment/:firstId/:secoundId/:startDate2/:endDate2/:startDayName/:endDayName/:adultCount/:childCount/:seatClass"
          element={<ReservePayment />}
        />

        <Route path="/test" element={<SelectSeat />} />
      </Routes>
      {/* 꼬리말 */}
      <Footer />
    </div>
  );
}

export default App;
