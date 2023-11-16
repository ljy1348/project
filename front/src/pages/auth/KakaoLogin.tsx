import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/store';
import { kakaologin } from '../../store/slices/auth';

function Oauth() {

  let navigate = useNavigate();
  const dispatch = useAppDispatch();

    useEffect(()=>{
        const code = new URL(window.location.href).searchParams.get("code");
        if (code)
        dispatch(kakaologin(code))
        .unwrap()    // 리덕스의 공유함수 에러처리를 실행하게 하는 함수
        .then(()=>{
          // alert("로그인 성공했습니다.");
          // 강제 /home 페이지 이동
          navigate("/");
          // window.location.reload();
          // js : 페이지 새로고침
        })
        .catch((e:Error)=>{
          console.log(e);
        });
      
    },[])

  return (
    <></>
  )
}

export default Oauth