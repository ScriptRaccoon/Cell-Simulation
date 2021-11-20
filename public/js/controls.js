import { history } from "./History.js";
import { population } from "./myPopulation.js";
import { STATE } from "./state.js";
import { timer } from "./Timer.js";

export function enableControls() {
    $("#pauseToggler, #historyToggler").prop("checked", false);
    $("#historyToggler").on("change", toggleHistory);
    $("#pauseToggler").on("change", togglePause);
    $("#hamburger").on("click", toggleMenu);
    $("#restartBtn").on("click", restart);
}

function restart() {
    population.start();
    history.start();
}

function toggleHistory() {
    $("#historyLabel")
        .toggleClass("fa-toggle-off")
        .toggleClass("fa-toggle-on");
    $("#historyCanvasContainer").toggle();
}

function togglePause() {
    if (STATE.PAUSED == false) {
        STATE.PAUSED = true;
        timer.pause();
        $("#pauseLabel")
            .toggleClass("far fa-stop-circle")
            .toggleClass("fas fa-play-circle");
    } else {
        STATE.PAUSED = false;
        timer.start();
        $("#pauseLabel")
            .toggleClass("fas fa-play-circle")
            .toggleClass("far fa-stop-circle");
    }
}

function toggleMenu() {
    $("#menu").toggleClass("visible");
    $("#hamburger")
        .toggleClass("fas fa-bars")
        .toggleClass("fas fa-times");
}
