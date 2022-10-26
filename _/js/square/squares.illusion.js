import "/_/js/createCanvas.js"
import { getPoints } from "/_/js/getPoints.js";
import { drawLines } from "/_/js/square/drawLines.js";
import {drawSquares} from "/_/js/square/drawSquares.js";

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let lines = 9;
let blockSize = 20;

function drawIllusion() {
    const width = canvas.getAttribute('width');
    const height = canvas.getAttribute('height');
    const points = getPoints(width, height);
    const pixelSize = Math.floor((points.bl.y - points.ul.y) / (lines * blockSize + (lines+1) * blockSize / 20)) || 1;
    drawLines(ctx, points, pixelSize);
    drawSquares(ctx, points, pixelSize);
    console.log({width, height, points, pixelSize});
}

drawIllusion();
window.addEventListener('resize', drawIllusion);
