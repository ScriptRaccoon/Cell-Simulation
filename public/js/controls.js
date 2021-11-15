import { Body } from "./objects/Body.js";
import { Poison } from "./objects/Poison.js";
import { timer } from "./Timer.js";

const poisonToggler = document.getElementById("poisonToggler");
const poisonLabel = document.getElementById("poisonLabel");
poisonToggler.checked = false;

const pauseToggler = document.getElementById("pauseToggler");
const pauseLabel = document.getElementById("pauseLabel");
pauseToggler.checked = false;

let poisonInterval;

export function enableControls() {
    poisonToggler.addEventListener("change", () => {
        if (poisonToggler.checked) {
            poisonLabel.innerText = "Poison on";
            new Poison();
            poisonInterval = setInterval(
                () => new Poison(),
                Poison.frequency
            );
        } else {
            poisonLabel.innerText = "Poison off";
            clearInterval(poisonInterval);
            Body.objectsOfType.Poison = [];
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
}
