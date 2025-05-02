
const swiper = new Swiper('.slider-wrapper', {
    // Optional parameters
    loop: true,
  
    // If we need pagination
    // pagination: {
    //   el: '.swiper-pagination',
    // },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints:{
         0:{
            slidesPerView: 5,
           
         },
         620:{ 
            slidesPerView: 8,
            
         },

         1024:{
            slidesPerView: 9,
         }
    }
  
    // And if we need scrollbar
  });