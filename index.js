import { addCharacter, setupControls, setupGround, setupScene } from './scene';

window.init = () => {
  const {
    scene,
    camera,
    renderer,
  } = setupScene();

  setupGround(scene);

  addCharacter(scene, ({animations, model}) => {
    setupControls(model);
    renderer.render(scene, camera);
  });

  function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
  }
  animate();
}
