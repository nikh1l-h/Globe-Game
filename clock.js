class Clock {
    constructor() {

        this.timeLeft = 300;
        this.timerElement = document.getElementById('timer');
    }

    calcStartTime(level) {

    }

    startTimer() {
        setInterval(() => this.tick(),1000);
    }

    checkClockEnd() {

    }

    tick() {
        const seconds = this.timeLeft % 60;
        const minutes = Math.floor(this.timeLeft/ 60); // integer division 
        this.timerElement.innerText = (minutes.toString()).concat(":",(seconds.toString()));
        this.timeLeft--;
    }
}  

const timer = new Clock()
timer.startTimer()