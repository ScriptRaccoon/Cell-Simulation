import { clearCanvas } from "./canvas.js";
import { Cell } from "./objects/Cell.js";
import { STATE } from "./state.js";

class History {
    constructor(source, canvas, color) {
        this.source = source;
        this.data = [];
        this.delay = 5000;
        this.interval = null;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.strokeStyle = color;
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
            this.drawBar();
            this.data.push(this.source());
            if (this.data.length + this.offset >= 280) {
                this.offset -= 50;
                this.adjustMargin();
            }
        }, this.delay);
    }

    adjustMargin() {
        this.canvas.style.marginLeft = `${this.offset}px`;
    }

    drawBar() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.data.length, this.canvas.height);
        this.ctx.lineTo(
            this.data.length,
            this.canvas.height - this.source() / 10
        );
        this.ctx.stroke();
    }
}

export const history = new History(
    () => Cell.number,
    $("#historyCanvas")[0],
    "#3080FF"
);
