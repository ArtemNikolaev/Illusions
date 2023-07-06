export function маштабироватьХолстПодОтображаемыйРазмер(canvas) {
  // Lookup the size the browser is displaying the canvas in CSS pixels.
  const отображаемаяШирина  = canvas.clientWidth;
  const отображаемаяВысота = canvas.clientHeight;

  // Check if the canvas is not the same size.
  const нужнаПерерисовка = canvas.width  !== отображаемаяШирина ||
    canvas.height !== отображаемаяВысота;

  if (нужнаПерерисовка) {
    // Make the canvas the same size
    canvas.width  = отображаемаяШирина;
    canvas.height = отображаемаяВысота;
  }

  return нужнаПерерисовка;
}
