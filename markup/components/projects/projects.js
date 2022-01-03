document.addEventListener('DOMContentLoaded', () => {
    new Swiper('.projects', {
        spaceBetween : 24,
        allowTouchMove: false,
        navigation: {
            prevEl: '.projects__nav .navigation__button--prev',
            nextEl: '.projects__nav .navigation__button--next'
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            1200: {
                slidesPerView: 3,
            }
        }
    })
})
