class Clock {
    constructor() {

        this.timeLeft = 300;
        this.timerElement = document.getElementById('timer');
        this.timerElement.innerText = '5:00'
        this.interval = null;
    }

    calcStartTime(level) {
        if (level < 7) {
            this.timeLeft = 300 - (50 * (level-1));
        } else if (level === 7) {
            this.timeLeft = 40;
        } else if (level === 8) {
            this.timeLeft = 30;
        } else if (level === 9) {
            this.timeLeft = 25;
        } else {
            this.timeLeft = 20;
        }
    }

    convertSecsToMins(time) {
        let seconds = (this.timeLeft % 60).toString();
        const minutes = (Math.floor(this.timeLeft/ 60)).toString();
        
        if (seconds.length < 2) {
            seconds = "0".concat(seconds);
        };

        this.timerElement.innerText = minutes.concat(":",seconds);
    }

    startTimer() {
        this.tick(); // initial tick before loop of waiting 1 second starts
        this.interval = setInterval(() => this.tick(),1000);
    }

    stopTimer() {
        clearInterval(this.interval);
    }

    tick() {
        this.timeLeft--;
        this.convertSecsToMins();
        if (this.timeLeft === 0) {
            this.stopTimer();
        };

    }
}  

const timer = new Clock();
