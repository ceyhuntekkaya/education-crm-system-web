interface TabNavigationProps {
  activeTab?: string;
}

export default function TabNavigation({ activeTab }: TabNavigationProps) {
  return (
    <ul
      className="nav nav-pills common-tab d-inline-flex gap-16 bg-white p-12 border border-neutral-30 rounded-pill"
      id="pills-tab"
      role="tablist"
    >
      <li className="nav-item" role="presentation">
        <button
          className="nav-link rounded-pill bg-main-25 text-md fw-medium text-neutral-500 flex-center w-100 gap-8 active"
          id="pills-tutionInfo-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-tutionInfo"
          type="button"
          role="tab"
          aria-controls="pills-tutionInfo"
          aria-selected="true"
        >
          <i className="text-xl text-main-600 d-flex ph-bold ph-info" />
          Genel Bilgiler
        </button>
      </li>

      <li className="nav-item" role="presentation">
        <button
          className="nav-link rounded-pill bg-main-25 text-md fw-medium text-neutral-500 flex-center w-100 gap-8"
          id="pills-qualification-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-qualification"
          type="button"
          role="tab"
          aria-controls="pills-qualification"
          aria-selected="false"
        >
          <i className="text-xl text-main-600 d-flex ph-bold ph-currency-circle-dollar" />
          Ücretler
        </button>
      </li>

      <li className="nav-item" role="presentation">
        <button
          className="nav-link rounded-pill bg-main-25 text-md fw-medium text-neutral-500 flex-center w-100 gap-8"
          id="pills-reviews-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-reviews"
          type="button"
          role="tab"
          aria-controls="pills-reviews"
          aria-selected="false"
        >
          <i className="text-xl text-main-600 d-flex ph-bold ph-star" />
          Değerlendirmeler
        </button>
      </li>
    </ul>
  );
}
