(function ($) {
  "use strict";
  
  // ==========================================
  //      Start Document Ready function
  // ==========================================
  $(document).ready(function () {
    
  // ============== Mobile Menu Sidebar & Offcanvas Js Start ========
  $('.toggle-mobileMenu').on('click', function () {
    $('.mobile-menu').addClass('active');
    $('.side-overlay').addClass('show');
    $('body').addClass('scroll-hide-sm');
  }); 

  $('.close-button, .side-overlay').on('click', function () {
    $('.mobile-menu').removeClass('active');
    $('.side-overlay').removeClass('show');
    $('body').removeClass('scroll-hide-sm');
  }); 
  // ============== Mobile Menu Sidebar & Offcanvas Js End ========
  
  // ============== Mobile Nav Menu Dropdown Js Start =======================
  var windowWidth = $(window).width(); 
  
  $('.has-submenu').on('click', function () {
    var thisItem = $(this); 
    
    if(windowWidth < 992) {
      if(thisItem.hasClass('active')) {
        thisItem.removeClass('active')
      } else {
        $('.has-submenu').removeClass('active')
        $(thisItem).addClass('active')
      }
      
      var submenu = thisItem.find('.nav-submenu');
      
      $('.nav-submenu').not(submenu).slideUp(300);
      submenu.slideToggle(300);
    }
    
  });
  // ============== Mobile Nav Menu Dropdown Js End =======================
    
  // ===================== Scroll Back to Top Js Start ======================
  var progressPath = document.querySelector('.progress-wrap path');
  var pathLength = progressPath.getTotalLength();
  progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
  progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
  progressPath.style.strokeDashoffset = pathLength;
  progressPath.getBoundingClientRect();
  progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
  var updateProgress = function () {
    var scroll = $(window).scrollTop();
    var height = $(document).height() - $(window).height();
    var progress = pathLength - (scroll * pathLength / height);
    progressPath.style.strokeDashoffset = progress;
  }
  updateProgress();
  $(window).scroll(updateProgress);
  var offset = 50;
  var duration = 550;
  jQuery(window).on('scroll', function() {
    if (jQuery(this).scrollTop() > offset) {
      jQuery('.progress-wrap').addClass('active-progress');
    } else {
      jQuery('.progress-wrap').removeClass('active-progress');
    }
  });
  jQuery('.progress-wrap').on('click', function(event) {
    event.preventDefault();
    jQuery('html, body').animate({scrollTop: 0}, duration);
    return false;
  })
  // ===================== Scroll Back to Top Js End ======================

  // ========================== add active class to ul>li top Active current page Js Start =====================
function dynamicActiveMenuClass(selector) {
  let FileName = window.location.pathname.split("/").reverse()[0];

  // If we are at the root path ("/" or no file name), keep the activePage class on the Home item
  if (FileName === "" || FileName === "index.html") {
    // Keep the activePage class on the Home link
    selector.find("li.nav-menu__item.has-submenu").eq(0).addClass("activePage");
  } else {
    // Remove activePage class from all items first
    selector.find("li").removeClass("activePage");

    // Add activePage class to the correct li based on the current URL
    selector.find("li").each(function () {
      let anchor = $(this).find("a");
      if ($(anchor).attr("href") == FileName) {
        $(this).addClass("activePage");
      }
    });

    // If any li has activePage element, add class to its parent li
    selector.children("li").each(function () {
      if ($(this).find(".activePage").length) {
        $(this).addClass("activePage");
      }
    });
  }
}

if ($('ul').length) {
  dynamicActiveMenuClass($('ul'));
}
  // ========================== add active class to ul>li top Active current page Js End =====================

    
  // ========================== Select2 Js Start =================================
  $(document).ready(function() {
    $('.js-example-basic-single').select2();
  });
  // ========================== Select2 Js End =================================
  
  // ========================= Brand Slider Js Start ==============
  $('.brand-slider').slick({
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 1500,
    dots: false,
    pauseOnHover: true,
    arrows: false,
    draggable: true,
    rtl: $('html').attr('dir') === 'rtl' ? true : false,
    speed: 900,
    infinite: true,
    nextArrow: '#brand-next',
    prevArrow: '#brand-prev',
    responsive: [
      {
        breakpoint: 1399,
        settings: {
          slidesToShow: 6,
          arrows: false,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 5,
          arrows: false,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 4,
          arrows: false,
        }
      },
      {
        breakpoint: 424,
        settings: {
          slidesToShow: 2,
          arrows: false,
        }
      },
      {
        breakpoint: 359,
        settings: {
          slidesToShow: 2,
          arrows: false,
        }
      },
    ]
  });  
  // ========================= Brand Slider Js End ===================
  
  // ========================= Brand Slider Js Start ==============
  $('.features-slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    speed: 1500,
    dots: false,
    pauseOnHover: true,
    arrows: true,
    draggable: true,
    rtl: $('html').attr('dir') === 'rtl' ? true : false,
    speed: 900,
    infinite: true,
    nextArrow: '#features-next',
    prevArrow: '#features-prev',
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          arrows: false,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          arrows: false,
        }
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          arrows: false,
        }
      },
    ]
  });  
  // ========================= Brand Slider Js End ===================

  // ========================= Wishlist Button Js Start ===================
  $('.wishlist-btn').on('click', function () {
    $(this).removeClass('text-main-two-600'); 
    $(this).toggleClass('text-white bg-main-two-600'); 
  })
  // ========================= Wishlist Button Js End ===================
  
  // ========================= Instructor Button Js Start ===================
  $('.social-infos .social-infos__button').on('click', function () {
    $('.social-list').not($(this).siblings('.social-list')).removeClass('d-flex'); 
    $('.social-infos .social-infos__button').not($(this)).removeClass('active'); 
    $(this).siblings('.social-list').toggleClass('d-flex'); 
    $(this).toggleClass('active'); 
  });
  // ========================= Instructor Button Js End ===================

  // ========================= Brand Slider Js Start ==============
  $('.instructor-slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    speed: 1500,
    dots: false,
    pauseOnHover: true,
    arrows: true,
    draggable: true,
    rtl: $('html').attr('dir') === 'rtl' ? true : false,
    speed: 900,
    infinite: true,
    nextArrow: '#instructor-next',
    prevArrow: '#instructor-prev',
    responsive: [
      {
        breakpoint: 1299,
        settings: {
          slidesToShow: 2,
          arrows: false,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          arrows: false,
        }
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          arrows: false,
        }
      },
    ]
  });  
  // ========================= Brand Slider Js End ===================

   // =========================Testimonials Slider Js Start ===================
   $('.testimonials__thumbs-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    rtl: $('html').attr('dir') === 'rtl' ? true : false,
    asNavFor: '.testimonials__slider'
  });

  $('.testimonials__slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.testimonials__thumbs-slider',
    dots: false,
    arrows: true,
    rtl: $('html').attr('dir') === 'rtl' ? true : false,
    focusOnSelect: true,
    nextArrow: '#testimonials-next',
    prevArrow: '#testimonials-prev',
  });
  // =========================Testimonials Slider Js End ===================

  
  // ========================= magnific Popup Js Start =====================
  $('.play-button').magnificPopup({
    type:'iframe',
    removalDelay: 300,
    mainClass: 'mfp-fade',
  });
  // ========================= magnific Popup Js End =====================
  

   // ========================= Counter Up Js End ===================
   const counterUp = window.counterUp.default;

   const callback = (entries) => {
     entries.forEach((entry) => {
       const el = entry.target;
       if (entry.isIntersecting && !el.classList.contains('is-visible')) {
         counterUp(el, {
           duration: 2000,
           delay: 16,
         });
         el.classList.add('is-visible');
       }
     });
   };
 
   const IO = new IntersectionObserver(callback, { threshold: 1 });
 
   // Counter Two for each
   const counterNumbers = document.querySelectorAll('.counter');
   if (counterNumbers.length > 0) {
     counterNumbers.forEach((counterNumber) => {
       IO.observe(counterNumber);
     });
   }

  // ========================= Brand Slider Js Start ==============
  $('.category-item-slider').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    speed: 1500,
    dots: false,
    pauseOnHover: true,
    arrows: true,
    draggable: true,
    rtl: $('html').attr('dir') === 'rtl' ? true : false,
    speed: 900,
    infinite: true,
    nextArrow: '#category-next',
    prevArrow: '#category-prev',
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
          arrows: false,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          arrows: false,
        }
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          arrows: false,
        }
      },
    ]
  });  
  // ========================= Brand Slider Js End ===================

  // ========================= Testimonials Slider Two Js Start ==============
  $('.testimonials-two-slider').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    speed: 1500,
    dots: false,
    pauseOnHover: true,
    arrows: true,
    draggable: true,
    rtl: $('html').attr('dir') === 'rtl' ? true : false,
    speed: 900,
    infinite: true,
    nextArrow: '#testimonials-two-next',
    prevArrow: '#testimonials-two-prev',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          arrows: false,
        }
      },
    ]
  });  
  // ========================= Testimonials Slider Two Js End ===================
  
  // ========================= Background Image Js Start ===================
    $(".background-img").css('background-image', function () {
      var bg = 'url(' + $(this).data("background-image") + ')';
      return bg;
    });
  // ========================= Background Image Js End ===================
  
  // ========================= Testimonials Slider Two Js Start ==============
  $('.banner-three__slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    speed: 1500,
    dots: false,
    pauseOnHover: true,
    arrows: true,
    draggable: true,
    rtl: $('html').attr('dir') === 'rtl' ? true : false,
    speed: 900,
    infinite: true,
    fade: true,
    nextArrow: '#banner-three-next',
    prevArrow: '#banner-three-prev',
  });

  $('.banner-three__slider').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    $('.wow').css('visibility', 'hidden').removeClass('animated'); 
  });

  $('.banner-three__slider').on('afterChange', function(event, slick, currentSlide) {
    new WOW().init();
    $('.wow').css('visibility', 'visible'); 
  });
// ========================= Testimonials Slider Two Js End ===================

  // ========================= Testimonials Slider Two Js End ===================
  
  // ========================= Testimonials Slider Two Js Start ==============
  $('.testimonials-three-slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    speed: 1500,
    dots: false,
    pauseOnHover: true,
    arrows: true,
    draggable: true,
    rtl: $('html').attr('dir') === 'rtl' ? true : false,
    speed: 900,
    infinite: true,
    centerMode: true,
    centerPadding: '0px',
    nextArrow: '#testimonials-three-next',
    prevArrow: '#testimonials-three-prev',
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          arrows: false,
        }
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          arrows: false,
        }
      },
    ]
  });  
  // ========================= Testimonials Slider Two Js End ===================

  // ========================= Brand Slider Js Start ==============
  $('.blog-two-slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    speed: 1500,
    dots: false,
    pauseOnHover: true,
    arrows: true,
    draggable: true,
    rtl: $('html').attr('dir') === 'rtl' ? true : false,
    speed: 900,
    infinite: true,
    nextArrow: '#blog-two-next',
    prevArrow: '#blog-two-prev',
    responsive: [
      {
        breakpoint: 1299,
        settings: {
          slidesToShow: 2,
          arrows: false,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          arrows: false,
        }
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          arrows: false,
        }
      },
    ]
  });  
  // ========================= Brand Slider Js End ===================

  // ========================== Range Slider Js Start =====================
   $(function() {
    $( "#slider-range" ).slider({
        range: true,
        min: 0,
        max: 1000,
        values: [ 100, 1000 ],
        slide: function( event, ui ) {
            $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
        }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
    " - $" + $( "#slider-range" ).slider( "values", 1 ) );
  });
  
  // ========================== Course List filter bar btn start ================================
  $('.list-bar-btn').on('click', function () {
    $('.sidebar').addClass('active');
    $('.side-overlay').addClass('show');
  });

  $('.sidebar-close, .side-overlay').on('click', function () {
    $('.sidebar').removeClass('active');
    $('.side-overlay').removeClass('show');
  });
  // ========================== Course List filter bar btn End ================================

  // ========================== Tooltip Start ================================
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
  // ========================== Tooltip Start End ================================

  // ================== Password Show Hide Js Start ==========
  $(".toggle-password").on('click', function() {
    $(this).toggleClass("active");
    var input = $($(this).attr("id"));
    if (input.attr("type") == "password") {
      input.attr("type", "text");
      $(this).removeClass('ph-bold ph-eye-closed');
      $(this).addClass('ph-bold ph-eye');
    } else {
      input.attr("type", "password");
        $(this).addClass('ph-bold ph-eye-closed');
    }
  });
  // ========================= Password Show Hide Js End ===========================
  
  // ========================= Player Js Start ===========================
    const player = new Plyr('#player');
    const featuredPlayer = new Plyr('#featuredPlayer');
  // ========================= Player Js End ===========================
  
  // ========================= Brand Slider Js Start ==============
  $('.tutor-slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    speed: 1500,
    dots: false,
    pauseOnHover: true,
    arrows: true,
    draggable: true,
    rtl: $('html').attr('dir') === 'rtl' ? true : false,
    speed: 900,
    infinite: true,
    nextArrow: '#tutor-next',
    prevArrow: '#tutor-prev',
    responsive: [
      {
        breakpoint: 1299,
        settings: {
          slidesToShow: 2,
          arrows: false,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          arrows: false,
        }
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          arrows: false,
        }
      },
    ]
  });  
  // ========================= Brand Slider Js End ===================

  // ========================= Increment & Decrement Js Start ===================
  var minus = $('.quantity__minus');
  var plus = $('.quantity__plus');

  $(plus).on('click', function () {
    var input = $(this).siblings('.quantity__input');
    var value = input.val(); 
    value++;
    input.val(value); 
  }); 

  $(minus).on('click', function () {
    var input = $(this).siblings('.quantity__input');
    var value = input.val(); 
    if(value > 1) {
      value--;
    }
    input.val(value); 
  }); 
  // ========================= Increment & Decrement Js End ===================
  
  // ========================= Review Js Start ==============
  $('.review-slider, .review-slider-two').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    speed: 1500,
    dots: true,
    pauseOnHover: true,
    arrows: true,
    draggable: true,
    rtl: $('html').attr('dir') === 'rtl' ? true : false,
    speed: 900,
    infinite: true,
    nextArrow: '#review-slider-next',
    prevArrow: '#review-slider-prev',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          arrows: false,
        }
      },
    ]
  });  
  // ========================= Review Js End ===================

  // ========================= Wow Js Start ===================
  new WOW().init();
  // ========================= Wow Js End ===================

  // ========================= AOS Animation Js Start ===================
  AOS.init({
    offset: 40,
    duration: 1000,
    // once: true,
    easing: 'ease',
  });
  // ========================= AOS Animation Js End ===================

  $('.masonry__image').magnificPopup({
    type: 'image',
    removalDelay: 300,
    mainClass: 'mfp-fade',
    gallery:{
      enabled:true
    }
  });

    // ========================= Color List Js Start ===================
    $('.color-list__button').on('click', function () {
      $('.color-list__button').removeClass('active'); 
  
      if(!$(this).hasClass('active')) {
        $(this).addClass('active');
        $(this).removeClass('border-neutral-50');
      } else {
        $(this).removeClass('active');
        $(this).addClass('border-neutral-50');
      };
    }); 
    // ========================= Color List Js End ===================
    
    // ========================= Product Details Slider Js Start ===================
    
    $('.product-big-thumbs').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      rtl: $('html').attr('dir') === 'rtl' ? true : false,
      fade: true,
      asNavFor: '.product-small-thumbs'
    });
    $('.product-small-thumbs').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      asNavFor: '.product-big-thumbs',
      arrows: false,
      dots: false,
      rtl: $('html').attr('dir') === 'rtl' ? true : false,
      autoplay: false,
      centerMode: true,
      responsive: [
        {
          breakpoint: 575,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 424,
          settings: {
            slidesToShow: 2,
          }
        },
      ]
    });
    // ========================= Product Details Slider Js End ===================

    // ========================= Add To Cart Js Start ===================
    $('.add-to-cart').on('click', function () {
      $(this).toggleClass('active')
    });
    // ========================= Add To Cart Js End ===================
  

  });
  // ==========================================
  //      End Document Ready function
  // ==========================================

  // ========================= Preloader Js Start =====================
    $(window).on("load", function(){
      $('.preloader').fadeOut(); 
    })
    // ========================= Preloader Js End=====================

    // ========================= Header Sticky Js Start ==============
    $(window).on('scroll', function() {
      if ($(window).scrollTop() >= 260) {
        $('.header').addClass('fixed-header');
      }
      else {
          $('.header').removeClass('fixed-header');
      }
    }); 
    // ========================= Header Sticky Js End===================

})(jQuery);
