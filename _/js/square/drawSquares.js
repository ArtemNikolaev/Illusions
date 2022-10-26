function drawSquareLine(ctx, curPoint, rX, pixelSize) {
    let { x, y } = curPoint;
    while(x <= rX - 20 * pixelSize) {
        ctx.fillStyle = 'rgb(88,117,105)';
        ctx.fillRect(x, y, 22 * pixelSize, 22 * pixelSize);
        ctx.fillStyle = 'rgb(0,0,0)';
        ctx.fillRect(x + 1 * pixelSize, y + 1 * pixelSize, 20 * pixelSize, 20 * pixelSize);

        x += (40 * pixelSize);
    }
}

export function drawSquares(ctx, points, pixelSize) {
    const vals = [
      5, 10, 15, 10
    ]
    const curPoint = {
        x: points.ul.x,
        y: points.ul.y,
    }

    while (curPoint.y < points.br.y - pixelSize * 21) {
        const sdvig = vals.shift();
        drawSquareLine(ctx,
            {
                x: curPoint.x + sdvig * pixelSize,
                y: curPoint.y,
            }
            , points.br.x, pixelSize);
        curPoint.y = curPoint.y + 21 * pixelSize;

        vals.push(sdvig);
    }
}
