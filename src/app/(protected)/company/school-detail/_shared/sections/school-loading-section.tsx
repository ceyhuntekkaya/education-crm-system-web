import { CustomCard } from "@/components/ui";

export default function SchoolLoadingSection() {
  return (
    <CustomCard
      title="Okul Detayı"
      subtitle="Okul bilgilerini detaylı olarak görüntüleyin"
      isLoading={true}
      loadingMessage="Okul bilgileri yükleniyor..."
    />
  );
}
