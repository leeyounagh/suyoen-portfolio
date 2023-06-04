import "../styles/education.css";
import Lottie from "react-lottie";
import { useEffect, useState } from "react";
import animationData from "../data/25898-rocket-launched-into-space.json";
import { motion } from "framer-motion";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
function Education() {
  const [showBoard, setShowBoard] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowBoard(true);
    }, 2000);
  }, []);
  return (
    <section className="education-wrapper">
      {showBoard ? (
        <motion.div
          className="education-board"
          initial={{ left: "-18%", top: "100%" }}
          animate={{
            left: "0%",
            top: "0%",
            transition: { duration: 1, delay: 0.5 },
          }}
        >
          <h1>Education</h1>
          <h2>2022. 12~ 2023.05 엘리스 Iot트랙 1기 수료</h2>
          <h2>2019. 02 ~ 2021.02 한국 방송통신 대학교 관광학과 졸업 </h2>
          <h2>2012. 02 ~ 2014.02 상지대학교 응용 물리전자학과 중퇴</h2>
        </motion.div>
      ) : (
        <Lottie options={defaultOptions} height={700} width={700} />
      )}
    </section>
  );
}

export default Education;
