import { useState, useEffect } from "react";
// Note: Link removed (not used on this page)
import EventCard from "../components/EventCard";

const ViewEvent = () => {
  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState({ events: true, upcoming: true, registered: true });
  const [filter, setFilter] = useState("all"); // 'all' | 'upcoming' | 'registered'
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest"); // newest | oldest

  useEffect(() => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    fetch(`${API_BASE_URL}/events/get-all-community-event`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then(async (res) => {
        const fetchedResponse = await res.json();
        const fetchedData = fetchedResponse.data;

        console.log(fetchedData);

        setEvents(fetchedData || []);
        setLoading(prev => ({ ...prev, events: false }));
      })
      .catch((err) => console.log(err));

    fetch(`${API_BASE_URL}/events/get-upcoming-community-event`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then(async (res) => {
        const fetchedResponse = await res.json();
        const fetchedData = fetchedResponse.data;

        console.log(fetchedData);

        setUpcomingEvents(fetchedData || []);
        setLoading(prev => ({ ...prev, upcoming: false }));
      })
      .catch((err) => console.log(err));

    fetch(`${API_BASE_URL}/users/registered-community-events`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then(async (res) => {
        if (res.ok) {
          const fetchedResponse = await res.json();
          const fetchedData = fetchedResponse.data;

          console.log(fetchedData);

          setRegisteredEvents(fetchedData || []);
          setLoading(prev => ({ ...prev, registered: false }));
        } else {
          // check to know if fetch failed due to failed user authentication
          // or other errors
          setErrors(prev => ({ ...prev, userAuth: false }));
          setLoading(prev => ({ ...prev, registered: false }));
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-3xl p-8">
          <h2 className="text-4xl mt-10 font-bold text-gray-900 text-center">
            Community Events
          </h2>
          <p className="text-center text-gray-600 mt-2">Discover and register for events happening around your community.</p>
          {/* Filter controls */}
          <div className="mt-8 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-full text-sm font-semibold ${filter === 'all' ? 'bg-[#0D79F4] text-white' : 'bg-gray-100 text-gray-700'}`}>
              All ({events.length})
            </button>
            <button onClick={() => setFilter('upcoming')} className={`px-4 py-2 rounded-full text-sm font-semibold ${filter === 'upcoming' ? 'bg-[#0D79F4] text-white' : 'bg-gray-100 text-gray-700'}`}>
              Upcoming ({upcomingEvents.length})
            </button>
            <button onClick={() => setFilter('registered')} className={`px-4 py-2 rounded-full text-sm font-semibold ${filter === 'registered' ? 'bg-[#0D79F4] text-white' : 'bg-gray-100 text-gray-700'}`}>
              Registered ({registeredEvents.length})
            </button>
            </div>

            <div className="flex items-center gap-3">
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search events" className="px-3 py-2 rounded-full border border-gray-200 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-[#0D79F4]" />
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-3 py-2 rounded-full border border-gray-200 text-sm shadow-sm">
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>

          {/* unified list rendering: compute items based on filter */}
          {
            (() => {
              const listForFilter = () => {
                const q = search.toLowerCase();
                const filterAndSort = (arr) => arr
                  .filter(v => (v.name || '').toLowerCase().includes(q) || ((v.about||'').toLowerCase().includes(q)))
                  .slice()
                  .sort((a,b) => sortBy === 'newest' ? (new Date(b.eventDate||0) - new Date(a.eventDate||0)) : (new Date(a.eventDate||0) - new Date(b.eventDate||0)));

                if (filter === 'upcoming') return { title: 'Upcoming events', items: filterAndSort(upcomingEvents), loading: loading.upcoming };
                if (filter === 'registered') return { title: 'Registered events', items: filterAndSort(registeredEvents), loading: loading.registered };
                return { title: 'All events', items: filterAndSort(events), loading: loading.events };
              };

              const { title, items, loading: listLoading } = listForFilter();
              const total = filter === 'upcoming' ? upcomingEvents.length : filter === 'registered' ? registeredEvents.length : events.length;

              return (
                <section className="mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
                    <div className="text-sm text-gray-500">{total} {filter === 'all' ? 'total' : 'event(s)'}</div>
                  </div>

                  <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {listLoading ? (
                        <div className="col-span-full flex justify-center py-10">
                          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500" />
                        </div>
                      ) : (filter === 'registered' && errors.userAuth === false) ? (
                        <div className="col-span-full text-center text-gray-600">Kindly login to view your registered events.</div>
                      ) : items.length === 0 ? (
                        <div className="col-span-full text-center text-gray-500 py-8">No events found</div>
                      ) : (
                        items.map((val, key) => (
                          <EventCard
                            key={key}
                            id={val._id || val.id}
                            name={val.name}
                            about={val.about}
                            coverImage={val.coverImage}
                            views={val.views}
                            eventDate={val.eventDate}
                            owner={val.owner?.username || "Unknown"}
                            status={filter === 'upcoming' ? 'upcoming' : (filter === 'registered' ? 'registered' : (new Date(val.eventDate) > new Date() ? 'upcoming' : 'past'))}
                            isRegistered={registeredEvents.some(r => (r._id || r.id) === (val._id || val.id))}
                          />
                        ))
                      )}
                    </div>
                  </div>
                </section>
              );
            })()
          }
        </div>
      </div>
    </div>
  )
}

export default ViewEvent;
