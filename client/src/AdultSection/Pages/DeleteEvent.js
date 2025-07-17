import React, { useState } from 'react';

const DeleteEvent = () => {
    const [eventId, setEventId] = useState('');
    const [status, setStatus] = useState('');

    const handleDelete = async (e) => {
        e.preventDefault();
        setStatus('');
        try {
            // Replace with your API endpoint
            const response = await fetch(`/api/events/${eventId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setStatus('Event deleted successfully.');
                setEventId('');
            } else {
                setStatus('Failed to delete event.');
            }
        } catch (error) {
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
                <button type="submit" style={{ width: '100%' }}>Delete Event</button>
            </form>
            {status && <p style={{ marginTop: '1rem' }}>{status}</p>}
        </div>
    );
};

export default DeleteEvent;