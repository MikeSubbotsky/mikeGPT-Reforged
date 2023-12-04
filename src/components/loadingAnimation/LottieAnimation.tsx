import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie';

interface LottieAnimationProps {
  animationPath: string; 
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({ animationPath }) => {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch(animationPath)
      .then(response => response.json())
      .then(data => setAnimationData(data));
  }, [animationPath]);

  if (!animationData) {
    return <div>Loading animation...</div>; 
  }

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="mx-1">
        <Lottie options={defaultOptions} height={20} width={20} />
      </div>
      <div className="mx-1">
        <Lottie options={defaultOptions} height={20} width={20} />
      </div>
      <div className="mx-1">
        <Lottie options={defaultOptions} height={20} width={20} />
      </div>
    </div>
  );
};

export default LottieAnimation;

