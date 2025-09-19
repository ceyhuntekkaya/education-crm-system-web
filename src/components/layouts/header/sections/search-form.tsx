const SearchForm = () => {
  return (
    <form
      action="#"
      className="search-form position-relative d-xl-block d-none"
    >
      <input
        type="text"
        className="common-input rounded-pill bg-main-25 pe-48 border-neutral-30"
        placeholder="Search..."
      />
      <button
        type="submit"
        className="w-36 h-36 bg-main-600 hover-bg-main-700 rounded-circle flex-center text-md text-white position-absolute top-50 translate-middle-y inset-inline-end-0 me-8"
      >
        <i className="ph-bold ph-magnifying-glass" />
      </button>
    </form>
  );
};

export default SearchForm;