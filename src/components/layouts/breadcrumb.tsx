import Link from "next/link";
import Image from "next/image";

const Breadcrumb = ({ title }: { title: string }) => {
  return (
    <section className="breadcrumb py-60 bg-main-25 position-relative z-1 overflow-hidden mb-0">
      <Image
        src="/assets/images/shapes/shape1.png"
        alt="Shape 1"
        width={51}
        height={50}
        className="shape one animation-rotation d-md-block d-none"
        priority
      />
      <Image
        src="/assets/images/shapes/shape2.png"
        alt="Shape 2"
        width={103}
        height={116}
        className="shape two animation-scalation d-md-block d-none"
        priority
      />
      <Image
        src="/assets/images/shapes/shape3.png"
        alt="Shape 3"
        width={72}
        height={70}
        className="shape eight animation-walking d-md-block d-none"
        priority
      />
      <Image
        src="/assets/images/shapes/shape5.png"
        alt="Shape 5"
        width={74}
        height={70}
        className="shape six animation-walking d-md-block d-none"
        priority
      />
      <Image
        src="/assets/images/shapes/shape4.png"
        alt="Shape 4"
        width={31}
        height={31}
        className="shape four animation-scalation"
        priority
      />
      <Image
        src="/assets/images/shapes/shape4.png"
        alt="Shape 4"
        width={31}
        height={31}
        className="shape nine animation-scalation"
        priority
      />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="breadcrumb__wrapper">
              <h1 className="breadcrumb__title display-4 fw-semibold text-center">
                {title}
              </h1>
              <ul className="breadcrumb__list d-flex align-items-center justify-content-center gap-4">
                <li className="breadcrumb__item">
                  <Link
                    href="/"
                    className="breadcrumb__link text-neutral-500 hover-text-main-600 fw-medium d-flex align-items-center gap-4"
                  >
                    <i className="text-lg d-inline-flex ph-bold ph-house" />
                    Ana Sayfa
                  </Link>
                </li>

                <li className="breadcrumb__item ">
                  <i className="text-neutral-500 d-flex ph-bold ph-caret-right" />
                </li>
                <li className="breadcrumb__item">
                  <span className="text-main-two-600">{title}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Breadcrumb;
