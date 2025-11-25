import { Link } from "react-router-dom";

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

  return (
    <div
      className="group bg-white p-4 rounded-3xl shadow-lg hover:shadow-2xl transition-transform duration-200 transform hover:-translate-y-2 relative"
      style={{ minWidth: 220, minHeight: 360 }}
    >
      <div className="w-full overflow-hidden rounded-lg relative">
        {coverImage ? (
          <img
            src={coverImage}
            alt={name || "Event cover"}
            className="h-40 w-full object-cover object-center rounded-lg group-hover:opacity-95"
          />
          ) : (
          <div style={placeholderStyle} className="rounded-lg w-full">
            <div className="text-sm font-medium">No image available</div>
          </div>
        )}
          {/* status / registered badge */}
          {(status || isRegistered) && (() => {
            const badgeClass = isRegistered ? 'bg-emerald-500' : status === 'upcoming' ? 'bg-indigo-600' : 'bg-gray-500';
            const label = isRegistered ? 'Registered' : (status ? status.charAt(0).toUpperCase() + status.slice(1) : '');
            return (
              <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold text-white ${badgeClass}`}>
                {label}
              </div>
            )
          })()}
      </div>

      <h2 className="text-lg font-semibold text-gray-800 mt-3 truncate">{name}</h2>

      <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
        <div>{views ? `${views} views` : "—"}</div>
        <div>{eventDate ? new Date(eventDate).toLocaleString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }) : "TBA"}</div>
      </div>

      <div className="mt-2 text-sm text-gray-600 truncate">Hosted by <span className="font-medium">{owner || "Unknown"}</span></div>

      <p className="mt-3 text-sm text-gray-700 line-clamp-3" style={{ minHeight: 54 }}>{about}</p>

      <div className="mt-4 flex items-center justify-between">
        {id ? (
          <Link
            to={`/events/${id}`}
            className="inline-block rounded-md bg-[#0D79F4] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus:outline-none"
          >
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

          <div className="text-xs text-gray-400">{eventDate ? "Register" : "Coming soon"}</div>
      </div>
    </div>
  );
};

export default EventCard;
