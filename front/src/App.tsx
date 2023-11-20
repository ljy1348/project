import React from 'react';
// todo: 외부 lib import
// aos css import(npm 설치)
import "aos/dist/aos.css";
// 개발자가 직접 만든 css 
import "./assets/css/style.css";

// todo: 리액트 import
import Nav from './components/common/Nav';
import Home from './pages/Home';
import Footer from './components/common/Footer';
import { Routes, Route } from 'react-router-dom';

import About from './pages/About';
import Contact from './pages/Contact';
import Elements from './pages/Elements';
import CustomerListPage from './pages/customer/CustomerListPage';
import AddCustomerPage from './pages/customer/AddCustomerPage';
import CustomerPage from './pages/customer/CustomerPage';
import QnaListPage from './pages/qna/QnaListPage';
import AddQnaPage from './pages/qna/AddQnaPage';
import QnaPage from './pages/qna/QnaPage';
import CuCenter from './pages/customerCenter/CuCenter';
import NoticeListPage from './pages/customerCenter/NoticeListPage';
import OtherService from './pages/customerCenter/OtherServicePage';
import OtherServicePage from './pages/customerCenter/OtherServicePage';
import QuestionPage from './pages/customerCenter/QuestionPage';
import CutomerSoundPage from './pages/customerCenter/CutomerSoundPage';

function App() {
  return (
    <div className="App">
      {/* 머리말 */}
      <Nav/>

      {/* 본문 */}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/elements" element={<Elements/>} />

        {/* 고객센터 */}
        <Route path="/cucenter" element={<CuCenter/>} />
        <Route path="/cu-notice" element={<NoticeListPage/>} />
        <Route path="/other-service" element={<OtherServicePage/>} />
        <Route path="/question" element={<QuestionPage/>} />
        <Route path="/cutomer-sound" element={<CutomerSoundPage/>} />


        {/* 고객 */}
        <Route path="/customer" element={<CustomerListPage/>} />
        <Route path="/add-customer" element={<AddCustomerPage/>} />
        <Route path="/customer/:cid" element={<CustomerPage/>} />

        {/* Q & A */}
        <Route path="/qna" element={<QnaListPage/>} />
        <Route path="/add-qna" element={<AddQnaPage/>} />
        <Route path="/qna/:qno" element={<QnaPage/>} />
      </Routes>
      
      {/* 꼬리말 */}
      <Footer/>
    </div>
  );
}

export default App;
