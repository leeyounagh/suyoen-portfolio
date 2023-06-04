import "../styles/sidebar.css";
import sidebarData from "../data/sidebarData";
import { v4 as uuidv4 } from "uuid";
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
                <li key={uuidv4()}>{item.name}</li>
              </>
            );
          })}
        </ul>
        <button
          onClick={() => {
            setIsNavOpen(false);
          }}
        >
          close
        </button>
      </div>
    </nav>
  );
}

export default SideBar;
