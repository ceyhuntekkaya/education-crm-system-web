"use client";

import { Button } from "@/components";
import React from "react";

/**
 * Button Component Examples
 *
 * This component demonstrates all the available variants and features
 * of the Button component including icons, sizes, and link functionality.
 */
export const ButtonExamples: React.FC = () => {
  return (
    <div className="container py-5">
      <h1 className="text-2xl fw-bold mb-4">Button Component Examples</h1>

      {/* Basic Variants */}
      <section className="mb-5">
        <h2 className="text-xl fw-semibold mb-3">Basic Variants</h2>
        <div className="d-flex gap-3 flex-wrap">
          <Button>Main Button</Button>
          <Button variant="outline">Outline Main</Button>
        </div>
      </section>

      {/* With Icons */}
      <section className="mb-5">
        <h2 className="text-xl fw-semibold mb-3">Buttons with Icons</h2>
        <div className="d-flex gap-3 flex-wrap">
          <Button leftIcon="ph-plus">Add New</Button>
          <Button variant="outline" rightIcon="ph-arrow-right">
            Continue
          </Button>
        </div>
      </section>

      {/* Link Buttons */}
      <section className="mb-5">
        <h2 className="text-xl fw-semibold mb-3">Link Buttons</h2>
        <div className="d-flex gap-3 flex-wrap">
          <Button href="/course" rightIcon="ph-arrow-up-right">
            Browse Courses
          </Button>
          <Button href="/about" variant="outline" rightIcon="ph-arrow-up-right">
            About Us
          </Button>
        </div>
      </section>

      {/* Sizes */}
      <section className="mb-5">
        <h2 className="text-xl fw-semibold mb-3">Button Sizes</h2>
        <div className="d-flex gap-3 flex-wrap align-items-center">
          <Button size="sm">Small Button</Button>
          <Button size="md">Medium Button (Default)</Button>
        </div>
      </section>

      {/* Loading State */}
      <section className="mb-5">
        <h2 className="text-xl fw-semibold mb-3">Loading State</h2>
        <div className="d-flex gap-3 flex-wrap">
          <Button loading={true}>Processing...</Button>
          <Button variant="outline" loading={true} rightIcon="ph-arrow-right">
            Submitting...
          </Button>
        </div>
      </section>

      {/* Disabled State */}
      <section className="mb-5">
        <h2 className="text-xl fw-semibold mb-3">Disabled State</h2>
        <div className="d-flex gap-3 flex-wrap">
          <Button disabled={true}>Disabled Button</Button>
          <Button variant="outline" disabled={true} rightIcon="ph-lock">
            Locked
          </Button>
        </div>
      </section>

      {/* Code Examples */}
      <section className="mb-5">
        <h2 className="text-xl fw-semibold mb-3">Usage Examples</h2>
        <div className="bg-light p-4 rounded">
          <pre className="text-sm">
            {`// Basic button
<Button >Click Me</Button>

// Button with right icon
<Button  rightIcon="ph-arrow-right">
  Continue
</Button>

// Link button
<Button href="/dashboard" >
  Go to Dashboard
</Button>

// Loading button
<Button  loading={true}>
  Processing...
</Button>

// Small button with left icon
<Button variant="outline" size="sm" leftIcon="ph-plus">
  Add
</Button>`}
          </pre>
        </div>
      </section>
    </div>
  );
};

export default ButtonExamples;
