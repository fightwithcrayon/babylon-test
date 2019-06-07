import * as BABYLON from 'babylonjs';

import { createCamera, createScene, createSphere, setupControls } from './scene';

window.init = () => {
  const canvas = document.getElementById('renderCanvas');
  const engine = new BABYLON.Engine(canvas, true);
  const scene = createScene(engine);
  const camera = createCamera(scene);
  const sphere = createSphere(scene);
  camera.attachControl(canvas, false);
  camera.lockedTarget = sphere;
  setupControls(sphere);

  engine.runRenderLoop(function() {
    scene.render();
  });

}

window.addEventListener('resize', function() {
  engine.resize();
});
