import * as THREE from 'three';

export const Renderer = () => { 
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  return renderer;
}