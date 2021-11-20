import { clearCanvas } from "./canvas.js";
import { history } from "./History.js";
import { Body } from "./objects/Body.js";
import { Cell } from "./objects/Cell.js";
import { Food } from "./objects/Food.js";
import { Poison } from "./objects/Poison.js";
import { STATE } from "./state.js";
import { timer } from "./Timer.js";

let poisonInterval = null;

export function enableControls() {
    $("#poisonToggler, #pauseToggler, #historyToggler").prop(
        "checked",
        false
    );
    $("#poisonToggler").on("change", togglePoison);
    $("#historyToggler").on("change", toggleHistory);
    $("#pauseToggler").on("change", togglePause);
    $("#hamburger").on("click", toggleMenu);
    $("#restartBtn").on("click", restartSimulation);
}

function toggleHistory() {
    $("#historyLabel")
        .toggleClass("fa-toggle-off")
        .toggleClass("fa-toggle-on");
    $("#historyCanvasContainer").toggle();
}

function togglePoison() {
    if (STATE.POISON_ON == false) {
        STATE.POISON_ON = true;
        $("#poisonLabel")
            .toggleClass("fa-toggle-off")
            .toggleClass("fa-toggle-on");
        new Poison();
        poisonInterval = setInterval(
            () => new Poison(),
            Poison.frequency
        );
    } else {
        STATE.POISON_ON = false;
        $("#poisonLabel")
            .toggleClass("fa-toggle-on")
            .toggleClass("fa-toggle-off");
        clearInterval(poisonInterval);
        poisonInterval = null;
        Body.objectsOfType.Poison = [];
        Body.objectsOfType.Helper = [];
        Poison.writeNumber();
    }
}

function togglePause() {
    if (STATE.PAUSED == false) {
        STATE.PAUSED = true;
        timer.pause();
        $("#pauseLabel")
            .toggleClass("far fa-stop-circle")
            .toggleClass("fas fa-play-circle");
        clearInterval(poisonInterval);
        poisonInterval = null;
    } else {
        STATE.PAUSED = false;
        timer.start();
        $("#pauseLabel")
            .toggleClass("fas fa-play-circle")
            .toggleClass("far fa-stop-circle");
        if (STATE.POISON_ON) {
            poisonInterval = setInterval(
                () => new Poison(),
                Poison.frequency
            );
        }
    }
}

function toggleMenu() {
    $("#menu").toggleClass("visible");
    $("#hamburger")
        .toggleClass("fas fa-bars")
        .toggleClass("fas fa-times");
}

function restartSimulation() {
    clearInterval(poisonInterval);
    poisonInterval = null;
    clearCanvas();
    history.start();
    Body.objectsOfType.Body = [];
    Body.objectsOfType.Cell = [];
    Body.objectsOfType.Food = [];
    Body.objectsOfType.Helper = [];
    Body.objectsOfType.Poison = [];
    Body.objectsOfType.Immortal = [];
    Body.objectsOfType.BlackHole = [];
    Cell.writeNumber();
    Poison.writeNumber();
    Food.writeNumber();
    $(".cell-icon.immortal").hide();
    $("#immortalInfo").hide();
    new Cell();
    new Food();
}
