import "../styles/sidebar.css";
// eslint-disable-next-line react/prop-types
function SideBar({ isNavOpen }) {
  return (
    <navbar className="sidebar">
      <div className={`sidebar ${isNavOpen ? "open" : ""}`}>
        <ul className="sidebar-menu">
          <li>Menu Item 1</li>
          <li>Menu Item 2</li>
          <li>Menu Item 3</li>
        </ul>
      </div>
    </navbar>
  );
}

export default SideBar;
