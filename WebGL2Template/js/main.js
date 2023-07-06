import {создатьПрограмму, создатьШейдер, извлечьТекст, маштабироватьХолстПодОтображаемыйРазмер} from "../../_/js/utils";
const кнопкаУвеличенияКоличестваСтрок = document.querySelector("#controls .rows-controller .plus");
const кнопкаУменьшенияКоличестваСтрок = document.querySelector("#controls .rows-controller .minus");
const вводЦветаФона = document.querySelector("#controls .bckg-controller .color");
const вводЦветаКвадрата = document.querySelector("#controls .square-controller .color");
const вводЦветаЛинии = document.querySelector("#controls .line-controller .color");

let количествоСтрок = 20;
let указательУниформаКоличествоСтрок,
  указательУниформаЦветФона,
  указательУниформаЦветЛинии,
  указательУниформаЦветКвадрата,
  указательУниформаШирина,
  указательУниформаВысота;
const элементХолста = document.querySelector("#main-canvas");

// rc - rendering context
const rc = элементХолста.getContext("webgl2", {
  antialias: false,
  alpha: false,
  desynchronized: true
});
if (!rc) {
  throw 'WebGl2RenderingContext is unavailable';
}

async function main() {
  const [
    кодВершинногоШейдера,
    кодФрагментногоШейдера,
  ] = await Promise.all([
    извлечьТекст('./shaders/vertex.glsl'),
    извлечьТекст('./shaders/fragment.glsl'),
  ]);

  const вершинныйШейдер = создатьШейдер(rc, rc.VERTEX_SHADER, кодВершинногоШейдера);
  const фрагментныйШейдер = создатьШейдер(rc, rc.FRAGMENT_SHADER, кодФрагментногоШейдера);
  const программа = создатьПрограмму(rc, вершинныйШейдер, фрагментныйШейдер);

  указательУниформаКоличествоСтрок = rc.getUniformLocation(программа, "u_row");
  указательУниформаЦветФона = rc.getUniformLocation(программа, "u_bckg_color");
  указательУниформаЦветЛинии = rc.getUniformLocation(программа, "u_line_color");
  указательУниформаЦветКвадрата = rc.getUniformLocation(программа, "u_square_color");
  указательУниформаШирина = rc.getUniformLocation(программа, "u_width");
  указательУниформаВысота = rc.getUniformLocation(программа, "u_height");
  rc.useProgram(программа);

  render();
}

function обновитьКоличествоСтрок(значение) {
  количествоСтрок += значение;

  if (количествоСтрок < 5) количествоСтрок = 5;
}

function hexToColor(hex) {
  return [
    parseInt(hex.slice(0, 2),16) / 255,
    parseInt(hex.slice(2, 4),16) / 255,
    parseInt(hex.slice(4, 6),16) / 255,
    1.0
  ]
}

function getPageData() {
  return {
    количествоСтрок,
    цветФона: hexToColor(вводЦветаФона.value.slice(1)),
    цветЛинии: hexToColor(вводЦветаЛинии.value.slice(1)),
    цветКвадрата: hexToColor(вводЦветаКвадрата.value.slice(1))
  }
}

function render() {
  const {количествоСтрок, цветФона, цветЛинии, цветКвадрата} = getPageData();

  маштабироватьХолстПодОтображаемыйРазмер(rc.canvas);
  rc.viewport(0, 0, rc.canvas.width, rc.canvas.height);

  rc.clearColor(1, 1, 1, 0);
  rc.clear(rc.COLOR_BUFFER_BIT | rc.DEPTH_BUFFER_BIT);

  rc.uniform1i(указательУниформаКоличествоСтрок, количествоСтрок);
  rc.uniform4f(указательУниформаЦветФона, ...цветФона);
  rc.uniform4f(указательУниформаЦветЛинии, ...цветЛинии);
  rc.uniform4f(указательУниформаЦветКвадрата, ...цветКвадрата);

  const [ширинаХолста,высотаХолста] = [rc.canvas.width, rc.canvas.height]
  rc.uniform1i(указательУниформаШирина, ширинаХолста);
  rc.uniform1i(указательУниформаВысота, высотаХолста);

  rc.drawArrays(rc.TRIANGLES, 0, 6);
}

main();

window.addEventListener('resize', render);

кнопкаУвеличенияКоличестваСтрок.addEventListener('click', () => {
  обновитьКоличествоСтрок(1);
  render();
})
кнопкаУменьшенияКоличестваСтрок.addEventListener('click', () => {
  обновитьКоличествоСтрок(-1);
  render();
})

вводЦветаФона.addEventListener('change', render);
вводЦветаЛинии.addEventListener('change', render);
вводЦветаКвадрата.addEventListener('change', render);
