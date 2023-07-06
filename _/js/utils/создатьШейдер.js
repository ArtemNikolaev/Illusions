export function создатьШейдер(контекстРендеринга, типШейдера, исходныйКодШейдера) {
  const шейдер = контекстРендеринга.createShader(типШейдера);
  контекстРендеринга.shaderSource(шейдер, исходныйКодШейдера);
  контекстРендеринга.compileShader(шейдер);

  const этоУспех = контекстРендеринга.getShaderParameter(шейдер, контекстРендеринга.COMPILE_STATUS);
  if (этоУспех) {
    return шейдер;
  }

  console.error(контекстРендеринга.getShaderInfoLog(шейдер));
  контекстРендеринга.deleteShader(шейдер);
  throw `Creating ${типШейдера} shader FAILED`;
}
