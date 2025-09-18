import React, { useState } from 'react';
import { dummyFeedback } from '../../data/dummyData';

interface PatientFeedbackProps {
  user: any;
}

const PatientFeedback: React.FC<PatientFeedbackProps> = ({ user }) => {
  const [symptoms, setSymptoms] = useState('');
  const [improvements, setImprovements] = useState('');
  const [sideEffects, setSideEffects] = useState('');
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const patientFeedback = dummyFeedback.filter(f => f.patientId === user.profile.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      alert('Feedback submitted successfully!');
      setSymptoms('');
      setImprovements('');
      setSideEffects('');
      setRating(5);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="fade-in">
      <div className="grid grid-2">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Submit Feedback</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Symptoms Experienced</label>
              <textarea
                className="form-input form-textarea"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Describe any symptoms you are experiencing..."
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Improvements Noticed</label>
              <textarea
                className="form-input form-textarea"
                value={improvements}
                onChange={(e) => setImprovements(e.target.value)}
                placeholder="Describe any improvements you have noticed..."
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Side Effects</label>
              <textarea
                className="form-input form-textarea"
                value={sideEffects}
                onChange={(e) => setSideEffects(e.target.value)}
                placeholder="Describe any side effects (or 'None' if no side effects)..."
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Overall Rating</label>
              <select 
                className="form-select"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              >
                <option value={5}>5 - Excellent</option>
                <option value={4}>4 - Good</option>
                <option value={3}>3 - Average</option>
                <option value={2}>2 - Poor</option>
                <option value={1}>1 - Very Poor</option>
              </select>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </form>
        </div>
        
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Previous Feedback</h3>
          </div>
          <div>
            {patientFeedback.length > 0 ? (
              patientFeedback.map(feedback => (
                <div key={feedback.id} className="card" style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
                    {new Date(feedback.date).toLocaleDateString()} - Rating: {feedback.rating}/5
                  </div>
                  <p><strong>Symptoms:</strong> {feedback.symptoms}</p>
                  <p><strong>Improvements:</strong> {feedback.improvements}</p>
                  <p><strong>Side Effects:</strong> {feedback.sideEffects}</p>
                </div>
              ))
            ) : (
              <p>No previous feedback found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientFeedback;
