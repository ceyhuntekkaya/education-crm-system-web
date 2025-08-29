"use client";

import React from "react";
import Icon from "./icon";

const IconExamples: React.FC = () => {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">Icon Component Examples</h2>

          {/* Variants Section */}
          <div className="mb-5">
            <h4 className="mb-3">Variants</h4>
            <div className="d-flex flex-wrap gap-3 align-items-center">
              <div className="text-center">
                <Icon icon="ph-user-circle" variant="inline" />
                <p className="mt-2 small">Inline</p>
              </div>
              <div className="text-center">
                <Icon icon="ph-user-circle" variant="outline" />
                <p className="mt-2 small">Outline</p>
              </div>
            </div>
          </div>

          {/* Usage Code Examples */}
          <div className="mb-5">
            <h4 className="mb-3">Usage Examples</h4>
            <div className="bg-light p-3 rounded">
              <h6>Inline Variant:</h6>
              <pre className="mb-3">
                {`<Icon 
  icon="ph-user-circle" 
  variant="inline"
/>`}
              </pre>

              <h6>Outline Variant:</h6>
              <pre className="mb-0">
                {`<Icon 
  icon="ph-user-circle" 
  variant="outline"
/>`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconExamples;
