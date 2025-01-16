import { useEffect, useState } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/config';
import '../style.css';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsRef = collection(db, 'events');
        const q = query(
          eventsRef,
          where('status', '==', 'upcoming'  ),
          // orderBy('status'),
          // orderBy('startDate', 'asc')
        );

        const querySnapshot = await getDocs(q);

        // Debugging log
        console.log('Fetched events:', querySnapshot.docs.map((doc) => doc.data()));

        const eventsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          startDate: doc.data().startDate?.toDate ? doc.data().startDate.toDate() : null,
          endDate: doc.data().endDate?.toDate ? doc.data().endDate.toDate() : null,
          registrationDeadline: doc.data().registrationDeadline?.toDate
            ? doc.data().registrationDeadline.toDate()
            : null,
        }));

        setEvents(eventsList);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to fetch events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleRegister = (slug) => {
    navigate(`/register/${slug}`);
  };

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="events-container">
      <div className="events-header">
        <h1>Upcoming Events</h1>
      </div>

      <div className="events-grid">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <div className="event-content">
              <h2 className="event-title">{event.title}</h2>
              <p className="event-description">{event.description}</p>

              <div className="event-details">
                <div className="event-detail">
                  <span>Date:</span>{' '}
                  {event.startDate ? new Date(event.startDate).toLocaleDateString() : 'TBA'}
                </div>
                <div className="event-detail">
                  <span>Time:</span>{' '}
                  {event.startDate ? new Date(event.startDate).toLocaleTimeString() : 'TBA'}
                </div>
                <div className="event-detail">
                  <span>Venue:</span> {event.venue || 'TBA'}
                </div>
                {event.fee && (
                  <div className="event-detail">
                    <span>Fee:</span> ₹{event.fee}
                  </div>
                )}
              </div>

              <button
                className="register-button"
                onClick={() => handleRegister(event.slug || '')}
              >
                Register Now
              </button>

              <div className="registration-info">
                {event.registrationRequired ? (
                  <>
                    Registration closes on{' '}
                    <span>
                      {event.registrationDeadline
                        ? new Date(event.registrationDeadline).toLocaleDateString()
                        : 'TBA'}
                    </span>
                  </>
                ) : (
                  'No registration required'
                )}
                {event.maxParticipants && (
                  <div>
                    Max participants: <span>{event.maxParticipants}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
