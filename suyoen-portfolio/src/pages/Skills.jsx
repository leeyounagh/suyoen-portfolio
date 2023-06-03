import { useEffect, useRef, useState } from "react";
import {
  Engine,
  Render,
  Runner,
  Mouse,
  MouseConstraint,
  Composite,
  Bodies,
  Events,
} from "matter-js";

import "../styles/RotateCanvas.css";
import { motion } from "framer-motion";
import IconTypeScript from "../assets/타입스크립트로고.png";
import IconJS from "../assets/icon_JS.png";
import IconREACT from "../assets/icon_REACT.png";
import IconStyled from "../assets/스타일드컴포넌트.png";
import IconRedux from "../assets/리덕스.png";
import SpaceMan from "../assets/spaceman.png";
import SideBar from "../components/SideBar";
import { data } from "../data/data";

const RotateCanvas = () => {
  const [selected, setSelected] = useState(data["JS"]);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const cw = 1000;
    const ch = 1000;

    const garvityPower = 0.5;
    let gravityDeg = 0;

    let engine, render, runner, mouse, mouseConstraint;

    let observer;

    initScene();
    initMouse();
    initIntersectionObserver();
    initGround();
    initImageBoxes();

    Events.on(mouseConstraint, "mousedown", () => {
      const newSelected =
        mouseConstraint.body && data[mouseConstraint.body.label];
      newSelected && setSelected(newSelected);
    });

    Events.on(runner, "tick", () => {
      gravityDeg += 1;
      engine.world.gravity.x =
        garvityPower * Math.cos((Math.PI / 180) * gravityDeg);
      engine.world.gravity.y =
        garvityPower * Math.sin((Math.PI / 180) * gravityDeg);
    });

    function initScene() {
      engine = Engine.create();

      render = Render.create({
        canvas: canvas,
        engine: engine,
        options: {
          width: cw,
          height: ch,
          wireframes: false,
        },
      });
      runner = Runner.create();

      Render.run(render);
      Runner.run(runner, engine);
    }
    function initMouse() {
      mouse = Mouse.create(canvas);
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
      });
      Composite.add(engine.world, mouseConstraint);

      canvas.removeEventListener("mousewheel", mouse.mousewheel);
      canvas.removeEventListener("DOMMouseScroll", mouse.mousewheel);
    }
    function initIntersectionObserver() {
      const options = {
        threshold: 0.1,
      };
      observer = new IntersectionObserver((entries) => {
        const canvasEntry = entries[0];
        if (canvasEntry.isIntersecting) {
          runner.enabled = true;
          Render.run(render);
        } else {
          runner.enabled = false;
          Render.stop(render);
        }
      }, options);

      observer.observe(canvas);
    }
    function initGround() {
      const segments = 32;
      const deg = (Math.PI * 2) / segments;
      const width = 50;
      const radius = cw / 2 + width / 2;
      const height = radius * Math.tan(deg / 2) * 2;

      for (let i = 0; i < segments; i++) {
        const theta = deg * i;
        const x = radius * Math.cos(theta) + cw / 2;
        const y = radius * Math.sin(theta) + ch / 2;
        addRect(x, y, width, height, { isStatic: true, angle: theta });
      }
    }
    function initImageBoxes() {
      const scale = 0.7;
      const t1 = { w: 250 * scale, h: 250 * scale };

      addRect(cw / 2, ch / 2, t1.w, t1.h, {
        label: "JS",
        chamfer: { radius: 20 },
        render: { sprite: { texture: IconJS, xScale: scale, yScale: scale } },
      });

      addRect(cw / 2, ch / 2 + t1.h, t1.w, t1.h, {
        label: "StyledComponent",
        chamfer: { radius: 20 },
        render: {
          sprite: { texture: IconStyled, xScale: scale, yScale: scale },
        },
      });
      addRect(cw / 2 - t1.w, ch / 2 + t1.h, t1.w, t1.h, {
        label: "REACT",
        chamfer: { radius: 75 },
        render: {
          sprite: { texture: IconREACT, xScale: scale, yScale: scale },
        },
      });
      addRect(cw / 2, ch / 2 - t1.h, t1.w, t1.h, {
        label: "TypeScript",
        chamfer: { radius: 20 },
        render: {
          sprite: { texture: IconTypeScript, xScale: scale, yScale: scale },
        },
      });
      addRect(cw / 2, ch / 2 - t1.h * 2, t1.w, t1.h, {
        label: "ReduxToolkit",
        chamfer: { radius: 20 },
        render: {
          sprite: { texture: IconRedux, xScale: scale, yScale: scale },
        },
      });
    }
    function addRect(x, y, w, h, options = {}) {
      const rect = Bodies.rectangle(x, y, w, h, options);
      Composite.add(engine.world, rect);
    }

    return () => {
      observer.unobserve(canvas);
      Composite.clear(engine.world);
      Mouse.clearSourceEvents(mouse);
      Runner.stop(runner);
      Render.stop(render);
      Engine.clear(engine);
    };
  }, []);

  return (
    <div className="rotate-canvas-wrapper">
      <SideBar></SideBar>
      <canvas ref={canvasRef}></canvas>
      <aside>
        <h1>{selected.title}</h1>
        <p>{selected.desc}</p>
      </aside>
      <motion.div
        className="space-man"
        initial={{ right: "-18%", top: "100%" }}
        animate={{
          right: "5%",
          top: "10%",
          transition: { duration: 2, delay: 0.5 },
        }}
      >
        <img src={SpaceMan} alt="spaceman" />
      </motion.div>
    </div>
  );
};

export default RotateCanvas;
