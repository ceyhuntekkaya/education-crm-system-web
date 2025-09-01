"use client";
import { FormProvider, useFormField } from "@/contexts";
import * as yup from "yup";
import { Button, Form, FormAutocomplete, FormInput } from "@/components";

import { FormValues } from "@/contexts";
import { useFormHook } from "@/hooks";

const validationSchema = yup.object({});

const initialValues: FormValues = {};

const FormContent = () => {
  const { values, resetForm } = useFormHook();
  console.log("Form değerleri:", values);

  const onSubmit = (values: FormValues) => {
    // Filtreleme işlemini burada yapabilirsin
    console.log("Filtrelenen değerler:", values);
  };

  return (
    <Form
      onSubmit={onSubmit}
      className={`sidebar rounded-12 bg-white p-32 box-shadow-md `}
      data-aos="fade-up"
    >
      <div>
        <form action="#">
          <div className="flex-between">
            <div className="flex-grow-1">
              <div className="flex-between">
                <h4 className="mb-0">Arama Kriterleri</h4>
                <button
                  type="button"
                  className="sidebar-close text-xl text-neutral-500 d-lg-none hover-text-main-600"
                >
                  <i className="ph-bold ph-x" />
                </button>
              </div>
              <span className="d-block border border-neutral-30 border-dashed my-24" />
            </div>
          </div>
          <div className="position-relative">
            <input
              type="text"
              className="common-input pe-48 rounded-pill bg-main-25"
              placeholder="Enter Your Email..."
            />
            <button
              type="submit"
              className="text-xl position-absolute top-50 translate-middle-y inset-inline-end-0 me-4  w-40 h-40 bg-main-600 d-flex align-items-center justify-content-center text-white rounded-circle hover-bg-main-700"
            >
              <i className="ph-bold ph-magnifying-glass" />
            </button>
          </div>
          <span className="d-block border border-neutral-30 border-dashed my-24" />
          <div className="d-flex flex-column gap-32">
            <div className="col-sm-12">
              <h6 className="text-lg mb-24 fw-semibold">Gender</h6>
              <div className="d-flex flex-column gap-16">
                <div className="form-check common-check common-radio mb-0">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="Male"
                  />
                  <label
                    className="form-check-label fw-normal flex-grow-1"
                    htmlFor="Male"
                  >
                    Male
                  </label>
                </div>
                <div className="form-check common-check common-radio mb-0">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="Female"
                  />
                  <label
                    className="form-check-label fw-normal flex-grow-1"
                    htmlFor="Female"
                  >
                    Female
                  </label>
                </div>
                <div className="form-check common-check common-radio mb-0">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="kids"
                  />
                  <label
                    className="form-check-label fw-normal flex-grow-1"
                    htmlFor="kids"
                  >
                    kids
                  </label>
                </div>
              </div>
            </div>
            <div className="">
              <h6 className="text-lg mb-24 fw-semibold">Category</h6>
              <div className="d-flex flex-column gap-16">
                <div className="form-check common-check mb-0">
                  <input
                    className="form-check-input bg-main-25"
                    type="checkbox"
                    name="tutorType"
                    id="All"
                  />
                  <label
                    className="form-check-label fw-normal flex-grow-1"
                    htmlFor="All"
                  >
                    All
                  </label>
                </div>
                <div className="form-check common-check mb-0">
                  <input
                    className="form-check-input bg-main-25"
                    type="checkbox"
                    name="tutorType"
                    id="Shoes"
                  />
                  <label
                    className="form-check-label fw-normal flex-grow-1"
                    htmlFor="Shoes"
                  >
                    Shoes
                  </label>
                </div>
                <div className="form-check common-check mb-0">
                  <input
                    className="form-check-input bg-main-25"
                    type="checkbox"
                    name="tutorType"
                    id="Apparel"
                  />
                  <label
                    className="form-check-label fw-normal flex-grow-1"
                    htmlFor="Apparel"
                  >
                    Apparel
                  </label>
                </div>
                <div className="form-check common-check mb-0">
                  <input
                    className="form-check-input bg-main-25"
                    type="checkbox"
                    name="tutorType"
                    id="Accessories"
                  />
                  <label
                    className="form-check-label fw-normal flex-grow-1"
                    htmlFor="Accessories"
                  >
                    Accessories
                  </label>
                </div>
              </div>
            </div>
            <div className="">
              <h6 className="text-lg mb-20 fw-medium">Color</h6>
              <div className="color-list d-flex flex-wrap align-items-center gap-12">
                <button
                  type="button"
                  className="color-list__button w-24 h-24 bg-color-black rounded-circle"
                />
                <button
                  type="button"
                  className="color-list__button w-24 h-24 bg-color-deep-green rounded-circle"
                />
                <button
                  type="button"
                  className="color-list__button w-24 h-24 bg-color-violet rounded-circle"
                />
                <button
                  type="button"
                  className="color-list__button w-24 h-24 bg-color-info rounded-circle"
                />
                <button
                  type="button"
                  className="color-list__button w-24 h-24 bg-color-light-green rounded-circle"
                />
                <button
                  type="button"
                  className="color-list__button w-24 h-24 bg-color-yellow rounded-circle"
                />
                <button
                  type="button"
                  className="color-list__button w-24 h-24 bg-color-danger rounded-circle"
                />
                <button
                  type="button"
                  className="color-list__button w-24 h-24 bg-color-blue rounded-circle"
                />
                <button
                  type="button"
                  className="color-list__button w-24 h-24 bg-color-paste rounded-circle"
                />
                <button
                  type="button"
                  className="color-list__button w-24 h-24 bg-color-warning rounded-circle"
                />
              </div>
            </div>
            <div className="">
              <div>
                <h6 className="text-lg mb-20 fw-medium">Pricing scale</h6>
                <div className="custom--range">
                  <div className="custom--range__content">
                    <input
                      type="text"
                      id="amount"
                      readOnly
                      className="custom--range__prices text-neutral-600 text-start text-md fw-medium w-100 text-center bg-transparent border-0 outline-0"
                      value={`$${values[0]} - $${values[1]}`}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <h6 className="text-lg mb-20 fw-medium">Star Category</h6>
              <div className="d-flex flex-column gap-16">
                <div className="flex-between gap-16">
                  <div className="form-check common-check mb-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="categories"
                      id="star5"
                    />
                    <label
                      className="form-check-label fw-normal flex-grow-1 flex-align gap-8"
                      htmlFor="star5"
                    >
                      <span className="text-warning-600 text-xl d-flex">
                        <i className="ph-fill ph-star" />
                      </span>
                      5 Star
                    </label>
                  </div>
                </div>
                <div className="flex-between gap-16">
                  <div className="form-check common-check mb-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="categories"
                      id="star4"
                    />
                    <label
                      className="form-check-label fw-normal flex-grow-1 flex-align gap-8"
                      htmlFor="star4"
                    >
                      <span className="text-warning-600 text-xl d-flex">
                        <i className="ph-fill ph-star" />
                      </span>
                      4 Star
                    </label>
                  </div>
                </div>
                <div className="flex-between gap-16">
                  <div className="form-check common-check mb-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="categories"
                      id="star3"
                    />
                    <label
                      className="form-check-label fw-normal flex-grow-1 flex-align gap-8"
                      htmlFor="star3"
                    >
                      <span className="text-warning-600 text-xl d-flex">
                        <i className="ph-fill ph-star" />
                      </span>
                      3 Star
                    </label>
                  </div>
                </div>
                <div className="flex-between gap-16">
                  <div className="form-check common-check mb-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="categories"
                      id="star2"
                    />
                    <label
                      className="form-check-label fw-normal flex-grow-1 flex-align gap-8"
                      htmlFor="star2"
                    >
                      <span className="text-warning-600 text-xl d-flex">
                        <i className="ph-fill ph-star" />
                      </span>
                      2 Star
                    </label>
                  </div>
                </div>
                <div className="flex-between gap-16">
                  <div className="form-check common-check mb-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="categories"
                      id="star1s"
                    />
                    <label
                      className="form-check-label fw-normal flex-grow-1 flex-align gap-8"
                      htmlFor="star1s"
                    >
                      <span className="text-warning-600 text-xl d-flex">
                        <i className="ph-fill ph-star" />
                      </span>
                      1 Star
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <span className="d-block border border-neutral-30 border-dashed my-32" />
          <button
            type="reset"
            className="btn btn-outline-main rounded-pill flex-center gap-16 fw-semibold w-100"
          >
            <i className="ph-bold ph-arrow-clockwise d-flex text-lg" />
            Reset Filters
          </button>
        </form>
      </div>
    </Form>
  );
};

const FilterForm = () => {
  return (
    <FormProvider
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      <FormContent />
    </FormProvider>
  );
};

export default FilterForm;
