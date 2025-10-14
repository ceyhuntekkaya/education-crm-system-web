import { LoadingSpinner } from "@/components/ui/loadings";
import { CustomCard } from "@/components/ui";

export default function SchoolLoadingSection() {
  return (
    <CustomCard title="Okul Detayları" subtitle="Veriler yükleniyor...">
      <div className="text-center py-24">
        <LoadingSpinner
          message="Okul bilgileri yükleniyor..."
          size="lg"
          variant="dots"
          className="py-5"
        />
      </div>
    </CustomCard>
  );
}
