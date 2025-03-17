import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

export function drawAxes(scene: THREE.Scene, size: number = 5) {
  // Crear las direcciones de los ejes
  const xDir = new THREE.Vector3(1, 0, 0);
  const yDir = new THREE.Vector3(0, 1, 0);
  const zDir = new THREE.Vector3(0, 0, 1);

  // Posición de origen
  const origin = new THREE.Vector3(0, 0, 0);

  // Colores
  const xColor = 0xff0000; // Rojo
  const yColor = 0x00ff00; // Verde
  const zColor = 0x0000ff; // Azul

  // Crear flechas
  const arrowX = new THREE.ArrowHelper(xDir, origin, size, xColor);
  const arrowY = new THREE.ArrowHelper(yDir, origin, size, yColor);
  const arrowZ = new THREE.ArrowHelper(zDir, origin, size, zColor);

  scene.add(arrowX);
  scene.add(arrowY);
  scene.add(arrowZ);

  // Cargar la fuente para las etiquetas
  const fontLoader = new FontLoader();
  fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {

    // Crear texto para cada eje
    const createText = (text: string, position: THREE.Vector3, color: number) => {
      const textGeometry = new TextGeometry(text, {
        font: font,
        size: size * 0.2,
        depth: 0.05,
      });
      const textMesh = new THREE.Mesh(textGeometry, new THREE.MeshBasicMaterial({ color }));
      textMesh.position.copy(position);
      scene.add(textMesh);
    };

    // Agregar las etiquetas en las posiciones finales de cada flecha
    createText('X', new THREE.Vector3(size + 0.3, 0, 0), xColor);
    createText('Y', new THREE.Vector3(0, size + 0.3, 0), yColor);
    createText('Z', new THREE.Vector3(0, 0, size + 0.3), zColor);
  });
}
