class Clock {
    constructor() {

        this.timeLeft = 10;
        this.timerElement = document.getElementById('timer');
        this.interval = null;
    }

    calcStartTime(level) {

    }

    startTimer() {
        this.interval = setInterval(() => this.tick(),1000);
    }

    checkClockEnd() {
        if (this.timeLeft === 0) {
            clearInterval(this.interval); // stops timer from ticking down 
            console.log('it worked')
        }
    }

    tick() {
        this.timeLeft--;
        let seconds = (this.timeLeft % 60).toString();
        const minutes = (Math.floor(this.timeLeft/ 60)).toString();
        
        if (seconds.length < 2) {
            seconds = "0".concat(seconds);
        };
        this.timerElement.innerText = minutes.concat(":",seconds);

        this.checkClockEnd()

    }
}  

const timer = new Clock()
timer.startTimer()

