import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function RegistrationPage() {
  const { slug } = useParams();
  const [eventName, setEventName] = useState('');
  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    registrationNumber: '',
    department: '',
    phoneNumber: '',
  });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const eventsRef = collection(db, 'events');
        const q = query(eventsRef, where('slug', '==', slug));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const eventData = querySnapshot.docs[0].data();
          setEventName(eventData.title);
        }
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEventDetails();
  }, [slug]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('loading');

    try {
      // Add registration to Firestore
      const registrationsRef = collection(db, 'registrations');
      await addDoc(registrationsRef, {
        ...formData,
        eventName,
        eventSlug: slug,
        registrationDate: new Date(),
      });

      // Still keep the Google Sheets integration if needed
      await fetch('your-google-script-url', {
        method: 'POST',
        body: JSON.stringify({
          ...formData,
          eventName,
          registrationDate: new Date().toISOString(),
        }),
      });

      setStatus('success');
      setFormData({
        studentName: '',
        email: '',
        registrationNumber: '',
        department: '',
        phoneNumber: '',
      });
    } catch (error) {
      console.error('Error submitting registration:', error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };




  return (
    <div className="registration-container">
      <div className="registration-header">
        <h1>{eventName} Registration</h1>
        <p>Please fill in your details to register</p>
      </div>

      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="studentName"
            placeholder="Student Name"
            value={formData.studentName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            name="registrationNumber"
            placeholder="Registration Number"
            value={formData.registrationNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>

        <button 
          type="submit" 
          className="submit-button" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Registering...' : 'Complete Registration'}
        </button>
      </form>

      {status && (
        <div className={`status-message ${status}`}>
          {status === 'loading' && <span>Submitting registration...</span>}
          {status === 'success' && 'Registration completed successfully!'}
          {status === 'error' && 'Registration failed. Please try again later.'}
        </div>
      )}
    </div>
  );
}