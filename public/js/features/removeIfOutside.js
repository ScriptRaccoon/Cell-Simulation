export const removeIfOutside = (body) => {
    if (body.isOutside()) {
        body.remove();
    }
};

export const removeIfFarOutside = (body) => {
    if (body.isOutside(2)) {
        body.remove();
    }
};
