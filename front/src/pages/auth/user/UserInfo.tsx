import React, { useEffect } from 'react'
import initCustom from '../../../assets/js/custom'

function UserInfo() {

  useEffect(()=>{
    initCustom();
  },[])

  return (
    <div className=''>
      <div className="hero hero-inner">
    <div className="container">
      <div className=" align-items-center">
        <div className="col-lg-6 mx-auto text-center">
          <div className="intro-wrap">
            <h1 className="mb-0">마일리지</h1> <br/>
            <h3>10000000</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className='container' style={{textAlign:"center"}}>
    <ul className='jy-user-info-ul'>
      <li>회원 정보</li>
      <li>회원 정보</li>
      <li>회원 정보</li>
    </ul>
    
  </div>
  </div>
  )
}

export default UserInfo