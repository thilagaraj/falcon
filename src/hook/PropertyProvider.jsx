import { useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import PropertyContext from './PropertyContext';

const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [currentProperty, setCurrentProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFromStorage = () => {
      try {
        const storedProperties = localStorage.getItem('FALCON_PROPERTIES');
        if (storedProperties) {
          const parsedProperties = JSON.parse(storedProperties);
          setProperties(parsedProperties);

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
    localStorage.setItem('FALCON_PROPERTIES', JSON.stringify(propertiesList));
    if (propertiesList.length === 1) {
      setCurrentProperty(propertiesList[0]);
    }
  }, []);

  const switchProperty = useCallback((hotelId) => {
    const property = properties.find(prop => prop.HotelId === hotelId);
    if (property) {
      setCurrentProperty(property);
      localStorage.setItem('FALCON_HOTEL_ID', hotelId);
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

export default PropertyProvider;


