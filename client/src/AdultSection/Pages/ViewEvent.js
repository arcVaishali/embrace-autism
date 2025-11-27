import { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import { Link } from 'react-router-dom';

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
    let mounted = true;

    const fetchAll = async () => {
      setLoading({ events: true, upcoming: true, registered: true });
      try {
        const [allRes, upcomingRes, regRes] = await Promise.all([
          fetch(`${API_BASE_URL}/events/get-all-community-event`),
          fetch(`${API_BASE_URL}/events/get-upcoming-community-event`),
          fetch(`${API_BASE_URL}/users/registered-community-events`, { credentials: 'include' }),
        ]);

        if (!mounted) return;

        if (allRes.ok) {
          const body = await allRes.json();
          setEvents(body.data || []);
        } else {
          setEvents([]);
        }

        if (upcomingRes.ok) {
          const body2 = await upcomingRes.json();
          setUpcomingEvents(body2.data || []);
        } else setUpcomingEvents([]);

        if (regRes.ok) {
          const body3 = await regRes.json();
          setRegisteredEvents(body3.data || []);
        } else {
          setRegisteredEvents([]);
          setErrors(prev => ({ ...prev, userAuth: false }));
        }
      } catch (err) {
        console.error('Fetch events error', err);
      } finally {
        if (mounted) setLoading({ events: false, upcoming: false, registered: false });
      }
    };

    fetchAll();

    const onUpdated = () => fetchAll();
    window.addEventListener('eventsUpdated', onUpdated);
    return () => {
      mounted = false;
      window.removeEventListener('eventsUpdated', onUpdated);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-slate-50 min-h-screen px-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-3xl p-8">
          <h2 className="text-4xl mt-10 font-bold text-gray-900 text-center">
            Community Events
          </h2>
          <div className="flex items-center justify-between gap-4">
            <p className="text-center text-gray-600 mt-2 flex-1">Discover and register for events happening around your community.</p>
            <div className="flex gap-2">
              <Link to="/adult/ViewEvent/create" className="px-4 py-2 bg-emerald-500 text-white rounded-full text-sm font-semibold">+ Create event</Link>
              <Link to="/adult/ViewEvent/delete" className="px-4 py-2 bg-red-500 text-white rounded-full text-sm font-semibold">Delete event</Link>
            </div>
          </div>
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
          {(() => {
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
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 items-stretch">
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
          })()}
        </div>
      </div>
    </div>
  )
}

export default ViewEvent;
