import React, { useState } from 'react';

function DoctorList({ doctors }) {
  const [copiedId, setCopiedId] = useState(null);

  const copyToClipboard = (address, doctorId) => {
    navigator.clipboard.writeText(address).then(() => {
      setCopiedId(doctorId);
      // Reset the "Copied!" message after 2 seconds
      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    });
  };

  return (
    <div className="doctor-list">
      {doctors.map((doctor) => (
        <div key={doctor.id} className="doctor-card" data-testid="doctor-card">
          <div className="doctor-info">
            <div className="doctor-photo-container">
              <img src={doctor.photo} alt={doctor.name} className="doctor-photo" />
            </div>
            <div className="doctor-details">
              <h3 data-testid="doctor-name">{doctor.name}</h3>
              <div className="doctor-credentials">
                <p className="doctor-role" data-testid="doctor-specialty">
                  {doctor.specialities[0].name}
                </p>
                <span className="separator">•</span>
                <p className="doctor-qualification">
                  {doctor.qualifications || 'MBBS'}
                </p>
              </div>
              <div className="doctor-stats">
                <span data-testid="doctor-experience">{doctor.experience}</span>
              </div>
              <div className="doctor-clinic">
                <div className="clinic-info">
                  <i className="fas fa-hospital"></i>
                  <span>{doctor.clinic.name}</span>
                </div>
                <div className="location-container">
                  <div 
                    className="location-info"
                    onClick={() => copyToClipboard(
                      `${doctor.clinic.address.address_line1}, ${doctor.clinic.address.locality}, ${doctor.clinic.address.city}`,
                      doctor.id
                    )}
                    data-copied={copiedId === doctor.id}
                    title="Click to copy full address"
                  >
                    <i className="fas fa-map-marker-alt"></i>
                    <span>{doctor.clinic.address.locality}</span>
                  </div>
                </div>
              </div>
              <div className="doctor-actions">
                <span className="fee" data-testid="doctor-fee">{doctor.fees}</span>
                <button className="book-appointment">Book Appointment</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DoctorList; 