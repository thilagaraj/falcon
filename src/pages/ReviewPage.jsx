// import { Icon } from '@iconify/react';
import './ReportListPage.css';
import './ReviewPage.css';
import { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import { useSpinner } from '../hook/SpinnerContext';
import $axios from '../utils/axios';

const ReviewPage = () => {
  // State to store API response data
  const [review, setReview] = useState({});
  const [formData, setFormData] = useState({
    guestName: '',
    roomNumber: '',
    dateOfStay: '',
    staffBehavior: '',
    staffComments: '',
    foodQuality: '',
    foodComments: '',
    overallExperience: '',
    recommend: '',
    suggestions: ''
  });
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      showLoading();
      // Submit form data to API
      console.log('Form submitted:', formData);
      // You can add the actual API call here

      // Show success message
      alert('Thank you for your feedback!');

      // Reset form
      setFormData({
        guestName: '',
        roomNumber: '',
        dateOfStay: '',
        staffBehavior: '',
        staffComments: '',
        foodQuality: '',
        foodComments: '',
        overallExperience: '',
        recommend: '',
        suggestions: ''
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('There was an error submitting your feedback. Please try again.');
    } finally {
      hideLoading();
    }
  };

  const getReview = async () => {
    try {
      showLoading();
      const response = await $axios.get(
        `/FalconQRScan/GetReview?BranchCode=${branchCode}&PropertyId=${propertyId}&HotelId=${hotelId}&CheckinNo=${checkinNo}&MobileNo=${mobileNo}`
      );
      console.log(response);
      setReview(response);

      // If there's existing data, populate the form
      if (response && response.data) {
        const data = response.data;
        setFormData({
          guestName: data.guestName || '',
          roomNumber: data.roomNumber || '',
          dateOfStay: data.dateOfStay || '',
          staffBehavior: data.staffBehavior || '',
          staffComments: data.staffComments || '',
          foodQuality: data.foodQuality || '',
          foodComments: data.foodComments || '',
          overallExperience: data.overallExperience || '',
          recommend: data.recommend || '',
          suggestions: data.suggestions || ''
        });
      }
    } catch (error) {
      console.error("Error fetching review details:", error);
    } finally {
      hideLoading();
    }
  };

  return (
    <div className="review-container">
      <form className="review-form" onSubmit={handleSubmit}>
        <h1>Hotel Guest Feedback Form</h1>

        {/* Guest Information Section */}
        <div className="form-section">
          <div className="row">
            <div className="col-md-12">
              <label htmlFor="guestName">Guest Name:</label>
              <input
                type="text"
                id="guestName"
                name="guestName"
                className="input-field"
                value={formData.guestName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <label htmlFor="roomNumber">Room Number:</label>
              <input
                type="text"
                id="roomNumber"
                name="roomNumber"
                className="input-field"
                value={formData.roomNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="dateOfStay">Date of Stay:</label>
              <input
                type="date"
                id="dateOfStay"
                name="dateOfStay"
                className="input-field"
                value={formData.dateOfStay}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Staff Behavior Section */}
        <div className="form-section">
          <h2>1. Staff Behaviour</h2>
          <div className="radio-group">
            <div className="radio-option">
              <input
                type="radio"
                id="staffExcellent"
                name="staffBehavior"
                value="Excellent"
                checked={formData.staffBehavior === "Excellent"}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="staffExcellent">Excellent</label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="staffGood"
                name="staffBehavior"
                value="Good"
                checked={formData.staffBehavior === "Good"}
                onChange={handleInputChange}
              />
              <label htmlFor="staffGood">Good</label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="staffAverage"
                name="staffBehavior"
                value="Average"
                checked={formData.staffBehavior === "Average"}
                onChange={handleInputChange}
              />
              <label htmlFor="staffAverage">Average</label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="staffPoor"
                name="staffBehavior"
                value="Poor"
                checked={formData.staffBehavior === "Poor"}
                onChange={handleInputChange}
              />
              <label htmlFor="staffPoor">Poor</label>
            </div>
          </div>
          <label htmlFor="staffComments">Comments:</label>
          <textarea
            id="staffComments"
            name="staffComments"
            className="comments-area"
            value={formData.staffComments}
            onChange={handleInputChange}
          ></textarea>
        </div>

        {/* Food Quality Section */}
        <div className="form-section">
          <h2>2. Food Quality</h2>
          <div className="radio-group">
            <div className="radio-option">
              <input
                type="radio"
                id="foodExcellent"
                name="foodQuality"
                value="Excellent"
                checked={formData.foodQuality === "Excellent"}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="foodExcellent">Excellent</label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="foodGood"
                name="foodQuality"
                value="Good"
                checked={formData.foodQuality === "Good"}
                onChange={handleInputChange}
              />
              <label htmlFor="foodGood">Good</label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="foodAverage"
                name="foodQuality"
                value="Average"
                checked={formData.foodQuality === "Average"}
                onChange={handleInputChange}
              />
              <label htmlFor="foodAverage">Average</label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="foodPoor"
                name="foodQuality"
                value="Poor"
                checked={formData.foodQuality === "Poor"}
                onChange={handleInputChange}
              />
              <label htmlFor="foodPoor">Poor</label>
            </div>
          </div>
          <label htmlFor="foodComments">Comments:</label>
          <textarea
            id="foodComments"
            name="foodComments"
            className="comments-area"
            value={formData.foodComments}
            onChange={handleInputChange}
          ></textarea>
        </div>

        {/* Overall Experience Section */}
        <div className="form-section">
          <h2>3. Overall Experience</h2>
          <div className="radio-group">
            <div className="radio-option">
              <input
                type="radio"
                id="overallExcellent"
                name="overallExperience"
                value="Excellent"
                checked={formData.overallExperience === "Excellent"}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="overallExcellent">Excellent</label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="overallGood"
                name="overallExperience"
                value="Good"
                checked={formData.overallExperience === "Good"}
                onChange={handleInputChange}
              />
              <label htmlFor="overallGood">Good</label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="overallAverage"
                name="overallExperience"
                value="Average"
                checked={formData.overallExperience === "Average"}
                onChange={handleInputChange}
              />
              <label htmlFor="overallAverage">Average</label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="overallPoor"
                name="overallExperience"
                value="Poor"
                checked={formData.overallExperience === "Poor"}
                onChange={handleInputChange}
              />
              <label htmlFor="overallPoor">Poor</label>
            </div>
          </div>

          <div className="mt-4">
            <p>Would you recommend us to others?</p>
            <div className="radio-group">
              <div className="radio-option">
                <input
                  type="radio"
                  id="recommendYes"
                  name="recommend"
                  value="Yes"
                  checked={formData.recommend === "Yes"}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="recommendYes">Yes</label>
              </div>
              <div className="radio-option">
                <input
                  type="radio"
                  id="recommendNo"
                  name="recommend"
                  value="No"
                  checked={formData.recommend === "No"}
                  onChange={handleInputChange}
                />
                <label htmlFor="recommendNo">No</label>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="suggestions">Suggestions for Improvement:</label>
            <textarea
              id="suggestions"
              name="suggestions"
              className="comments-area"
              value={formData.suggestions}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>

        <button type="submit" className="submit-btn text-center">Submit Feedback</button>
      </form>
    </div>
  );
};
export default ReviewPage;
