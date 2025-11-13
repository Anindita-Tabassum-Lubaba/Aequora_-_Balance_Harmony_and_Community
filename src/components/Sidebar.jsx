import logo from "../assets/logo.jpeg";

const NavLink = ({ icon, label, active }) => (
  <a className={`navItem ${active ? "active" : ""}`} href="#">
    {icon}
    <span>{label}</span>
  </a>
);

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sideHeader">
        <img src={logo} alt="" />
        <h1>Aequora</h1>
      </div>

      <nav className="nav">
        <NavLink active label="Home" icon={<svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>} />
        <NavLink label="Report Issue" icon={<svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M11 7h2v6h-2m0 4h2v2h-2M1 21h22L12 2"/></svg>} />
        <NavLink label="Bookings" icon={<svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M19 3h-1V1h-2v2H8V1H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m0 16H5V9h14z"/></svg>} />
        <NavLink label="Events" icon={<svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v2h18V6a2 2 0 0 0-2-2M3 20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V10H3z"/></svg>} />
        <NavLink label="Notifications" icon={<svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M12,22A2,2 0 0,0 14,20H10A2,2 0 0,0 12,22M18,16V11A6,6 0 0,0 6,11V16L4,18V19H20V18L18,16Z"/></svg>} />
      </nav>
    </aside>
  );
}
