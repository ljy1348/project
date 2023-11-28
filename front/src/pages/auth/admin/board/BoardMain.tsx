import React from 'react'
import { Link, Outlet, Route, Routes } from 'react-router-dom'
import AdminNotice from './AdminNotice'
import AdminFaq from './AdminFaq'
import AdminQuestion from './AdminQuestion'

function BoardMain() {
  return (
    <div>
        <table className='col-12 mx-auto text-center admin_board_main'>
            <tr className='col-12'>
                <td className='text-center col-2'><ul>
                <Link to={"/admin/notice"}><li className='m-2'>
                        공지사항
                        </li></Link>
                        <Link to={"/admin/faq"}>   <li className='m-2'>
                    자주 찾는 질문
                        </li></Link>
                        <Link to={"/admin/question"}>   <li className='m-2'>
                    1:1 문의
                        </li></Link>
                    
                    </ul>
                    </td>
                <td className='col-10'>
                    <Routes>
                    <Route path='/notice' element={<AdminNotice></AdminNotice>}></Route>
                    <Route path='/faq' element={<AdminFaq></AdminFaq>}></Route>
                    <Route path='/question' element={<AdminQuestion></AdminQuestion>}></Route>
                    </Routes>

                <Outlet/>
                </td>
                </tr>
        </table>
    </div>
  )
}

export default BoardMain