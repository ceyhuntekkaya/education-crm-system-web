import React from "react";

const PostEmptyState: React.FC = () => {
  return (
    <div className="text-center py-60">
      {/* Boş Durum İkonu */}
      <div className="mb-24">
        <div
          className="d-inline-flex align-items-center justify-content-center bg-neutral-100 rounded-circle"
          style={{ width: "80px", height: "80px" }}
        >
          <i
            className="ph-bold ph-chat-circle-text text-neutral-400"
            style={{ fontSize: "36px" }}
          ></i>
        </div>
      </div>

      {/* Başlık ve Açıklama */}
      <h5 className="text-neutral-800 mb-12 fw-semibold">
        Henüz sosyal medya paylaşımı yok
      </h5>
      <p className="text-neutral-600 mb-24 text-sm">
        Bu kurum henüz sosyal medya hesaplarında paylaşım yapmamış.
        <br />
        İlk paylaşımları için takipte kalın!
      </p>

      {/* Aksiyon Butonları */}
      <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center gap-12">
        <button className="btn btn-main btn-sm">
          <i className="ph-bold ph-bell me-8"></i>
          Bildirim Aç
        </button>

        <button className="btn btn-outline-main btn-sm">
          <i className="ph-bold ph-arrow-left me-8"></i>
          Diğer Kurumlar
        </button>
      </div>
    </div>
  );
};

export default PostEmptyState;
