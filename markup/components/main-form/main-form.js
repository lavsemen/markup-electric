document.addEventListener('DOMContentLoaded', () => {
    const validator = new RmValidate('#form');

    validator.addFiled('#form-name', {
        validClass: 'valid',
        errorClass: 'invalid',
        rules: {
            required: true,
        },
        errorMessage: {
            required: 'Обязательное поле',
        }
    })
    validator.addFiled('#form-phone', {
        validClass: 'valid',
        errorClass: 'invalid',
        rules: {
            required: true,
            minLength: 17,
        },
        errorMessage: {
            required: 'Обязательное поле',
            minLength: 'Введите номер полностью'
        }
    })
})
