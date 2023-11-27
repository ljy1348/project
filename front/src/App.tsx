import React from "react";
// todo: 외부 lib import
// aos css import(npm 설치)
import "aos/dist/aos.css";
// 개발자가 직접 만든 css
import "./assets/css/style.css";

// todo: 리액트 import

import Nav from "./components/common/Nav";
import Home from "./pages/Home";
import Footer from "./components/common/Footer";
import { Route, Routes } from "react-router-dom";

import CheckIn from "./pages/checkIn/CheckIn";

import ForiareaModal from "./pages/modal/ForiareaModal";
import Passport from "./pages/checkIn/Passport";

// todo: 리액트 import

function App() {
  return (
    <div className="App">
      {/* 머리말 */}
      <Nav />
      {/* 본문 */}
      <Routes>
        <Route path="/" element={<Home />}></Route>

        {/* 체크인 */}
        <Route path="/checkin" element={<CheckIn />} />
        <Route path="/passport" element={<Passport />} />
        <Route path="/foriareamodal" element={<ForiareaModal />} />
      </Routes>

      {/* 꼬리말 */}
      <Footer />
    </div>
  );
}

export default App;
