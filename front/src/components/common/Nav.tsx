// components/common/Nav.tsx : rfce
import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <>
      {/* 여기 */}
      {/* <!-- 머리말 시작 --> */}
      <div className="site-mobile-menu site-navbar-target">
        <div className="site-mobile-menu-header">
          <div className="site-mobile-menu-close">
            <span className="icofont-close js-menu-toggle"></span>
          </div>
        </div>
        <div className="site-mobile-menu-body"></div>
      </div>
      {/* <!-- 머리말 끝 --> */}

      {/* <!-- 메뉴 시작 --> */}
      <nav className="site-nav">
        <div className="container">
          <div className="site-navigation">

            <Link to="/" className="logo m-2">
              GreanAirline <span className="text-primary"></span>
            </Link>
            {/* 메뉴들 시작 */}
            <ul
              className="js-clone-nav d-none d-lg-inline-block text-left site-menu float-right"
              id="menu_bar"
            >
              {/* home 메뉴 시작 */}
              <li>
                <a >예약</a>
              </li>
              {/* home 메뉴 끝 */}

              {/* 드롭다운 메뉴 시작 */}
              <li className="has-children">

                <a href="#">예약조회</a>
                <ul className="dropdown">
                  <li>
                    <Link to="/elements">One</Link>
                  </li>
                  <li>
                    <a href="#">Two</a>
                  </li>
                  <li className="has-children">
                    <a href="#">Three</a>
                  </li>
                </ul>
              </li>
              {/* 드롭다운 메뉴 끝 */}


               {/* 체크인 메뉴 시작 */}
               <li>
                <Link to="/checkin">체크인</Link>
              </li>
              {/* 체크인 메뉴 끝 */}

              {/* 고객 시작 */}
              <li className="has-children">
                <Link to="#">체크인</Link>
                <ul className="dropdown">
                  {/* 1st 드롭 메뉴 */}
                  <li>
                    <Link to="/customer">One</Link>
                  </li>
                  {/* 2nd 드롭 메뉴 */}
                  <li>
                    <Link to="/add-customer">Two</Link>
                  </li>
                </ul>
              </li>
              {/* 고객 끝 */}

              {/* Q & A 시작 */}
              <li className="has-children">
                <Link to="#">마일리지</Link>
                <ul className="dropdown">
                  {/* 1st 드롭 메뉴 */}
                  <li>
                    <Link to="/qna">One</Link>
                  </li>
                  {/* 2nd 드롭 메뉴 */}
                  <li>
                    <Link to="/add-qna">Two</Link>
                  </li>
                </ul>
              </li>
              {/* Q & A 끝 */}


              

              <ul className="js-clone-nav d-none d-lg-inline-block site-menu">
                {/* home 메뉴 시작 */}

                <ul className="login_menubar">
                <li>
                  <Link to="/login">로그인</Link>
                </li>
                <li>
                  <Link to="/register">
                    <p>마이페이지</p></Link>
                </li>
                <li>
                  <Link to="/register">
                    <p>고객센터</p></Link>
                </li>
                {/* home 메뉴 끝 */}
              </ul>
              </ul>
            </ul>

            {/* 메뉴들 끝 */}

            <a
              href="#"
              className="burger ml-auto float-right site-menu-toggle js-menu-toggle d-inline-block d-lg-none light"
              data-toggle="collapse"
              data-target="#main-navbar"
            >
              <span></span>
            </a>
          </div>
        </div>
      </nav>
      {/* <!-- 메뉴 끝 --> */}
    </>
  );
}


export default Nav;
