import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';


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

function makeInstance( color, x, y, depth){
  const geometry = new THREE.BoxGeometry(1, 1, depth);
  const material = new THREE.MeshPhongMaterial({color});

  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  cube.position.x = x;
  cube.position.y = y;
  return cube;
}



/*
  0 -> ground
  1 -> player
  2 -> box to move
  3 -> wall
  4 -> goal
*/

const boxColors = {
  0: 'red',
  1: 'green',
  2: 'blue',
  3: 'white',
  4: 'yellow',
}

const gameMatrix = [
  [3,3,3,3,3,3,3],
  [3,0,0,0,0,0,3],
  [3,0,0,0,1,0,3],
  [3,0,0,0,0,0,3],
  [3,3,3,0,2,0,3],
  [3,4,0,0,0,0,3],
  [3,3,3,3,3,3,3],
];

let cubes = [];
let xPosition = 0;
let yPosition = 0;
let depth = 1;
gameMatrix.forEach(row=>{
  yPosition -= 1;
  xPosition = 0;
  row.forEach(box=>{
    xPosition += 1;
    if(box === 1 || box === 2 || box === 3){
      depth = 2
    }else{
      depth = 1
    }
    cubes.push(makeInstance( boxColors[box], xPosition, yPosition, depth));
  });
});

console.log(cubes);

// LIGHT
const color = 0XFFFFFF;
const intensity = 3;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1,2,4);

scene.add(light);


function render(time){
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