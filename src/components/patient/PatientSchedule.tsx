import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { availableDates, getAvailableSlots, timeSlots } from '../../data/dummyData';

const PatientSchedule: React.FC = () => {
  const { user, upcomingSession, updateUpcomingSession } = useApp();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isRescheduling, setIsRescheduling] = useState(false);

  if (!user) return null;

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime('');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleConfirmBooking = () => {
    setShowConfirmation(true);
    
    const newSession = {
      date: selectedDate,
      time: selectedTime,
      practitioner: getAssignedPractitioner(),
      type: getNextTreatmentType()
    };
    
    setTimeout(() => {
      // Update the context with new session
      updateUpcomingSession(newSession);
      setShowConfirmation(false);
      setSelectedDate('');
      setSelectedTime('');
      setIsRescheduling(false);
      
      const action = isRescheduling ? 'rescheduled' : 'booked';
      alert(`Appointment ${action} successfully! You will receive a confirmation email shortly. Check the Overview tab to see your updated session.`);
    }, 2000);
  };
  
  const handleReschedule = () => {
    setIsRescheduling(true);
    setSelectedDate('');
    setSelectedTime('');
  };

  const getDaysInMonth = () => {
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const daysInMonth = nextMonth.getDate();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
    
    const days = [];
    
    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(today.getFullYear(), today.getMonth(), day);
      const dateString = date.toISOString().split('T')[0];
      days.push({
        day,
        date: dateString,
        isToday: dateString === today.toISOString().split('T')[0],
        isPast: date < today,
        isAvailable: availableDates.includes(dateString)
      });
    }
    
    return days;
  };

  function getNextTreatmentType() {
    const treatments = ['Abhyanga', 'Swedana', 'Shirodhara', 'Nasya', 'Basti'];
    return treatments[user.profile.completedSessions % treatments.length];
  }

  function getAssignedPractitioner() {
    return user.profile.upcomingSession.practitioner;
  }

  const availableSlots = selectedDate ? getAvailableSlots(selectedDate) : [];
  const bookedSlots = selectedDate ? timeSlots.filter(slot => !availableSlots.includes(slot)) : [];
  
  // Get current upcoming session (from context or profile)
  const currentSession = upcomingSession || user.profile.upcomingSession;

  return (
    <div className="fade-in">
      {/* Current Session Info */}
      {currentSession && !isRescheduling && (
        <div className="card mb-3">
          <div className="card-header">
            <h3 className="card-title">Current Upcoming Session</h3>
            <button 
              onClick={handleReschedule}
              className="btn btn-secondary btn-small"
            >
              Reschedule Session
            </button>
          </div>
          <div className="grid grid-2">
            <div>
              <p><strong>Date:</strong> {new Date(currentSession.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {currentSession.time}</p>
            </div>
            <div>
              <p><strong>Practitioner:</strong> {currentSession.practitioner}</p>
              <p><strong>Treatment:</strong> {currentSession.type}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Show scheduling interface when rescheduling or no current session */}
      {(isRescheduling || !currentSession) && (
        <>
          {isRescheduling && (
            <div className="card mb-3">
              <div className="card-header">
                <h3 className="card-title">Reschedule Your Session</h3>
                <button 
                  onClick={() => setIsRescheduling(false)}
                  className="btn btn-secondary btn-small"
                >
                  Cancel Reschedule
                </button>
              </div>
              <p>Select a new date and time for your session. Your current appointment will be replaced.</p>
            </div>
          )}
          
      <div className="grid grid-2">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Select Date</h3>
          </div>
          <div className="calendar">
            <div className="calendar-header">
              {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>
            <div className="calendar-grid">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="calendar-day" style={{ fontWeight: 600, backgroundColor: '#f9fafb' }}>
                  {day}
                </div>
              ))}
              {getDaysInMonth().map((dayObj, index) => {
                if (!dayObj) {
                  return <div key={index} className="calendar-day"></div>;
                }
                
                return (
                  <div
                    key={dayObj.date}
                    className={`calendar-day ${
                      dayObj.isPast ? 'disabled' : ''
                    } ${selectedDate === dayObj.date ? 'selected' : ''}`}
                    onClick={() => !dayObj.isPast && handleDateSelect(dayObj.date)}
                  >
                    {dayObj.day}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Available Slots</h3>
          </div>
          {selectedDate ? (
            <div className="slot-grid">
              <div className="slot-section">
                <h4>Available</h4>
                <div className="slot-list">
                  {availableSlots.map(slot => (
                    <div
                      key={slot}
                      className={`slot-item available ${selectedTime === slot ? 'selected' : ''}`}
                      onClick={() => handleTimeSelect(slot)}
                    >
                      {slot}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="slot-section">
                <h4>Booked</h4>
                <div className="slot-list">
                  {bookedSlots.map(slot => (
                    <div key={slot} className="slot-item booked">
                      {slot}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p>Please select a date to view available slots</p>
          )}
        </div>
      </div>
      
      {selectedDate && selectedTime && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Confirm Appointment</h3>
          </div>
          <div>
            <p><strong>Date:</strong> {new Date(selectedDate).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {selectedTime}</p>
            <p><strong>Treatment:</strong> {getNextTreatmentType()}</p>
            <p><strong>Duration:</strong> 60-90 minutes</p>
            <p><strong>Practitioner:</strong> {getAssignedPractitioner()}</p>
            <button 
              onClick={handleConfirmBooking}
              className="btn btn-primary mt-2"
              disabled={showConfirmation}
            >
              {showConfirmation 
                ? (isRescheduling ? 'Rescheduling...' : 'Booking...') 
                : (isRescheduling ? 'Confirm Reschedule' : 'Confirm Booking')
              }
            </button>
          </div>
        </div>
      )}
        </>
      )}
      
      {/* Show message when session exists and not rescheduling */}
      {currentSession && !isRescheduling && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Session Management</h3>
          </div>
          <div className="text-center">
            <p className="mb-3">You have an upcoming session scheduled. Use the "Reschedule Session" button above to change your appointment time.</p>
            <div className="grid grid-3">
              <div className="info-card">
                <h3>{new Date(currentSession.date).getDate()}</h3>
                <p>{new Date(currentSession.date).toLocaleDateString('en-US', { month: 'short' })}</p>
              </div>
              <div className="info-card">
                <h3>{currentSession.time}</h3>
                <p>Scheduled Time</p>
              </div>
              <div className="info-card">
                <h3>{currentSession.type}</h3>
                <p>Treatment Type</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientSchedule;