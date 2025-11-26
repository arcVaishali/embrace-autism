import { Link } from "react-router-dom";
import { useState } from 'react';

const EventCard = ({
  id,
  name,
  about,
  coverImage,
  views,
  eventDate,
  owner,
  status = null, // upcoming | registered | past | null
  isRegistered = false,
}) => {
  // fallback placeholder (nice neutral gradient) if no cover image
  const placeholderStyle = {
    background: "linear-gradient(135deg,#e2e8f0 0%, #cbd5e1 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#374151",
    height: 160,
    borderRadius: 12,
  };

  const [localRegistered, setLocalRegistered] = useState(isRegistered);
  const [busy, setBusy] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const handleRegister = async (e) => {
    e.stopPropagation();
    if (!id) return;
    setBusy(true);
    try {
      const res = await fetch(`${API_BASE_URL}/events/join-community-event/${id}`, { method: 'POST', credentials: 'include' });
      if (!res.ok) throw new Error('Failed to register');
      setLocalRegistered(true);
      // notify other lists to refresh
      try { window.dispatchEvent(new CustomEvent('eventsUpdated', { detail: { id, action: 'register' } })); } catch(e){ /* ignore */ }
    } catch (err) {
      console.error('register error', err);
      // optionally show UI message
      alert('Register failed: ' + (err.message || err));
    } finally {
      setBusy(false);
    }
  };

  const handleUnregister = async (e) => {
    e.stopPropagation();
    if (!id) return;
    setBusy(true);
    try {
      const res = await fetch(`${API_BASE_URL}/events/unregister-community-event/${id}`, { method: 'POST', credentials: 'include' });
      if (!res.ok) throw new Error('Failed to unregister');
      setLocalRegistered(false);
      try { window.dispatchEvent(new CustomEvent('eventsUpdated', { detail: { id, action: 'unregister' } })); } catch(e){ }
    } catch (err) {
      console.error('unregister error', err);
      alert('Unregister failed: ' + (err.message || err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className="group bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-150 relative w-full flex flex-col h-full z-0 group-hover:z-10 overflow-hidden isolation-isolate"
    >
      <div className="w-full overflow-hidden rounded-lg relative h-44 sm:h-56 md:h-48 lg:h-56 xl:h-64">
        {coverImage ? (
          <img
            src={coverImage}
            alt={name || "Event cover"}
            className="h-56 w-full object-cover object-center rounded-lg group-hover:opacity-95"
          />
          ) : (
          <div style={{ ...placeholderStyle, height: 200 }} className="rounded-lg w-full">
            <div className="text-sm font-medium">No image available</div>
          </div>
        )}
          {/* status / registered badge */}
          {(status || isRegistered) && (() => {
            const badgeClass = isRegistered ? 'bg-emerald-500' : status === 'upcoming' ? 'bg-indigo-600' : 'bg-gray-500';
            const label = isRegistered ? 'Registered' : (status ? status.charAt(0).toUpperCase() + status.slice(1) : '');
            return (
              <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold text-white ${badgeClass}`} style={{ pointerEvents: 'none' }}>
                {label}
              </div>
            )
          })()}
      </div>

      <h2 className="text-xl font-semibold text-gray-800 mt-3 line-clamp-2">{name}</h2>

      <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
        <div>{views ? `${views} views` : "—"}</div>
        <div>{eventDate ? new Date(eventDate).toLocaleString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }) : "TBA"}</div>
      </div>

      <div className="mt-3 text-sm text-gray-600">Hosted by <span className="font-medium">{owner || "Unknown"}</span></div>

      <p className="mt-3 text-sm text-gray-700 line-clamp-4 flex-grow" style={{ minHeight: 80 }}>{about}</p>

      <div className="mt-4 flex items-center justify-between" style={{ zIndex: 1 }}>
        {id ? (
          <Link
            to={`/events/${id}`}
            className="inline-flex items-center gap-2 rounded-full bg-[#0D79F4] px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-indigo-600 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M12.293 9.293a1 1 0 011.414 0L17 12.586V6a1 1 0 112 0v9a1 1 0 01-1 1h-9a1 1 0 110-2h6.586l-3.293-3.293a1 1 0 010-1.414z"/></svg>
            View details
          </Link>
        ) : (
          <button
            type="button"
            disabled
            className="inline-block rounded-md bg-gray-300 px-3.5 py-2.5 text-sm font-semibold text-white cursor-not-allowed"
          >
            RSVP
          </button>
        )}

            <div className="flex items-center gap-2">
              {eventDate ? (
                localRegistered ? (
                  <button onClick={handleUnregister} disabled={busy} className={`px-3 py-1 rounded-full text-sm font-semibold ${busy ? 'bg-gray-300 text-white' : 'bg-red-600 text-white hover:bg-red-700'}`}>
                    {busy ? 'Processing...' : 'Unregister'}
                  </button>
                ) : (
                  <button onClick={handleRegister} disabled={busy} className={`px-3 py-1 rounded-full text-sm font-semibold ${busy ? 'bg-gray-300 text-white' : 'bg-[#0D79F4] text-white hover:bg-indigo-600'}`}>
                    {busy ? 'Processing...' : 'Register'}
                  </button>
                )
              ) : (
                <div className="text-sm text-gray-400">Coming soon</div>
              )}
            </div>
      </div>
    </div>
  );
};

export default EventCard;
