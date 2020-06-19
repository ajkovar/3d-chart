import {
  PerspectiveCamera,
  WebGLRenderer,
  Scene,
  LineBasicMaterial,
  BufferGeometry,
  Geometry,
  Vector3,
  Line
} from "three";
import TWEEN from "@tweenjs/tween.js";
import animateVector from "./utils/animateVector";
import { OrbitControls } from "./OrbitControls";

interface Coordinates {
  x: number;
  y: number;
  z: number;
}

export default class SceneManager {
  scene: Scene;
  renderer: WebGLRenderer;
  camera: PerspectiveCamera;
  controls: OrbitControls;
  line: Line;
  lineGeometry: Geometry | undefined;
  endpoint: Vector3 | undefined;

  constructor(container: HTMLElement, width: number, height: number) {
    this.scene = new Scene();
    console.log(this.scene);
    this.renderer = this.initializeRenderer(width, height);
    this.camera = this.initializeCamera();
    this.controls = this.initializeControls();
    this.buildSubjects();
    container.appendChild(this.renderer.domElement);
    this.line = new Line();
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

    this.endpoint = new Vector3(15, 20, 3);
    let points: Vector3[] = [new Vector3(0, 0, 0), this.endpoint];

    this.lineGeometry = new Geometry().setFromPoints(points);
    this.line = new Line(this.lineGeometry, material);
    this.line.name = "vector";
    console.log(this.line);

    this.scene.add(axis);
    this.scene.add(this.line);
  }
  findLine() {
    return this.scene.children.find(child => child.name === "vector") as any;
  }

  animateVector({ x, y, z }: Coordinates) {
    //remove previous tweens (if they exist)
    TWEEN.removeAll();
    console.log("animateVector");
    const line = this.findLine();
    new TWEEN.Tween(line.geometry.vertices[1])
      .to({ x, y, z }, 2000)
      .easing(TWEEN.Easing.Quadratic.In)
      .onUpdate(d => {
        const line = this.findLine();
        line.geometry.vertices[1].x = Math.round(d.x);
        line.geometry.vertices[1].y = Math.round(d.y);
        line.geometry.vertices[1].z = Math.round(d.z);
        console.log("tween", line.geometry.vertices[1]);
        this.renderer.render(this.scene, this.camera);
      })
      .start();
    // new TWEEN.Tween(this.endpoint)
    //   .to({ x, y, z }, 2000)
    //   .easing(TWEEN.Easing.Quadratic.In)
    //   .onUpdate(d => {
    //     console.log("update", d);
    //     // console.log(this.lineGeometry);
    //     // this.lineGeometry!.verticesNeedUpdate = true;
    //     // this.lineGeometry!.elementsNeedUpdate = true;
    //   })
    //   .start();
  }

  update() {
    // this.scene.remove(this.line);
    // this.scene.children.forEach(child => {
    //   if (child.name === "vector") {
    //     // have to cast as any because am getting error about this prop
    //     // not existing. why?
    //     // https://github.com/mrdoob/three.js/blob/dev/src/core/Geometry.d.ts#L66
    //     (child as any).geometry.vertices[1].x = 99;
    //   }
    // });
    const line = this.findLine();
    console.log("update", line.geometry.vertices[1]);
    console.log(this.scene);

    // line.geometry.vertices[1].x = -30;
    // line.geometry.vertices[1].y = 20;
    // line.geometry.vertices[1].z = -9;
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}
