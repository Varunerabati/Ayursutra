import React, { useState } from 'react';
import { availableDates, getAvailableSlots, timeSlots } from '../../data/dummyData';

interface PatientScheduleProps {
  user: any;
}

const PatientSchedule: React.FC<PatientScheduleProps> = ({ user }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime('');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleConfirmBooking = () => {
    setShowConfirmation(true);
    // In a real app, this would update the backend
    setTimeout(() => {
      setShowConfirmation(false);
      setSelectedDate('');
      setSelectedTime('');
      alert('Appointment booked successfully!');
    }, 2000);
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

  const availableSlots = selectedDate ? getAvailableSlots(selectedDate) : [];
  const bookedSlots = selectedDate ? timeSlots.filter(slot => !availableSlots.includes(slot)) : [];

  return (
    <div className="fade-in">
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
            <p><strong>Treatment:</strong> Next session in therapy sequence</p>
            <button 
              onClick={handleConfirmBooking}
              className="btn btn-primary mt-2"
              disabled={showConfirmation}
            >
              {showConfirmation ? 'Booking...' : 'Confirm Booking'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientSchedule;
