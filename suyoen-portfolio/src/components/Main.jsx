import { useEffect, useRef } from "react";
import throttle from "lodash/throttle";
import gsap from "gsap";
import "../styles/Nudake.css";
import image1 from "../assets/메인.png";
import image2 from "../assets/2번.png";
import image3 from "../assets/폭죽.png";
import {
  drawImageCenter,
  getAngle,
  getDistance,
  getScrupedPercent,
} from "../utils/utils";

const Main = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const circle = document.querySelector(".circle");

    document.addEventListener("mousemove", (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      circle.style.left = mouseX + "px";
      circle.style.top = mouseY + "px";
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    const canvasParent = canvas.parentNode;
    const ctx = canvas.getContext("2d");
    const imageSrcs = [image1, image2, image3];
    const loadedImages = [];
    let currIndex = 0;
    let prevPos = { x: 0, y: 0 };
    let isChanging = false;

    let canvasWidth, canvasHeight;

    function resize() {
      canvasWidth = canvasParent.clientWidth;
      canvasHeight = canvasParent.clientHeight;
      canvas.style.width = canvasWidth + "px";
      canvas.style.height = canvasHeight + "px";
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      preloadImages().then(() => drawImage());
    }

    function preloadImages() {
      return new Promise((resolve) => {
        let loaded = 0;
        imageSrcs.forEach((src) => {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            loaded += 1;
            loadedImages.push(img);
            if (loaded === imageSrcs.length) return resolve();
          };
        });
      });
    }

    function drawImage() {
      isChanging = true;
      const image = loadedImages[currIndex];
      const firstDrawing = ctx.globalCompositeOperation === "source-over";

      gsap.to(canvas, {
        opacity: 0,
        duration: firstDrawing ? 0 : 1,
        onComplete: () => {
          canvas.style.opacity = 1;
          ctx.globalCompositeOperation = "source-over";
          drawImageCenter(canvas, ctx, image);

          const nextImage = imageSrcs[(currIndex + 1) % imageSrcs.length];
          canvasParent.style.backgroundImage = `url(${nextImage})`;
          prevPos = null;

          isChanging = false;
        },
      });
    }

    function onMousedown(e) {
      if (isChanging) return;
      canvas.addEventListener("mouseup", onMouseUp);
      canvas.addEventListener("mouseleave", onMouseUp);
      canvas.addEventListener("mousemove", onMouseMove);
      prevPos = { x: e.offsetX, y: e.offsetY };
    }

    function onMouseUp() {
      canvas.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("mouseleave", onMouseUp);
      canvas.removeEventListener("mousemove", onMouseMove);
    }

    function onMouseMove(e) {
      if (isChanging) return;
      drawCircles(e);
      checkPercent();
    }

    function drawCircles(e) {
      const nextPos = { x: e.offsetX, y: e.offsetY };
      if (!prevPos) prevPos = nextPos;
      const dist = getDistance(prevPos, nextPos);
      const angle = getAngle(prevPos, nextPos);

      for (let i = 0; i < dist; i++) {
        const x = prevPos.x + Math.cos(angle) * i;
        const y = prevPos.y + Math.sin(angle) * i;

        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(x, y, canvasWidth / 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      }

      prevPos = nextPos;
    }

    const checkPercent = throttle(() => {
      const percent = getScrupedPercent(ctx, canvasWidth, canvasHeight);
      if (percent > 30) {
        currIndex = (currIndex + 1) % imageSrcs.length;
        drawImage();
      }
    }, 500);

    canvas.addEventListener("mousedown", onMousedown);

    window.addEventListener("resize", resize);
    resize();

    return () => {
      canvas.removeEventListener("mousedown", onMousedown);

      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="main-wrapper">
      <div className="circle"></div>
      <div className="nudake">
        <header>
          <h1>
            <a href="/">Suyoen</a>
          </h1>

          <ul className="list">
            <a href="/skill">
              <li>Skills</li>
            </a>
            <a href="/project">
              <li>Projects</li>
            </a>
            <a href="/career">
              <li>career&Licence</li>
            </a>
            <a href="/education">
              <li>education</li>
            </a>
          </ul>
        </header>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default Main;
