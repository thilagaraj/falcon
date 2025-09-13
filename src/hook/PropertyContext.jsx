import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

const PropertyContext = createContext();

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
};

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [currentProperty, setCurrentProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load properties and current property from localStorage on mount
  useEffect(() => {
    const loadFromStorage = () => {
      try {
        // Load properties from localStorage
        const storedProperties = localStorage.getItem('FALCON_PROPERTIES');
        if (storedProperties) {
          const parsedProperties = JSON.parse(storedProperties);
          setProperties(parsedProperties);
          
          // Load current property from localStorage
          const hotelId = localStorage.getItem('FALCON_HOTEL_ID');
          if (hotelId && parsedProperties.length > 0) {
            const current = parsedProperties.find(prop => prop.HotelId === hotelId);
            setCurrentProperty(current || null);
          }
        }
      } catch (error) {
        console.error('Error loading properties from localStorage:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFromStorage();
  }, []);

  const setPropertiesList = useCallback((propertiesList) => {
    setProperties(propertiesList);
    // Store properties in localStorage for persistence
    localStorage.setItem('FALCON_PROPERTIES', JSON.stringify(propertiesList));
    // If only one property, set it as current
    if (propertiesList.length === 1) {
      setCurrentProperty(propertiesList[0]);
    }
  }, []);

  const switchProperty = useCallback((hotelId) => {
    const property = properties.find(prop => prop.HotelId === hotelId);
    if (property) {
      setCurrentProperty(property);
      localStorage.setItem('FALCON_HOTEL_ID', hotelId);
      // Refresh the page to reload data with new property
      window.location.reload();
    }
  }, [properties]);

  const value = useMemo(() => ({
    properties,
    currentProperty,
    setPropertiesList,
    switchProperty,
    isLoading,
  }), [properties, currentProperty, setPropertiesList, switchProperty, isLoading]);

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
};

PropertyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
