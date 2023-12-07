import React, { useEffect, useState } from 'react'
import AdminService from '../../../../services/auth/adminService';
import IOperationinfo from '../../../../types/operationInfo/IOperationinfo';

function OperationInfo({setSelectTab, dataId}:{setSelectTab:any, dataId:any}) {
    const initOperationInfo = {
        operationId:null,
        airline: "",
        flightName: "",
        startAirport: "",
        finalAirport: "",
        startTime: "",
        finalTime: "",
        operationDate: "",
        startDate: new Date().toISOString(),
        finalDate: new Date().toISOString(),
        domesticInternational:"",
        price:"",  
    }

    const [startDate, setStartDate] = useState("");
    const [finalDate, setFinalDate] = useState("");

    const [selectedDate, setSelectedDate] = useState("");
    const [operationInfo, setOperationInfo] = useState<IOperationinfo>(initOperationInfo);
    const [isModal, setIsModal] = useState(false);

    const onDelete = () => { 
      AdminService.deleteOperationInfo(dataId)
      .then((response)=>{
        setSelectTab("항공");
      })
      .catch((e:Error)=>{console.log(e)})
     }

    const onchangeInput = (e:any) => {
        const {name, value} = e.target;

        if (name === "startDate") {
            setStartDate(value);
            setOperationInfo({...operationInfo, startDate:new Date(value)})
            return
        }
        if (name === "finalDate") {setFinalDate(value);
            setOperationInfo({...operationInfo, finalDate:(new Date(value))})
            return
        }

        setOperationInfo({...operationInfo, [name]:value});
    }


    const onSubmit = () => {
      if (operationInfo)
      AdminService.createOperationInfo(operationInfo)
      .then((response:any)=>{
        setSelectTab("항공");
      })
      .catch((error:Error)=>{console.log(error)})
    }

    useEffect (()=>{
        if (dataId) {
            AdminService.getOperationInfo(dataId)
            .then((response:any)=>{
            setOperationInfo(response.data);
            setStartDate(response.data.startDate.split("T")[0])
            setFinalDate(response.data.finalDate.split("T")[0])
            })
            .catch((e:Error)=>{console.log(e)})
        }
    },[])

  return (
    <div>
    <form className='col-6 container mt-4'>
    <label htmlFor="Full Name">항공사</label>
    <input type='text' id='airline' className='form-control form-control-user mb-3' placeholder='airline' value={operationInfo?.airline} name="airline" onChange={onchangeInput}></input>
    <label htmlFor="flightName">항공기</label>
    <input type='text' className='form-control form-control-user mb-3' placeholder='flightName' value={operationInfo.flightName} name="flightName" onChange={onchangeInput}></input>
    <label htmlFor="startTime">출발 시간</label>
    <input type='text' className='form-control form-control-user mb-3' placeholder='startTime' value={operationInfo.startTime} name="startTime" onChange={onchangeInput}></input>
    <label htmlFor="finalTime">도착 시간</label>
    <input type='text' className='form-control form-control-user mb-3' placeholder='finalTime' value={operationInfo.finalTime} name="finalTime" onChange={onchangeInput}></input>
    <label htmlFor="finalTime">운행 요일</label>
    <input type='text' className='form-control form-control-user mb-3' placeholder='operationDate' value={operationInfo.operationDate} name="operationDate" onChange={onchangeInput}></input>
    <label htmlFor="startAirport">출발 공항</label>
    <input type='text' className='form-control form-control-user mb-3' placeholder='startAirport' value={operationInfo.startAirport} name="startAirport" onChange={onchangeInput}></input>
    <label htmlFor="finalAirport">도착 공항</label>
    <input type='text' className='form-control form-control-user mb-3' placeholder='finalAirport' value={operationInfo.finalAirport} name="finalAirport" onChange={onchangeInput}></input>
    <label htmlFor="startDate">시작 날짜</label>
    <input type='date' className='form-control form-control-user mb-3' placeholder='startDate' value={startDate} name="startDate" onChange={onchangeInput}></input>
    <label htmlFor="finalDate">종료 날짜</label>
    <input type='date' className='form-control form-control-user mb-3' placeholder='finalDate' value={finalDate} name="finalDate" onChange={onchangeInput}></input>
    <label htmlFor="domesticInternational">국제</label>
    <input type='text' className='form-control form-control-user mb-3' placeholder='domesticInternational' value={operationInfo.domesticInternational} name="domesticInternational" onChange={onchangeInput}></input>
    <label htmlFor="price">운임</label>
    <input type='text' className='form-control form-control-user mb-3' placeholder='price' value={operationInfo.price} name="price" onChange={onchangeInput}></input>

    </form>
    <div className='row col-6 container mx-auto'>

    <button className='btn btn-danger btn-user mx-auto col-4' onClick={onDelete}>운행 정보 삭제</button>
    <button className='btn btn-primary btn-user mx-auto col-4' onClick={onSubmit}>운행 정보 수정</button>
    </div>
    </div>
  )
}

export default OperationInfo