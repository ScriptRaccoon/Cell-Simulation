import { clearCanvas } from "./canvas.js";
import { population } from "./myPopulation.js";
import { STATE } from "./state.js";

class History {
    constructor(source, canvas, colors) {
        this.source = source;
        this.colors = colors;
        this.data = [];
        this.delay = 5000;
        this.interval = null;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.offset = 0;
    }

    reset() {
        clearCanvas(this.ctx);
        this.adjustMargin();
        this.data = [];
        this.offset = 0;
        clearInterval(this.interval);
    }

    start() {
        this.reset();
        this.data.push(this.source());
        this.interval = setInterval(() => {
            if (STATE.PAUSED) return;
            const currentSource = this.source();
            this.data.push(currentSource);
            this.drawBar(currentSource);
            if (this.data.length + this.offset >= 280) {
                this.offset -= 50;
                this.adjustMargin();
            }
        }, this.delay);
    }

    adjustMargin() {
        this.canvas.style.marginLeft = `${this.offset}px`;
    }

    drawBar(currentSource) {
        let sum = 0;
        for (let i = 0; i < currentSource.length; i++) {
            if (currentSource[i] > 0) {
                this.ctx.strokeStyle = this.colors[i];
                this.ctx.beginPath();
                this.ctx.moveTo(
                    this.data.length,
                    this.canvas.height - sum
                );
                sum += currentSource[i] / 10;
                this.ctx.lineTo(
                    this.data.length,
                    this.canvas.height - sum
                );
                this.ctx.stroke();
            }
        }
    }
}

export const history = new History(
    () => [
        population.getNumber("Cell"),
        population.getNumber("Immortal"),
    ],
    $("#historyCanvas")[0],
    ["#3080FF", "#FFFFFF"]
);
