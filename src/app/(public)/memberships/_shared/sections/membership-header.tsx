const MembershipHeader = () => {
  return (
    <div className="section-heading text-center">
      <div className="flex-align d-inline-flex gap-8 mb-16">
        <span className="text-main-600 text-2xl d-flex">
          <i className="ph-bold ph-book-open" />
        </span>
        <h5 className="text-main-600 mb-0">Kurumsal Üyelik Paketleri</h5>
      </div>
      <h2 className="mb-24">Kurumunuza Özel Üyelik Çözümleri</h2>
      <p className="">
        Eğitim kurumunuz için en uygun paketi seçin ve dijital dönüşüme bugün
        başlayın. Her paket, kurumsal ihtiyaçlarınıza özel özellikler ve
        avantajlar sunarak eğitim yönetim süreçlerinizi kolaylaştırır.
      </p>

      {/* Kompakt Dikkat Çekici Bilgi */}
      <div className="mt-24 d-flex justify-content-center">
        <div className="bg-main-600 text-white px-24 py-12 rounded-pill shadow-md flex-align gap-8 animation-scale-up">
          <i className="ph-bold ph-info text-white text-lg d-flex"></i>
          <span className="fw-semibold text-sm">
            💰 Veli üyelikleri{" "}
            <span className="text-warning-300">ücretsiz</span> • Bu paketler{" "}
            <span className="text-warning-300">kurumlar içindir</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default MembershipHeader;
