import React, { useEffect, useState } from "react";
import Image from 'next/image'
import * as arrowdown from "../../config/animations/arrowdown.json";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: arrowdown,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

const InstallPWA = () => {

  return (
    <div className="flex flex-col justify-around h-screen " style={{ backgroundColor: "#FFFFFF"}}>
      <div className="flex justify-center">
        <Image
          alt={"Parfet Image"}
          src={"/images/logo_parfet_512.png"}
          width={"192px"}
          height={"192px"}
        />
      </div>
      <div className="text-lg text-center font-thin">
        กดที่ปุ่ม
        <Image
          alt={"iOS Share"}
          src={"/images/iOSShare.png"}
          width={"30px"}
          height={"30px"}
        />
        <span className="ml-1">ที่ด้านล่างของจอ</span> <br />
        แล้วเลื่อนเมนูจนเจอคำสั่ง  <br />
        <span className="font-bold">'เพิ่มที่หน้าจอหลัก'</span> <br />
        หรือ <span className="font-bold">'Add to home screen'</span><br />
        จากนั้นกดที่คำสั่งดังกล่าว
      </div>
      <FadeIn className="mb-8">
        <div className="flex items-center">
          <Lottie options={defaultOptions} height={50} width={50} />
        </div>
      </FadeIn>
    </div>
  );
}

export default InstallPWA
