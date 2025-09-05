import Image from "next/image";

interface InstitutionSidebarProps {
  school: any;
  campus: any;
  renderStars: (rating: number) => JSX.Element;
}

export default function InstitutionSidebar({
  school,
  campus,
  renderStars,
}: InstitutionSidebarProps) {
  return (
    <div className="col-lg-4">
      {/* Profile Card */}
      <div className="border border-neutral-30 rounded-12 bg-white p-8">
        <div className="border border-neutral-30 rounded-12 bg-main-25 p-32">
          {/* Logo */}
          <div className="p-16 border border-neutral-50 rounded-circle aspect-ratio-1 max-w-150 max-h-150 mx-auto">
            <div className="position-relative">
              <Image
                src={school.logoUrl}
                alt={school.name}
                width={150}
                height={150}
                className="rounded-circle bg-dark-yellow aspect-ratio-1 cover-img"
              />
              <span className="w-32 h-32 bg-success-600 rounded-circle border border-main-25 border-3 flex-center text-white position-absolute inset-block-end-0 inset-inline-end-0 me-4">
                <i className="ph-bold ph-check" />
              </span>
            </div>
          </div>

          <h4 className="mb-16 text-center mt-40">{school.name}</h4>

          <div className="flex-center gap-10 flex-wrap my-20">
            <span className="text-neutral-500 text-md">
              ID: <span className="text-main-600 fw-medium">#{school.id}</span>
            </span>
            <span className="w-4 h-4 bg-main-600 rounded-circle" />
            <span className="text-neutral-500 text-md">
              Tür:{" "}
              <span className="text-main-600 fw-medium">
                {school.institutionType.displayName}
              </span>
            </span>
            <span className="w-4 h-4 bg-main-600 rounded-circle" />
            <div className="flex-align gap-4">
              {renderStars(school.ratingAverage)}
              <span className="text-md text-neutral-700 ms-8">
                {school.ratingAverage}
                <span className="text-neutral-100">
                  {" "}
                  ({school.ratingCount})
                </span>
              </span>
            </div>
          </div>

          {/* Hızlı Bilgiler */}
          <div className="row g-8 mb-20">
            <div className="col-6 mb-16">
              <div className="text-center p-12 bg-white rounded-8 border border-neutral-100">
                <div className="text-lg fw-bold text-main-600 mb-4">
                  {school.currentStudentCount}
                </div>
                <p className="text-xs text-neutral-600 mb-0">Öğrenci</p>
              </div>
            </div>
            <div className="col-6 mb-16">
              <div className="text-center p-12 bg-white rounded-8 border border-neutral-100">
                <div className="text-lg fw-bold text-success-600 mb-4">
                  {school.classSizeAverage}
                </div>
                <p className="text-xs text-neutral-600 mb-0">Sınıf Ort.</p>
              </div>
            </div>
            <div className="col-6 mb-16">
              <div className="text-center p-12 bg-white rounded-8 border border-neutral-100">
                <div className="text-lg fw-bold text-warning-600 mb-4">
                  {school.viewCount > 1000
                    ? `${(school.viewCount / 1000).toFixed(1)}K`
                    : school.viewCount}
                </div>
                <p className="text-xs text-neutral-600 mb-0">Görüntülenme</p>
              </div>
            </div>
            <div className="col-6 mb-16">
              <div className="text-center p-12 bg-white rounded-8 border border-neutral-100">
                <div className="text-lg fw-bold text-danger-600 mb-4">
                  {school.likeCount}
                </div>
                <p className="text-xs text-neutral-600 mb-0">Beğeni</p>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <ul className="social-list flex-center gap-16 mt-28">
            <li className="social-list__item">
              <a
                href={campus.facebookUrl}
                className="text-main-600 text-xl hover-text-white w-40 h-40 rounded-circle border border-main-600 hover-bg-main-600 flex-center"
              >
                <i className="ph-bold ph-facebook-logo" />
              </a>
            </li>
            <li className="social-list__item">
              <a
                href={campus.twitterUrl}
                className="text-main-600 text-xl hover-text-white w-40 h-40 rounded-circle border border-main-600 hover-bg-main-600 flex-center"
              >
                <i className="ph-bold ph-twitter-logo" />
              </a>
            </li>
            <li className="social-list__item">
              <a
                href={campus.instagramUrl}
                className="text-main-600 text-xl hover-text-white w-40 h-40 rounded-circle border border-main-600 hover-bg-main-600 flex-center"
              >
                <i className="ph-bold ph-instagram-logo" />
              </a>
            </li>
            <li className="social-list__item">
              <a
                href={campus.linkedinUrl}
                className="text-main-600 text-xl hover-text-white w-40 h-40 rounded-circle border border-main-600 hover-bg-main-600 flex-center"
              >
                <i className="ph-bold ph-linkedin-logo" />
              </a>
            </li>
          </ul>

          <span className="d-block border border-neutral-30 my-20 border-dashed" />

          {/* Contact Information */}
          <div className="d-flex flex-column gap-16">
            <div className="flex-align gap-16">
              <span className="text-2xl text-main-600">
                <i className="ph-bold ph-phone-call" />
              </span>
              <div className="d-flex flex-column">
                <a
                  href={`tel:${school.phone}`}
                  className="text-neutral-700 hover-text-main-600"
                >
                  {school.phone}
                </a>
                {school.extension && (
                  <small className="text-neutral-500">
                    Dahili: {school.extension}
                  </small>
                )}
              </div>
            </div>
            <div className="flex-align gap-16">
              <span className="text-2xl text-success-600">
                <i className="ph-bold ph-envelope-simple" />
              </span>
              <a
                href={`mailto:${school.email}`}
                className="text-neutral-700 hover-text-main-600"
              >
                {school.email}
              </a>
            </div>
            <div className="flex-align gap-16">
              <span className="text-2xl text-warning-600">
                <i className="ph-bold ph-map-pin-line" />
              </span>
              <span className="text-neutral-700">
                {campus.addressLine1}, {campus.district.name},{" "}
                {campus.province.name}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="border border-neutral-30 rounded-12 bg-white p-8 mt-24">
        <div className="border border-neutral-30 rounded-12 bg-main-25 p-32">
          <h4 className="mb-16">İletişime Geç</h4>
          <span className="d-block border border-neutral-30 my-24 border-dashed" />
          <form action="#" className="d-flex flex-column gap-20">
            <div className="">
              <label
                htmlFor="myName"
                className="text-lg fw-semibold text-neutral-700 mb-8"
              >
                İsim
              </label>
              <input
                type="text"
                className="common-input border-transparent rounded-pill focus-border-main-600"
                id="myName"
                placeholder="İsminizi girin..."
              />
            </div>
            <div className="">
              <label
                htmlFor="Email"
                className="text-lg fw-semibold text-neutral-700 mb-8"
              >
                Email
              </label>
              <input
                type="email"
                className="common-input border-transparent rounded-pill focus-border-main-600"
                id="Email"
                placeholder="Email adresinizi girin..."
              />
            </div>
            <div className="">
              <label
                htmlFor="Phone"
                className="text-lg fw-semibold text-neutral-700 mb-8"
              >
                Telefon
              </label>
              <input
                type="tel"
                className="common-input border-transparent rounded-pill focus-border-main-600"
                id="Phone"
                placeholder="Telefon numaranızı girin..."
              />
            </div>
            <div className="">
              <label
                htmlFor="Message"
                className="text-lg fw-semibold text-neutral-700 mb-8"
              >
                Mesaj
              </label>
              <textarea
                className="common-input border-transparent rounded-24 focus-border-main-600"
                id="Message"
                placeholder="Mesajınızı girin..."
                defaultValue={""}
              />
            </div>
            <div className="">
              <button
                type="submit"
                className="btn btn-main rounded-pill flex-center gap-8 mt-20"
              >
                Mesaj Gönder
                <i className="ph-bold ph-arrow-up-right d-flex text-lg" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
