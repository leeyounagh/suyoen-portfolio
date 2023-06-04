import "../styles/career.css";
import Lottie from "react-lottie";
import { useEffect, useState } from "react";
import animationData from "../data/38376-astronaut-planet-exploration.json";
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
function Career() {
  const [showBoard, setShowBoard] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowBoard(true);
    }, 2000);
  }, []);
  return (
    <div className="career-wrapper">
      <Lottie options={defaultOptions} height={700} width={700} />
      {/* {showBoard ? (
        <div>안녕</div>
      ) : (
        <Lottie options={defaultOptions} height={500} width={500} />
      )} */}
    </div>
  );
}

export default Career;
