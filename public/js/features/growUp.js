export const growUp =
    ({ duration, size }) =>
    (body, deltaTime) => {
        if (body.time <= duration / deltaTime) {
            const rate = body.time / (duration / deltaTime);
            body.size = Math.pow(rate, 3) * size;
        } else {
            body.isGrownUp = true;
        }
    };
