class Stats {
    constructor() {
        this.level = 1;
        this.currentScore = 0
        this.totalScore = 0
        this.completedLevels = {};
    }

    calcGuessScore(distance) {
        const numGuesses = (newGlobe.guessedCountries).length
        let addScore = 0
        if (distance === 0) { // the user has guessed correctly
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
        const displayScore = document.getElementById('score');
        displayScore.innerText = this.totalScore;

        // display the changes to score on popup
        const displayPopupScore = document.getElementById('level-score-gained');
        displayPopupScore.innerText = 'Score: '.concat(this.currentScore);

    }
}

const statsManager = new Stats();

