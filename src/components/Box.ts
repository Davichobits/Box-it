import * as THREE from 'three';
import { IBox } from './types';

export class Box extends THREE.Mesh{

  gravity;
  velocity;

  constructor({
    color, 
    x, 
    y, 
    z = 0,
    velocity = {
      x: 0,
      y: 0,
      z: 0
    },
    depth, 
    scene}:IBox){

    const geometry = new THREE.BoxGeometry(1,1,depth);
    const material = new THREE.MeshPhongMaterial({color});

    super(geometry,material);
    
    this.position.set(x,y,depth/2 + z);
    this.gravity = -0.002;
    this.velocity = velocity;
    
    scene.add(this);
  }

  update(){
    console.log("updating");
    this.velocity.y += this.gravity;
    this.position.z += this.velocity.z;
  }
}