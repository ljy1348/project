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

// import CustomerPage from './pages/customer/CustomerPage';
import CheckIn from './pages/checkIn/CheckIn';
import Reserve from './pages/reserve/Reserve';
import ForiareaModal from './pages/modal/ForiareaModal';
import Passport from './pages/checkIn/Passport';
import ReserveChoose from './pages/reserve/ReserveChoose';
import ReservePayment from './pages/reserve/ReservePayment';
// todo: 리액트 import

function App() {
  return (
    <div className="App">

      {/* 머리말 */}                 
      <Nav/>
      {/* 본문 */}
      <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/services" element={<Services/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/elements" element={<Elements/>} />  

          {/* 체크인 */}
          <Route path="/checkin" element={<CheckIn/>} />   
          <Route path="/passport" element={<Passport/>} />   
          <Route path="/foriareamodal" element={<ForiareaModal/>} />  
          




          <Route path="/reserve-choose" element={<ReserveChoose/>} />
        <Route path="/reserve-payment" element={<ReservePayment/>} />
       </Routes> 
       
      {/* 꼬리말 */}
      <Footer/>
    </div>
  );
}

export default App;