import React from "react";

interface TabOption {
  id: "parent" | "institution";
  icon: string;
  title: string;
  label: string;
}

interface AboutTabSectionProps {
  activeTab: "parent" | "institution";
  onTabChange: (tab: "parent" | "institution") => void;
}

const tabOptions: TabOption[] = [
  {
    id: "parent",
    icon: "ph-users",
    title: "Veliler İçin",
    label: "Veliler",
  },
  {
    id: "institution",
    icon: "ph-buildings",
    title: "Eğitim Kurumları İçin",
    label: "Kurumlar",
  },
];

export const AboutTabSection: React.FC<AboutTabSectionProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="about-tab-section" data-aos="fade-up">
      <div className="about-tab-section__wrapper">
        {tabOptions.map((tab) => (
          <button
            key={tab.id}
            className={`about-tab-section__tab ${
              activeTab === tab.id ? "about-tab-section__tab--active" : ""
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            <i className={`ph-bold ${tab.icon}`}></i>
            <span className="about-tab-section__tab-text">{tab.title}</span>
            <span className="about-tab-section__tab-label">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

