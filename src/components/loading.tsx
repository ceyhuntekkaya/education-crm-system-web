import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="preloader">
      <img
        src="/assets/images/icons/preloader.gif"
        loading="lazy"
        alt="Loading..."
      />
    </div>
  );
};

export default Loading;
