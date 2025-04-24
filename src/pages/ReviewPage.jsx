import { Icon } from '@iconify/react';
import './ReportListPage.css';
import { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import { useSpinner } from '../hook/SpinnerContext';
import $axios from '../utils/axios';

const ReviewPage = () => {
 

  useEffect(() => {
  }, []);

  const getGuestDashboard = async () => {
    try {
      
    } catch (error) {
      console.error("Error fetching checkout details:", error);
    } finally {
    }
  };

  return (
     <></>
  );
};
export default ReviewPage;
