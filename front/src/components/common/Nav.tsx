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
            <Link to="/" className="logo m-0">
              GreenAirline <span className="text-primary"></span>
            </Link>
            {/* 메뉴들 시작 */}
            <ul className="js-clone-nav d-none d-lg-inline-block text-left site-menu float-right">
              {/* home 메뉴 시작 */}
              <li className="active">
                <Link to="/">예약</Link>
              </li>
              {/* home 메뉴 끝 */}

              {/* 드롭다운 메뉴 시작 */}
              <li className="has-children">
                <a href="#">예약조회</a>
                <ul className="dropdown">
                  <li>
                    <Link to="/elements">Elements</Link>
                  </li>
                  <li>
                    <a href="#">Menu One</a>
                  </li>
                  <li className="has-children">
                    <a href="#">Menu Two</a>
                    <ul className="dropdown">
                      <li>
                        <a href="#">Sub Menu One</a>
                      </li>
                      <li>
                        <a href="#">Sub Menu Two</a>
                      </li>
                      <li>
                        <a href="#">Sub Menu Three</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">Menu Three</a>
                  </li>
                </ul>
              </li>
              {/* 드롭다운 메뉴 끝 */}

              {/* 고객 시작 */}
              <li className="has-children">
                <Link to="#">체크인</Link>
                <ul className="dropdown">
                  {/* 1st 드롭 메뉴 */}
                  <li>
                    <Link to="/customer">오토 체크인</Link>
                  </li>
                  {/* 2nd 드롭 메뉴 */}
                  <li>
                    <Link to="/add-customer">모바일 체크인</Link>
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
                    <Link to="/qna">마일리지 조회</Link>
                  </li>
                  {/* 2nd 드롭 메뉴 */}
                  <li>
                    <Link to="/add-qna">마일리지 샵</Link>
                  </li>
                </ul>
              </li>
              {/* Q & A 끝 */}

              {/* 고객센터 메뉴 시작 */}
              <li className="has-children">
                <Link to="/cucenter">고객 센터</Link>
                <ul className="dropdown">
                  <li>
                    <Link to="/notice">공지사항</Link>
                  </li>
                  <li>
                    <Link to="/question">자주 찾는 질문</Link>
                  </li>
                  <li>
                    <Link to="/question-board">1:1 문의</Link>
                  </li>
                </ul> 

              </li>
              {/* 고객센터 메뉴 끝 */}

              {/* 어바웃 메뉴 시작 */}
              <li>
                <Link to="/about">About</Link>
              </li>
              {/* 어바웃 메뉴 끝 */}

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
