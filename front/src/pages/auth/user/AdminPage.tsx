import React from 'react'
import { Nav } from 'react-bootstrap'

function AdminPage() {
  return (
    <div>
       <div className="hero hero-inner">
        <div className="container">
          <div className=" align-items-center">
            <div className="col-lg-6 mx-auto text-center">
              <div className="intro-wrap">
                <h1 className="mb-0">관리자</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>

      <Nav fill variant="tabs" defaultActiveKey="link-0">
      <Nav.Item>

        <Nav.Link eventKey="link-0">예약 관리</Nav.Link>

      </Nav.Item>
      <Nav.Item>

        <Nav.Link eventKey="link-1">항공기 관리</Nav.Link>

      </Nav.Item>
      <Nav.Item>

        <Nav.Link eventKey="link-2">체크인 관리</Nav.Link>

      </Nav.Item>
      <Nav.Item>

        <Nav.Link eventKey="link-3">
          수화물 관리
        </Nav.Link>
        </Nav.Item>
        <Nav.Item>
        <Nav.Link eventKey="link-4">
          회원 관리
        </Nav.Link>
      </Nav.Item>
    </Nav>
      </div>
    </div>
  )
}

export default AdminPage