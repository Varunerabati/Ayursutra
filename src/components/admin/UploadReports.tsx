import React, { useState } from 'react';
import { dummyUsers } from '../../data/dummyData';

const UploadReports: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState('');
  const [sessionNumber, setSessionNumber] = useState('');
  const [reportType, setReportType] = useState('Progress Report');
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const patients = dummyUsers.filter(u => u.role === 'patient');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    // Simulate file upload
    setTimeout(() => {
      alert('Report uploaded successfully! It will now appear in both Patient and Doctor dashboards.');
      setSelectedPatient('');
      setSessionNumber('');
      setReportType('Progress Report');
      setFile(null);
      setIsUploading(false);
    }, 2000);
  };

  return (
    <div className="fade-in">
      <div className="grid grid-2">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Upload Patient Report</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Select Patient</label>
              <select 
                className="form-select"
                value={selectedPatient}
                onChange={(e) => setSelectedPatient(e.target.value)}
                required
              >
                <option value="">Choose a patient</option>
                {patients.map(patient => (
                  <option key={patient.profile.id} value={patient.profile.id}>
                    {patient.profile.name} ({patient.profile.id})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Session Number</label>
              <input
                type="number"
                className="form-input"
                value={sessionNumber}
                onChange={(e) => setSessionNumber(e.target.value)}
                min="1"
                max="50"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Report Type</label>
              <select 
                className="form-select"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <option value="Progress Report">Progress Report</option>
                <option value="Assessment Report">Assessment Report</option>
                <option value="Treatment Summary">Treatment Summary</option>
                <option value="Lab Results">Lab Results</option>
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Upload File</label>
              <input
                type="file"
                className="form-input"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.jpg,.png"
                required
              />
              {file && (
                <p className="mt-1" style={{ fontSize: '0.875rem', color: '#666' }}>
                  Selected: {file.name}
                </p>
              )}
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Upload Report'}
            </button>
          </form>
        </div>
        
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Upload Instructions</h3>
          </div>
          <div>
            <h4>Supported File Types</h4>
            <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
              <li>PDF documents (.pdf)</li>
              <li>Word documents (.doc, .docx)</li>
              <li>Images (.jpg, .png)</li>
            </ul>
            
            <h4>Report Types</h4>
            <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
              <li><strong>Progress Report:</strong> Regular session progress updates</li>
              <li><strong>Assessment Report:</strong> Initial or periodic assessments</li>
              <li><strong>Treatment Summary:</strong> Comprehensive treatment overview</li>
              <li><strong>Lab Results:</strong> Laboratory test results and analysis</li>
            </ul>
            
            <h4>Important Notes</h4>
            <ul style={{ marginLeft: '1.5rem' }}>
              <li>Reports will be immediately available to both patients and doctors</li>
              <li>Maximum file size: 10MB</li>
              <li>Ensure patient privacy and data security</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadReports;
