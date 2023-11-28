import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import INotice from '../../../../types/tour/INotice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';

function AdminNoticeEdit() {

    const { user: currentUser } = useSelector((state:RootState)=> state.auth);

    const initNotice = {
        noticeId: "",
    noticeWriter: currentUser?.memberName,
    noticeContent: "",
    noticeTitle: "",
    memberId: currentUser?.memberId
    }

    const [notice, setNotice] = useState(initNotice)

    const {id} = useParams();

    useEffect(()=>{
        if (id != undefined && id)
        setNotice({...notice, noticeId:id})
    },[])

  return (
    <div>
        제목
        <input type='text'></input>

    </div>
  )
}

export default AdminNoticeEdit