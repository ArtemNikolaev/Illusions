export function создатьПрограмму(контекстРендеринга, вершинныйШейдер, фрагментныйШейдер) {
  const программа = контекстРендеринга.createProgram();
  контекстРендеринга.attachShader(программа, вершинныйШейдер);
  контекстРендеринга.attachShader(программа, фрагментныйШейдер);
  контекстРендеринга.linkProgram(программа);

  const этоУспех = контекстРендеринга.getProgramParameter(программа, контекстРендеринга.LINK_STATUS);
  if (этоУспех) {
    return программа;
  }

  console.error(контекстРендеринга.getProgramInfoLog(программа));
  контекстРендеринга.deleteProgram(программа);

  throw `Creating Program FAILED`;
}
