class Clock {
    constructor() {

        this.timeLeft = 25; // 25 is FUN and POSSIBLE
        this.timerElement = document.getElementById('timer');
        this.interval = null;
    }

    calcStartTime(level) {
        if (level > 7) {

        }
        if (level > 1) {

        }
    }

    startTimer() {
        this.interval = setInterval(() => this.tick(),1000);
    }

    clockEnd() {
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
            this.clockEnd()
        }

    }
}  

const timer = new Clock()
timer.startTimer()

