import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="footer bg-main-25 position-relative z-1">
      {/* <Image
        src="/assets/images/shapes/shape2.png"
        alt=""
        width={50}
        height={50}
        className="shape five animation-scalation"
      />
      <Image
        src="/assets/images/shapes/shape6.png"
        alt=""
        width={50}
        height={50}
        className="shape one animation-scalation"
      /> */}
      {/* <div className="py-120 ">
        <div className="container container-two">
          <div className="row row-cols-xxl-5 row-cols-lg-3 row-cols-sm-2 row-cols-1 gy-5">
            <div className="col" data-aos="fade-up" data-aos-duration={300}>
              <div className="footer-item">
                <div className="footer-item__logo">
                  <Link href="/">
                    {" "}
                    <Image
                      src="/assets/images/logo/logo.png"
                      alt="Logo"
                      width={120}
                      height={40}
                    />
                  </Link>
                </div>
                <p className="my-32">
                  EduAll exceeded all my expectations! The instructors were not
                  only experts
                </p>
                <ul className="social-list flex-align gap-24">
                  <li className="social-list__item">
                    <Link
                      href="https://www.facebook.com"
                      className="text-main-600 text-2xl hover-text-main-two-600"
                    >
                      <i className="ph-bold ph-facebook-logo" />
                    </Link>
                  </li>
                  <li className="social-list__item">
                    <Link
                      href="https://www.twitter.com"
                      className="text-main-600 text-2xl hover-text-main-two-600"
                    >
                      {" "}
                      <i className="ph-bold ph-twitter-logo" />
                    </Link>
                  </li>
                  <li className="social-list__item">
                    <Link
                      href="https://www.linkedin.com"
                      className="text-main-600 text-2xl hover-text-main-two-600"
                    >
                      <i className="ph-bold ph-instagram-logo" />
                    </Link>
                  </li>
                  <li className="social-list__item">
                    <Link
                      href="https://www.pinterest.com"
                      className="text-main-600 text-2xl hover-text-main-two-600"
                    >
                      <i className="ph-bold ph-pinterest-logo" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col" data-aos="fade-up" data-aos-duration={400}>
              <div className="footer-item">
                <h4 className="footer-item__title mb-32">Navigation</h4>
                <ul className="footer-menu">
                  <li className="mb-16">
                    <Link
                      href="/about"
                      className="text-neutral-500 hover-text-main-600 hover-text-decoration-underline"
                    >
                      About us
                    </Link>
                  </li>
                  <li className="mb-16">
                    <Link
                      href="/courses"
                      className="text-neutral-500 hover-text-main-600 hover-text-decoration-underline"
                    >
                      Courses
                    </Link>
                  </li>
                  <li className="mb-16">
                    <Link
                      href="/instructor"
                      className="text-neutral-500 hover-text-main-600 hover-text-decoration-underline"
                    >
                      Instructor
                    </Link>
                  </li>
                  <li className="mb-16">
                    <Link
                      href="/faq"
                      className="text-neutral-500 hover-text-main-600 hover-text-decoration-underline"
                    >
                      FAQs
                    </Link>
                  </li>
                  <li className="mb-0">
                    <Link
                      href="/blog"
                      className="text-neutral-500 hover-text-main-600 hover-text-decoration-underline"
                    >
                      Blogs
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col" data-aos="fade-up" data-aos-duration={600}>
              <div className="footer-item">
                <h4 className="footer-item__title mb-32">Category</h4>
                <ul className="footer-menu">
                  <li className="mb-16">
                    <Link
                      href="/courses"
                      className="text-neutral-500 hover-text-main-600 hover-text-decoration-underline"
                    >
                      UI/UX Design
                    </Link>
                  </li>
                  <li className="mb-16">
                    <Link
                      href="/courses"
                      className="text-neutral-500 hover-text-main-600 hover-text-decoration-underline"
                    >
                      Web Development
                    </Link>
                  </li>
                  <li className="mb-16">
                    <Link
                      href="/courses"
                      className="text-neutral-500 hover-text-main-600 hover-text-decoration-underline"
                    >
                      Python Development
                    </Link>
                  </li>
                  <li className="mb-16">
                    <Link
                      href="/courses"
                      className="text-neutral-500 hover-text-main-600 hover-text-decoration-underline"
                    >
                      Digital Marketing
                    </Link>
                  </li>
                  <li className="mb-16">
                    <Link
                      href="/courses"
                      className="text-neutral-500 hover-text-main-600 hover-text-decoration-underline"
                    >
                      Graphic Design
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col" data-aos="fade-up" data-aos-duration={800}>
              <div className="footer-item">
                <h4 className="footer-item__title mb-32">Contact Us</h4>
                <div className="flex-align gap-20 mb-24">
                  <span className="icon d-flex text-32 text-main-600">
                    <i className="ph ph-phone" />
                  </span>
                  <div className="">
                    <Link
                      href="/tel:(207)555-0119"
                      className="text-neutral-500 d-block hover-text-main-600 mb-4"
                    >
                      (207) 555-0119
                    </Link>
                    <Link
                      href="/tel:(704)555-0127"
                      className="text-neutral-500 d-block hover-text-main-600 mb-0"
                    >
                      (704) 555-0127
                    </Link>
                  </div>
                </div>
                <div className="flex-align gap-20 mb-24">
                  <span className="icon d-flex text-32 text-main-600">
                    <i className="ph ph-envelope-open" />
                  </span>
                  <div className="">
                    <Link
                      href="/mailto:dwallo@gmail.com"
                      className="text-neutral-500 d-block hover-text-main-600 mb-4"
                    >
                      dwallo@gmail.com
                    </Link>
                    <Link
                      href="/mailto:eduAll@gmail.com"
                      className="text-neutral-500 d-block hover-text-main-600 mb-0"
                    >
                      eduAll@gmail.com
                    </Link>
                  </div>
                </div>
                <div className="flex-align gap-20 mb-24">
                  <span className="icon d-flex text-32 text-main-600">
                    <i className="ph ph-map-trifold" />
                  </span>
                  <div className="">
                    <span className="text-neutral-500 d-block mb-4">
                      5488 srker Rd .
                    </span>
                    <span className="text-neutral-500 d-block mb-0">
                      8745 doer Dr.
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col" data-aos="fade-up" data-aos-duration={1000}>
              <div className="footer-item">
                <h4 className="footer-item__title mb-32">Subscribe Here</h4>
                <p className="text-neutral-500">
                  Enter your email address to register to our newsletter
                  subscription
                </p>
                <form action="#" className="mt-24 position-relative">
                  <input
                    type="email"
                    className="form-control bg-white shadow-none border border-neutral-30 rounded-pill h-52 ps-24 pe-48 focus-border-main-600"
                    placeholder="Email..."
                  />
                  <button
                    type="submit"
                    className="w-36 h-36 flex-center rounded-circle bg-main-600 text-white hover-bg-main-800 position-absolute top-50 translate-middle-y inset-inline-end-0 me-8"
                  >
                    <i className="ph ph-paper-plane-tilt" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="container">
        {/* bottom Footer */}
        <div className="bottom-footer bg-main-25 border-top border-dashed border-main-100 border-0 py-32">
          <div className="container container-two">
            <div className="bottom-footer__inner flex-between gap-3 flex-wrap">
              <div className="left-section">
                <p className="bottom-footer__text mb-2">
                  Copyright © 2025 <span className="fw-semibold">EduAll </span>
                  All Rights Reserved.
                </p>
                {/* <div className="footer-links">
                  <Link
                    href="#"
                    className="text-neutral-500 hover-text-main-600 hover-text-decoration-underline me-3"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="#"
                    className="text-neutral-500 hover-text-main-600 hover-text-decoration-underline"
                  >
                    Terms &amp; Conditions
                  </Link>
                </div> */}
              </div>
              <div className="right-section flex-align gap-24">
                <div className="footer-logo">
                  <Link href="/">
                    <Image
                      src="/assets/images/logo/logo.png"
                      alt="Logo"
                      width={100}
                      height={32}
                    />
                  </Link>
                </div>
                <ul className="social-list flex-align gap-16">
                  <li className="social-list__item">
                    <Link
                      href="https://www.facebook.com"
                      className="text-main-600 text-xl hover-text-main-two-600"
                    >
                      <i className="ph-bold ph-facebook-logo" />
                    </Link>
                  </li>
                  <li className="social-list__item">
                    <Link
                      href="https://www.twitter.com"
                      className="text-main-600 text-xl hover-text-main-two-600"
                    >
                      <i className="ph-bold ph-twitter-logo" />
                    </Link>
                  </li>
                  <li className="social-list__item">
                    <Link
                      href="https://www.instagram.com"
                      className="text-main-600 text-xl hover-text-main-two-600"
                    >
                      <i className="ph-bold ph-instagram-logo" />
                    </Link>
                  </li>
                  <li className="social-list__item">
                    <Link
                      href="https://www.linkedin.com"
                      className="text-main-600 text-xl hover-text-main-two-600"
                    >
                      <i className="ph-bold ph-linkedin-logo" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
