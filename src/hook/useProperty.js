import { useContext } from 'react';
import PropertyContext from './PropertyContext';

const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
};

export default useProperty;


