import React, { useState, useRef, useEffect } from 'react';

function SearchBar({ doctors, onSearch }) {
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);

  const suggestions = doctors
    .filter(doctor => {
      const searchTerm = input.toLowerCase();
      if (searchTerm.length === 0) return false;

      // Search by doctor name
      const nameMatch = doctor.name.toLowerCase().includes(searchTerm);
      
      // Search by specialization
      const specializationMatch = doctor.specialities.some(
        spec => spec.name.toLowerCase().includes(searchTerm)
      );
      
      // Search by location (clinic locality, city)
      const locationMatch = [
        doctor.clinic.address.locality,
        doctor.clinic.address.city
      ].some(loc => loc.toLowerCase().includes(searchTerm));
      
      // Search by qualifications
      const qualificationMatch = doctor.qualifications?.toLowerCase().includes(searchTerm);

      return nameMatch || specializationMatch || locationMatch || qualificationMatch;
    })
    .slice(0, 5);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    setShowSuggestions(true);
    onSearch(value);
  };

  const handleSuggestionClick = (doctorName) => {
    setInput(doctorName);
    onSearch(doctorName);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(input);
      setShowSuggestions(false);
    }
  };

  const getHighlightedText = (text, searchTerm) => {
    if (!searchTerm) return text;
    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === searchTerm.toLowerCase() ? 
        <span key={index} className="highlight">{part}</span> : part
    );
  };

  const getMatchInfo = (doctor) => {
    const searchTerm = input.toLowerCase();
    if (doctor.name.toLowerCase().includes(searchTerm)) {
      return null; // No additional info needed for name matches
    }
    if (doctor.specialities.some(spec => spec.name.toLowerCase().includes(searchTerm))) {
      return `Specialist in ${doctor.specialities[0].name}`;
    }
    if (doctor.clinic.address.locality.toLowerCase().includes(searchTerm) ||
        doctor.clinic.address.city.toLowerCase().includes(searchTerm)) {
      return `Located in ${doctor.clinic.address.locality}, ${doctor.clinic.address.city}`;
    }
    if (doctor.qualifications?.toLowerCase().includes(searchTerm)) {
      return `Qualification: ${doctor.qualifications}`;
    }
    return null;
  };

  return (
    <div className="search-bar" ref={wrapperRef}>
      <div className="search-input-container">
        <i className="fas fa-search search-icon"></i>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search Symptoms, Doctors, Specialists, Clinics"
          data-testid="autocomplete-input"
        />
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((doctor) => (
            <li
              key={doctor.id}
              onClick={() => handleSuggestionClick(doctor.name)}
              data-testid="suggestion-item"
              className="suggestion-item"
            >
              <div className="suggestion-photo">
                <img src={doctor.photo} alt={doctor.name} />
              </div>
              <div className="suggestion-info">
                <div className="suggestion-name">
                  {getHighlightedText(doctor.name, input)}
                </div>
                <div className="suggestion-specialty">
                  {getMatchInfo(doctor) || doctor.specialities[0].name}
                </div>
              </div>
              <i className="fas fa-chevron-right suggestion-arrow"></i>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar; 