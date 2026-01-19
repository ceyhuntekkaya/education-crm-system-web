"use client";

import React from "react";

const SupplierMessagesPage: React.FC = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          {/* Page Header */}
          <div className="mb-24">
            <h4 className="mb-8">Mesajlaşma</h4>
            <p className="text-neutral-600">
              Müşterilerinizle mesajlaşın ve sorularını yanıtlayın.
            </p>
          </div>

          {/* Messages Container */}
          <div className="card" style={{ height: "calc(100vh - 250px)" }}>
            <div className="row g-0 h-100">
              {/* Conversation List */}
              <div className="col-md-4 border-end">
                <div className="p-20 border-bottom">
                  <div className="d-flex justify-content-between align-items-center mb-16">
                    <h6 className="mb-0">Konuşmalar</h6>
                    <button className="btn btn-sm btn-outline-main">
                      <i className="ph-bold ph-plus"></i>
                    </button>
                  </div>
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Konuşma ara..."
                  />
                </div>
                <div className="p-20">
                  <div className="text-center py-32">
                    <i
                      className="ph ph-chat-circle text-neutral-300"
                      style={{ fontSize: "48px" }}
                    ></i>
                    <p className="text-neutral-600 mt-12 mb-0 text-sm">
                      Henüz mesajınız yok
                    </p>
                  </div>
                </div>
              </div>

              {/* Message Area */}
              <div className="col-md-8">
                <div className="d-flex flex-column h-100">
                  {/* Empty State */}
                  <div className="flex-grow-1 d-flex align-items-center justify-content-center">
                    <div className="text-center">
                      <i
                        className="ph ph-chat-circle-dots text-neutral-300"
                        style={{ fontSize: "64px" }}
                      ></i>
                      <p className="text-neutral-600 mt-16 mb-0">
                        Bir konuşma seçin veya yeni mesaj başlatın
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierMessagesPage;
