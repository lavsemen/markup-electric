document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('.f-input input');

    inputs.forEach(input =>  {
        const inputWrapper = input.closest('.f-input');
        const addFocus = () => inputWrapper.classList.add('active');
        const removeFocus = () => {
            if (!input.value) {
                inputWrapper.classList.remove('active')
            }
        };

        input.addEventListener('focus', addFocus)
        input.addEventListener('focusout', removeFocus)
    })

    new PhoneMask('input.input--phone');
})
