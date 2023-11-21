// components/common/Nav.tsx : rfce
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState, useAppDispatch } from "../../store/store";
import { logout } from "../../store/slices/auth";

function Nav() {

  const { user: currentUser } = useSelector((state:RootState)=> state.auth);

  const dispatch = useAppDispatch();

  // 리액트 성능개선을 위한 함수 : useCallback() : 캐싱됨
  const logOut = useCallback(() => { 
    dispatch(logout());
   },[dispatch]);

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

      <div className="nav-hero hero-inner">
        <div className="container">
          <div className=" align-items-center">
      <nav className="site-nav container">
        <div className="container align-items-center">
          <table className="">

          <th>
            
          <div className="site-navigation">
          <td>
            <Link to="/" className="logo m-0">
              GR AIR
            </Link>
            {/* 메뉴들 시작 */}
          </td>
          <td>
            <ul className="js-clone-nav d-none d-lg-inline-block site-menu">

              {/* home 메뉴 시작 */}
              <li className="has-children">
                <a href="#">항공권</a>
                <ul className="dropdown">
                  <li>
                    <a href="#" >예약</a>
                  </li>
                  <li>
                    <a href="#">예약 조회</a>
                  </li>
                </ul>
              </li>
              {/* home 메뉴 끝 */}

              {/* home 메뉴 시작 */}
              <li className="">
                <Link to="/">체크인</Link>
              </li>
              {/* home 메뉴 끝 */}

              {/* home 메뉴 시작 */}
              <li className="">
                <Link to="/">마일리지</Link>
              </li>
              {/* home 메뉴 끝 */}

              {/* 드롭다운 메뉴 시작 */}
              <li className="has-children">
                <a href="#">고객센터</a>
                <ul className="dropdown">
                  <li>
                    <a href="#" >공지사항</a>
                  </li>
                  <li>
                    <a href="#">자주 묻는 질문</a>
                  </li>
                  <li>
                    <a href="#">1:1 문의</a>
                  </li>
                </ul>
              </li>
              {/* 드롭다운 메뉴 끝 */}
            </ul>
            

            </td>
            {/* 메뉴들 끝 */}
            {!currentUser &&
            <>
            <td>
              <ul className="js-clone-nav d-none d-lg-inline-block site-menu">

              {/* home 메뉴 시작 */}
                  <li>
                    <Link to="/login" >로그인</Link>
                  </li>
                  <li>
                    <Link to="/register">회원가입</Link>
                  </li>
              {/* home 메뉴 끝 */}
              </ul>
              
            </td>
            </>
            }
            {currentUser &&
            <>
            <td >
              <ul className="js-clone-nav d-none d-lg-inline-block site-menu">

              {/* home 메뉴 시작 */}
                  {currentUser.right == "ROLE_ADMIN"&&<li>
                    <Link to="/admin" >관리자</Link>
                  </li>}
                  {currentUser.right === "ROLE_USER"&&<li>
                    <Link to="/user-info" >유저 정보</Link>
                  </li>}
                  <li>
                    <Link to="#" onClick={logOut}>로그아웃</Link>
                  </li>
              {/* home 메뉴 끝 */}
              </ul>
              
            </td>
            </>
            }

            <a
              href="#"
              className="burger ml-auto float-right site-menu-toggle js-menu-toggle d-inline-block d-lg-none light"
              data-toggle="collapse"
              data-target="#main-navbar"
              >
              <span></span>
            </a>
          </div>
              </th>
          </table>
        </div>
      </nav>
      </div>
      </div>
      </div>
      {/* <!-- 메뉴 끝 --> */}
    </>
  );
}

export default Nav;
