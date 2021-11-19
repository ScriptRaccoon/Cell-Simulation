import { Cell } from "./objects/Cell.js";
import { STATE } from "./state.js";

const historyCanvas = $("#historyCanvas")[0];
const hctx = historyCanvas.getContext("2d");
hctx.strokeStyle = "#3080FF";

let offset = 0;

let history = [];
let historyInterval = null;
const step = 5000;

export function startHistory() {
    offset = 0;
    historyCanvas.style.marginLeft = "0px";
    history = [];
    clearInterval(historyInterval);
    history.push(Cell.number);
    historyInterval = setInterval(() => {
        if (STATE.PAUSED) return;
        history.push(Cell.number);
        hctx.beginPath();
        hctx.moveTo(history.length, historyCanvas.height);
        hctx.lineTo(
            history.length,
            historyCanvas.height - Cell.number / 10
        );
        hctx.stroke();
        if (history.length + offset >= 280) {
            offset -= 50;
            historyCanvas.style.marginLeft = `${offset}px`;
        }
    }, step);
}
