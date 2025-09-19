import React, { useState } from 'react';

const CreateAccounts: React.FC = () => {
  const [accountType, setAccountType] = useState('patient');
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    age: '',
    therapyType: '',
    totalSessions: '',
    specialization: '',
    experience: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      alert(`${accountType.charAt(0).toUpperCase() + accountType.slice(1)} account created successfully! Login credentials have been sent via email.`);
      setFormData({
        name: '',
        username: '',
        password: '',
        age: '',
        therapyType: '',
        totalSessions: '',
        specialization: '',
        experience: ''
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="fade-in">
      <div className="grid grid-2">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Create New Account</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Account Type</label>
              <select 
                className="form-select"
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-input"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                type="text"
                name="username"
                className="form-input"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-input"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            
            {accountType === 'patient' && (
              <>
                <div className="form-group">
                  <label className="form-label">Age</label>
                  <input
                    type="number"
                    name="age"
                    className="form-input"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Therapy Type</label>
                  <select 
                    name="therapyType"
                    className="form-select"
                    value={formData.therapyType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Therapy Type</option>
                    <option value="Panchakarma - Detox">Panchakarma - Detox</option>
                    <option value="Panchakarma - Rejuvenation">Panchakarma - Rejuvenation</option>
                    <option value="Panchakarma - Wellness">Panchakarma - Wellness</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Total Sessions</label>
                  <input
                    type="number"
                    name="totalSessions"
                    className="form-input"
                    value={formData.totalSessions}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </>
            )}
            
            {accountType === 'doctor' && (
              <>
                <div className="form-group">
                  <label className="form-label">Specialization</label>
                  <input
                    type="text"
                    name="specialization"
                    className="form-input"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    placeholder="e.g. Panchakarma Specialist"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Years of Experience</label>
                  <input
                    type="number"
                    name="experience"
                    className="form-input"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </>
            )}
            
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        </div>
        
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Account Creation Guide</h3>
          </div>
          <div>
            <h4>Patient Accounts</h4>
            <p>Create accounts for patients who will undergo Panchakarma therapy. Required information includes:</p>
            <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
              <li>Personal details (name, age)</li>
              <li>Login credentials (username, password)</li>
              <li>Therapy type and session count</li>
              <li>Medical history and allergies</li>
              <li>Emergency contact information</li>
            </ul>
            
            <h4>Doctor Accounts</h4>
            <p>Create accounts for practitioners who will treat patients. Required information includes:</p>
            <ul style={{ marginLeft: '1.5rem' }}>
              <li>Personal details (name)</li>
              <li>Login credentials (username, password)</li>
              <li>Professional details (specialization, experience)</li>
              <li>License and certification information</li>
              <li>Available working hours and schedule</li>
            </ul>
            
            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
              <h4 className="text-blue-800">Security Note</h4>
              <p className="text-blue-700 text-sm">All passwords are encrypted and stored securely. Users will be prompted to change their password on first login.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccounts;
