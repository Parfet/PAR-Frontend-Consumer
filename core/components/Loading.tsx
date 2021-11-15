import React, { useEffect, useState } from "react";
import * as loadingData from "../config/animations/loading.json";
import * as loadingWhite from "../config/animations/whiteLoading.json";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";

interface LoadingProps {
  isWhite?: boolean
  isFull?: boolean
}

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loadingData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

const whiteOption = {
  loop: true,
  autoplay: true,
  animationData: loadingWhite,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

const Loading = (props: LoadingProps) => {
  const { isWhite, isFull } = props

  return (
    <div className="App">
      <header className="App-header">
          <FadeIn>
          <div className={`flex h-screen ${isFull ? 'items-center' : 'items-start pt-40'}`}>
              {
                isWhite ?
                <Lottie options={whiteOption} height={140} width={140} />
                : <Lottie options={defaultOptions} height={140} width={140} />
              }
            </div>
          </FadeIn>
      </header>
    </div>
  );
}

export default Loading
