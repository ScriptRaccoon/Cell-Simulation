export const removeIfOutside = (body) => {
    if (body.isOutside) {
        body.remove();
    }
};
