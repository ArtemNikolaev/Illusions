export function getPoints(width, height) {
    return {
        ul: {
            x: Math.floor(width * .2),
            y: Math.floor(height * .2),
        },
        ur: {
            x: Math.floor(width * .8),
            y: Math.floor(height * .2),
        },
        bl: {
            x: Math.floor(width * .2),
            y: Math.floor(height * .8),
        },
        br: {
            x: Math.floor(width * .8),
            y: Math.floor(height * .8),
        }
    };
}
