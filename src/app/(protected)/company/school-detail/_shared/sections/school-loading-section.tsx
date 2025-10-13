import { LoadingSpinner } from "@/components/ui/loadings";

export default function SchoolLoadingSection() {
  return (
    <div className="border border-neutral-30 rounded-12 bg-white p-8 mb-24">
      <div className="border border-neutral-30 rounded-12 bg-main-25 p-24">
        <LoadingSpinner
          message="Okul bilgileri yükleniyor..."
          size="lg"
          variant="dots"
          className="py-5"
        />
      </div>
    </div>
  );
}
