import React, { useEffect, useState } from "react";
import styled from 'styled-components'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { detect } from 'detect-browser'
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import * as arrowdown from "../../config/animations/arrowdown.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: arrowdown,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

const Background = styled.div`
  height: 90vh;
  background-color: #FFFFFF;
  overflow-y: hidden;
`

const InstallPWA = () => {
  const browser = detect();

  return (
    <Background className="flex flex-col justify-between pt-8">
      <div className={`flex justify-center ` 
        + (browser.os === "iOS"? 'mt-8': '')}>
        <Image
          alt={"Parfet Image"}
          src={"/images/tran_logo_parfet_512.png"}
          width={"192px"}
          height={"192px"}
        />
      </div>
      {
        browser.os === 'iOS' && browser.name != 'ios' ?
          <div className="text-lg text-center">
            กรุณาใช้ Safari ในการเข้าสู่ PARFET
          </div>
        :
          <div className="text-lg text-center font-thin">
            กดที่ปุ่ม
            <Image
              alt={"menu"}
              src={`/images/${browser.os === "iOS" ? 'iOSShare' : 'KebabMenu'}.png`}
              width={"30px"}
              height={"30px"}
            />
            <span className="ml-1">ที่{browser.os === "iOS" ? 'ด้านล่างของจอ' : 'แถบเครื่องมือ'}</span> <br />
            แล้วเลื่อนเมนูจนเจอคำสั่ง  <br />
            <span className="font-bold">'เพิ่มที่หน้าจอหลัก'</span> <br />
            หรือ <span className="font-bold">'Add to home screen'</span><br />
            จากนั้นกดที่คำสั่งดังกล่าว
          </div>
      }
      
      {
        browser.os === "iOS" && browser.name === 'ios' ?
        <FadeIn className="mt-8">
        <div className="flex items-center">
          <Lottie options={defaultOptions} height={50} width={50} />
        </div>
      </FadeIn> : <div></div>
      }
    </Background>
  );
}

export default InstallPWA
