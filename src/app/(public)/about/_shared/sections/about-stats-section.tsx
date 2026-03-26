"use client";

import React, { useState } from "react";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

const statsData = [
  {
    end: 500,
    suffix: "+",
    label: "Aktif Kurum",
    icon: "ph-bold ph-buildings",
  },
  {
    end: 10000,
    suffix: "+",
    label: "Aktif Kullanıcı",
    icon: "ph-bold ph-users",
  },
  {
    end: 98,
    suffix: "%",
    label: "Müşteri Memnuniyeti",
    icon: "ph-bold ph-smiley",
  },
  {
    end: 7,
    suffix: "/24",
    label: "Kesintisiz Destek",
    icon: "ph-bold ph-headset",
  },
];

export const AboutStatsSection: React.FC = () => {
  const [viewed, setViewed] = useState(false);

  return (
    <VisibilitySensor
      onChange={(isVisible: boolean) => {
        if (isVisible) setViewed(true);
      }}
      partialVisibility
      delayedCall
    >
      <div className="category-stats" data-aos="fade-up">
        {statsData.map((s, i) => (
          <div
            key={i}
            className="category-stats__card"
            data-aos="zoom-in"
            data-aos-delay={i * 100}
          >
            <div className="category-stats__icon">
              <i className={s.icon} />
            </div>
            <span className="category-stats__value">
              {viewed ? (
                <CountUp
                  end={s.end}
                  duration={2.4}
                  separator="."
                  suffix={s.suffix}
                />
              ) : (
                `0${s.suffix}`
              )}
            </span>
            <span className="category-stats__label">{s.label}</span>
          </div>
        ))}
      </div>
    </VisibilitySensor>
  );
};
