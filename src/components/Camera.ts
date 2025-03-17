import * as THREE from 'three';

export const Camera = (): THREE.Camera => {
  const fov = 50;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 1000;
  const camera =  new THREE.PerspectiveCamera(fov, aspect,near, far);
  return camera;
}
