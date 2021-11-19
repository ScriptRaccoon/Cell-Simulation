import { clearCanvas } from "./canvas.js";
import { Body } from "./objects/Body.js";
import { Cell } from "./objects/Cell.js";
import { Food } from "./objects/Food.js";
import { Poison } from "./objects/Poison.js";
import { timer } from "./Timer.js";

let poisonInterval = null;

export function enableControls() {
    $("#poisonToggler, #pauseToggler").prop("checked", false);
    $("#poisonToggler").on("change", togglePoison);
    $("#pauseToggler").on("change", togglePause);
    $("#hamburger").on("click", toggleMenu);
    $("#restartBtn").on("click", restartSimulation);
}

function togglePoison() {
    if ($("#poisonToggler").prop("checked")) {
        $("#poisonLabel")
            .removeClass("fa-toggle-off")
            .addClass("fa-toggle-on");
        new Poison();
        poisonInterval = setInterval(
            () => new Poison(),
            Poison.frequency
        );
    } else {
        $("#poisonLabel")
            .removeClass("fa-toggle-on")
            .addClass("fa-toggle-off");
        clearInterval(poisonInterval);
        poisonInterval = null;
        Body.objectsOfType.Poison = [];
        Body.objectsOfType.Helper = [];
        Poison.writeNumber();
    }
}

function togglePause() {
    if ($("#pauseToggler").prop("checked")) {
        timer.pause();
        $("#pauseLabel")
            .removeClass("far fa-stop-circle")
            .addClass("fas fa-play-circle");
        clearInterval(poisonInterval);
        poisonInterval = null;
    } else {
        timer.start();
        $("#pauseLabel")
            .removeClass("fas fa-play-circle")
            .addClass("far fa-stop-circle");
        if ($("#poisonToggler").prop("checked")) {
            poisonInterval = setInterval(
                () => new Poison(),
                Poison.frequency
            );
        }
    }
}

function toggleMenu() {
    $("#menu").toggleClass("visible");
}

function restartSimulation() {
    clearInterval(poisonInterval);
    poisonInterval = null;
    clearCanvas();
    Body.objectsOfType.Cell = [];
    Body.objectsOfType.Food = [];
    Body.objectsOfType.Helper = [];
    Body.objectsOfType.Poison = [];
    Cell.writeNumber();
    Poison.writeNumber();
    Food.writeNumber();
    Cell.immortalNumber = 0;
    new Cell();
    new Food();
}
