class PhoneMask {
    constructor(selector, parapms) {
      this.selector = selector;
      this.parapms = parapms;
      this.useMask();
    }

    useMask() {
      const phoneInputs = document.querySelectorAll(this.selector);
      const getInputNumbersValue = (input) => input.value.replace(/\D/g, "");

      const onPhonePaste = (e) => {
        const input = e.target,
          inputNumbersValue = getInputNumbersValue(input);
        const pasted = e.clipboardData || window.clipboardData;
        if (pasted) {
          const pastedText = pasted.getData("Text");
          if (/\D/g.test(pastedText)) {
            input.value = inputNumbersValue;
            return;
          }
        }
      };

      const onPhoneInput = (e) => {
        let input = e.target,
          inputNumbersValue = getInputNumbersValue(input),
          selectionStart = input.selectionStart,
          formattedInputValue = "";

        if (!inputNumbersValue) {
          return (input.value = "");
        }

        if (input.value.length != selectionStart) {
          if (e.data && /\D/g.test(e.data)) {
            input.value = inputNumbersValue;
          }
          return;
        }

        if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
          if (inputNumbersValue[0] == "9")
            inputNumbersValue = "7" + inputNumbersValue;
          const firstSymbols = inputNumbersValue[0] == "8" ? "8" : "+7";
          formattedInputValue = input.value = firstSymbols + " ";
          if (inputNumbersValue.length > 1) {
            formattedInputValue += "(" + inputNumbersValue.slice(1, 4);
          }
          if (inputNumbersValue.length >= 5) {
            formattedInputValue += ") " + inputNumbersValue.slice(4, 7);
          }
          if (inputNumbersValue.length >= 8) {
            formattedInputValue += "-" + inputNumbersValue.slice(7, 9);
          }
          if (inputNumbersValue.length >= 10) {
            formattedInputValue += "-" + inputNumbersValue.slice(9, 11);
          }
        } else {
          formattedInputValue = "+" + inputNumbersValue.slice(0, 16);
        }
        input.value = formattedInputValue;
      };
      const onPhoneKeyDown = (e) => {
        const inputValue = e.target.value.replace(/\D/g, "");
        if (e.keyCode == 8 && inputValue.length == 1) {
          e.target.value = "";
        }
      };

      phoneInputs.forEach((phoneInput) => {
        phoneInput.addEventListener("keydown", onPhoneKeyDown);
        phoneInput.addEventListener("input", onPhoneInput, false);
        phoneInput.addEventListener("paste", onPhonePaste, false);
      });
    }
  }
