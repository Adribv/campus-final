import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../lib/sanity';

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
    const query = `*[_type == "event" && slug.current == $slug][0]{
      title
    }`;
    client.fetch(query, { slug }).then((data) => {
      if (data?.title) {
        setEventName(data.title);
      }
    });
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
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbxcMH8a8KWZDU6AbbSXI93JLRhFrxDEgUYsjJMqjmxYANsxHJljOC-SVV727HsDfidwQQ/exec',
        {
          method: 'POST',
          body: JSON.stringify({
            ...formData,
            eventName,
            registrationDate: new Date().toISOString(),
          }),
        }
      );

      if (response.ok) {
        setStatus('success');
        setFormData({
          studentName: '',
          email: '',
          registrationNumber: '',
          department: '',
          phoneNumber: '',
        });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!eventName) {
    return <div>Loading event details...</div>;
  }

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