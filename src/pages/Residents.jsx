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
    { title: "Report Issue", desc: "Road, lights, water", href: "/reports" },
    { title: "Book Service", desc: "Plumber, electrician", href: "/bookings" },
    { title: "Request Document", desc: "NOC, permissions", href: "#" },
    { title: "Track Requests", desc: "Live status & history", href: "#" },
  ];

  const notices = [
    { tag: "Notice", title: "Water maintenance on Friday", date: "Nov 22" },
    { tag: "Event", title: "Neighborhood cleanup drive", date: "Nov 25" },
    { tag: "Notice", title: "Garbage collection delay", date: "Nov 27" },
  ];

  const events = [
    {
      date: "Nov 25",
      time: "9:00 AM",
      title: "Community Cleanup",
      place: "Ward 12 Park",
      img: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=800&q=80",
    },
    {
      date: "Nov 28",
      time: "10:30 AM",
      title: "Health Camp",
      place: "City Hall",
      img: "https://images.unsplash.com/photo-1584466977773-e625c37cdd50?auto=format&fit=crop&w=800&q=80",
    },
    {
      date: "Dec 03",
      time: "6:00 PM",
      title: "Townhall Q&A",
      place: "Auditorium",
      img: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const whatYouCanDo = [
    {
      title: "Report & Track Issues",
      desc: "Submit problems with photos and location, then follow every status update from Pending to Resolved.",
    },
    {
      title: "Book Trusted Services",
      desc: "Find verified local providers, schedule a visit, and keep a history of all completed jobs.",
    },
    {
      title: "Stay in the Loop",
      desc: "Get notifications about events, announcements, and important updates for your neighborhood.",
    },
  ];

  const needHelp = [
    {
      title: "How do I report an issue?",
      desc: 'Go to “Report Issue”, describe the problem, add a photo and location, then submit. You’ll see it in your request history.',
    },
    {
      title: "How are my issues handled?",
      desc: "Your report is forwarded to the responsible authority, who updates the status as they review and resolve it.",
    },
    {
      title: "What is the SOS alert?",
      desc: "In supported areas, SOS sends your emergency alert and location to nearby authorities for quick action.",
    },
  ];

  const supportLinks = [
    "Resident user guide",
    "How-to for issue reporting & booking",
    "Contact form for additional support",
  ];

  return (
    <Shell>
      <div className="residentsPage">
        {/* metrics */}
        <h3 className="sectionTitle">Overview</h3>
        <div className="grid cols-4">
          {metrics.map((m) => (
            <Metric key={m.label} {...m} />
          ))}
        </div>

        {/* actions + notices */}
        <div className="spacer" />
        <div className="grid cols-3">
          <div className="panel padded">
            <h3 className="sectionTitle">Quick Actions</h3>
            <div className="grid cols-2">
              {quick.map((q) => (
                <a key={q.title} className="actionCard" href={q.href}>
                  <span className="title">{q.title}</span>
                  <span className="meta">{q.desc}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="panel padded" style={{ gridColumn: "span 2" }}>
            <h3 className="sectionTitle">Recent Notices</h3>
            <ul className="list">
              {notices.map((n) => (
                <li key={n.title} className="listItem">
                  <span
                    className={`tag ${
                      n.tag === "Notice" ? "notice" : "eventTag"
                    }`}
                  >
                    {n.tag}
                  </span>
                  <a className="title" href="/notifications">
                    {n.title}
                  </a>
                  <span className="meta">{n.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* what you can do + safety */}
        <div className="spacer" />
        <div className="grid cols-3">
          <div className="panel padded" style={{ gridColumn: "span 2" }}>
            <h3 className="sectionTitle">What you can do here</h3>
            <ul className="featureList">
              {whatYouCanDo.map((item) => (
                <li key={item.title} className="featureItem">
                  <div className="featureBullet" />
                  <div>
                    <div className="featureTitle">{item.title}</div>
                    <div className="featureDesc">{item.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel padded">
            <h3 className="sectionTitle">Safety &amp; Alerts</h3>
            <p className="bodyText">
              In case of emergencies, use the SOS feature (where available) to
              quickly alert authorities with your location. Keep your profile up
              to date so responders can reach you faster.
            </p>
            <ul className="bulletList">
              <li>SOS alerts go directly to authority dashboards.</li>
              <li>All alerts are stored for follow-up and audits.</li>
              <li>Notifications keep you informed about responses.</li>
            </ul>
            <div className="safetyImage" />
          </div>
        </div>

        {/* events */}
        <div className="spacer" />
        <div className="panel padded">
          <h3 className="sectionTitle">Upcoming Events</h3>
          <div className="grid cols-3">
            {events.map((e) => (
              <div key={e.title} className="event">
                <div className="eventDate">
                  <div className="d">{e.date.split(" ")[1]}</div>
                  <div className="m">{e.date.split(" ")[0]}</div>
                </div>
                <div>
                  <div className="eventTitle">{e.title}</div>
                  <div className="eventMeta">
                    {e.time} · {e.place}
                  </div>
                  <img
                    className="eventImage"
                    src={e.img}
                    alt={e.title}
                    loading="lazy"
                  />
                  <a className="btn primary eventBtn" href="/events">
                    Register
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* need help + support */}
        <div className="spacer" />
        <div className="grid cols-3">
          <div className="panel padded" style={{ gridColumn: "span 2" }}>
            <h3 className="sectionTitle">Need help?</h3>
            <ul className="qaList">
              {needHelp.map((item) => (
                <li key={item.title} className="qaItem">
                  <div className="qaQuestion">{item.title}</div>
                  <div className="qaAnswer">{item.desc}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel padded">
            <h3 className="sectionTitle">Support &amp; Documentation</h3>
            <p className="bodyText">
              Check the user guide for residents, browse FAQs, or contact the
              support team if something in your dashboard doesn&apos;t look
              right.
            </p>
            <ul className="bulletList">
              {supportLinks.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <div className="supportImageWrapper">
              <img
                src="https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=900&q=80"
                alt="Residents reading guide"
              />
            </div>
            <button className="btn ghost fullWidth">Open Help Center</button>
          </div>
        </div>

        {/* cta */}
        <div className="spacer" />
        <div className="panel padded ctaRow">
          <div>
            <div className="eventTitle">
              Ready to improve your neighborhood?
            </div>
            <div className="meta">
              Start by reporting your first issue. It takes under 2 minutes.
            </div>
          </div>
          <a className="btn primary" href="/reports">
            Report an Issue
          </a>
        </div>
      </div>
    </Shell>
  );
}
