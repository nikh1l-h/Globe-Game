class Clock { // class for everything related to the timer in my game
    constructor() {

        this.timeLeft = 300; // this will be decremented every second after user makes first guess
        this.startTime = null;
        this.timerElement = document.getElementById('timer');
        this.timerElement.innerText = '5:00';
        this.interval = null; // will store any ticking down intervals that are repeated every second
    }

    calcStartTime(level) {
        if (level < 7) {
            this.timeLeft = 300 - (50 * (level-1)); // linear function for 0<level<7, 50s subtracted every level
        } else if (level === 7) { // other times are manually selected for a controlled difficulty curve
            this.timeLeft = 40;
        } else if (level === 8) {
            this.timeLeft = 30;
        } else if (level === 9) {
            this.timeLeft = 25;
        } else {
            this.timeLeft = 20; // 20s is minimum time user has
        }

        this.startTime = this.timeLeft;
    }

    convertSecsToMins(time) {
        let seconds = (time % 60).toString();
        const minutes = (Math.floor(time/ 60)).toString();
        
        if (seconds.length < 2) { // seconds must be 2 digit 
            seconds = "0".concat(seconds);
        };

        return minutes.concat(":",seconds);
    }

    displayNewTime() { // displays the amount of time the user has left
        const out = this.convertSecsToMins(this.timeLeft);
        this.timerElement.innerText = out; 
    }

    startTimer() {
        this.tick(); // initial tick before loop of waiting 1 second starts
        this.interval = setInterval(() => this.tick(),1000); // makes the clock tick every 1000ms (1s)
    }

    stopTimer() {
        clearInterval(this.interval); // deletes the interval so the clock stops ticking
    }

    tick() {
        this.timeLeft--;
        this.displayNewTime();
        if (this.timeLeft === 0) {
            this.stopTimer();
            endGame(); // if time runs out, immediately end the game
        };

    }
}  

const timer = new Clock();
