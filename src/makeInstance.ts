import * as THREE from 'three';

interface IMakeInstance {
  color: string,
  x: number,
  y: number,
  z?: number,
  depth: number,
  scene: THREE.Scene
}
export function makeInstance( {color, x, y, z = 0, depth, scene}:IMakeInstance) : THREE.Mesh {
  let geometry;
  geometry = new THREE.BoxGeometry(1, 1, depth);
  const material = new THREE.MeshPhongMaterial({color});

  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  cube.position.x = x;
  cube.position.y = y;
  cube.position.z= depth / 2 + z;
  return cube;
}