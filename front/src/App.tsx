// todo: 외부 lib import
// aos css import(npm 설치)
import "aos/dist/aos.css";
// 개발자가 직접 만든 css
import "./assets/css/style.css";

// todo: 리액트 import
import Nav from "./components/common/Nav";
import Home from "./pages/Home";
import Footer from "./components/common/Footer";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ReservationListPage from "./pages/ReservationListPage";
import SearchReservationPage from "./pages/SearchReservation/SearchReservationPage";
import WriteNoticePage from "./pages/writeNotice/WriteNoticePage";
import Test from "./pages/Test";

function App() {
  return (
    <div className="App">
      {/* 머리말 */}
      <Nav />

      {/* 본문 */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* 예약 조회 */}
        <Route path="/search-reservation" element={<ReservationListPage />} />
        <Route path="/search-reservation/seeReservation/:airlineReservationNumber" element={<SearchReservationPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/write-notice" element={<WriteNoticePage />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    


      {/* 꼬리말 */}
      <Footer />
    </div>
  );
}

export default App;
