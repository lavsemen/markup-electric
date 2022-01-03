document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.header__menu');
    const burgerButton = document.querySelector('.burger');

    const closeMenu = (e) => {
        menu.classList.remove('active')
        e.target.removeEventListener('click', closeMenu)
    }
    const clickHandler = () => {
        const closeBtn = menu.querySelector('.menu__close')
        menu.classList.toggle('active');
        burgerButton.classList.toggle('active')
        closeBtn.addEventListener('click', closeMenu)
    }
    burgerButton.addEventListener('click', clickHandler)
})
