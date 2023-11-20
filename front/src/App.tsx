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
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Elements from './pages/Elements';
import CustomerListPage from './pages/customer/CustomerListPage';
import AddCustomerPage from './pages/customer/AddCustomerPage';
import CustomerPage from './pages/customer/CustomerPage';
import QnaListPage from './pages/qna/QnaListPage';
import AddQnaPage from './pages/qna/AddQnaPage';
import QnaPage from './pages/qna/QnaPage';
import Reserve from './pages/reserve/Reserve';
// import { Icon } from '@mui/material';
import Sangmin from './pages/sangmin/Sangmin';
import ReserveChoose from './pages/reserve/ReserveChoose';
import ReservePayment from './pages/reserve/ReservePayment';

function App() {
  return (
    <div className="App">
      {/* 머리말 */}
      <Nav/>

      {/* 본문 */}
      <Routes>
        <Route path="/" element={<Reserve/>} />
        <Route path="/services" element={<Services/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/elements" element={<Elements/>} />

        {/* 고객 */}
        <Route path="/customer" element={<Home/>} />
        <Route path="/add-customer" element={<AddCustomerPage/>} />
        <Route path="/customer/:cid" element={<CustomerPage/>} />

        {/* Q & A */}
        <Route path="/qna" element={<QnaListPage/>} />
        <Route path="/add-qna" element={<AddQnaPage/>} />
        <Route path="/qna/:qno" element={<QnaPage/>} />

        {/* test */}
        <Route path="/icon" element={<Sangmin/>} />

        {/* 예약 */}
        <Route path="/reserve-choose" element={<ReserveChoose/>} />
        <Route path="/reserve-payment" element={<ReservePayment/>} />

      </Routes>
      
      {/* 꼬리말 */}
      <Footer/>
    </div>
  );
}

export default App;
