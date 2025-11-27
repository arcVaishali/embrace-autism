import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    async function load() {
      setLoading(true);
      try {
        const [evRes, regRes] = await Promise.all([
          fetch(`${API_BASE_URL}/events/get-this-community-event/${id}`),
          fetch(`${API_BASE_URL}/users/registered-community-events`, { credentials: 'include' }),
        ]);

        if (!evRes.ok) throw new Error('Failed to fetch event');
        const evJson = await evRes.json();
        const evData = evJson.data || evJson;

        let registeredList = [];
        if (regRes.ok) {
          const regJson = await regRes.json();
          registeredList = regJson.data || [];
        }

        setEvent(evData);
        setRegistered(registeredList.some(e => (e._id || e.id) === id));

        // fetch current user info to determine ownership
        try {
          const meRes = await fetch(`${API_BASE_URL}/users/userData`, { credentials: 'include' });
          if (meRes.ok) {
            const meJson = await meRes.json();
            const me = meJson.data?.user || meJson.data || meJson;
            if (me && evData.owner) {
              const ownerId = evData.owner._id || evData.owner.id || evData.owner;
              const myId = me._id || me.id;
              setIsOwner(ownerId && myId && ownerId.toString() === myId.toString());
            }
          }
        } catch (meErr) {
          // ignore me fetch errors
        }
      } catch (err) {
        setError(err.message || String(err));
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  const register = async () => {
    try {
      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
      setBusy(true);
      const res = await fetch(`${API_BASE_URL}/events/join-community-event/${id}`, { method: 'POST', credentials: 'include' });
      if (!res.ok) {
        const json = await res.json().catch(()=>({ message: 'Failed' }));
        throw new Error(json.message || 'Failed to register');
      }
      setRegistered(true);
      setBusy(false);
      try { window.dispatchEvent(new CustomEvent('eventsUpdated', { detail: { id, action: 'register' } })); } catch(e){}
      alert('Registered for event');
    } catch (err) {
      alert('Register failed: ' + (err.message || err));
    }
  };

  const unregister = async () => {
    try {
      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
      setBusy(true);
      const res = await fetch(`${API_BASE_URL}/events/unregister-community-event/${id}`, { method: 'POST', credentials: 'include' });
      if (!res.ok) throw new Error('Failed to unregister');
      setRegistered(false);
      setBusy(false);
      try { window.dispatchEvent(new CustomEvent('eventsUpdated', { detail: { id, action: 'unregister' } })); } catch(e){}
      alert('Unregistered from event');
    } catch (err) {
      alert('Unregister failed: ' + (err.message || err));
    }
  };

  const handleDelete = async () => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm('Delete this event? This cannot be undone.')) return;
    try {
      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
      const res = await fetch(`${API_BASE_URL}/events/delete-community-event/${id}`, { method: 'DELETE', credentials: 'include' });
      if (!res.ok) {
        throw new Error('Failed to delete');
      }
      alert('Event deleted');
      try { window.dispatchEvent(new CustomEvent('eventsUpdated', { detail: { id, action: 'delete' } })); } catch(e){}
      navigate('/adult/ViewEvent');
    } catch (err) {
      alert('Delete failed: ' + (err.message || err));
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
  if (!event) return <div className="p-8 text-center">Event not found</div>;

  const eventDate = event.eventDate ? new Date(event.eventDate).toLocaleString() : 'TBA';

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="bg-white rounded-3xl shadow-lg p-8">
        {event.coverImage ? (
          <img src={event.coverImage} alt={event.name} className="w-full rounded-xl object-cover h-64" />
        ) : (
          <div className="w-full rounded-xl bg-gray-100 h-64 flex items-center justify-center">No image</div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{event.name}</h1>
            <div className="text-sm text-gray-500 mt-1">Hosted by {event.owner?.username || 'Unknown'}</div>
          </div>
          <div className="text-sm text-gray-700">{eventDate}</div>
        </div>

        <p className="mt-6 text-gray-700 whitespace-pre-line">{event.about}</p>

        <div className="mt-6 flex items-center gap-3">
          {registered ? (
            <button onClick={unregister} disabled={busy} className="px-4 py-2 rounded-md bg-red-600 text-white">{busy ? 'Processing...' : 'Unregister'}</button>
          ) : (
            <button onClick={register} disabled={busy} className="px-4 py-2 rounded-md bg-indigo-600 text-white">{busy ? 'Processing...' : 'Register'}</button>
          )}
          {isOwner && (
            <button onClick={handleDelete} className="px-4 py-2 rounded-md bg-red-700 text-white">Delete event</button>
          )}
          <button onClick={() => navigate(-1)} className="px-4 py-2 rounded-md border">Back</button>
        </div>
      </div>
    </div>
  );
}
