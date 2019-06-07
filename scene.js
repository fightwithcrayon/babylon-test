import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export const addCharacter = (scene, callback) => {
  const loader = new GLTFLoader();
  loader.load('/assets//aaaa.hrc.gltf', function (gltf) {
    const {
      scene: model,
      animations,
     } = gltf;
    scene.add(model);
    //model.position.z = -80;
    //model.rotation.x = -6;
    //model.rotation.y = -3;
    //model.rotation.z = 0;
    console.log(animations);
    if (animations && animations.length > 0) {
      clock = new THREE.Clock();
      const animationMixer = new THREE.AnimationMixer(model);
      animationMixer.clipAction(animations[currentAnimationId]).play();
      animate();
    }
    callback({
      animations,
      model,
    });
  }, undefined, function (error) {
    console.error('Error while loading glTF:', error);
  });
}

export const setupScene = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  const light = new THREE.DirectionalLight(0xffffff);
  const ambientLight = new THREE.AmbientLight(0x404040);
  light.position.set(1, 1, 1).normalize();
  scene.add(camera);
  scene.add(light);
  scene.add(ambientLight);
  var renderer = new THREE.WebGLRenderer({
    alpha: true,
  });
  renderer.setSize( window.innerWidth, window.innerHeight );

  camera.translateZ(100);
  camera.translateY(50);
  document.body.appendChild( renderer.domElement );

  return {
    camera,
    renderer,
    scene,
  }
}

export const setupGround = (scene) => {
  var geometry = new THREE.PlaneGeometry( 100, 100);
  var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
  var plane = new THREE.Mesh( geometry, material );
  plane.rotation.x = 90;
  plane.position.y = -20;
  scene.add(plane);
}

export const setupControls = (target) => {
  window.addEventListener('keydown', ({ key }) => {
    console.log(key);
      switch (key) {
        case '-':
          target.position.z --;
          break;
        case '=':
          target.position.z ++;
          break;
        case 'w':
          target.rotation.y --;
          break;
        case 's':
          target.rotation.y ++;
          break;
        case 'a':
          target.rotation.x --;
          break;
        case 'd':
          target.rotation.x ++;
          break;
        case 'ArrowUp':
          target.position.y ++;
          break;
        case 'ArrowDown':
          target.position.y --;
          break;
        case 'ArrowLeft':
          target.position.x --;
          break;
        case 'ArrowRight':
          target.position.x ++;
          break;
      }
      console.log(target);
    });
}
