import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSpinner } from "../hook/SpinnerContext";
import $axios from "../utils/axios";
import { formatDateForDisplay } from "../utils/date";
import { ToastContainer, toast } from "react-toastify";

const ReviewPage = () => {
  const [reviews, setReviews] = useState({});
  const [reviewCategories, setReviewCategories] = useState([]);
  const initialFormData = {
    guestName: "",
    roomNumber: "",
    dateOfStay: "",
    suggestions: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [searchParams] = useSearchParams();
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
    if (!formData.suggestions || formData.suggestions.trim() === "") {
      toast.error("Please provide your suggestions for improvement before submitting.");
      return;
    }
    const missingRatings = reviewCategories.filter(
      (category) => !formData[`rating_${category.Code}`]
    );
    if (missingRatings.length > 0) {
      toast.error("Please select a rating for all categories before submitting.");
      return;
    }
    try {
      showLoading();
      const reviewData = {
        Feedbackratinglist: [],
      };

      reviewCategories.forEach((category) => {
        category?.Code !== "OV" &&
          reviewData.Feedbackratinglist.push({
            Id: category.Id,
            Code: category.Code,
            GroupCode: category.GroupCode,
            Description: category.Description,
            FeedBackResponse: formData[`rating_${category.Code}`],
            FeedBackComments: formData[`comments_${category.Code}`] || "",
          });
      });

      console.log("Submitting review data:", reviewData);
      const payload = {
        ...reviewData,
        ...Object.fromEntries(searchParams.entries()),
        Remarks: formData.suggestions,
        GuestName: formData.GuetName,
        Emaild: reviews.EmailId,
        GuestName: reviews.GuetName,
      };
      const response = await $axios.post(
        "/FalconQRScan/PostGetReview",
        payload
      );
      console.log(response);
      toast.success("Thank you for your feedback!");

      const resetFormData = {
        guestName: formData.guestName,
        roomNumber: formData.roomNumber,
        dateOfStay: "",
        suggestions: "",
      };

      reviewCategories.forEach((category) => {
        resetFormData[`rating_${category.Code}`] = "";
        resetFormData[`comments_${category.Code}`] = "";
      });

      setFormData(resetFormData);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("There was an error submitting your feedback. Please try again.");
    } finally {
      hideLoading();
    }
  };

  const getReview = async () => {
    try {
      showLoading();
      const response = await $axios.get(
        `/FalconQRScan/GetReview?${searchParams.toString()}`
      );
      console.log(response);
      setReviews(response);

      const categories = response?.Review.filter(
        (category) => category.Code !== "OV"
      );
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
            <ToastContainer />
      
      <form className="shadow bg-white rounded-4 p-13 sm:p-28">
        <h4 className="text-center mb-3">Hotel Guest Feedback Form</h4>
        <div className="p-13 sm:p-20 rounded-4 mb-5 shadow bg-light">
          <div className="row">
            <div className="col-sm-12">
              <label>Guest Name:</label>
              <div className="form-control">
                <span className="text-muted user-select-none">
                  {reviews.GuetName}
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <label>Room Number:</label>
              <div className="form-control">
                <span className="text-muted user-select-none">
                  {reviews.RoomNo}
                </span>
              </div>
            </div>
            <div className="col-sm-6">
              <label>Date of Stay:</label>
                <div className="form-control">
                <span className="text-muted user-select-none">
                  {reviews.StayDate ? formatDateForDisplay(reviews.StayDate): ""}
                </span>
              </div>
            </div>
          </div>
        </div>

        {reviewCategories?.map((category, index) => (
          <div
            key={category.Code}
            className="p-13 sm:p-20 rounded-4 mb-5 shadow bg-light"
          >
            <h6>
              {index + 1}. {category.Description}{" "}
              <span style={{ color: "red" }}>*</span>
            </h6>
            <div className="mb-3 d-flex flex-column flex-sm-row gap-2 gap-sm-3">
              <div>
                <input
                  className="form-check-input border-dark-3"
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
                  className="form-check-input border-dark-3"
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
                  className="form-check-input border-dark-3"
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
                  className="form-check-input border-dark-3"
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
            <>
              <label htmlFor={`comments_${category.Code}`}>Comments:</label>
              <textarea
                id={`comments_${category.Code}`}
                name={`comments_${category.Code}`}
                className="form-control radius-8"
                rows={3}
                value={formData[`comments_${category.Code}`]}
                onChange={handleInputChange}
                placeholder={`Please share your comments about ${category.Description.toLowerCase()}...`}
              ></textarea>
            </>
          </div>
        ))}

        <div className="mt-12 d-flex flex-column mb-3">
          <label htmlFor="suggestions">
            Suggestions for Improvement:{" "}
            <span style={{ color: "red" }}>*</span>
          </label>
          <textarea
            id="suggestions"
            name="suggestions"
            value={formData.suggestions}
            rows={3}
            onChange={handleInputChange}
            className="form-control radius-8"
            placeholder="Please share your suggestions to help us improve..."
            required
          ></textarea>
        </div>
        <div className="d-grid d-sm-flex justify-content-sm-center">
          <button
            className="btn bg-dark mx-auto d-flex justify-content-center w-50 text-white"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default ReviewPage;
