import "./ReportListPage.css";
import "./ReviewPage.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSpinner } from "../hook/SpinnerContext";
import $axios from "../utils/axios";

const ReviewPage = () => {
  const [reviews, setReviews] = useState({});
  const [reviewCategories, setReviewCategories] = useState([
    {
      "Id": 1,
      "Code": "HO1",
      "Description": "HOTEL FACILITY",
      "BranchCode": "HMS_1001",
      "GroupCode": "Front Office"
    },
    {
      "Id": 2,
      "Code": "HO2",
      "Description": "ROOM COMFORT",
      "BranchCode": "HMS_1001",
      "GroupCode": "Front Office"
    },
    {
      "Id": 3,
      "Code": "HO3",
      "Description": "STAFF SERVICE",
      "BranchCode": "HMS_1001",
      "GroupCode": "Front Office"
    },
    {
      "Id": 4,
      "Code": "HO4",
      "Description": "FOOD QUALITY",
      "BranchCode": "HMS_1001",
      "GroupCode": "Front Office"
    }
  ]);

  // Initialize formData with dynamic fields based on review categories
  const [formData, setFormData] = useState({
    guestName: "",
    roomNumber: "",
    dateOfStay: "",
    recommend: "",
    suggestions: "",
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

    // Initialize ratings and comments for each category
    const initialFormData = {...formData};
    reviewCategories.forEach(category => {
      initialFormData[`rating_${category.Code}`] = "";
      initialFormData[`comments_${category.Code}`] = "";
    });
    setFormData(initialFormData);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      showLoading();

      // Prepare the data for submission
      const reviewData = {
        guestName: formData.guestName,
        roomNumber: formData.roomNumber,
        dateOfStay: formData.dateOfStay,
        recommend: formData.recommend,
        suggestions: formData.suggestions,
        categoryRatings: []
      };

      // Add all category ratings and comments
      reviewCategories.forEach(category => {
        reviewData.categoryRatings.push({
          categoryId: category.Id,
          categoryCode: category.Code,
          rating: formData[`rating_${category.Code}`],
          comments: formData[`comments_${category.Code}`] || ''
        });
      });

      // Log the data that would be submitted
      console.log('Submitting review data:', reviewData);

      // Here you would make the actual API call to submit the data
      // const response = await $axios.post('/api/submitReview', reviewData);

      alert("Thank you for your feedback!");

      // Reset form - keep guest name and room number as they're read-only
      const resetFormData = {
        guestName: formData.guestName,
        roomNumber: formData.roomNumber,
        dateOfStay: "",
        recommend: "",
        suggestions: "",
      };

      // Reset all category ratings and comments
      reviewCategories.forEach(category => {
        resetFormData[`rating_${category.Code}`] = "";
        resetFormData[`comments_${category.Code}`] = "";
      });

      setFormData(resetFormData);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("There was an error submitting your feedback. Please try again.");
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
      setReviews(response);
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

        <div className="form-section">
          <div className="row">
            <div className="col-md-12">
              <label>Guest Name:</label>
              <input
                type="text"
                className="input-field"
                value={reviews.GuetName}
                readOnly
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <label>Room Number:</label>
              <input
                type="text"
                className="input-field"
                value={reviews.RoomNo}
                readOnly
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

        {/* Dynamic Review Categories */}
        {reviewCategories.map((category, index) => (
          <div key={category.Code} className="form-section">
            <h2>
              {index + 1}. {category.Description}
            </h2>
            <div className="radio-group">
              <div className="radio-option">
                <input
                  type="radio"
                  id={`excellent_${category.Code}`}
                  name={`rating_${category.Code}`}
                  value="Excellent"
                  checked={formData[`rating_${category.Code}`] === "Excellent"}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor={`excellent_${category.Code}`}>Excellent</label>
              </div>
              <div className="radio-option">
                <input
                  type="radio"
                  id={`good_${category.Code}`}
                  name={`rating_${category.Code}`}
                  value="Good"
                  checked={formData[`rating_${category.Code}`] === "Good"}
                  onChange={handleInputChange}
                />
                <label htmlFor={`good_${category.Code}`}>Good</label>
              </div>
              <div className="radio-option">
                <input
                  type="radio"
                  id={`average_${category.Code}`}
                  name={`rating_${category.Code}`}
                  value="Average"
                  checked={formData[`rating_${category.Code}`] === "Average"}
                  onChange={handleInputChange}
                />
                <label htmlFor={`average_${category.Code}`}>Average</label>
              </div>
              <div className="radio-option">
                <input
                  type="radio"
                  id={`poor_${category.Code}`}
                  name={`rating_${category.Code}`}
                  value="Poor"
                  checked={formData[`rating_${category.Code}`] === "Poor"}
                  onChange={handleInputChange}
                />
                <label htmlFor={`poor_${category.Code}`}>Poor</label>
              </div>
            </div>
            <label htmlFor={`comments_${category.Code}`}>Comments:</label>
            <textarea
              id={`comments_${category.Code}`}
              name={`comments_${category.Code}`}
              className="comments-area"
              value={formData[`comments_${category.Code}`] || ''}
              onChange={handleInputChange}
              placeholder={`Please share your comments about ${category.Description.toLowerCase()}...`}
            ></textarea>
          </div>
        ))}

        {/* Overall Experience Section */}
        <div className="form-section">
          <h2>Overall Experience</h2>
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
              placeholder="Please share your suggestions to help us improve..."
            ></textarea>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Submit Feedback
        </button>
      </form>
    </div>
  );
};
export default ReviewPage;
