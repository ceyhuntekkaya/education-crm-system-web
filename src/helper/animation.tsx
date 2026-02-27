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
          offset: 80,
          mobile: true,
          live: true,
        });
        wow.init();
      });
    }
    Aos.init({
      offset: 80,
      easing: "ease-out-cubic",
      once: true,
      duration: 700,
      delay: 0,
      anchorPlacement: "top-bottom",
    });
    Aos.refresh();
  }, []);
  return null;
};
export default Animation;
