import { useState } from "react";
import Shell from "../components/Shell";
import "../css/reports.css";

const INITIAL_REPORTS = [
  {
    id: 1,
    title: "Street light not working near Gate 3",
    description: "The light opposite Building B-7 has been off for 3 nights.",
    priority: "High",
    status: "In Progress",
    createdAt: "Nov 10, 2025",
    timeline: [
      { at: "Nov 10, 09:12 AM", text: "Issue created by you." },
      { at: "Nov 10, 11:05 AM", text: "Assigned to electrical maintenance team." },
      { at: "Nov 11, 04:30 PM", text: "Technician scheduled visit for tonight." },
    ],
  },
  {
    id: 2,
    title: "Overflowing garbage bin near Block C",
    description: "Bin is full since yesterday evening.",
    priority: "Medium",
    status: "Open",
    createdAt: "Nov 12, 2025",
    timeline: [
      { at: "Nov 12, 08:05 AM", text: "Issue created by you." },
    ],
  },
];

export default function Reports() {
  const [reports, setReports] = useState(INITIAL_REPORTS);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [imageName, setImageName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setImageName(file ? file.name : "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) return;

    const now = new Date();
    const createdAt = now.toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

    const timeLabel = now.toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    const newReport = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      priority,
      status: "Open",
      createdAt,
      imageName,
      timeline: [
        { at: timeLabel, text: "Issue created by you." },
        imageName
          ? { at: timeLabel, text: `Photo attached: ${imageName}` }
          : null,
      ].filter(Boolean),
    };

    setReports((prev) => [newReport, ...prev]);

    // reset form
    setTitle("");
    setDescription("");
    setPriority("Medium");
    setImageName("");
    e.target.reset();
  };

  return (
    <Shell>
      <div className="reportsPage">
        {/* Form */}
        <section className="panel padded reportForm">
          <header className="reportsHeader">
            <div>
              <h2 className="reportsTitle">Report an Issue</h2>
              <p className="reportsSubtitle">
                Share a problem in your community so the admin team can take action.
              </p>
            </div>
          </header>

          <form className="reportFormBody" onSubmit={handleSubmit}>
            <div className="field">
              <label>Title</label>
              <input
                placeholder="Short summary (e.g. Water leakage in lobby)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label>Description</label>
              <textarea
                rows="4"
                placeholder="Describe what is happening, where, and since when."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="fieldGrid">
              <div className="field">
                <label>Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>

              <div className="field">
                <label>Attach Photo</label>
                <div className="fileRow">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  {imageName && (
                    <span className="fileName" title={imageName}>
                      {imageName}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="reportFormActions">
              <button type="submit" className="btn primary">
                Submit Issue
              </button>
            </div>
          </form>
        </section>

        {/* My reports */}
        <section className="reportsListSection">
          <header className="reportsListHeader">
            <h3 className="reportsListTitle">My Reports</h3>
            <p className="reportsListSubtitle">
              Track status and replies for issues you’ve submitted.
            </p>
          </header>

          <div className="reportsList">
            {reports.map((r) => (
              <article key={r.id} className="reportCard panel">
                <div className="reportCardHeader">
                  <div>
                    <h4 className="reportCardTitle">{r.title}</h4>
                    <p className="reportMeta">
                      Created on {r.createdAt}
                      {r.imageName && (
                        <> · 📎 {r.imageName}</>
                      )}
                    </p>
                  </div>
                  <div className="reportBadges">
                    <span className={`priorityBadge priority-${r.priority.toLowerCase()}`}>
                      {r.priority} priority
                    </span>
                    <span className={`statusBadge status-${r.status.replace(" ", "").toLowerCase()}`}>
                      {r.status}
                    </span>
                  </div>
                </div>

                <p className="reportDescription">{r.description}</p>

                <div className="timeline">
                  {r.timeline.map((t, idx) => (
                    <div key={idx} className="timelineItem">
                      <div className="timelineBullet" />
                      <div className="timelineContent">
                        <p className="timelineText">{t.text}</p>
                        <p className="timelineTime">{t.at}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </Shell>
  );
}
