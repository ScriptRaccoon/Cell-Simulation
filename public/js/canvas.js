export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");
export const threshold = 100;

export function adjustCanvas() {
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);
}

export function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
