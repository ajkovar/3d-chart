import {
  PerspectiveCamera,
  WebGLRenderer,
  Scene,
  LineBasicMaterial,
  BufferGeometry,
  Vector3,
  Line
} from "three";
import { OrbitControls } from "./OrbitControls";

export default class SceneManager {
  scene: Scene;
  renderer: WebGLRenderer;
  camera: PerspectiveCamera;
  controls: OrbitControls;

  constructor(container: HTMLElement, width: number, height: number) {
    this.scene = new Scene();
    this.renderer = this.initializeRenderer(width, height);
    this.camera = this.initializeCamera();
    this.controls = this.initializeControls();
    this.buildSubjects();
    container.appendChild(this.renderer.domElement);
  }
  initializeCamera() {
    const camera: PerspectiveCamera = new PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      500
    );
    camera.position.set(0, 0, 200);
    camera.lookAt(0, 0, 0);
    return camera;
  }
  initializeRenderer(width: number, height: number) {
    const renderer: WebGLRenderer = new WebGLRenderer();
    renderer.setSize(width, height);
    return renderer;
  }
  initializeControls() {
    const controls: OrbitControls = new OrbitControls(
      this.camera,
      this.renderer.domElement
    );
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 100;
    controls.maxDistance = 500;
    return controls;
  }

  buildSubjects() {
    let material: LineBasicMaterial = new LineBasicMaterial({
      color: 0x00ff00
    });

    let axisGeometry: BufferGeometry = new BufferGeometry().setFromPoints([
      new Vector3(-100, 0, 0),
      new Vector3(100, 0, 0),
      new Vector3(0, 0, 0),
      new Vector3(0, -100, 0),
      new Vector3(0, 100, 0),
      new Vector3(0, 0, 0),
      new Vector3(0, 0, -100),
      new Vector3(0, 0, 100)
    ]);
    let axis: Line = new Line(axisGeometry, material);

    let points: Vector3[] = [new Vector3(0, 0, 0), new Vector3(15, 20, 3)];

    let geometry: BufferGeometry = new BufferGeometry().setFromPoints(points);
    let line: Line = new Line(geometry, material);

    this.scene.add(axis);
    this.scene.add(line);
  }

  update() {
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}
