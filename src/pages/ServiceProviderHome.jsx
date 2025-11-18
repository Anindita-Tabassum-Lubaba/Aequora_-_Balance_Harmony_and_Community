import { useState } from "react";
import "../css/service-provider-home.css";

function ProviderTopbar() {
  return (
    <header className="spTopbar">
      <div className="spTopbar__left">
        <div className="spTopbar__brand">
          <div className="spTopbar__logo">SP</div>
          <div>
            <div className="spTopbar__title">Aequora Service Provider</div>
            <div className="spTopbar__subtitle">Manage gigs & orders</div>
          </div>
        </div>
      </div>

      <div className="spTopbar__right">
        <button className="spTopbar__profile">
          <div className="spTopbar__avatar">A</div>
          <span className="spTopbar__name">Arif Hossain</span>
        </button>
      </div>
    </header>
  );
}

const INITIAL_GIGS = [
  {
    id: 1,
    title: "Full Apartment Deep Cleaning",
    category: "Cleaning",
    price: 3200,
    duration: "4–5 hours",
    rating: 4.8,
    reviews: 32,
    banner: "https://images.pexels.com/photos/4107284/pexels-photo-4107284.jpeg?auto=compress&cs=tinysrgb&w=400", // replace with your real image
  },
  {
    id: 2,
    title: "AC Servicing & Gas Refill",
    category: "AC Repair",
    price: 1800,
    duration: "2–3 hours",
    rating: 4.6,
    reviews: 21,
    banner: "https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 3,
    title: "Electric Wiring & Fan Install",
    category: "Electrician",
    price: 900,
    duration: "1–2 hours",
    rating: 4.9,
    reviews: 41,
    banner: "https://images.pexels.com/photos/4254168/pexels-photo-4254168.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
];

const INITIAL_ORDERS = [
  {
    id: 101,
    gigTitle: "AC Servicing & Gas Refill",
    customer: "Rahim",
    flat: "B-7, 5th floor",
    date: "Nov 18, 2025",
    price: 1800,
    status: "incoming",
  },
  {
    id: 102,
    gigTitle: "Full Apartment Deep Cleaning",
    customer: "Misha",
    flat: "C-2, 3rd floor",
    date: "Nov 17, 2025",
    price: 3200,
    status: "inprogress",
  },
  {
    id: 103,
    gigTitle: "Electric Wiring & Fan Install",
    customer: "Tanvir",
    flat: "A-12, 2nd floor",
    date: "Nov 10, 2025",
    price: 900,
    status: "completed",
  },
];

export default function ServiceProviderHome() {
  const [gigs, setGigs] = useState(INITIAL_GIGS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);

  const [showGigModal, setShowGigModal] = useState(false);
  const [editingGig, setEditingGig] = useState(null);

  const [statusFilter, setStatusFilter] = useState("incoming");
  const [openOrderMenuId, setOpenOrderMenuId] = useState(null);
  const [openGigMenuId, setOpenGigMenuId] = useState(null);

  const [gigForm, setGigForm] = useState({
    title: "",
    category: "",
    price: "",
    duration: "",
    banner: "",
    description: "",
  });

  const openCreateGig = () => {
    setEditingGig(null);
    setGigForm({
      title: "",
      category: "",
      price: "",
      duration: "",
      banner: "",
      description: "",
    });
    setShowGigModal(true);
  };

  const openEditGig = (gig) => {
    setEditingGig(gig);
    setGigForm({
      title: gig.title,
      category: gig.category,
      price: gig.price.toString(),
      duration: gig.duration,
      banner: gig.banner,
      description: gig.description || "",
    });
    setShowGigModal(true);
  };

  const closeGigModal = () => {
    setShowGigModal(false);
    setEditingGig(null);
  };

  const handleGigFormChange = (field, value) => {
    setGigForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleGigSubmit = (e) => {
    e.preventDefault();
    const { title, category, price, duration, banner } = gigForm;
    if (!title.trim() || !category.trim() || !price || !duration.trim()) return;

    if (editingGig) {
      setGigs((prev) =>
        prev.map((g) =>
          g.id === editingGig.id
            ? {
                ...g,
                title: gigForm.title.trim(),
                category: gigForm.category.trim(),
                price: Number(gigForm.price),
                duration: gigForm.duration.trim(),
                banner: gigForm.banner || g.banner,
                description: gigForm.description.trim(),
              }
            : g
        )
      );
    } else {
      const newGig = {
        id: Date.now(),
        title: gigForm.title.trim(),
        category: gigForm.category.trim(),
        price: Number(gigForm.price),
        duration: gigForm.duration.trim(),
        banner:
          gigForm.banner ||
          "/assets/gig-placeholder.jpg", // fallback
        description: gigForm.description.trim(),
        rating: 5.0,
        reviews: 0,
      };
      setGigs((prev) => [newGig, ...prev]);
    }

    setShowGigModal(false);
    setEditingGig(null);
  };

  const deleteGig = (gigId) => {
    setGigs((prev) => prev.filter((g) => g.id !== gigId));
    setOpenGigMenuId(null);
  };

  const filteredOrders = orders.filter((o) =>
    statusFilter === "all" ? true : o.status === statusFilter
  );

  const updateOrderStatus = (orderId, status) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    setOpenOrderMenuId(null);
  };

  return (
    <div className="spPage">
      <ProviderTopbar />

      <main className="spMain">
        {/* GIGS SECTION */}
        <section className="spSection">
          <header className="spSection__header">
            <div>
              <h2 className="spSection__title">My Gigs</h2>
              <p className="spSection__subtitle">
                Manage the services you offer to residents.
              </p>
            </div>

            <button className="btn primary" type="button" onClick={openCreateGig}>
              Publish New Gig
            </button>
          </header>

          <div className="spGigsGrid">
            {gigs.map((gig) => (
              <article key={gig.id} className="spGigCard">
                <div className="spGigCard__bannerWrapper">
                  <img
                    src={gig.banner}
                    alt={gig.title}
                    className="spGigCard__banner"
                  />
                  <button
                    type="button"
                    className="spGigCard__menuBtn"
                    onClick={() =>
                      setOpenGigMenuId(
                        openGigMenuId === gig.id ? null : gig.id
                      )
                    }
                  >
                    ⋮
                  </button>

                  {openGigMenuId === gig.id && (
                    <div className="spGigCard__menu">
                      <button
                        type="button"
                        onClick={() => openEditGig(gig)}
                      >
                        Edit gig
                      </button>
                      <button
                        type="button"
                        className="danger"
                        onClick={() => deleteGig(gig.id)}
                      >
                        Delete gig
                      </button>
                    </div>
                  )}
                </div>

                <div className="spGigCard__body">
                  <div className="spGigCard__topRow">
                    <span className="spGigCard__category">{gig.category}</span>
                    <span className="spGigCard__price">
                      ৳ {gig.price.toLocaleString("en-US")}
                    </span>
                  </div>

                  <h3 className="spGigCard__title">{gig.title}</h3>

                  <p className="spGigCard__meta">
                    ⏱ {gig.duration}
                  </p>

                  <div className="spGigCard__bottomRow">
                    <div className="spGigCard__rating">
                      <span className="stars">
                        ★★★★☆
                      </span>
                      <span className="score">
                        {gig.rating.toFixed(1)} ({gig.reviews})
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ORDERS SECTION */}
        <section className="spSection">
          <header className="spSection__header">
            <div>
              <h2 className="spSection__title">Orders</h2>
              <p className="spSection__subtitle">
                See and update the status of your service orders.
              </p>
            </div>

            <div className="spStatusFilters">
              {["incoming", "inprogress", "completed", "all"].map((st) => (
                <button
                  key={st}
                  type="button"
                  className={`spStatusChip ${
                    statusFilter === st ? "is-active" : ""
                  }`}
                  onClick={() => setStatusFilter(st)}
                >
                  {st === "incoming" && "Incoming"}
                  {st === "inprogress" && "In Progress"}
                  {st === "completed" && "Completed"}
                  {st === "all" && "All"}
                </button>
              ))}
            </div>
          </header>

          <div className="spOrdersPanel">
            {filteredOrders.length === 0 ? (
              <p className="spOrdersEmpty">
                No orders found for this status.
              </p>
            ) : (
              <ul className="spOrdersList">
                {filteredOrders.map((o) => (
                  <li key={o.id} className="spOrderRow">
                    <div className="spOrderMain">
                      <div className="spOrderTitle">
                        {o.gigTitle}
                      </div>
                      <div className="spOrderMeta">
                        <span>👤 {o.customer}</span>
                        <span>🏢 {o.flat}</span>
                        <span>📅 {o.date}</span>
                      </div>
                    </div>

                    <div className="spOrderRight">
                      <span
                        className={`spOrderStatus spOrderStatus-${o.status}`}
                      >
                        {o.status === "incoming" && "Incoming"}
                        {o.status === "inprogress" && "In Progress"}
                        {o.status === "completed" && "Completed"}
                      </span>
                      <span className="spOrderPrice">
                        ৳ {o.price.toLocaleString("en-US")}
                      </span>

                      <div className="spOrderMenuWrapper">
                        <button
                          type="button"
                          className="btn ghost spStatusBtn"
                          onClick={() =>
                            setOpenOrderMenuId(
                              openOrderMenuId === o.id ? null : o.id
                            )
                          }
                        >
                          Update status
                        </button>

                        {openOrderMenuId === o.id && (
                          <div className="spOrderStatusMenu">
                            <button
                              type="button"
                              onClick={() =>
                                updateOrderStatus(o.id, "incoming")
                              }
                            >
                              Incoming
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                updateOrderStatus(o.id, "inprogress")
                              }
                            >
                              In Progress
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                updateOrderStatus(o.id, "completed")
                              }
                            >
                              Completed
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>

      {/* Gig create / edit modal */}
      {showGigModal && (
        <div className="spModalOverlay" onClick={closeGigModal}>
          <div
            className="spModal"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="spModal__header">
              <h3>{editingGig ? "Edit Gig" : "Publish New Gig"}</h3>
              <button
                type="button"
                className="spModal__close"
                onClick={closeGigModal}
              >
                ×
              </button>
            </header>

            <form className="spModal__form" onSubmit={handleGigSubmit}>
              <div className="spField">
                <label>Title</label>
                <input
                  placeholder="AC servicing for 1.5 ton split AC"
                  value={gigForm.title}
                  onChange={(e) =>
                    handleGigFormChange("title", e.target.value)
                  }
                  required
                />
              </div>

              <div className="spFieldGrid">
                <div className="spField">
                  <label>Category</label>
                  <input
                    placeholder="e.g. AC Repair, Cleaning"
                    value={gigForm.category}
                    onChange={(e) =>
                      handleGigFormChange("category", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="spField">
                  <label>Base price (৳)</label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    placeholder="e.g. 1800"
                    value={gigForm.price}
                    onChange={(e) =>
                      handleGigFormChange("price", e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              <div className="spField">
                <label>Estimated time</label>
                <input
                  placeholder="e.g. 2–3 hours"
                  value={gigForm.duration}
                  onChange={(e) =>
                    handleGigFormChange("duration", e.target.value)
                  }
                  required
                />
              </div>

              <div className="spField">
                <label>Banner image URL</label>
                <input
                  placeholder="Paste image URL or keep default"
                  value={gigForm.banner}
                  onChange={(e) =>
                    handleGigFormChange("banner", e.target.value)
                  }
                />
              </div>

              <div className="spField">
                <label>Description</label>
                <textarea
                  rows="3"
                  placeholder="Describe what is included, what is not, and any special notes."
                  value={gigForm.description}
                  onChange={(e) =>
                    handleGigFormChange("description", e.target.value)
                  }
                />
              </div>

              <div className="spModal__actions">
                <button
                  type="button"
                  className="btn ghost"
                  onClick={closeGigModal}
                >
                  Cancel
                </button>
                <button type="submit" className="btn primary">
                  {editingGig ? "Save changes" : "Publish gig"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
