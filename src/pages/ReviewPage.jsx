import "./ReportListPage.css";
import "./ReviewPage.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSpinner } from "../hook/SpinnerContext";
import $axios from "../utils/axios";

const ReviewPage = () => {
  const [reviews, setReviews] = useState({});
  const [formData, setFormData] = useState({
    guestName: "",
    roomNumber: "",
    dateOfStay: "",
    staffBehavior: "",
    staffComments: "",
    foodQuality: "",
    foodComments: "",
    overallExperience: "",
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
      // Submit form data to API

      alert("Thank you for your feedback!");

      // Reset form
      setFormData({
        dateOfStay: "",
        staffBehavior: "",
        staffComments: "",
        foodQuality: "",
        foodComments: "",
        overallExperience: "",
        recommend: "",
        suggestions: "",
      });
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

        {reviews?.Review?.map((item, index) => (
          <div key={item.Code}>
            <div className="form-section">
              <h5>
                {index + 1}. {item.Description}
              </h5>
              <div className="radio-group">
                <div className="radio-option">
                  <input
                    type="radio"
                    id={item.Code}
                    name={item.Code}
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
                placeholder="Please share your comments about our staff..."
              ></textarea>
            </div>
          </div>
        ))}

        <button type="submit" className="submit-btn">
          Submit Feedback
        </button>
      </form>
    </div>
  );
};
export default ReviewPage;
