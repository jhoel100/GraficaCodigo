import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Config
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

// Canvas & Renderer
const canvas = document.querySelector('#webgl');
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Handle window resizing
window.addEventListener('resize', () => {
    // Update dimensions
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Scene
const scene = new THREE.Scene();

//Stats
let stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.top = '0';
document.body.appendChild(stats.domElement);

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    1000
);
camera.position.set(0, 0, 10);
scene.add(camera);

const axesHelper = new THREE.AxesHelper( 100 );
scene.add( axesHelper );

// Orbit Controls
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;


//ambient light
const light = new THREE.AmbientLight( 0x404040 ); // soft white light
//const light = new THREE.AmbientLight( 0xffffff ); // soft white light
scene.add( light );


const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshPhongMaterial( {color: 0x00ff00} );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const setUp=()=> {
    const transformation = new THREE.Matrix4();
    transformation.set (
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    );
}

//Pregunta 1
const p1t1 = new THREE.Matrix4();
p1t1.set (
    1, 0, 0, 0.01,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
);

//Pregunta 2
const p2t1 = new THREE.Matrix4();
p2t1.set (
    1, 0, 0, 0.01,
    0, 1, 0, 0,
    0, 0, 1, 0.02,
    0, 0, 0, 1
);

//Pregunta 3
const p3t1 = new THREE.Matrix4();
p3t1.set (
    1, 0, 0, 0,
    0, 1.001, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
);

//Pregunta 4
const p4t1 = new THREE.Matrix4();
p4t1.set (
    1.001, 0, 0, 0,
    0, 1.001, 0, 0,
    0, 0, 1.001, 0,
    0, 0, 0, 1
);

//Pregunta 5
const p5t1 = new THREE.Matrix4();
p5t1.set (
    Math.cos(0.01), -1*Math.sin(0.01), 0, 0,
    Math.sin(0.01), Math.cos(0.01), 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
);

//Pregunta 6
const p6t1 = new THREE.Matrix4();
p6t1.set (
    Math.cos(0.01), -1*Math.sin(0.01), 0, 0,
    Math.sin(0.01), Math.cos(0.01), 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
);

const p6t2 = new THREE.Matrix4();
p6t2.set (
    1, 0, 0, 0,
    0, Math.cos(0.02), -1*Math.sin(0.02), 0,
    0, Math.sin(0.02), Math.cos(0.02), 0,
    0, 0, 0, 1
);

//Pregunta 7
const p7t1 = new THREE.Matrix4();
p7t1.set (
    1, 0, 0, 0.02,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
);


const p7t2 = new THREE.Matrix4();
p7t2.set (
    1.002, 0, 0, 0,
    0, 1.002, 0, 0,
    0, 0, 1.002, 0,
    0, 0, 0, 1
);

const p7t3 = new THREE.Matrix4();
p7t3.set (
    1, 0, 0, 0,
    0, Math.cos(0.01), -1*Math.sin(0.01), 0,
    0, Math.sin(0.01), Math.cos(0.01), 0,
    0, 0, 0, 1
);

const p7t4 = new THREE.Matrix4();
p7t4.set (
    Math.cos(0.01), 0, Math.sin(0.01), 0,
    0, 1, 0, 0,
    -1*Math.sin(0.01), 0, Math.cos(0.01), 0,
    0, 0, 0, 1
);

const update = () => {
	//cube.geometry.applyMatrix4(p1t1); //Pregunta1
	//cube.geometry.applyMatrix4(p2t1); //Pregunta2
	//cube.geometry.applyMatrix4(p3t1); //Pregunta3
	//cube.geometry.applyMatrix4(p4t1); //Pregunta4
	//cube.geometry.applyMatrix4(p5t1); //Pregunta5
	//cube.geometry.applyMatrix4(p6t1.multiply(p6t2)); //Pregunta6
	cube.geometry.applyMatrix4(p7t1.multiply(p7t2.multiply(p7t3.multiply(p7t4)))); //Pregunta7
}

const render = () => {
    requestAnimationFrame(render);
    stats.update()
    orbitControls.update();
    update();
    renderer.render(scene, camera);
};

requestAnimationFrame(render);
