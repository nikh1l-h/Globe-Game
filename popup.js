class GamePopup {
    constructor() {
        this.popup = document.getElementById('game-popup');
        this.popupText = document.querySelector('#game-popup p b');
        this.time = 0; // stores how much more time the popup should be on the screen for
        this.interval = null
    }

    updatePopup(text) { // general method that displays on the screen the string that is passed in
        this.popupText.innerText = text; 
        this.time = 5; // sets the popup so it will be visible for 5 seconds

        if ((this.popup).classList.contains('hidden')) { // if popup is not already visible:
            togglePageVisibility('game-popup'); // show the popup and start the timer
            this.startTimer();
        };
        
    }

    startTimer() {
        this.interval = setInterval(() => {
            if (this.time === 0) { 
                togglePageVisibility('game-popup'); // hides the popup if it has no time left
                clearInterval(this.interval); // stops the timer so it does not become negative
            } else {
                this.time--; // decrements time left if != 0
            } 
        }, 1000); // 1000ms = repeats every second until time left = 0
    }

    showDoubleGuessError(iso_code) { // displays an error if the user guesses same country twice
        const countryName = newGlobe.getCountryName(iso_code);
        const message = countryName.concat(' has already been guessed');
        this.updatePopup(message);
    }

    showUnknownCountryError() {
        this.updatePopup('Country not found');
    }

    showAdjacentCountry(iso_code) { // displays a message if the user guesses adjacent country
        const countryName = newGlobe.getCountryName(iso_code);
        const message = countryName.concat(' is adjacent to the answer!');
        this.updatePopup(message);
    }
}

const popup = new GamePopup();
