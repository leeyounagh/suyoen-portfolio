import "../styles/project.css";
import { useEffect, useState } from "react";
import ProjectVideo from "../components/ProjectVideo";
import Lottie from "react-lottie";
import animationData from "../data/62102-space-soldier-on-rocket.json";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ArrowImg from "../assets/arrow.svg";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
function Project() {
  const [showBoard, setShowBoard] = useState(false);

  // 페이징 처리
  useEffect(() => {
    setTimeout(() => {
      setShowBoard(true);
    }, 2000);
  }, []);
  return (
    <section className="project-wrapper">
      {showBoard ? (
        <motion.div
          className="board"
          initial={{ left: "-18%", top: "100%" }}
          animate={{
            left: "0%",
            top: "0%",
            transition: { duration: 2, delay: 0.5 },
          }}
        >
          <ProjectVideo />
          <aside className="project">
            <h1>ValueShare</h1>
            <main className="project-desc">
              <Link target="_blank" rel="noreferrer" to="http://52.79.147.247">
                ValueShare 바로가기..
              </Link>
              <h2>Position: Front-End</h2>
              <h2>팀원구성:프론트엔드 2명, 백엔드 1명</h2>

              <h3>서비스 소개:</h3>
              <div>
                value share는 20~30대 고객층을 타겟으로한 명품 대여 서비스
                입니다. 친구 결혼식인데 들고갈 가 방이 없는 30대 , 트렌드에
                민감한 20대들과 같은 고객을 위하여 제작하게 되었습니다.
              </div>
              <Link to=""> go to TroubleShooting...</Link>
            </main>
            <div className="page-icon">
              <img src={ArrowImg}></img>
              <img src={ArrowImg}></img>
            </div>
          </aside>
        </motion.div>
      ) : (
        <Lottie options={defaultOptions} height={500} width={500} />
      )}
    </section>
  );
}

export default Project;
