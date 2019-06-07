import * as cannon from 'cannon';

export const createSphere = (scene) => {
  var sphere = BABYLON.MeshBuilder.CreateSphere('sphere', {segments:16, diameter:2}, scene);
  sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.9 }, scene);
  sphere.position.y = 20;
  return sphere;
}

export const createCamera = (scene) => {
  var camera = new BABYLON.FollowCamera('camera', new BABYLON.Vector3(0, 5,-10), scene);
  camera.radius = 20;
  camera.heightOffset = 10;
  camera.inputs.clear();
  return camera;
}

export const createScene = (engine) => {
  var scene = new BABYLON.Scene(engine);
  var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);
  var gravityVector = new BABYLON.Vector3(0,-9.81, 0);
  var physicsPlugin = new BABYLON.CannonJSPlugin(true, 10, cannon);
  scene.enablePhysics(gravityVector, physicsPlugin);
  var ground = BABYLON.MeshBuilder.CreateGround('ground1', {height:50, width:50, subdivisions: 2}, scene);
  ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  return scene;
}

export const setupControls = (target) => {
  window.addEventListener('keydown', ({ key }) => {
    switch (key) {
      case 'ArrowUp':
        target.position.z --;
        break;
      case 'ArrowDown':
        target.position.z ++;
        break;
      case 'ArrowLeft':
        target.position.x ++;
        break;
      case 'ArrowRight':
        target.position.x --;
        break;
    }
    console.log(key);
  })
}
