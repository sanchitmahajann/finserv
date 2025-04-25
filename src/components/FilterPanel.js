import React from 'react';

const SPECIALTIES = [
  'General Physician',
  'Dentist',
  'Dermatologist',
  'Paediatrician',
  'Gynaecologist',
  'ENT',
  'Diabetologist',
  'Cardiologist',
  'Physiotherapist',
  'Endocrinologist',
  'Orthopaedic',
  'Ophthalmologist',
  'Gastroenterologist',
  'Pulmonologist',
  'Psychiatrist',
  'Urologist',
  'Dietitian-Nutritionist',
  'Psychologist',
  'Sexologist',
  'Nephrologist',
  'Neurologist',
  'Oncologist',
  'Ayurveda',
  'Homeopath'
];

function FilterPanel({
  onConsultationTypeChange,
  onSpecialtyChange,
  onSortChange,
  selectedConsultationType,
  selectedSpecialties,
  sortBy
}) {
  const handleResetConsultationType = () => {
    onConsultationTypeChange('');
  };

  const handleResetSpecialties = () => {
    onSpecialtyChange([]);
  };

  const handleResetSort = () => {
    onSortChange('');
  };

  return (
    <div className="filter-panel">
      <div className="filter-section">
        <div className="filter-header">
          <h3 data-testid="filter-header-moc">Consultation Mode</h3>
          {selectedConsultationType && (
            <button 
              className="reset-button"
              onClick={handleResetConsultationType}
              title="Reset consultation mode"
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="consultation"
              value="video_consult"
              checked={selectedConsultationType === 'video_consult'}
              onChange={(e) => onConsultationTypeChange(e.target.value)}
              data-testid="filter-video-consult"
            />
            Video Consult
          </label>
          <label>
            <input
              type="radio"
              name="consultation"
              value="in_clinic"
              checked={selectedConsultationType === 'in_clinic'}
              onChange={(e) => onConsultationTypeChange(e.target.value)}
              data-testid="filter-in-clinic"
            />
            In Clinic
          </label>
        </div>
      </div>

      <div className="filter-section">
        <div className="filter-header">
          <h3 data-testid="filter-header-speciality">Speciality</h3>
          {selectedSpecialties.length > 0 && (
            <button 
              className="reset-button"
              onClick={handleResetSpecialties}
              title="Reset specialties"
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
        <div className="specialties-container">
          <div className="checkbox-group">
            {SPECIALTIES.map((specialty) => (
              <label key={specialty}>
                <input
                  type="checkbox"
                  checked={selectedSpecialties.includes(specialty)}
                  onChange={() => onSpecialtyChange(specialty)}
                  data-testid={`filter-specialty-${specialty}`}
                />
                {specialty}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="filter-section">
        <div className="filter-header">
          <h3 data-testid="filter-header-sort">Sort</h3>
          {sortBy && (
            <button 
              className="reset-button"
              onClick={handleResetSort}
              title="Reset sort"
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="sort"
              value="fees"
              checked={sortBy === 'fees'}
              onChange={(e) => onSortChange(e.target.value)}
              data-testid="sort-fees"
            />
            Fees (Low to High)
          </label>
          <label>
            <input
              type="radio"
              name="sort"
              value="experience"
              checked={sortBy === 'experience'}
              onChange={(e) => onSortChange(e.target.value)}
              data-testid="sort-experience"
            />
            Experience (High to Low)
          </label>
        </div>
      </div>
    </div>
  );
}

export default FilterPanel; 