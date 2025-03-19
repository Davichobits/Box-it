import * as THREE from 'three';

interface IBox {
  color: string,
  x: number,
  y: number,
  z?: number,
  depth: number,
  scene: THREE.Scene
}

export class Box extends THREE.Mesh{

  constructor({color, x, y, z = 0, depth, scene}:IBox){

    const geometry = new THREE.BoxGeometry(1,1,depth);
    const material = new THREE.MeshPhongMaterial({color});

    super(geometry,material);
    
    this.position.set(x,y,depth/2 + z);
    
    scene.add(this);
  }
}