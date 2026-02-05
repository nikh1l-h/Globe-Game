class Clock {
    constructor() {

        this.timeLeft = 25; // 25 is FUN and POSSIBLE
        this.timerElement = document.getElementById('timer');
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

    startTimer() {
        this.interval = setInterval(() => this.tick(),1000);
    }

    stopTimer() {
        clearInterval(this.interval);
    }

    tick() {
        this.timeLeft--;
        let seconds = (this.timeLeft % 60).toString();
        const minutes = (Math.floor(this.timeLeft/ 60)).toString();
        
        if (seconds.length < 2) {
            seconds = "0".concat(seconds);
        };
        this.timerElement.innerText = minutes.concat(":",seconds);

        if (this.timeLeft === 0) {
            this.stopTimer();
        };

    }
}  

const timer = new Clock()
timer.startTimer()
timer.calcStartTime(1)

