import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { Renderer } from './components/Renderer';
import { Camera } from './components/Camera';
import { boxColors } from './constants';
import { drawAxes } from './helpers/drawAxes';
import { Box } from './components/Box';

const renderer = Renderer();
document.body.appendChild(renderer.domElement);

const camera = Camera();

camera.position.x = 3.877772619098608;
camera.position.y = -7.319255578537652;
camera.position.z = 5.995518578259492;

new OrbitControls(camera, renderer.domElement);

const scene = new THREE.Scene();
drawAxes(scene);

const gameMatrix = [
  [3,3,3,3,3,3,3],
  [3,0,0,0,0,0,3],
  [3,0,0,0,1,0,3],
  [3,0,0,0,0,0,3],
  [3,3,3,0,2,0,3],
  [3,4,0,0,0,0,3],
  [3,3,3,3,3,3,3],
];

let cubes: Box[] = [];
let xPosition = 0;
let yPosition = 0;
// let zPosition = 0;
let player: Box;

gameMatrix.forEach(row => {
  yPosition -= 1;
  xPosition = 0;
  row.forEach(box => {
    xPosition += 1;

    // Dibujar suelo (ground) si no es una meta (Goal)
    if (box !== 4) {
      const groundCube = new Box({
        color: boxColors[0], 
        x: xPosition, 
        y: yPosition, 
        depth: 0.1,
        scene: scene,
      });
      cubes.push(groundCube);
    }

    // Draw Walls
    if (box === 3 ) {
      const wallCube = new Box({
        color: boxColors[box], 
        x: xPosition, 
        y: yPosition, 
        z: 0.1,
        depth: 1,
        scene: scene,
      });
      cubes.push(wallCube);
    }

    // Draw Player
    if (box === 1) {
      player = new Box({
        color: boxColors[box], 
        x: xPosition, 
        y: yPosition,
        z: 1,
        velocity:{
          x: 0,
          y: 0,
          z: -0.01
        }, 
        depth: 1,
        scene: scene,
      });
      cubes.push(player);
    }
  
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
  
  // cubes.forEach((cube, ndx)=>{
  //   const speed = 1 + ndx * .1;
  //   const rot = time * speed;
  //   cube.rotation.x = rot;
  //   cube.rotation.y = rot;
  // });
  player.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
requestAnimationFrame(render);