import React from 'react'
import { detect }  from 'detect-browser'

import { Header , SubHeader } from '../../config/textStyle'

const InCorrectDevice = () => {
  const browser = detect();
  
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <Header>ขออภัย กรุณาเปิดในมือถือน้าา</Header>
      <SubHeader>({browser.os})</SubHeader>
    </div>
  )
}

export default InCorrectDevice
