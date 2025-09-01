import Link from "next/link";

type Product = {
  image: string;
  title: string;
  price: string;
  rating: string;
  href: string;
  badge?: string;
};

const products: Product[] = [
  {
    image: "assets/images/thumbs/product-img1.png",
    title: "Nike Air Force",
    price: "$95.25",
    rating: "4.7",
    href: "/product-details",
  },
  {
    image: "assets/images/thumbs/product-img2.png",
    title: "Athletic Sneaker",
    price: "$95.25",
    rating: "4.7",
    href: "/product-details",
    badge: "Sale",
  },
  {
    image: "assets/images/thumbs/product-img3.png",
    title: "Running Shoes",
    price: "$120.00",
    rating: "4.8",
    href: "/product-details",
    badge: "New",
  },
  {
    image: "assets/images/thumbs/product-img4.png",
    title: "Classic Sneakers",
    price: "$80.00",
    rating: "4.5",
    href: "/product-details",
  },
  {
    image: "assets/images/thumbs/product-img5.png",
    title: "Sport Trainers",
    price: "$110.00",
    rating: "4.6",
    href: "/product-details",
    badge: "Best Seller",
  },
  {
    image: "assets/images/thumbs/product-img6.png",
    title: "Casual Shoes",
    price: "$75.00",
    rating: "4.4",
    href: "/product-details",
  },
  {
    image: "assets/images/thumbs/product-img7.png",
    title: "High Top Sneakers",
    price: "$130.00",
    rating: "4.9",
    href: "/product-details",
    badge: "Limited",
  },
  {
    image: "assets/images/thumbs/product-img8.png",
    title: "Low Top Trainers",
    price: "$90.00",
    rating: "4.3",
    href: "/product-details",
  },
  {
    image: "assets/images/thumbs/product-img9.png",
    title: "Retro Sneakers",
    price: "$105.00",
    rating: "4.7",
    href: "/product-details",
    badge: "Featured",
  },
  // Diğer ürünler buraya eklenebilir...
];

const ProductCard = ({ product }: { product: Product }) => (
  <div className="col-md-4 col-sm-6 col-xs-6">
    <div className="scale-hover-item bg-white rounded-16 p-12 h-100 box-shadow-md">
      <div className="course-item__thumb rounded-12 bg-main-25 overflow-hidden position-relative max-h-unset min-h-252">
        <Link
          href={product.href}
          className="w-100 h-100 d-flex justify-content-center align-items-center min-h-inherit"
        >
          <img
            src={product.image}
            alt="Course Image"
            className="scale-hover-item__img rounded-12 transition-2"
          />
        </Link>
        <div className="position-absolute inset-block-start-0 inset-inline-start-0 w-100 d-flex align-items-center justify-content-between p-16">
          {product.badge && (
            <span
              className={`py-8 px-16 ${
                product.badge === "Sale" ? "bg-main-two-600" : "bg-success-600"
              } rounded-8 text-white`}
            >
              {product.badge}
            </span>
          )}
          <button className="add-to-cart active-scale-08 w-40 h-40 rounded-8 d-flex justify-content-center align-items-center bg-white box-shadow-md text-neutral-500 text-lg hover-bg-main-100 hover-text-main-600 transition-2 ms-auto">
            <i className="ph ph-shopping-cart" />
          </button>
        </div>
      </div>
      <div className="pt-32 pb-24 px-16 position-relative">
        <div>
          <div className="d-flex align-items-center justify-content-between mb-16">
            <h5 className="mb-0">
              <Link href={product.href} className="link text-line-1">
                {product.title}
              </Link>
            </h5>
            <div className="flex-shrink-0 d-flex gap-4">
              <div className="d-flex flex-wrap align-items-center">
                <button
                  type="button"
                  className="w-16 h-16 border border-2 border-white ms--6 bg-color-blue rounded-circle"
                />
                <button
                  type="button"
                  className="w-16 h-16 border border-2 border-white ms--6 bg-color-light-green rounded-circle"
                />
                <button
                  type="button"
                  className="w-16 h-16 border border-2 border-white ms--6 bg-color-danger rounded-circle"
                />
              </div>
              <span className="text-neutral-500">+3</span>
            </div>
          </div>
          <div className="flex-between gap-8 flex-wrap">
            <div className="flex-align gap-4">
              <span className="text-2xl fw-medium text-warning-600 d-flex">
                <i className="ph-fill ph-star" />
              </span>
              <span className="text-lg text-neutral-700">{product.rating}</span>
            </div>
            <h5 className="text-main-600 mb-0">{product.price}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Pagination = () => {
  const pages = [1, 2, 3];
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
      {pages.map((page) => (
        <li className="page-item" key={page}>
          <a
            className="page-link text-neutral-700 fw-semibold w-40 h-40 bg-main-25 rounded-circle hover-bg-main-600 border-neutral-30 hover-border-main-600 hover-text-white flex-center p-0"
            href="#"
          >
            {page}
          </a>
        </li>
      ))}
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

const Results = () => {
  return (
    <div>
      <div className="flex-between gap-16 flex-wrap mb-40">
        <span className="text-neutral-500">Showing 9 of 600 Results </span>
        <div className="flex-align gap-16">
          <div className="flex-align gap-8">
            <span className="text-neutral-500 flex-shrink-0">Sort By :</span>
            <select className="form-select ps-20 pe-28 py-8 fw-medium rounded-pill bg-main-25 border border-neutral-30 text-neutral-700">
              <option value={1}>Newest</option>
              <option value={1}>Trending</option>
              <option value={1}>Popular</option>
            </select>
          </div>
          <button
            type="button"
            className="list-bar-btn text-xl w-40 h-40 bg-main-600 text-white rounded-8 flex-center d-lg-none"
          >
            <i className="ph-bold ph-funnel" />
          </button>
        </div>
      </div>
      <div className="row gy-4">
        {products.slice(0, 9).map((product, idx) => (
          <ProductCard key={idx} product={product} />
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default Results;
