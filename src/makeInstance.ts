import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/Addons.js';

interface IMakeInstance {
  color: string,
  x: number,
  y: number,
  depth: number,
  rounded: boolean,
  scene: THREE.Scene
}
export function makeInstance( {color, x, y, depth, rounded=false, scene}:IMakeInstance) : THREE.Mesh {
  let geometry;
  if(rounded){
    geometry = new RoundedBoxGeometry(1, 1, depth);
  }else{
    geometry = new THREE.BoxGeometry(1, 1, depth);
  }
  const material = new THREE.MeshPhongMaterial({color});

  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  cube.position.x = x;
  cube.position.y = y;
  return cube;
}