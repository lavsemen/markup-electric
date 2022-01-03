document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.header__menu');
    const burgerButton = document.querySelector('.burger');
    const links = document.querySelectorAll('.menu .menu__item .link')

    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
        })
    })
    const closeMenu = (e) => {
        menu.classList.remove('active')
        burgerButton.classList.remove('active')
        e.target.removeEventListener('click', closeMenu)
    }
    const clickHandler = () => {
        const closeBtn = menu.querySelector('.menu__close')
        menu.classList.add('active');
        burgerButton.classList.add('active')
        closeBtn.addEventListener('click', closeMenu)
    }
    burgerButton.addEventListener('click', clickHandler)


})
