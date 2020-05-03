// TODO pass to typescript and fix the missing types from playcanvas

import playcanvas from 'playcanvas';

function getImgData() {
  return 'data:image/png;base64,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';
}

function getTexture(app) {
  const texture = new playcanvas.gfx.Texture(app.graphicsDevice);

  const img = new Image();
  img.onload = function () {
    texture.minFilter = playcanvas.gfx.FILTER_LINEAR;
    texture.magFilter = playcanvas.gfx.FILTER_LINEAR;
    texture.addressU = playcanvas.gfx.ADDRESS_CLAMP_TO_EDGE;
    texture.addressV = playcanvas.gfx.ADDRESS_CLAMP_TO_EDGE;
    texture.setSource(img);
  };
  img.src = getImgData();
  return texture;
}

export default function setupRotatingLogo(canvas) {
  const app = new playcanvas.Application(canvas, {});
  app.start();
  app.setCanvasFillMode(playcanvas.FILLMODE_NONE);
  app.setCanvasResolution(playcanvas.RESOLUTION_AUTO);
  app.resizeCanvas(canvas.width, canvas.height);

  const camera = new playcanvas.Entity();
  camera.addComponent('camera', {
    clearColor: new playcanvas.Color(0.98,0.98,0.98),
  });
  camera.setPosition(0, 0, 3);
  app.root.addChild(camera);

  const cube = new playcanvas.Entity();
  cube.addComponent('model', { type: 'box' });
  app.root.addChild(cube);
  const m = cube.model.model.meshInstances[0].material;
  m.diffuseMap = getTexture(app);
  m.update();

  const light = new playcanvas.fw.Entity();
  light.addComponent('light', { type: 'point' });
  light.setPosition(0, 0, 2);
  app.root.addChild(light);

  let timer = 0;
  app.on('update', function (dt) {
    timer += dt;
    cube.rotate(dt * 10, dt * 20, dt * 30);
  });
}
