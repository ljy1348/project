import React from 'react'

function MileList() {
  return (
    <div>
  <svg width="200" height="50" xmlns="http://www.w3.org/2000/svg">
    {/* 화살표 몸통(직선) */}
  <line x1="10" y1="25" x2="50" y2="25" stroke="black" stroke-width="2"/>
  {/* 화살표 머리 */}
  <polyline points="40,15 50,25 40,35" stroke="black" stroke-width="2" fill="none"/>
</svg>
  </div>
  )
}

export default MileList