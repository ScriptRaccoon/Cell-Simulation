export const canvas = $("#canvas")[0];
export const ctx = canvas.getContext("2d");
export const threshold = 100;

export function adjustCanvas() {
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();

    $(window).on("resize", resizeCanvas);
}

export function clearCanvas(c = ctx) {
    c.clearRect(0, 0, c.canvas.width, c.canvas.height);
}
