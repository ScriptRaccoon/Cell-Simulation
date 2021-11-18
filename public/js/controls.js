import { Body } from "./objects/Body.js";
import { Poison } from "./objects/Poison.js";
import { timer } from "./Timer.js";

const poisonToggler = document.getElementById("poisonToggler");
const poisonLabel = document.getElementById("poisonLabel");
const poisonStat = document.getElementById("poisonStat");
poisonToggler.checked = false;

const pauseToggler = document.getElementById("pauseToggler");
const pauseLabel = document.getElementById("pauseLabel");
pauseToggler.checked = false;

const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");

let poisonInterval;

export function enableControls() {
    poisonToggler.addEventListener("change", () => {
        if (poisonToggler.checked) {
            poisonLabel.className = "fas fa-toggle-on";
            poisonStat.style.display = "block";
            new Poison();
            poisonInterval = setInterval(
                () => new Poison(),
                Poison.frequency
            );
        } else {
            poisonStat.style.display = "none";
            poisonLabel.className = "fas fa-toggle-off";
            clearInterval(poisonInterval);
            Body.objectsOfType.Poison = [];
            Body.objectsOfType.Helper = [];
        }
    });
    pauseToggler.addEventListener("change", () => {
        if (pauseToggler.checked) {
            timer.pause();
            pauseLabel.className = "fas fa-play-circle";
            clearInterval(poisonInterval);
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
}
