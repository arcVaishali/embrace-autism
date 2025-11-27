import React, { useState } from 'react';
import LoadingSpinner from '../../AutismAppComponents/LoadingSpinner';

const DeleteEvent = () => {
    const [eventId, setEventId] = useState('');
    const [status, setStatus] = useState('');

    const [busy, setBusy] = useState(false);

    const handleDelete = async (e) => {
        e.preventDefault();
        setStatus('');
        setBusy(true);
        try {
            const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
            // call server delete endpoint
            const response = await fetch(`${API_BASE_URL}/events/delete-community-event/${eventId}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            if (response.ok) {
                setStatus('Event deleted successfully.');
                setEventId('');
                setBusy(false);
                try { window.dispatchEvent(new CustomEvent('eventsUpdated', { detail: { id: eventId, action: 'delete' } })); } catch(e){}
            } else {
                setStatus('Failed to delete event.');
            }
        } catch (error) {
            setBusy(false);
            setStatus('Error deleting event.');
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: '2rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: 8 }}>
            <h2>Delete Event</h2>
            <form onSubmit={handleDelete}>
                <label htmlFor="eventId">Event ID:</label>
                <input
                    type="text"
                    id="eventId"
                    value={eventId}
                    onChange={(e) => setEventId(e.target.value)}
                    required
                    style={{ width: '100%', marginBottom: '1rem' }}
                />
                <button type="submit" disabled={busy} style={{ width: '100%' }} className="px-3 py-2 rounded-md bg-red-600 text-white">
                    {busy ? <span className="flex items-center justify-center gap-2"><LoadingSpinner size={4}/> Deleting...</span> : 'Delete Event'}
                </button>
            </form>
            {status && <p style={{ marginTop: '1rem' }}>{status}</p>}
        </div>
    );
};

export default DeleteEvent;