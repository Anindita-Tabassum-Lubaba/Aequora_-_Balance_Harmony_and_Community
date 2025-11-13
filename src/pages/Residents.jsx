import Shell from "../components/Shell";
import Metric from "../components/Metric";
import "../css/residents.modern.css";

export default function Residents() {
  const metrics = [
    { label: "Issues Resolved", value: "1,248", tone: "ok" },
    { label: "Open Issues", value: "36", tone: "warn" },
    { label: "Upcoming Events", value: "5" },
    { label: "Avg. Response", value: "3.2h" },
  ];

  const quick = [
    { title: "Report Issue", desc: "Road, lights, water", href:"#"},
    { title: "Book Service", desc: "Plumber, electrician", href:"#"},
    { title: "Request Document", desc: "NOC, permissions", href:"#"},
    { title: "Track Requests", desc: "Live status & history", href:"#"},
  ];

  const notices = [
    { tag:"Notice", title:"Water maintenance on Friday", date:"Nov 22" },
    { tag:"Event", title:"Neighborhood cleanup drive", date:"Nov 25" },
    { tag:"Notice", title:"Garbage collection delay", date:"Nov 27" },
  ];

  const events = [
    { date:"Nov 25", time:"9:00 AM", title:"Community Cleanup", place:"Ward 12 Park" },
    { date:"Nov 28", time:"10:30 AM", title:"Health Camp", place:"City Hall" },
    { date:"Dec 03", time:"6:00 PM", title:"Townhall Q&A", place:"Auditorium" },
  ];

  return (
    <Shell>
      {/* metrics */}
      <h3 className="sectionTitle">Overview</h3>
      <div className="grid cols-4">
        {metrics.map((m) => <Metric key={m.label} {...m} />)}
      </div>

      {/* actions + notices */}
      <div style={{height:16}} />
      <div className="grid cols-3">
        <div className="panel padded">
          <h3 className="sectionTitle">Quick Actions</h3>
          <div className="grid cols-2">
            {quick.map(q => (
              <a key={q.title} className="actionCard" href={q.href}>
                <span className="title">{q.title}</span>
                <span className="meta">{q.desc}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="panel padded" style={{gridColumn:"span 2"}}>
          <h3 className="sectionTitle">Recent Notices</h3>
          <ul className="list">
            {notices.map(n => (
              <li key={n.title} className="listItem">
                <span className={`tag ${n.tag==='Notice' ? 'notice':''}`}>{n.tag}</span>
                <a className="title" href="#">{n.title}</a>
                <span className="meta">{n.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* events */}
      <div style={{height:16}} />
      <div className="panel padded">
        <h3 className="sectionTitle">Upcoming Events</h3>
        <div className="grid cols-3">
          {events.map(e => (
            <div key={e.title} className="event">
              <div className="eventDate">
                <div className="d">{e.date.split(" ")[1]}</div>
                <div className="m">{e.date.split(" ")[0]}</div>
              </div>
              <div>
                <div className="eventTitle">{e.title}</div>
                <div className="eventMeta">{e.time} · {e.place}</div>
                <a className="btn primary" href="#">Register</a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* cta */}
      <div style={{height:16}} />
      <div className="panel padded" style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
        <div>
          <div className="eventTitle">Ready to improve your neighborhood?</div>
          <div className="meta">Start by reporting your first issue. It takes under 2 minutes.</div>
        </div>
        <a className="btn primary" href="#">Report an Issue</a>
      </div>
    </Shell>
  );
}
