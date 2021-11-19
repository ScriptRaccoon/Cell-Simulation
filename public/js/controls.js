import { clearCanvas } from "./canvas.js";
import { Body } from "./objects/Body.js";
import { Cell } from "./objects/Cell.js";
import { Food } from "./objects/Food.js";
import { Poison } from "./objects/Poison.js";
import { timer } from "./Timer.js";

const poisonToggler = document.getElementById("poisonToggler");
const poisonLabel = document.getElementById("poisonLabel");
poisonToggler.checked = false;

const pauseToggler = document.getElementById("pauseToggler");
const pauseLabel = document.getElementById("pauseLabel");
pauseToggler.checked = false;

const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");

const restartBtn = document.getElementById("restartBtn");

let poisonInterval;

export function enableControls() {
    poisonToggler.addEventListener("change", () => {
        if (poisonToggler.checked) {
            poisonLabel.className = "fas fa-toggle-on";
            new Poison();
            poisonInterval = setInterval(
                () => new Poison(),
                Poison.frequency
            );
        } else {
            poisonLabel.className = "fas fa-toggle-off";
            clearInterval(poisonInterval);
            poisonInterval = null;
            Body.objectsOfType.Poison = [];
            Body.objectsOfType.Helper = [];
            Poison.writeNumber();
        }
    });
    pauseToggler.addEventListener("change", () => {
        if (pauseToggler.checked) {
            timer.pause();
            pauseLabel.className = "fas fa-play-circle";
            if (poisonInterval) clearInterval(poisonInterval);
            poisonInterval = null;
        } else {
            timer.start();
            pauseLabel.className = "far fa-stop-circle";
            if (poisonToggler.checked) {
                poisonInterval = setInterval(
                    () => new Poison(),
                    Poison.frequency
                );
            }
        }
    });
    hamburger.addEventListener("click", () => {
        menu.classList.toggle("visible");
    });
    restartBtn.addEventListener("click", () => {
        clearCanvas();
        Body.objectsOfType.Cell = [];
        Body.objectsOfType.Food = [];
        Body.objectsOfType.Helper = [];
        Body.objectsOfType.Poison = [];
        Cell.writeNumber();
        Poison.writeNumber();
        Food.writeNumber();
        new Cell();
        new Food();
    });
}
