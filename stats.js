class Stats {
    constructor() {
        this.level = 1;
        this.currentScore = 0 // stores the score user has gained in current level
        this.totalScore = 0 // scores total level
        this.completedLevels = {}; // obj of country name: time taken for every level completed
        this.displayScore = document.getElementById('score');
    }

    calcGuessScore(distance) {
        const numGuesses = (newGlobe.guessedCountries).length;
        let addScore = 0; // addscore = amount of score to add for that guess
        if (distance === 0) { // if the user has guessed correctly
            if (numGuesses === 1) { // if user gets the country on their first guess
                addScore = 40000; 
            } else {
                addScore = (20000 - (400 * numGuesses));
            }
            
        } else { // if the user has NOT guessed correctly
            const guessRating = 1 - (distance / 20015); // 20015 = max distance between countries
            if (guessRating < 0.85) { // if the user is less than 85% close
                addScore = 800 - (60*numGuesses) - (100/guessRating); // they get less points
            } else{ // if the user is more than 85% close
                addScore = 1500 - (60*numGuesses) - (80/guessRating); // they get more points
            }
            
        }

        if (addScore < 10) { // sets a minimum score to be added
            addScore = 10;
        }

        addScore = Math.floor(addScore); // decimal scores aren't possible
        this.currentScore+=addScore;
        this.totalScore+=addScore;

        // displaying the changes to score on HUD
        (this.displayScore).innerText = this.totalScore; // HUD shows total score

        // display the changes to score on popup
        const displayPopupScore = document.getElementById('level-score-gained');
        displayPopupScore.innerText = 'Score: '.concat(this.currentScore); // popup only shows score gained from completed level

    }

    resetStats() { // everything is reset if the user starts the game again
        this.level = 0;
        this.currentScore = 0;
        this.totalScore = 0;
        this.completedLevels = {}
        this.displayScore.innerText = this.totalScore;
    }

    updateCompLevels(iso_code) { // updates the completed levels when a new guess is made
        // the name of the country is accessed
        const countryName = newGlobe.getCountryName(iso_code);

        // the time it took to find the country is accessed
        const timeTaken = timer.convertSecsToMins(timer.startTime-timer.timeLeft);

        this.completedLevels[countryName] = timeTaken; // new dict element is made, country name: time took to guess
    }
}

const statsManager = new Stats(); 

