import type { TabItem } from "@/components";
import {
  parentFeatures,
  institutionFeatures,
  parentAdvantages,
  institutionAdvantages,
} from "../config";
import {
  SectionHeader,
  FeaturesSection,
  HowItWorksSection,
  AdvantagesSection,
  InstitutionModulesSection,
} from "../sections";

const parentProcessSteps = [
  {
    number: 1,
    title: "Arayın",
    description:
      "Şehir, bölge, eğitim seviyesi gibi kriterlerle size uygun Kurumları bulun.",
    colorVariant: "main" as const,
  },
  {
    number: 2,
    title: "Karşılaştırın",
    description:
      "Kurumları listelerinize ekleyin, ücretleri ve özellikleri karşılaştırın.",
    colorVariant: "primary" as const,
  },
  {
    number: 3,
    title: "İletişime Geçin",
    description: "Randevu alın, mesajlaşın ve detaylı bilgi edinin.",
    colorVariant: "success" as const,
  },
];

const institutionProcessSteps = [
  {
    number: 1,
    title: "Kayıt Olun",
    description: "Kurumunuzun bilgilerini girerek hızlıca platforma katılın.",
    colorVariant: "main" as const,
  },
  {
    number: 2,
    title: "Profilinizi Oluşturun",
    description:
      "Kurum bilgilerinizi, fiyatlarınızı, galeri ve kampanyalarınızı ekleyin.",
    colorVariant: "primary" as const,
  },
  {
    number: 3,
    title: "Yönetin & Gelişin",
    description:
      "Randevuları takip edin, mesajlara cevap verin ve raporlarınızı inceleyin.",
    colorVariant: "success" as const,
  },
];

export const getAboutTabs = (): TabItem[] => [
  {
    id: "parent-tab",
    icon: "ph-users",
    title: "Veliler İçin",
    label: "Veliler İçin",
    isActive: true,
    content: (
      <>
        <SectionHeader
          title="Veliler İçin"
          highlightedText="Eğitim İste"
          description="Çocuğunuz için en doğru eğitim kurumunu bulmak artık çok daha kolay. Arama, karşılaştırma, randevu alma ve iletişim kurma - hepsi tek platformda!"
        />

        <FeaturesSection
          features={parentFeatures}
          title="Veliler İçin Özellikler"
          subtitle="Size sunduğumuz tüm imkanlar"
        />

        <HowItWorksSection
          steps={parentProcessSteps}
          title="Nasıl Kullanırım?"
          subtitle="3 basit adımda başlayın"
        />

        <AdvantagesSection
          advantages={parentAdvantages}
          title="Neden Eğitim İste?"
          subtitle="Veliler için özel avantajlar"
        />
      </>
    ),
  },
  {
    id: "institution-tab",
    icon: "ph-buildings",
    title: "Kurumlar İçin",
    label: "Kurumlar İçin",
    isActive: false,
    content: (
      <>
        <SectionHeader
          title="Kurumlar İçin"
          highlightedText="Eğitim İste"
          description="Eğitim kurumunuzu dijital platformda güçlü bir şekilde temsil edin. Öğrenci kayıtlarınızı artırın, velilerle etkili iletişim kurun ve yönetiminizi kolaylaştırın."
        />

        <FeaturesSection
          features={institutionFeatures}
          title="Kurumlar İçin Özellikler"
          subtitle="Kapsamlı yönetim çözümleri"
        />

        <HowItWorksSection
          steps={institutionProcessSteps}
          title="Nasıl Başlarım?"
          subtitle="Kurumunuzu hızlıca platforma dahil edin"
        />

        <AdvantagesSection
          advantages={institutionAdvantages}
          title="Neden Eğitim İste?"
          subtitle="Kurumlar için özel avantajlar"
        />

        <InstitutionModulesSection />
      </>
    ),
  },
];
