import { CustomCard } from "@/components/ui";

export default function SchoolLoadingSection() {
  return (
    <CustomCard
      title="Kurum Detayı"
      subtitle="Kurum bilgilerini detaylı olarak görüntüleyin"
      isLoading={true}
      loadingMessage="Kurum bilgileri yükleniyor..."
    />
  );
}
