import Image from "next/image";

// app/loading.js
export default function LoadingLayout() {
  return (
    <div className="preloader">
      <Image
        src="/assets/images/icons/preloader.gif"
        loading="lazy"
        alt="Loading..."
        width={340}
        height={340}
      />
    </div>
  );
}
