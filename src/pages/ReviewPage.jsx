import { Icon } from '@iconify/react';
import './ReportListPage.css';
import { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import { useSpinner } from '../hook/SpinnerContext';
import $axios from '../utils/axios';

const ReviewPage = () => {
  const [review, setReview] = useState({});
  const [searchParams] = useSearchParams();
  const branchCode = searchParams.get("BranchCode");
  const hotelId = searchParams.get("HotelId");
  const propertyId = searchParams.get("PropertyId");
  const checkinNo = searchParams.get("CheckinNo");
  const mobileNo = searchParams.get("MobileNo");
  const { showLoading, hideLoading } = useSpinner();

  useEffect(() => {
    getReview();
  }, []);

  const getReview = async () => {
    try {
      showLoading();
      const response = await $axios.get(
        `/FalconQRScan/GetReview?BranchCode=${branchCode}&PropertyId=${propertyId}&HotelId=${hotelId}&CheckinNo=${checkinNo}&MobileNo=${mobileNo}`
      );
      console.log(response);
      setDashboard(response);
      
    } catch (error) {
      console.error("Error fetching checkout details:", error);
    } finally {
      hideLoading();
    }
  };

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
