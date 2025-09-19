import React from "react";
import Image from "next/image";

const Loading: React.FC = () => {
  return (
    <div className="preloader">
      <Image
        src="/assets/images/icons/preloader.gif"
        alt="Loading..."
        width={50}
        height={50}
        priority
      />
    </div>
  );
};

export default Loading;
