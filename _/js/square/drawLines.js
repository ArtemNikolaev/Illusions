export function drawLines(ctx, points, pixelSize) {
    ctx.fillStyle = 'rgb(88,117,105)';
    const currentPoint = {
        x: points.ul.x,
        y: points.ul.y,
    }

    while (currentPoint.y < points.br.y) {
        ctx.fillRect(currentPoint.x, currentPoint.y, points.br.x - points.ul.x, pixelSize);
        currentPoint.y = currentPoint.y + pixelSize * 21;
    }
}
