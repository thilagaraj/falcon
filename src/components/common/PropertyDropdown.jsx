import { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useProperty } from '../../hook/PropertyContext';

const PropertyDropdown = () => {
  const { properties, currentProperty, switchProperty, isLoading } = useProperty();
  const [isOpen, setIsOpen] = useState(false);

  // Show loading state while properties are being loaded
  if (isLoading) {
    return (
      <div className="d-flex align-items-center gap-2 px-3 py-2 border rounded-3 bg-white text-dark" style={{ minWidth: '280px' }}>
        <div className="w-32-px h-32-px radius-8 d-flex justify-content-center align-items-center">
          <span className="w-24-px h-24-px bg-secondary flex-shrink-0 text-white d-flex justify-content-center align-items-center radius-50">
            <Icon icon="mage:loading" className="text-white text-sm" />
          </span>
        </div>
        <div className="flex-grow-1 text-start">
          <div className="fw-semibold text-sm">Loading...</div>
        </div>
      </div>
    );
  }

  // Show single property without dropdown if there's only one property
  if (properties.length === 1) {
    const singleProperty = properties[0];
    return (
      <div className="d-flex align-items-center gap-2 px-3 py-2 border rounded-3 bg-white text-dark" style={{ minWidth: '280px' }}>
        <div className="w-32-px h-32-px radius-8 d-flex justify-content-center align-items-center">
          <span className="w-24-px h-24-px bg-primary flex-shrink-0 text-white d-flex justify-content-center align-items-center radius-50">
            <Icon
              icon="mage:building-a"
              className="text-white text-sm"
            />
          </span>
        </div>
        <div className="flex-grow-1 text-start">
          <div className="fw-semibold text-sm text-truncate">
            {singleProperty.HotelName}
          </div>
          <div className="text-xs text-secondary-light text-truncate">
            {singleProperty.HotelLocation}
          </div>
        </div>
      </div>
    );
  }

  // Don't show anything if there are no properties
  if (properties.length === 0) {
    return null;
  }

  const handlePropertySelect = (hotelId) => {
    switchProperty(hotelId);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <button
        className="d-flex align-items-center gap-2 px-3 py-2 border rounded-3 bg-white text-dark text-decoration-none"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{ minWidth: '280px' }}
      >
        <div className="w-32-px h-32-px radius-8 d-flex justify-content-center align-items-center">
          <span className="w-24-px h-24-px bg-primary flex-shrink-0 text-white d-flex justify-content-center align-items-center radius-50">
            <Icon
              icon="mage:building-a"
              className="text-white text-sm"
            />
          </span>
        </div>
        <div className="flex-grow-1 text-start">
          <div className="fw-semibold text-sm text-truncate">
            {currentProperty?.HotelName || 'Select Property'}
          </div>
          <div className="text-xs text-secondary-light text-truncate">
            {currentProperty?.HotelLocation || ''}
          </div>
        </div>
        <Icon
          icon={isOpen ? "mage:chevron-up" : "mage:chevron-down"}
          className="text-sm"
        />
      </button>
      
      {isOpen && (
        <div className="dropdown-menu show position-absolute" style={{ 
          top: '100%', 
          left: 0, 
          right: 0, 
          zIndex: 1000,
          maxHeight: '300px',
          overflowY: 'auto'
        }}>
          {properties.map((property) => (
            <button
              key={property.HotelId}
              className={`dropdown-item d-flex align-items-center gap-3 px-3 py-2 ${
                currentProperty?.HotelId === property.HotelId ? 'bg-primary-50' : ''
              }`}
              onClick={() => handlePropertySelect(property.HotelId)}
            >
              <div className="w-32-px h-32-px radius-8 d-flex justify-content-center align-items-center">
                <span className="w-24-px h-24-px bg-primary flex-shrink-0 text-white d-flex justify-content-center align-items-center radius-50">
                  <Icon
                    icon="mage:building-a"
                    className="text-white text-sm"
                  />
                </span>
              </div>
              <div className="flex-grow-1 text-start">
                <div className="fw-semibold text-sm">
                  {property.HotelName}
                </div>
                <div className="text-xs text-secondary-light">
                  {property.HotelLocation}
                </div>
              </div>
              {currentProperty?.HotelId === property.HotelId && (
                <Icon
                  icon="mage:check"
                  className="text-primary text-sm"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyDropdown;
