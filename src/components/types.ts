import * as THREE from 'three';

export interface IBox {
  color: string,
  x: number,
  y: number,
  z?: number,
  velocity?:{
    x: number,
    y: number,
    z: number
  }
  depth: number,
  scene: THREE.Scene
}