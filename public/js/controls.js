import { Body } from "./objects/Body.js";
import { Poison } from "./objects/Poison.js";
import { timer } from "./Timer.js";

const poisonToggler = document.getElementById("poisonToggler");
const poisonLabel = document.getElementById("poisonLabel");
const poisonInfo = document.getElementById("poisonInfo");
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
            poisonLabel.innerText = "Poison on";
            poisonInfo.style.display = "block";
            new Poison();
            poisonInterval = setInterval(
                () => new Poison(),
                Poison.frequency
            );
        } else {
            poisonInfo.style.display = "none";
            poisonLabel.innerText = "Poison off";
            clearInterval(poisonInterval);
            Body.objectsOfType.Poison = [];
            Body.objectsOfType.Helper = [];
        }
    });
    pauseToggler.addEventListener("change", () => {
        if (pauseToggler.checked) {
            timer.pause();
            pauseLabel.innerText = "Start";
            clearInterval(poisonInterval);
        } else {
            timer.start();
            pauseLabel.innerText = "Pause";
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
