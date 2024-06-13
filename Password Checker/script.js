document.addEventListener("DOMContentLoaded", function() {
    const passwordInput = document.getElementById("password");
    const lengthInput = document.getElementById("length");
    const upperCheckbox = document.getElementById("upper");
    const lowerCheckbox = document.getElementById("lower");
    const digitsCheckbox = document.getElementById("digits");
    const symbolsCheckbox = document.getElementById("symbols");
    const generateButton = document.getElementById("generate");

    function containsUppercase(str) {
        return /[A-Z]/.test(str);
    }

    function containsLowercase(str) {
        return /[a-z]/.test(str);
    }

    function containsDigits(str) {
        return /\d/.test(str);
    }

    function containsSymbols(str) {
        return /[!@#$%^&*(),.?":{}|<>]/.test(str);
    }

    function updateCheckboxes() {
        const password = passwordInput.value;
        upperCheckbox.checked = containsUppercase(password);
        if(upperCheckbox.checked) {
            upperCheckbox.disabled = false;
        } else {
            upperCheckbox.disabled = true;
        }
        lowerCheckbox.checked = containsLowercase(password);
        if(lowerCheckbox.checked) {
            lowerCheckbox.disabled = false;
        } else {
            lowerCheckbox.disabled = true;
        }
        digitsCheckbox.checked = containsDigits(password);
        if(digitsCheckbox.checked) {
            digitsCheckbox.disabled = false;
        } else {
            digitsCheckbox.disabled = true;
        }
        symbolsCheckbox.checked = containsSymbols(password);
        if(symbolsCheckbox.checked) {
            symbolsCheckbox.disabled = false;
        } else {
            symbolsCheckbox.disabled = true;
        }
    }

    passwordInput.addEventListener("input", () => {
        lengthInput.innerHTML = passwordInput.value.length;
        updateCheckboxes();
        if(passwordInput.value.length >= 10 && upperCheckbox.checked && lowerCheckbox.checked && digitsCheckbox.checked && symbolsCheckbox.checked) {
            generateButton.disabled = false;
        } else {
            generateButton.disabled = true;
        }
    });
    updateCheckboxes();
});
