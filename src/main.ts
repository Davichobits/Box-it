import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { makeInstance } from './makeInstance';


const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const fov = 50;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;
const camera =  new THREE.PerspectiveCamera(fov, aspect,near, far);



const controls = new OrbitControls(camera, renderer.domElement);

camera.position.x = 3.573248878098756;
camera.position.y = -4.065828343541558;
camera.position.z = 9.317981352761144;

const scene = new THREE.Scene();





/*
  0 -> ground
  1 -> player
  2 -> box to move
  3 -> wall
  4 -> goal
*/



const boxColors: Record<number, string> = {
  0: '#702ced',
  1: '#fdf36b',
  2: '#aaff0c',
  3: 'white',
  4: '#e6931c',
}

const gameMatrix = [
  [3,3,3,3,3,3,3],
  [3,0,0,0,0,0,3],
  [3,0,0,0,1,0,3],
  [3,0,0,0,0,0,3],
  [3,3,3,0,2,0,3],
  [3,4,0,0,0,0,3],
  [3,3,3,3,3,3,3],
  // [0,1]
];

let cubes: THREE.Mesh[] = [];
let xPosition = 0;
let yPosition = 0;
let depth = 1;
let rounded = false;
gameMatrix.forEach(row=>{
  yPosition -= 1;
  xPosition = 0;
  row.forEach(box=>{
    xPosition += 1;

    if(box === 1 || box === 2){
      rounded = true;
    }else{
      rounded = false;
    }
    if(box === 1 || box === 2 || box === 3){
      depth = 2
    }else{
      depth = 1
    }
    cubes.push(makeInstance( {
      color: boxColors[box], 
      x: xPosition, 
      y: yPosition, 
      depth: depth,
      rounded: rounded,
      scene:scene,
    }));
  });
});

// LIGHT
const color = 0XFFFFFF;
const intensity = 3;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1,2,4);
scene.add(light);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);



function render(time:number){
  time *=0.001;
  
  cubes.forEach((cube, ndx)=>{
    const speed = 1 + ndx * .1;
    const rot = time * speed;
    // cube.rotation.x = rot;
    // cube.rotation.y = rot;
  });

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
requestAnimationFrame(render);