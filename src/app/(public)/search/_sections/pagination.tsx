const Pagination = ({}: {}) => {
  return (
    <ul className="pagination mt-40 flex-align gap-12 flex-wrap justify-content-center">
      <li className="page-item">
        <a
          className="page-link text-neutral-700 fw-semibold w-40 h-40 bg-main-25 rounded-circle hover-bg-main-600 border-neutral-30 hover-border-main-600 hover-text-white flex-center p-0"
          href="#"
        >
          <i className="ph-bold ph-caret-left" />
        </a>
      </li>
      <li className="page-item">
        <a
          className="page-link text-neutral-700 fw-semibold w-40 h-40 bg-main-25 rounded-circle hover-bg-main-600 border-neutral-30 hover-border-main-600 hover-text-white flex-center p-0"
          href="#"
        >
          1
        </a>
      </li>
      <li className="page-item">
        <a
          className="page-link text-neutral-700 fw-semibold w-40 h-40 bg-main-25 rounded-circle hover-bg-main-600 border-neutral-30 hover-border-main-600 hover-text-white flex-center p-0"
          href="#"
        >
          2
        </a>
      </li>
      <li className="page-item">
        <a
          className="page-link text-neutral-700 fw-semibold w-40 h-40 bg-main-25 rounded-circle hover-bg-main-600 border-neutral-30 hover-border-main-600 hover-text-white flex-center p-0"
          href="#"
        >
          3
        </a>
      </li>
      <li className="page-item">
        <a
          className="page-link text-neutral-700 fw-semibold w-40 h-40 bg-main-25 rounded-circle hover-bg-main-600 border-neutral-30 hover-border-main-600 hover-text-white flex-center p-0"
          href="#"
        >
          ...
        </a>
      </li>
      <li className="page-item">
        <a
          className="page-link text-neutral-700 fw-semibold w-40 h-40 bg-main-25 rounded-circle hover-bg-main-600 border-neutral-30 hover-border-main-600 hover-text-white flex-center p-0"
          href="#"
        >
          <i className="ph-bold ph-caret-right" />
        </a>
      </li>
    </ul>
  );
};

export default Pagination;
