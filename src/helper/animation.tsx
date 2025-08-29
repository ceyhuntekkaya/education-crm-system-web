"use client";
import Aos from "aos";
import { useEffect } from "react";

const Animation = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("wowjs").then((WOW) => {
        const wow = new WOW.WOW({
          boxClass: "wow",
          animateClass: "animate__animated",
          offset: 0,
          mobile: true,
          live: true,
        });
        wow.init();
      });
    }
    Aos.init({
      offset: 0,
      easing: "ease",
      once: true,
      duration: 1200,
    });
    Aos.refresh();
  }, []);
  return null;
};
export default Animation;
