import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSpinner } from "../hook/SpinnerContext";
import $axios from "../utils/axios";

const ReviewPage = () => {
  const [reviews, setReviews] = useState({});
  const [reviewCategories, setReviewCategories] = useState([]);
  const initialFormData = {
    guestName: "",
    roomNumber: "",
    dateOfStay: "",
    recommend: "",
    suggestions: "",
  };

  const [formData, setFormData] = useState(initialFormData);
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

      const reviewData = {
        guestName: reviews.GuetName,
        roomNumber: reviews.RoomNo,
        dateOfStay: formData.dateOfStay,
        recommend: formData.recommend,
        suggestions: formData.suggestions,
        categoryRatings: [],
      };

      reviewCategories.forEach((category) => {
        reviewData.categoryRatings.push({
          categoryId: category.Id,
          categoryCode: category.Code,
          rating: formData[`rating_${category.Code}`],
          comments: formData[`comments_${category.Code}`] || "",
        });
      });

      console.log("Submitting review data:", reviewData);

      // const response = await $axios.post('/api/submitReview', reviewData);

      alert("Thank you for your feedback!");

      const resetFormData = {
        guestName: formData.guestName,
        roomNumber: formData.roomNumber,
        dateOfStay: "",
        recommend: "",
        suggestions: "",
      };

      reviewCategories.forEach((category) => {
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

      const categories = response?.Review;
      categories.forEach((category) => {
        initialFormData[`rating_${category.Code}`] = "";
        initialFormData[`comments_${category.Code}`] = "";
      });
      setReviewCategories(categories);
    } catch (error) {
      console.error("Error fetching review details:", error);
    } finally {
      hideLoading();
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <form className="shadow bg-white rounded-4 p-13 sm:p-28">
        <h4 className="text-center mb-3">Hotel Guest Feedback Form</h4>
        <div className="p-13 sm:p-20 rounded-4 mb-5 shadow bg-light">
          <div className="row">
            <div className="col-sm-12">
              <label>Guest Name:</label>
              <input
                type="text"
                className="form-control"
                value={reviews.GuetName}
                readOnly
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <label>Room Number:</label>
              <input
                type="text"
                className="form-control"
                value={reviews.RoomNo}
                readOnly
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="dateOfStay">Date of Stay:</label>
              <input
                type="date"
                id="dateOfStay"
                name="dateOfStay"
                className="form-control"
                value={formData.dateOfStay}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        {reviewCategories?.map((category, index) => (
          <div
            key={category.Code}
            className="p-13 sm:p-20 rounded-4 mb-5 shadow bg-light"
          >
            <h6>
              {index + 1}. {category.Description}
            </h6>
            <div className="mb-3 d-flex flex-column flex-sm-row gap-2 gap-sm-3">
              <div>
                <input
                  className="form-check-input"
                  type="radio"
                  id={`excellent_${category.Code}`}
                  name={`rating_${category.Code}`}
                  value="Excellent"
                  checked={formData[`rating_${category.Code}`] === "Excellent"}
                  onChange={handleInputChange}
                  required
                />
                <label className="ms-10" htmlFor={`excellent_${category.Code}`}>
                  Excellent
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="form-check-input"
                  id={`good_${category.Code}`}
                  name={`rating_${category.Code}`}
                  value="Good"
                  checked={formData[`rating_${category.Code}`] === "Good"}
                  onChange={handleInputChange}
                />
                <label className="ms-10" htmlFor={`good_${category.Code}`}>
                  Good
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="form-check-input"
                  id={`average_${category.Code}`}
                  name={`rating_${category.Code}`}
                  value="Average"
                  checked={formData[`rating_${category.Code}`] === "Average"}
                  onChange={handleInputChange}
                />
                <label className="ms-10" htmlFor={`average_${category.Code}`}>
                  Average
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="form-check-input"
                  id={`poor_${category.Code}`}
                  name={`rating_${category.Code}`}
                  value="Poor"
                  checked={formData[`rating_${category.Code}`] === "Poor"}
                  onChange={handleInputChange}
                />
                <label className="ms-10" htmlFor={`poor_${category.Code}`}>
                  Poor
                </label>
              </div>
            </div>
            {category.Code !== "OV" ? (
              <>
                <label htmlFor={`comments_${category.Code}`}>Comments:</label>
                <textarea
                  id={`comments_${category.Code}`}
                  name={`comments_${category.Code}`}
                  className="form-control border border-neutral-200 radius-8"
                  rows={3}
                  // cols={50}
                  value={formData[`comments_${category.Code}`]}
                  onChange={handleInputChange}
                  placeholder={`Please share your comments about ${category.Description.toLowerCase()}...`}
                ></textarea>
              </>
            ) : (
              <>
                <div className="mt-6">
                  <p>Would you recommend us to others?</p>
                  <div className="radio-group d-flex gap-3">
                    <div className="radio-option bg-white rounded-5 d-flex px-16 py-8 align-items-center border-1 border-secondary-subtle">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="recommendYes"
                        name="recommend"
                        value="Yes"
                        checked={formData.recommend === "Yes"}
                        onChange={handleInputChange}
                        required
                      />
                      <label className="ms-10" htmlFor="recommendYes">
                        Yes
                      </label>
                    </div>
                    <div className="radio-option bg-white rounded-5 d-flex px-16 py-8 align-items-center border-1 border-secondary-subtle">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="recommendNo"
                        name="recommend"
                        value="No"
                        checked={formData.recommend === "No"}
                        onChange={handleInputChange}
                      />
                      <label className="ms-10" htmlFor="recommendNo">
                        No
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-12 d-flex flex-column">
                  <label htmlFor="suggestions">
                    Suggestions for Improvement:
                  </label>
                  <textarea
                    id="suggestions"
                    name="suggestions"
                    value={formData.suggestions}
                    rows={3}
                    onChange={handleInputChange}
                    className="form-control border border-neutral-200 radius-8"
                    placeholder="Please share your suggestions to help us improve..."
                  ></textarea>
                </div>
              </>
            )}
          </div>
        ))}
        <div class="d-grid d-sm-flex justify-content-sm-center">
          <button
            class="p-3 rounded-5 bg-dark fw-semibold border-0 text-white text-center shadow"
            onClick={handleSubmit}
          >
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  );
};
export default ReviewPage;
