import { useState } from "react";
import Shell from "../components/Shell";
import "../css/services.css";

const CATEGORIES = [
  "All",
  "Plumbing",
  "Electrical",
  "Cleaning",
  "Appliance Repair",
  "Painting",
];

const PROVIDERS = [
  {
    id: 1,
    name: "Rahim Plumbing Services",
    category: "Plumbing",
    rating: 4.8,
    jobs: 320,
    area: "Ward 12 · Dhanmondi",
    image:
      "https://images.pexels.com/photos/5854187/pexels-photo-5854187.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 2,
    name: "SafeSpark Electricians",
    category: "Electrical",
    rating: 4.9,
    jobs: 280,
    area: "Ward 08 · Mohammadpur",
    image:
      "https://images.pexels.com/photos/4254168/pexels-photo-4254168.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 3,
    name: "FreshNest Cleaning Crew",
    category: "Cleaning",
    rating: 4.7,
    jobs: 190,
    area: "Ward 02 · Banani",
    image:
      "https://images.pexels.com/photos/4107284/pexels-photo-4107284.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 4,
    name: "QuickFix Appliance Care",
    category: "Appliance Repair",
    rating: 4.6,
    jobs: 145,
    area: "Ward 05 · Mirpur",
    image:
      "https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 5,
    name: "PerfectCoat Painters",
    category: "Painting",
    rating: 4.8,
    jobs: 120,
    area: "Ward 10 · Uttara",
    image:
      "https://images.pexels.com/photos/6474472/pexels-photo-6474472.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showBookingsModal, setShowBookingsModal] = useState(false);
  const [bookings, setBookings] = useState([]);

  const filteredProviders = PROVIDERS.filter((p) => {
    const matchesCategory =
      activeCategory === "All" || p.category === activeCategory;
    const matchesSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const openBooking = (provider) => {
    setSelectedProvider(provider);
    setShowBookingModal(true);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const booking = {
      id: Date.now(),
      providerId: selectedProvider.id,
      providerName: selectedProvider.name,
      date: formData.get("date"),
      time: formData.get("time"),
      note: formData.get("note"),
    };
    setBookings((prev) => [booking, ...prev]);
    setShowBookingModal(false);
  };

  return (
    <Shell>
      <div className="services-header">
        <div>
          <h2 className="services-title">Book trusted local services</h2>
          <p className="services-subtitle">
            Browse verified plumbers, electricians, cleaners, and more in your
            neighborhood.
          </p>
        </div>

        <button
          type="button"
          className="btn primary my-bookings-btn"
          onClick={() => setShowBookingsModal(true)}
        >
          My bookings
        </button>
      </div>

      {/* search + categories */}
      <div className="services-toolbar">
        <input
          className="services-search"
          type="search"
          placeholder="Search services or providers…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="services-categories">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`category-pill ${
                activeCategory === cat ? "active" : ""
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* providers list */}
      <div className="services-grid">
        {filteredProviders.map((p) => (
          <article key={p.id} className="service-card">
            <div className="service-image-wrap">
              <img src={p.image} alt={p.name} className="service-image" />
            </div>
            <div className="service-body">
              <div className="service-top-row">
                <h3 className="service-name">{p.name}</h3>
                <span className="service-category">{p.category}</span>
              </div>

              <div className="service-meta-row">
                <span className="service-rating">
                  <span className="star">★</span> {p.rating.toFixed(1)} ·{" "}
                  {p.jobs}+ jobs
                </span>
                <span className="service-area">{p.area}</span>
              </div>

              <div className="service-actions">
                <button
                  type="button"
                  className="btn ghost"
                  onClick={() => openBooking(p)}
                >
                  View details
                </button>
                <button
                  type="button"
                  className="btn primary"
                  onClick={() => openBooking(p)}
                >
                  Book now
                </button>
              </div>
            </div>
          </article>
        ))}

        {filteredProviders.length === 0 && (
          <div className="services-empty">
            No providers found. Try a different category or search term.
          </div>
        )}
      </div>

      {/* BOOKING MODAL */}
      {showBookingModal && selectedProvider && (
        <div className="modal-overlay" onClick={() => setShowBookingModal(false)}>
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Book {selectedProvider.name}</h3>
              <button
                type="button"
                className="modal-close"
                onClick={() => setShowBookingModal(false)}
              >
                ×
              </button>
            </div>

            <p className="modal-subtitle">
              Choose a preferred date and time. The provider will confirm your
              booking shortly.
            </p>

            <form className="booking-form" onSubmit={handleBookingSubmit}>
              <label className="field">
                <span>Date</span>
                <input name="date" type="date" required />
              </label>

              <label className="field">
                <span>Time</span>
                <input name="time" type="time" required />
              </label>

              <label className="field">
                <span>Notes (optional)</span>
                <textarea
                  name="note"
                  rows={3}
                  placeholder="Describe the issue or any access instructions…"
                />
              </label>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn ghost"
                  onClick={() => setShowBookingModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn primary">
                  Confirm booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MY BOOKINGS MODAL */}
      {showBookingsModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowBookingsModal(false)}
        >
          <div
            className="modal modal-wide"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>My bookings</h3>
              <button
                type="button"
                className="modal-close"
                onClick={() => setShowBookingsModal(false)}
              >
                ×
              </button>
            </div>

            {bookings.length === 0 ? (
              <p className="modal-subtitle">
                You haven&apos;t made any bookings yet. Book a service provider
                to see it appear here.
              </p>
            ) : (
              <ul className="booking-list">
                {bookings.map((b) => (
                  <li key={b.id} className="booking-item">
                    <div>
                      <div className="booking-provider">{b.providerName}</div>
                      <div className="booking-meta">
                        {b.date} · {b.time}
                      </div>
                      {b.note && (
                        <div className="booking-note">“{b.note}”</div>
                      )}
                    </div>
                    <span className="booking-status">Pending</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="modal-footer-text">
              Bookings are visible only to you. Providers will confirm via the
              app or SMS.
            </div>
          </div>
        </div>
      )}
    </Shell>
  );
}
