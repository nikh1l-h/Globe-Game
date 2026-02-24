class GamePopup {
    constructor() {
        this.popup = document.getElementById('game-popup');
        this.popupText = document.querySelector('#game-popup p b');
        this.time = 0;
        this.interval = null
    }

    updatePopup(text) {
        this.popupText.innerText = text;
        this.time = 5;

        if ((this.popup).classList.contains('hidden')) {
            togglePageVisibility('game-popup');
            this.startTimer();
        };
        
    }

    startTimer() {
        this.interval = setInterval(() => {
            if (this.time === 0) {
                togglePageVisibility('game-popup'); // hides the popup after 5 seconds
                clearInterval(this.interval);
            } else {
                this.time--;
            } 
        }, 1000);
    }

    showDoubleGuessError(iso_code) {
        const countryName = newGlobe.getCountryName(iso_code);
        const message = countryName.concat(' has already been guessed');
        this.updatePopup(message);
    }

    showUnknownCountryError() {
        this.updatePopup('Country not found');
    }

    showAdjacentCountry(iso_code) {
        const countryName = newGlobe.getCountryName(iso_code);
        const message = countryName.concat(' is adjacent to the answer!');
        this.updatePopup(message);
    }
}

const popup = new GamePopup();
