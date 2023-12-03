import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState, useAppDispatch } from "../../store/store";
import { logout } from "../../store/slices/auth";

function Nav() {

  const { user: currentUser } = useSelector((state:RootState)=> state.auth);

  const dispatch = useAppDispatch();

  // 리액트 성능개선을 위한 함수 : useCallback() : 캐싱됨
  const logOut = useCallback(() => { 
    dispatch(logout());
   },[dispatch]);

   const navi = useNavigate();
  

  return (
    <>
      {/* <!-- 메뉴 시작 --> */}
      <nav className="site-nav">
        <div className="container">
          <div className="site-navigation">
            {/* 메뉴들 시작 */}
            <ul
              className="js-clone-nav d-none d-lg-inline-block text-left site-menu"
            >
              <Link to="/" className="logo">
                <img src="/images/그린에어로고.png" className="main-logo-image" />
                GreanAir
              </Link>
              

              {/* 예약 메뉴 시작 */}
              <li>
                <Link to="/reserve">예약</Link>
              </li>
              {/* 예약 메뉴 끝 */}

              {/* 예약 조회 메뉴 시작 */}
              <li>
                <Link to="/search-reservation">예약 조회</Link>
              </li>
              {/* 예약 조회 메뉴 끝 */}

              {/* 체크인 메뉴 시작 */}
              <li>
                <Link to="/checkin">체크인</Link>
              </li>
              {/* 체크인 메뉴 끝 */}

              {/* 드롭다운 메뉴 시작 */}
              <li className="has-children">
                <Link to="cucenter">고객센터</Link>
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
              {/* 드롭다운 메뉴 끝 */}

              {/* <ul className="js-clone-nav d-none d-lg-inline-block site-menu"> */}
              {/* home 메뉴 시작 */}


              {/* <ul className="js-clone-nav d-none d-lg-inline-block site-menu"> */}
                {/* home 메뉴 시작 */}

                <ul className="login_menubar" style={{width:"160px"}}>
                  {!currentUser&&<>
                    <li>
                  <Link to="/login">로그인</Link>
                </li>
                <li>
                  <Link to="/register">
                    <p>회원가입</p></Link>
                </li>
                  </>
                }
                {currentUser&&<>
                    <li>
                  <Link to="/"onClick={()=>{logOut();}}>로그아웃</Link>
                </li>
                { currentUser.memberAuth ==="ROLE_USER" ?
                <li>
                  <Link to="/user-info">
                    <p>마이페이지</p></Link>
                </li> :
                <li>
                <Link to="/admin">
                  <p>관리자</p></Link>
              </li>
                }
                  </>
                }

                {/* home 메뉴 끝 */}
              </ul>
            </ul>
            {/* </ul> */}

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
