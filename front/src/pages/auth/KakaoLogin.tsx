import React, { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../store/store';
import { googlelogin, kakaologin, naverlogin } from '../../store/slices/auth';
import initScripts from '../../assets/js/scripts';
import initCustom from '../../assets/js/custom';
import Spinner from 'react-bootstrap/Spinner';
import { useSelector } from 'react-redux';

function Oauth() {

  let navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {app} = useParams();

  const { user: currentUser } = useSelector((state:RootState)=> state.auth);

    useEffect(()=>{
      // 제이쿼리 스크립트 호출

        const code = new URL(window.location.href).searchParams.get("code");
        
        console.log(code);
        if (currentUser) {
          // alert(currentUser.memberName);
          if (currentUser.memberName === null || currentUser.memberName === undefined || currentUser.memberName === "") navigate("/user-info");
          else navigate("/");
          return
        }
        let applogin = null;
        if (code) {
          if (app==="kakao")
          dispatch(kakaologin(code))
          .unwrap()    // 리덕스의 공유함수 에러처리를 실행하게 하는 함수
          .then(()=>{
            // alert(currentUser?.memberId);
            // window.location.href = '/user-info';
          })
          .catch((e:Error)=>{
          console.log(e);
        });

        if (app==="naver")
        dispatch(naverlogin(code))
        .unwrap()    // 리덕스의 공유함수 에러처리를 실행하게 하는 함수
        .then(()=>{
          // alert("로그인 성공했습니다.");
          // 강제 /home 페이지 이동
          // window.location.href = '/user-info';
          // js : 페이지 새로고침
        })
        .catch((e:Error)=>{
        console.log(e);
      });

      if (app==="google")
      dispatch(googlelogin(code))
      .unwrap()    // 리덕스의 공유함수 에러처리를 실행하게 하는 함수
      .then(()=>{
        // alert("로그인 성공했습니다.");
        // 강제 /home 페이지 이동
        // window.location.href = '/user-info';
        // js : 페이지 새로고침
      })
      .catch((e:Error)=>{
      console.log(e);
    });
      }
        
    },[currentUser])

  return (
    <div>
<div id="overlayer"></div>
      <div className="loader">
        <div className="spinner-border" role="status" />
          <span className="sr-only">Loading...</span>
        </div>
      </div>
  )
}

export default Oauth