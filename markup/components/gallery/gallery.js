document.addEventListener('DOMContentLoaded', () => {
    new Swiper('.gallery', {
        speed: 900,
        navigation: {
            prevEl: '.gallery .swiper-button-prev',
            nextEl: '.swiper-button-next'
        },
        pagination: {
            el: '.gallery .swiper-pagination',
            type: 'progressbar',
          },
    })
})
