import React, { useRef, useEffect } from "react";
import SceneManager from "./SceneManager";
// import "./App.css";

function App() {
  useEffect(() => {
    const sceneManager: SceneManager = new SceneManager(
      ref.current,
      window.innerWidth,
      window.innerHeight
    );

    function animate() {
      requestAnimationFrame(animate);
      sceneManager.update();
    }
    animate();
  }, []);

  let ref: any = useRef();
  return <div ref={ref} />;
}

export default App;
