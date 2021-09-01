import React, { useEffect, useState } from "react";
import * as loadingData from "../config/loading.json";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loadingData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

const Loading = () => {

  return (
    <div className="App">
      <header className="App-header">
          <FadeIn>
            <div className="flex h-screen items-center">
              <Lottie options={defaultOptions} height={140} width={140} />
            </div>
          </FadeIn>
      </header>
    </div>
  );
}

export default Loading
