function scientific(operation) {
    const display = document.getElementById("display");
    const value = parseFloat(display.value);

    if (isNaN(value)) {
        display.value = "Enter a number first";
        return;
    }

    let result;

    switch (operation) {
        case "sin":
            result = Math.sin(value * Math.PI / 180);
            break;

        case "cos":
            result = Math.cos(value * Math.PI / 180);
            break;

        case "tan":
            if (Math.abs(value % 180) === 90) {
                display.value = "Undefined";
                return;
            }
            result = Math.tan(value * Math.PI / 180);
            break;

        case "sqrt":
            if (value < 0) {
                display.value = "Invalid input";
                return;
            }
            result = Math.sqrt(value);
            break;

        case "log":
            if (value <= 0) {
                display.value = "Invalid input";
                return;
            }
            result = Math.log10(value);
            break;

        case "ln":
            if (value <= 0) {
                display.value = "Invalid input";
                return;
            }
            result = Math.log(value);
            break;

        case "square":
            result = value * value;
            break;

        default:
            display.value = "Invalid operation";
            return;
    }

    display.value = Number(result.toFixed(10)).toString();
}
