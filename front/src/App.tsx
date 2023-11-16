import React, { useEffect } from 'react';
// todo: 외부 lib import
// aos css import(npm 설치)
import "aos/dist/aos.css";
// 개발자가 직접 만든 css 
import "./assets/css/style.css";

// todo: 리액트 import
import Nav from './components/common/Nav';
import Home from './pages/Home';
import Footer from './components/common/Footer';
import { Routes, Route, useLocation } from 'react-router-dom';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Elements from './pages/Elements';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Oauth from './pages/auth/KakaoLogin';
import KakaoLogin from './pages/auth/KakaoLogin';
import initScripts from './assets/js/scripts';
import initCustom from './assets/js/custom';


function App() {


  return (
    <div className="App">
      {/* 머리말 */}
      <Nav/>

      {/* 본문 */}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/services" element={<Services/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/elements" element={<Elements/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login/auth/kakao" element={<KakaoLogin/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/*" element={<Home/>} />

      </Routes>
      
      {/* 꼬리말 */}
      <Footer/>
    </div>
  );
}

export default App;
