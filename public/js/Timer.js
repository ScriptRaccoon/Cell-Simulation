import { clearCanvas } from "./canvas.js";
import { population } from "./Population.js";

class Timer {
    constructor(deltaTime) {
        let accumulatedTime = 0;
        this.lastTime = null;
        this.paused = false;

        this.loop = (currentTime) => {
            if (this.paused) return;
            if (this.lastTime) {
                accumulatedTime +=
                    (currentTime - this.lastTime) / 1000;
                if (accumulatedTime > 1) {
                    accumulatedTime = 1;
                }
                while (accumulatedTime > deltaTime) {
                    this.update(deltaTime);
                    accumulatedTime -= deltaTime;
                }
            }

            this.lastTime = currentTime;

            this.start();
        };
    }

    start() {
        this.paused = false;
        requestAnimationFrame(this.loop);
    }

    pause() {
        this.paused = true;
        this.lastTime = null;
    }
}

export const timer = new Timer(1 / 60);
