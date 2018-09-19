var spinner = (function () {
    var spinnerService = {};
    var activeSpinners = [];
    var elementDisplays = [];

    function getSpinnerId(elementId) {
        var spinnerId = "spinner_" + elementId;

        return spinnerId;
    };

    function isSpinnerActive(elementId) {
        return (activeSpinners.indexOf(elementId) > -1);
    }

    function getElementDisplay(elementId) {
        var index = activeSpinners.indexOf(elementId);
        var elementDisplay = elementDisplays[index];

        return elementDisplay;
    }

    function toggleSpinnerActivate(element, spinnerWasActivated) {
        if (spinnerWasActivated) {
            activeSpinners.push(element.id);
            elementDisplays.push(window.getComputedStyle(element, null).display);
        }
        else {
            var index = activeSpinners.indexOf(element.id);
            activeSpinners.splice(index, 1);
            elementDisplays.splice(index, 1);
        }
    }

    spinnerService.showSpinner = function (elementId) {
        if (!isSpinnerActive(elementId)) {

            var elementToSpin = document.getElementById(elementId);
            var width = window.getComputedStyle(elementToSpin, null).height;

            toggleSpinnerActivate(elementToSpin, true);

            var spinner = document.createElement("div");
            spinner.classList.add("loader");

            for (var i = 0; i < 4; i++) {
                var spinnerDummy = document.createElement("div");
                spinner.appendChild(spinnerDummy);
            }

            var spinnerContainer = document.createElement("div");
            spinnerContainer.id = getSpinnerId(elementId);
            spinnerContainer.width = width;
            spinnerContainer.classList.add("spin-container");
            spinnerContainer.appendChild(spinner);

            elementToSpin.parentNode.insertBefore(spinnerContainer, elementToSpin.nextSibling);
            elementToSpin.style.display = "none";
        }

    };

    spinnerService.hideSpinner = function (elementId) {
        if (isSpinnerActive(elementId)) {
            var elementToSpin = document.getElementById(elementId);
            var oldDisplayAttribute = getElementDisplay(elementId);

            toggleSpinnerActivate(elementToSpin, false);

            elementToSpin.style.display = oldDisplayAttribute;

            var spinner = document.getElementById(getSpinnerId(elementId));

            elementToSpin.parentNode.removeChild(spinner);
        }
    };

    return spinnerService;
})()


