import React, { useState } from 'react';
import LoadingSpinner from '../../AutismAppComponents/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
    const [event, setEvent] = useState({
        title: '',
        date: '',
        time: '',
        location: '',
        description: ''
    });

    const handleChange = (e) => {
        setEvent({
            ...event,
            [e.target.name]: e.target.value
        });
    };

    const navigate = useNavigate();

    const [busy, setBusy] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // call API to create event
        try {
            const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
            // Combine date and time into a timestamp
            const eventDateTime = event.date ? new Date(event.date + 'T' + (event.time || '00:00')).getTime() : null;
            const payload = {
                name: event.title,
                about: event.description,
                coverImage: event.coverImage || '',
                eventDate: eventDateTime,
            };

            setBusy(true);
            const res = await fetch(`${API_BASE_URL}/events/create-community-event`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const err = await res.json().catch(()=>({ message: 'Unknown error' }));
                throw new Error(err.message || 'Failed to create event');
            }

            const json = await res.json();
            alert('Event created!');
            try { window.dispatchEvent(new CustomEvent('eventsUpdated', { detail: { id: json.data?._id || json.data?.id || null, action: 'create' } })); } catch(e){}
            // navigate to created event details if server returned the event
            if (json && json.data && (json.data._id || json.data.id)) {
                navigate(`/events/${json.data._id || json.data.id}`);
                return;
            }
            // reset form
            setEvent({ title: '', date: '', time: '', location: '', description: '', coverImage: '' });
            // Optionally navigate to view page (user can view events list)
        } catch (error) {
            console.error(error);
            alert('Create event failed: ' + (error.message || error));
        }
        // reset only when not navigated
        setBusy(false);
        setEvent({
            title: '',
            date: '',
            time: '',
            location: '',
            description: ''
        });
    };

    return (
        <div style={{ maxWidth: 500, margin: '2rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: 8 }}>
            <h2>Create Event</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 16 }}>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={event.title}
                        onChange={handleChange}
                        required
                        style={{ width: '100%' }}
                    />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label>Date:</label>
                    <input
                        type="date"
                        name="date"
                        value={event.date}
                        onChange={handleChange}
                        required
                        style={{ width: '100%' }}
                    />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label>Time:</label>
                    <input
                        type="time"
                        name="time"
                        value={event.time}
                        onChange={handleChange}
                        required
                        style={{ width: '100%' }}
                    />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label>Location:</label>
                    <input
                        type="text"
                        name="location"
                        value={event.location}
                        onChange={handleChange}
                        required
                        style={{ width: '100%' }}
                    />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label>Cover image URL (optional):</label>
                    <input
                        type="text"
                        name="coverImage"
                        value={event.coverImage || ''}
                        onChange={handleChange}
                        placeholder="https://..."
                        style={{ width: '100%' }}
                    />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={event.description}
                        onChange={handleChange}
                        rows={4}
                        style={{ width: '100%' }}
                    />
                </div>
                                <button type="submit" disabled={busy} className="px-4 py-2 rounded-md bg-[#0D79F4] text-white">
                                    {busy ? (
                                        <span className="flex items-center gap-2"><LoadingSpinner size={4} /> Creating...</span>
                                    ) : (
                                        'Create Event'
                                    )}
                                </button>
            </form>
        </div>
    );
};

export default CreateEvent;