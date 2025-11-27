import Image from "next/image";

export default function BannerShapes() {
  return (
    <>
      <Image
        src="/assets/images/shapes/shape1.png"
        alt=""
        width={48}
        height={48}
        className="shape one animation-rotation d-none d-lg-block"
        priority
      />
      <Image
        src="/assets/images/shapes/shape2.png"
        alt=""
        width={48}
        height={48}
        className="shape two animation-scalation d-none d-lg-block"
        priority
      />
      <Image
        src="/assets/images/shapes/shape3.png"
        alt=""
        width={48}
        height={48}
        className="shape three animation-walking d-none d-lg-block"
        priority
      />
      <Image
        src="/assets/images/shapes/shape4.png"
        alt=""
        width={48}
        height={48}
        className="shape four animation-scalation d-none d-lg-block"
        priority
      />
      <Image
        src="/assets/images/shapes/shape5.png"
        alt=""
        width={48}
        height={48}
        className="shape five animation-walking d-none d-lg-block"
        priority
      />
    </>
  );
}
