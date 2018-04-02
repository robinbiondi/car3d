const THREE = require('three');
import Player from './models/Player';
var groundTexture;
var scene, camera, renderer;
var player, ground, house;

init();
animate();

function init() {
  // load a image resource
  groundTexture = new THREE.TextureLoader().load('./textures/tiles.bmp');
  groundTexture.wrapS = THREE.RepeatWrapping;
  groundTexture.wrapT = THREE.RepeatWrapping;
  groundTexture.repeat.set(50, 50);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    50
  );
  document.addEventListener('keydown', onKeyDown);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  player = new Player();
  ground = createPlane();
  scene.add(ground);
  initCar();

  camera.lookAt(new THREE.Vector3(0, 0, 0));

  var light = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(light);

  var pointLight = new THREE.PointLight(0xffff00, 0.8, 20);
  pointLight.position.x = 0;
  pointLight.position.y = 5;
  pointLight.position.z = 0;

  scene.add(pointLight);
}


function drawAxes() {
  var axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);
}

function createPlane() {
  var geometry = new THREE.PlaneGeometry(100, 100, 512, 512);
  var material = new THREE.MeshLambertMaterial({map: groundTexture, vertexColors: THREE.FaceColors, side: THREE.DoubleSide });
  // material.wireframe = true;
  // material.lights = true;
  material.reflectivity = 1;
  var mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.set(Math.PI/2, 0, 0);
  return mesh;
  // mesh.position.set(0,0,0);
  // mesh.rotation.set(new THREE.Vector3(0, 0, Math.PI / 2));
}

function initCar() {
  let car = new THREE.Group();
  let carGeometry = new THREE.BoxGeometry(2, 1, -3);
  let carMaterial = new THREE.MeshPhongMaterial({ color: 'blue', vertexColors: THREE.FaceColors, side: THREE.DoubleSide });

  car.add(new THREE.Mesh(carGeometry, carMaterial));
  car.position.set(0,0,0);
  scene.add(car);
  return car;
}

function createHouse() {
  let group = new THREE.Group();

  let wallsGeometry = new THREE.BoxGeometry(10, 5, 10);
  let wallsMaterial = new THREE.MeshLambertMaterial({ color: 'blue', vertexColors: THREE.FaceColors, side: THREE.DoubleSide });
  let walls = new THREE.Mesh(wallsGeometry, wallsMaterial);
  group.add(walls);

  let roofGeometry = new THREE.ConeGeometry(10.05, 4, 4);
  let roofMaterial = new THREE.MeshLambertMaterial({ color: 'red', vertexColors: THREE.FaceColors, side: THREE.DoubleSide });
  let roof = new THREE.Mesh(roofGeometry, roofMaterial);
  roof.position.y = 4;
  roof.rotation.set(0, Math.PI/4, 0);
  group.add(roof);

  group.position.set(10, 2.5, -10, 32, 32, 32);
  return group;
}

function positionCamera() {
  camera.position.x = player.x;
  camera.position.y = player.y + 2;
  camera.position.z = player.z;
}

function onKeyDown(event) {
  var keyCode = event.which;
  if (keyCode == 38) {
    player.moveZ(-1);
  } else if (keyCode == 40) {
    player.moveZ(1);
  } else if (keyCode == 39) {
    player.moveX(1);
  } else if (keyCode == 37) {
    player.moveX(-1);
  } else if (keyCode == 32) {
  }
}

function animate() {
  positionCamera();
  //  cube.rotation.x += 0.01; cube.rotation.y += 0.02;
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}