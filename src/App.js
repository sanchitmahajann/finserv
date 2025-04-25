import React, { useState, useEffect } from 'react';
import { fetchDoctors } from './services/doctorService';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import DoctorList from './components/DoctorList';
import './App.css';

function App() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [consultationType, setConsultationType] = useState('');
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    const loadDoctors = async () => {
      const data = await fetchDoctors();
      setDoctors(data);
      setFilteredDoctors(data);
    };
    loadDoctors();
  }, []);

  useEffect(() => {
    let result = [...doctors];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(doctor =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply consultation type filter
    if (consultationType) {
      result = result.filter(doctor => doctor[consultationType]);
    }

    // Apply specialties filter
    if (selectedSpecialties.length > 0) {
      result = result.filter(doctor =>
        doctor.specialities.some(specialty =>
          selectedSpecialties.includes(specialty.name)
        )
      );
    }

    // Apply sorting
    if (sortBy === 'fees') {
      result.sort((a, b) => {
        const feeA = parseInt(a.fees.replace(/[^0-9]/g, ''));
        const feeB = parseInt(b.fees.replace(/[^0-9]/g, ''));
        return feeA - feeB;
      });
    } else if (sortBy === 'experience') {
      result.sort((a, b) => {
        const expA = parseInt(a.experience.split(' ')[0]);
        const expB = parseInt(b.experience.split(' ')[0]);
        return expB - expA;
      });
    }

    setFilteredDoctors(result);
  }, [doctors, searchQuery, consultationType, selectedSpecialties, sortBy]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleConsultationTypeChange = (type) => {
    setConsultationType(type);
  };

  const handleSpecialtyChange = (specialty) => {
    if (Array.isArray(specialty)) {
      // Handle reset
      setSelectedSpecialties(specialty);
    } else {
      // Handle toggle
      setSelectedSpecialties(prev =>
        prev.includes(specialty)
          ? prev.filter(s => s !== specialty)
          : [...prev, specialty]
      );
    }
  };

  const handleSortChange = (sortType) => {
    setSortBy(sortType);
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar-content">
          <SearchBar doctors={doctors} onSearch={handleSearch} />
        </div>
      </nav>
      <main className="app-main">
        <div className="content-container">
          <FilterPanel
            onConsultationTypeChange={handleConsultationTypeChange}
            onSpecialtyChange={handleSpecialtyChange}
            onSortChange={handleSortChange}
            selectedConsultationType={consultationType}
            selectedSpecialties={selectedSpecialties}
            sortBy={sortBy}
          />
          <DoctorList doctors={filteredDoctors} />
        </div>
      </main>
    </div>
  );
}

export default App; 