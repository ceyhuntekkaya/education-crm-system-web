import React from "react";
import Image from "next/image";

export const VideoShapes: React.FC = () => {
  return (
    <div className="video-page-shapes">
      <span className="shape one animation-rotation">
        <Image
          src="/assets/images/shapes/shape1.png"
          alt="shape"
          width={80}
          height={80}
        />
      </span>
      <span className="shape two animation-scalation">
        <Image
          src="/assets/images/shapes/shape2.png"
          alt="shape"
          width={80}
          height={80}
        />
      </span>
      <span className="shape four animation-upDown">
        <Image
          src="/assets/images/shapes/shape4.png"
          alt="shape"
          width={80}
          height={80}
        />
      </span>
    </div>
  );
};

