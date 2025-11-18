import { useState } from "react";
import Shell from "../components/Shell";
import "../css/events.css";

const INITIAL_EVENTS = [
  {
    id: 1,
    title: "Community Cleanup Drive",
    date: "Nov 25",
    time: "9:00 AM",
    location: "Ward 12 Park",
    banner: "https://images.unsplash.com/photo-1758599668186-c47df67d025d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29tbXVuaXR5JTIwY2xlYW51cCUyMGRyaXZlfGVufDB8fDB8fHww", // change to your own paths
    joined: 42,
    isRegistered: false,
  },
  {
    id: 2,
    title: "Free Health Camp",
    date: "Nov 28",
    time: "10:30 AM",
    location: "City Hall, Block B",
    banner: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGVhbHRofGVufDB8fDB8fHww",
    joined: 63,
    isRegistered: false,
  },
  {
    id: 3,
    title: "Townhall Q&A with Council",
    date: "Dec 03",
    time: "6:00 PM",
    location: "Central Auditorium",
    banner: "https://media.istockphoto.com/id/154350734/photo/town-hall.webp?a=1&b=1&s=612x612&w=0&k=20&c=OPu6IJb6IHJuOqCSm494BhK-245M38ygq_VIsGWhAUo=",
    joined: 31,
    isRegistered: false,
  },
];

export default function Events() {
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [activeEvent, setActiveEvent] = useState(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showRegisteredModal, setShowRegisteredModal] = useState(false);

  const registeredEvents = events.filter((e) => e.isRegistered);

  const openRegisterModal = (event) => {
    setActiveEvent(event);
    setShowRegisterModal(true);
  };

  const closeRegisterModal = () => {
    setShowRegisterModal(false);
    setActiveEvent(null);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!activeEvent) return;

    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === activeEvent.id
          ? { ...ev, joined: ev.joined + (ev.isRegistered ? 0 : 1), isRegistered: true }
          : ev
      )
    );

    setShowRegisterModal(false);
    setActiveEvent(null);
    e.target.reset();
  };

  return (
    <Shell>
      <div className="eventsPage">
        <header className="eventsHeader">
          <div>
            <h2 className="eventsTitle">Upcoming Events</h2>
            <p className="eventsSubtitle">
              Join community activities, townhalls, and local initiatives.
            </p>
          </div>

          <button
            className="btn ghost"
            type="button"
            onClick={() => setShowRegisteredModal(true)}
          >
            Registered Events
          </button>
        </header>

        <section className="eventsGrid">
          {events.map((ev) => (
            <article key={ev.id} className="eventCard panel">
              <div className="eventBannerWrapper">
                <img src={ev.banner} alt={ev.title} className="eventBanner" />
                <span className="eventDatePill">
                  <span className="d">{ev.date.split(" ")[1]}</span>
                  <span className="m">{ev.date.split(" ")[0]}</span>
                </span>
              </div>

              <div className="eventBody">
                <h3 className="eventTitle">{ev.title}</h3>
                <p className="eventMeta">
                  <span>{ev.time}</span> · <span>{ev.location}</span>
                </p>

                <div className="eventStats">
                  <span className="eventCounter">
                    👥 {ev.joined} joined
                  </span>
                  {ev.isRegistered && <span className="eventBadge">Registered</span>}
                </div>

                <div className="eventActions">
                  <button
                    type="button"
                    className="btn primary"
                    onClick={() => openRegisterModal(ev)}
                  >
                    {ev.isRegistered ? "Update Registration" : "Join Event"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>

      {/* Registration modal */}
      {showRegisterModal && activeEvent && (
        <div className="modalOverlay" onClick={closeRegisterModal}>
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="modalHeader">
              <h3>Register for {activeEvent.title}</h3>
              <button
                type="button"
                className="modalClose"
                onClick={closeRegisterModal}
              >
                ×
              </button>
            </header>

            <p className="modalSub">
              {activeEvent.date} · {activeEvent.time} · {activeEvent.location}
            </p>

            <form className="modalForm" onSubmit={handleRegisterSubmit}>
              <div className="field">
                <label>Full Name</label>
                <input required placeholder="Your name" />
              </div>
              <div className="fieldGrid">
                <div className="field">
                  <label>Flat / House No.</label>
                  <input required placeholder="A-12, 5th floor" />
                </div>
                <div className="field">
                  <label>Phone</label>
                  <input required placeholder="017XXXXXXXX" />
                </div>
              </div>
              <div className="field">
                <label>Note (optional)</label>
                <textarea rows="3" placeholder="Anything we should know?" />
              </div>

              <div className="modalActions">
                <button
                  type="button"
                  className="btn ghost"
                  onClick={closeRegisterModal}
                >
                  Cancel
                </button>
                <button type="submit" className="btn primary">
                  Confirm Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Registered events modal */}
      {showRegisteredModal && (
        <div
          className="modalOverlay"
          onClick={() => setShowRegisteredModal(false)}
        >
          <div
            className="modal modal--small"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="modalHeader">
              <h3>Registered Events</h3>
              <button
                type="button"
                className="modalClose"
                onClick={() => setShowRegisteredModal(false)}
              >
                ×
              </button>
            </header>

            {registeredEvents.length === 0 ? (
              <p className="modalEmpty">You haven’t registered for any events yet.</p>
            ) : (
              <ul className="list registeredList">
                {registeredEvents.map((ev) => (
                  <li key={ev.id} className="registeredItem">
                    <div>
                      <div className="registeredTitle">{ev.title}</div>
                      <div className="registeredMeta">
                        {ev.date} · {ev.time} · {ev.location}
                      </div>
                    </div>
                    <span className="registeredJoined">👥 {ev.joined}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </Shell>
  );
}
