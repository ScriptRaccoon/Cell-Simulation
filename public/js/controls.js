import { Poison } from "./objects/Poison.js";

const poisonToggler = document.getElementById("poisonToggler");
const poisonLabel = document.getElementById("poisonLabel");
poisonToggler.checked = false;

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
            Poison.removeAll();
        }
    });
}
