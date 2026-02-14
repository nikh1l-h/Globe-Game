class Stats {
    constructor() {
        this.level = 1;
        this.currentScore = 0;
        this.totalScore = 0;
        this.completedLevels = {};
    }

    calcGuessScore(distance) {
        const numGuesses = (newGlobe.guessedCountries).length
        let addScore = 0
        if (distance === 0) { // the user has guessed correctly
            addScore = (10000 - (300 * numGuesses));
        } else {
            const guessRating = 1 - (distance / 20015); // 20015 = max distance between countries
            console.log(guessRating)
            addScore = Math.floor((1000*guessRating)/(numGuesses/5));
        }

        if (addScore < 10) { // sets a minimum score to be added
            addScore = 10;
        }
        this.currentScore+=addScore;
        console.log(addScore);

        const displayScore = document.getElementById('score');
        displayScore.innerText = this.currentScore;

    }
}

const statsManager = new Stats();

