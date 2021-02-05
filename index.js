class CountdownTimer {
    constructor ({selector, targetDate}) {
        this.selector = selector;
        this.targetDate = targetDate;
        this.root = document.querySelector(this.selector)
        this.refs = {
            days: this.root.querySelector('span[data-value="days"]'),
            hours: this.root.querySelector('span[data-value="hours"]'),
            mins: this.root.querySelector('span[data-value="mins"]'),
            secs: this.root.querySelector('span[data-value="secs"]'),
        };
        this.intervalID = null
    }

    start () {
        const startTime = this.targetDate.getTime();
        this.updateClockface (0)
        this.intervalID = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = startTime - currentTime;
            if (deltaTime <= 0) {
                this.stop()
            }
            this.updateClockface(deltaTime);
        }, 1000);
    }

    stop () {
        clearInterval(this.intervalID);
        this.root.textContent = '';
    }

    updateClockface (time) {
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));  // вызов функции pad, в которую передаем то, что вернет Math.floor
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
        this.refs.days.textContent = `${days}`
        this.refs.hours.textContent = `${hours}`
        this.refs.mins.textContent = `${mins}`
        this.refs.secs.textContent = `${secs}`
    }
      
    pad (value) {
        return String(value).padStart(2, '0')
    }
}

const timer = new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date('Feb 14, 2021'),
  });

timer.start()

