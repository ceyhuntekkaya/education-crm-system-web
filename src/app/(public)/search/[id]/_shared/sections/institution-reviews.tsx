import { useInstitutionDetail } from "../contexts";

export default function InstitutionReviews() {
  const { school, renderStars } = useInstitutionDetail();
  return (
    <div className="tutor-details__content">
      <div className="border border-neutral-30 rounded-12 bg-white p-8 mt-24">
        <div className="border border-neutral-30 rounded-12 bg-main-25 p-32">
          <h5 className="mb-0">Ortalama Değerlendirme</h5>
          <span className="d-block border border-neutral-30 my-32 border-dashed" />

          {/* Rating Overview */}
          <div className="d-flex flex-sm-row flex-column gap-36">
            <div className="rounded-16 px-40 py-24 flex-center flex-column flex-shrink-0 text-center bg-main-600 text-white">
              <h2 className="mb-8 text-white">{school.ratingAverage}</h2>
              <div className="flex-center gap-4">
                {renderStars(school.ratingAverage)}
              </div>
              <span className="mt-8 text-gray-500">
                {school.ratingCount} Değerlendirme
              </span>
            </div>

            {/* Rating Breakdown */}
            <div className="flex-grow-1">
              {[5, 4, 3, 2, 1].map((star, index) => {
                const percentages = [90, 75, 67, 44, 21];
                return (
                  <div key={star} className="flex-align gap-20 mb-8">
                    <div className="flex-align gap-8">
                      <span className="text-lg fw-medium text-warning-600 d-flex">
                        <i className="ph-fill ph-star" />
                      </span>
                      <span className="text-gray-900 flex-shrink-0">
                        {star}
                      </span>
                    </div>
                    <div
                      className="progress w-100 bg-white rounded-pill h-12"
                      role="progressbar"
                      aria-label="Basic example"
                      aria-valuenow={percentages[index]}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="progress-bar bg-main-600 rounded-pill"
                        style={{ width: `${percentages[index]}%` }}
                      />
                    </div>
                    <span className="text-gray-900 flex-shrink-0">
                      {percentages[index]}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <span className="d-block border border-neutral-30 my-32 border-dashed" />

          {/* Reviews Header */}
          <div className="flex-between gap-16 flex-wrap mb-24">
            <h6 className="mb-0">Tüm Değerlendirmeler</h6>
            <div className="flex-align gap-16">
              <div className="flex-align gap-8">
                <span className="text-neutral-500 flex-shrink-0">Sırala :</span>
                <select className="form-select ps-20 pe-28 py-8 fw-medium rounded-pill bg-main-25 border border-neutral-30 text-neutral-700">
                  <option value={1}>En Yeni</option>
                  <option value={1}>Trend</option>
                  <option value={1}>Popüler</option>
                </select>
              </div>
            </div>
          </div>

          {/* Sample Reviews */}
          <div className="border border-neutral-30 rounded-12 bg-white p-32">
            <div className="flex-align gap-8 mb-16">{renderStars(5)}</div>
            <p className="text-neutral-700">
              &ldquo;Bu okul gerçekten harika! Çocuğumun gelişimi için mükemmel
              bir ortam sağlıyorlar. Öğretmenlerin yaklaşımı çok profesyonel ve
              samimi.&rdquo;
            </p>
            <span className="d-block border border-neutral-30 my-24 border-dashed" />
            <div className="flex-align gap-24">
              <div className="w-60 h-60 bg-main-100 rounded-circle flex-center">
                <i className="ph-bold ph-user text-main-600 text-2xl"></i>
              </div>
              <div className="">
                <h6 className="text-xl mb-8 fw-medium">Ayşe Yılmaz</h6>
                <span className="text-neutral-700 text-sm">Veli</span>
              </div>
            </div>
            <span className="d-block border border-neutral-30 my-24 border-dashed" />
            <div className="flex-align flex-wrap gap-40">
              <button
                type="button"
                className="like-button flex-align gap-8 text-neutral-500 hover-text-main-600"
              >
                <span className="like-button__icon text-xl d-flex">
                  <i className="ph-bold ph-thumbs-up" />
                </span>
                <span className="like-button__text">18</span>
              </button>
              <a
                href="#commentForm"
                className="flex-align gap-8 text-neutral-500 hover-text-main-600"
              >
                <i className="text-xl d-flex ph-bold ph-chat-centered-text" />
                Yanıtla
              </a>
            </div>
          </div>

          <div className="border border-neutral-30 rounded-12 bg-white p-32 mt-24">
            <div className="flex-align gap-8 mb-16">{renderStars(4)}</div>
            <p className="text-neutral-700">
              &ldquo;Çocuğum burada çok mutlu. Oyun alanları ve etkinlikler
              gerçekten çok güzel düzenlenmiş. Montessori eğitimi de çok
              etkili.&rdquo;
            </p>
            <span className="d-block border border-neutral-30 my-24 border-dashed" />
            <div className="flex-align gap-24">
              <div className="w-60 h-60 bg-success-100 rounded-circle flex-center">
                <i className="ph-bold ph-user text-success-600 text-2xl"></i>
              </div>
              <div className="">
                <h6 className="text-xl mb-8 fw-medium">Mehmet Demir</h6>
                <span className="text-neutral-700 text-sm">Veli</span>
              </div>
            </div>
            <span className="d-block border border-neutral-30 my-24 border-dashed" />
            <div className="flex-align flex-wrap gap-40">
              <button
                type="button"
                className="like-button flex-align gap-8 text-neutral-500 hover-text-main-600"
              >
                <span className="like-button__icon text-xl d-flex">
                  <i className="ph-bold ph-thumbs-up" />
                </span>
                <span className="like-button__text">25</span>
              </button>
              <a
                href="#commentForm"
                className="flex-align gap-8 text-neutral-500 hover-text-main-600"
              >
                <i className="text-xl d-flex ph-bold ph-chat-centered-text" />
                Yanıtla
              </a>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-main rounded-pill flex-center gap-8 mt-40"
          >
            Tüm Değerlendirmeleri Gör
            <i className="ph-bold ph-arrow-up-right d-flex text-lg" />
          </button>
        </div>

        {/* Comment Form */}
        <div className="border border-neutral-30 rounded-12 bg-main-25 p-32 mt-24">
          <form action="#" id="commentForm">
            <h5 className="mb-0">Değerlendirme Yaz</h5>
            <span className="d-block border border-neutral-30 my-32 border-dashed" />

            <div className="mb-24">
              <label
                htmlFor="nameee"
                className="text-neutral-700 text-lg fw-medium mb-12"
              >
                İsim{" "}
              </label>
              <input
                type="text"
                className="common-input rounded-pill"
                id="nameee"
                placeholder="İsminizi girin..."
              />
            </div>

            <div className="mb-24">
              <label
                htmlFor="email"
                className="text-neutral-700 text-lg fw-medium mb-12"
              >
                Email{" "}
              </label>
              <input
                type="text"
                className="common-input rounded-pill"
                id="email"
                placeholder="Email adresinizi girin..."
              />
            </div>

            <div className="mb-24">
              <label className="text-neutral-700 text-lg fw-medium mb-12">
                Yıldız Değerlendirmesi
              </label>
              <div id="half-star-rating">
                <div className="rating-group">
                  <input
                    className="rating__input rating__input--none"
                    name="rating2"
                    id="rating2-0"
                    defaultValue={0}
                    type="radio"
                  />
                  <label
                    aria-label="0 stars"
                    className="rating__label"
                    htmlFor="rating2-0"
                  >
                    &nbsp;
                  </label>
                  <label
                    aria-label="0.5 stars"
                    className="rating__label rating__label--half"
                    htmlFor="rating2-05"
                  >
                    <i className="rating__icon rating__icon--star ph-fill ph-star-half" />
                  </label>
                  <input
                    className="rating__input"
                    name="rating2"
                    id="rating2-05"
                    defaultValue="0.5"
                    type="radio"
                  />
                  <label
                    aria-label="1 star"
                    className="rating__label"
                    htmlFor="rating2-10"
                  >
                    <i className="rating__icon rating__icon--star ph-fill ph-star" />
                  </label>
                  <input
                    className="rating__input"
                    name="rating2"
                    id="rating2-10"
                    defaultValue={1}
                    type="radio"
                  />
                  <label
                    aria-label="1.5 stars"
                    className="rating__label rating__label--half"
                    htmlFor="rating2-15"
                  >
                    <i className="rating__icon rating__icon--star ph-fill ph-star-half" />
                  </label>
                  <input
                    className="rating__input"
                    name="rating2"
                    id="rating2-15"
                    defaultValue="1.5"
                    type="radio"
                  />
                  <label
                    aria-label="2 stars"
                    className="rating__label"
                    htmlFor="rating2-20"
                  >
                    <i className="rating__icon rating__icon--star ph-fill ph-star" />
                  </label>
                  <input
                    className="rating__input"
                    name="rating2"
                    id="rating2-20"
                    defaultValue={2}
                    type="radio"
                  />
                  <label
                    aria-label="2.5 stars"
                    className="rating__label rating__label--half"
                    htmlFor="rating2-25"
                  >
                    <i className="rating__icon rating__icon--star ph-fill ph-star-half" />
                  </label>
                  <input
                    className="rating__input"
                    name="rating2"
                    id="rating2-25"
                    defaultValue="2.5"
                    type="radio"
                  />
                  <label
                    aria-label="3 stars"
                    className="rating__label"
                    htmlFor="rating2-30"
                  >
                    <i className="rating__icon rating__icon--star ph-fill ph-star" />
                  </label>
                  <input
                    className="rating__input"
                    name="rating2"
                    id="rating2-30"
                    defaultValue={3}
                    type="radio"
                  />
                  <label
                    aria-label="3.5 stars"
                    className="rating__label rating__label--half"
                    htmlFor="rating2-35"
                  >
                    <i className="rating__icon rating__icon--star ph-fill ph-star-half" />
                  </label>
                  <input
                    className="rating__input"
                    name="rating2"
                    id="rating2-35"
                    defaultValue="3.5"
                    type="radio"
                  />
                  <label
                    aria-label="4 stars"
                    className="rating__label"
                    htmlFor="rating2-40"
                  >
                    <i className="rating__icon rating__icon--star ph-fill ph-star" />
                  </label>
                  <input
                    className="rating__input"
                    name="rating2"
                    id="rating2-40"
                    defaultValue={4}
                    type="radio"
                  />
                  <label
                    aria-label="4.5 stars"
                    className="rating__label rating__label--half"
                    htmlFor="rating2-45"
                  >
                    <i className="rating__icon rating__icon--star ph-fill ph-star-half" />
                  </label>
                  <input
                    className="rating__input"
                    name="rating2"
                    id="rating2-45"
                    defaultValue="4.5"
                    type="radio"
                  />
                  <label
                    aria-label="5 stars"
                    className="rating__label"
                    htmlFor="rating2-50"
                  >
                    <i className="rating__icon rating__icon--star ph-fill ph-star" />
                  </label>
                  <input
                    className="rating__input"
                    name="rating2"
                    id="rating2-50"
                    defaultValue={5}
                    type="radio"
                  />
                </div>
              </div>
            </div>

            <div className="mb-24">
              <label
                htmlFor="desc"
                className="text-neutral-700 text-lg fw-medium mb-12"
              >
                Yorumunuz{" "}
              </label>
              <textarea
                id="desc"
                className="common-input rounded-24"
                placeholder="Yorumunuzu yazın..."
                defaultValue={""}
              />
            </div>

            <div className="mb-0">
              <button
                type="submit"
                className="btn btn-main rounded-pill flex-center gap-8 mt-40"
              >
                Değerlendirme Gönder
                <i className="ph-bold ph-arrow-up-right d-flex text-lg" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
