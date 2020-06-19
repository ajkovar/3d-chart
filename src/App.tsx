import React, { useRef, useEffect, useState } from "react";
import TWEEN from "@tweenjs/tween.js";
import SceneManager from "./SceneManager";
import "./App.css";

function App() {
  const [x, setX] = useState(50);
  const [y, setY] = useState(30);
  const [z, setZ] = useState(20);
  let sceneManager: SceneManager | null = null;
  const extractValue = (setter: Function) => (e: any) =>
    setter(parseInt(e.target.value));

  useEffect(() => {
    sceneManager = new SceneManager(
      ref.current,
      window.innerWidth,
      window.innerHeight
    );

    function animate(time: number) {
      requestAnimationFrame(animate);
      console.log("---------");
      console.log("animate");
      TWEEN.update(time);
      sceneManager!.update();
    }
    animate(0);
  });

  useEffect(() => sceneManager!.animateVector({ x, y, z }), [
    x,
    y,
    z,
    sceneManager
  ]);

  let ref: any = useRef();
  return (
    <div>
      <div className="input-container">
        <input value={x} type="number" onChange={extractValue(setX)} />
        <input value={y} type="number" onChange={extractValue(setY)} />
        <input value={z} type="number" onChange={extractValue(setZ)} />
      </div>
      <div ref={ref} />
    </div>
  );
}

export default App;
