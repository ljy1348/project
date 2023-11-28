import React from 'react';
// todo: 외부 lib import
// aos css import(npm 설치)
import "aos/dist/aos.css";
// 개발자가 직접 만든 css 
import "./assets/css/style.css";
import Nav from './components/common/Nav';
import Home from './pages/Home';
import Footer from './components/common/Footer';
import { Route, Routes } from 'react-router-dom';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Elements from './pages/Elements';
import CustomerListPage from './pages/customer/CustomerListPage';
import AddCustomerPage from './pages/customer/AddCustomerPage';
// import CustomerPage from './pages/customer/CustomerPage';
import QnaListPage from './pages/qna/QnaListPage';
import AddQnaPage from './pages/qna/AddQnaPage';
import QnaPage from './pages/qna/QnaPage';
import CustomerPage from './pages/customer/CustomerPage';



import Passport from './pages/checkIn/Passport';
import CheckIn from './pages/checkIn/CheckIn';
import CheckInStateModal from './pages/modal/CheckInStateModal';
import Boardingpass from './pages/checkIn/Boardingpass';
import PassengerInfo from './pages/checkIn/PassengerInfo';




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
          <Route path="/passengerinfo" element={<PassengerInfo/>} />   
          <Route path="/passport" element={<Passport/>} />   
          <Route path="/boardingpass" element={<Boardingpass/>} />   
          <Route path="/checkinstate" element={<CheckInStateModal/>} />   
       
          {/* <Route path="/popover" element={<Popover/>} />   */}
          

          {/* 고객 */}
          <Route path="/customer" element={<CustomerListPage/>} />  
          <Route path="/add-customer" element={<AddCustomerPage/>} />  
          <Route path="/customer/:cid" element={<CustomerPage/>} />  
          {/* <Route path="/customer/:cid" element={<Customer />} /> */}


          {/* Qna */}
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
