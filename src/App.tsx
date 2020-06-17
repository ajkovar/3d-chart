import React, { useRef, useEffect } from "react";
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
// import "./App.css";

function App() {
  useEffect(() => {
    let renderer: WebGLRenderer = new WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    ref.current.appendChild(renderer.domElement);

    let camera: PerspectiveCamera = new PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      500
    );
    camera.position.set(0, 0, 200);
    camera.lookAt(0, 0, 0);

    let scene: Scene = new Scene();

    let controls: OrbitControls = new OrbitControls(
      camera,
      renderer.domElement
    );

    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    controls.screenSpacePanning = false;

    controls.minDistance = 100;
    controls.maxDistance = 500;

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

    scene.add(axis);
    scene.add(line);

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();
  }, []);

  let ref: any = useRef();
  return <div ref={ref} />;
}

export default App;
