
const canvas = document.createElement('canvas');
document.querySelector('body').append(canvas);

function setCanvasSize() {
    canvas.setAttribute('width', String(window.innerWidth));
    canvas.setAttribute('height', String(window.innerHeight));
}

setCanvasSize();
window.addEventListener('resize', setCanvasSize);
