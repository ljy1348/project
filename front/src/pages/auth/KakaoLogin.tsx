import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../store/store';
import { googlelogin, kakaologin, naverlogin } from '../../store/slices/auth';

function Oauth() {

  let navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {app} = useParams();

    useEffect(()=>{
        const code = new URL(window.location.href).searchParams.get("code");
        console.log(code);
        let applogin = null;
        if (code) {
          if (app==="kakao")
          dispatch(kakaologin(code))
          .unwrap()    // 리덕스의 공유함수 에러처리를 실행하게 하는 함수
          .then(()=>{
            // alert("로그인 성공했습니다.");
            // 강제 /home 페이지 이동
            navigate("/");
            window.location.reload();
            // js : 페이지 새로고침
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
          navigate("/");
          window.location.reload();
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
        navigate("/");
        window.location.reload();
        // js : 페이지 새로고침
      })
      .catch((e:Error)=>{
      console.log(e);
    });
      }
        
    },[])

  return (
    <></>
  )
}

export default Oauth