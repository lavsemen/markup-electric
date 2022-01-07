/*
  Для инициализации класса параметром необходимо передать селектор формы, он должен быть уникальным, желательно id.
  Стандартные параметры: required, email, minLength, maxLength, numbers, regexp определены в корне.
  Для определения полей валидации используется метод addField(selector, params), в параметры принимаются,
  errorClass, validClass rules и errorMessage.
  errorClass и validClass - классы, которые будут примениться к input после валидации.
  rules и errorМessage - объекты, где клюем являться правило, а значением значение выбранного правила.
  Для поля вывода ошибок необходимо задать data-validate-type="error" и data-field-id="ID поля к которому будет примениться валидация".
  addCustomRule(ruleName, callback) - позволяет добавлять кастомные правила для валидации. сallback принимает 2 параметра field и value.
  Первый предоставляет доступ к input который будет валидирован, а второй значение которое мы передаем в вызове валидации.
  Кастомные правила необходимо вызывать до того как будет вызван метод addField. Вызов кастомных свойств не отличается от использования стандартных,
  rules мы объявляем правило, а в errorMessage описываем сообщение по имени кастомного свойства.
*/
class RmValidate {
    constructor(formSelector) {
      this._selector = formSelector;
      this.errorFields = [];
      this.errors = []
      this.allFields = []
      this._init();
    }
    // Инициализация класса
    _init() {
      this.form = document.querySelector(this._selector)
      this.submitButton = this.form.querySelector('[type="submit"]');
      this.errorFields = Array.from(document.querySelectorAll('[data-validate-type="error"]'))
      this.allFields = Array.from(this.form.querySelectorAll('input'))
    };

    _showErrorMessage(field, errorField, errorMessage, ruleName, errorClass, validClass) {
      const message = errorMessage[ruleName] || 'Ошибка'
      errorField.textContent = message;
      errorField.style.display = 'block'
      field.classList.add(errorClass)
      field.classList.remove(validClass)
    }
    _hideErrorMessage(field, errorField, errorClass, validClass) {
      errorField.style.display = 'none';
      field.classList.add(validClass)
      field.classList.remove(errorClass)
    }

    _minLength(field, length) {
      if (field.value.length < length) {
        return false;
      } else {
        return true;
      }
    }
    _maxLength(field, length) {
      if (field.value.length > length) {
        return false;
      } else {
        return true;
      }
    }
    _numbers(field, value) {
      const regexp = /^\d+$/;
      return regexp.test(field.value);
    }
    _regexp(field, regexp) {
      return regexp.test(field.value);
    }
    _email(field, value) {
      const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regexp.test(field.value)
    }
    _required(filed, value, context) {
      let isValid = true;
      const arrReq = context.allFields.filter(item => item.required === true);
      arrReq.forEach(item => {
        const errorId = item.id;
        const error = context.form.querySelector(`[data-field-id="${errorId}"]`);
        if (item.value.length <= 0) {
          isValid = false;
          error.textContent = this.errorMessage.required
          error.style.display = 'block';
          item.classList.add(this.errorClass)
          item.classList.remove(this.validClass)
          context.submitButton.disabled = true;
        } else {
          error.style.display = 'none';
          item.classList.remove(this.errorClass);
          item.classList.add(this.validClass);
        }
      })
      return isValid;
    }

    //Применение валидации на инпут
    _addValidationOnField(field, form, params) {
      const { rules, errorMessage } = params;
      const validClass = this.validClass = params.validClass || 'rm-valid';
      const errorClass = this.errorClass = params.errorClass || 'rm-invalid';
      this.errorMessage = errorMessage;


      if (this.errorFields.length !== 0) {
        const errorField = this.errorFields.find(item => item.dataset.fieldId === field.id);

        if (errorField) {
          const rulesEntries = Object.entries(rules);
          let isValid = false;
          this.submitButton.disabled = true;
          errorField.style.display = 'none';

          if (rules.required) {
            field.required = true;
          }

          field.addEventListener('input', (event) => {
            this._required(field, true, this)
            for (let i = 0; i < rulesEntries.length; i++) {
              const [ruleName, value] = rulesEntries[i];
              if (ruleName === 'required') {
                continue;
              }
              const validateFunc = this['_' + ruleName]; // динамически подставляем функцию для валидации
              const context = this;
              const isValid = validateFunc(event.target, value, context)

              if (isValid) {
                const errorIndex = this.errors.findIndex(item => item === field);
                this.errors.splice(errorIndex, 1)
                this._hideErrorMessage(field, errorField, errorClass, validClass);
                continue;
              } else {
                if (errorMessage) {
                  this._showErrorMessage(field, errorField, errorMessage, ruleName, errorClass, validClass);
                  this.submitButton.disabled = true;
                  if (!this.errors.includes(field)) {
                    this.errors.push(field)
                  }

                }
                return false;
              }
            }

            if (!this.errors.length && this._required(field, true, this)) {
              this.submitButton.disabled = false;
              return true;
            }
          })

        } else {
          throw new Error('Add [data-filed-id="Your ID"] on error block')
        }

      } else {
        throw new Error('Add [data-validate-type="error"] on error block')
      }

    }
    // Добавление нового поля
    addFiled(selector, params) {
      const fields = Array.from(this.form.querySelectorAll(selector));
      fields.forEach(field => {
        if (typeof params === 'object' && params instanceof Object) {
          this._addValidationOnField(field, this.form, params)
        }
      })
    }

    // Добавление нового правила валидации
    addCustomRule(ruleName, callback) {
      const name = '_' + ruleName;
      if (typeof callback !== 'function') {
        throw new Error('Second param must be function');
        return false;
      }
      this[name] = callback;
    }
  }
