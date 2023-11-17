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
import CustomerListPage from './pages/customer/CustomerListPage';
import AddCustomerPage from './pages/customer/AddCustomerPage';
import CustomerPage from './pages/customer/CustomerPage';
import QnaListPage from './pages/qna/QnaListPage';
import AddQnaPage from './pages/qna/AddQnaPage';
import QnaPage from './pages/qna/QnaPage';
import Login from './pages/Login';
import ReservationListPage from './pages/ReservationListPage';

function App() {
  return (
    <div className="App">
      {/* 머리말 */}
      <Nav/>

      {/* 본문 */}
      <Routes>
        <Route path="/" element={<Home/>} />
        {/* 예약 조회 */}
        <Route path="/search-reservation" element={<ReservationListPage/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/login" element={<Login/>} />

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
