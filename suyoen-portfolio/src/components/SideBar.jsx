import "../styles/sidebar.css";
import sidebarData from "../data/sidebarData";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { SiNotion } from "@react-icons/all-files/si/SiNotion";
import { FaBlogger } from "@react-icons/all-files/fa/FaBlogger";
import { ImGithub } from "@react-icons/all-files/im/ImGithub";
import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";

// eslint-disable-next-line react/prop-types
function SideBar({ isNavOpen, setIsNavOpen }) {
  const sidebarClass = isNavOpen ? "open" : "closed";

  return (
    <nav>
      <div key={uuidv4()} className={`sidebar ${sidebarClass}`}>
        <ul className="sidebar-menu" key={uuidv4()}>
          {sidebarData?.map((item) => {
            return (
              <>
                <a href={item.link}>
                  <li key={uuidv4()}>{item.name}</li>
                </a>
              </>
            );
          })}
        </ul>
        <ul className="sidebar-icon">
          <li>
            <Link
              target="_blank"
              rel="noreferrer"
              to="https://www.notion.so/9926f4e2467448ce9e3f952998a5f1cb?pvs=4"
            >
              <SiNotion size={50} color="#FAFAD2" />
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              rel="noreferrer"
              to="https://velog.io/@dudgk0216"
            >
              <FaBlogger size={50} color="#FAFAD2" />
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              rel="noreferrer"
              to="https://github.com/leeyounagh"
            >
              <ImGithub size={50} color="#FAFAD2" />
            </Link>
          </li>
        </ul>
        <button
          className="close-button"
          onClick={() => {
            setIsNavOpen(false);
          }}
        >
          <AiOutlineClose size={50} color="#FAFAD2" />
        </button>
      </div>
    </nav>
  );
}

export default SideBar;
