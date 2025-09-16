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
    // If there's only one property, it's automatically the current one.
    // Otherwise, check localStorage for a previously selected one.
    if (propertiesList.length > 0) {
      const hotelId = localStorage.getItem('FALCON_HOTEL_ID');
      const current = hotelId
        ? propertiesList.find(prop => prop.HotelId === hotelId)
        : propertiesList[0];
      setCurrentProperty(current || null);
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

  const clearProperties = useCallback(() => {
    setProperties([]);
    setCurrentProperty(null);
    localStorage.removeItem('FALCON_PROPERTIES');
    localStorage.removeItem('FALCON_HOTEL_ID');
  }, []);

  const value = useMemo(() => ({
    properties,
    currentProperty,
    setPropertiesList,
    switchProperty,
    isLoading,
    clearProperties,
  }), [properties, currentProperty, setPropertiesList, switchProperty, isLoading, clearProperties]);

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
