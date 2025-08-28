import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSpinner } from "../hook/SpinnerContext";
import $axios from "../utils/axios";
import { ToastContainer, toast } from "react-toastify";

const ExtraBedRequest = () => {
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useSpinner();
  const [roomData, setRoomData] = useState({
    RoomNo: '',
    Mobileno: '',
    GuestName: '',
    BranchCode: '',
    Checkinno: '',
    HotelId: '',
    PropertyId: ''
  });
  const [numberOfBeds, setNumberOfBeds] = useState(1);
  const [searchParams] = useSearchParams();

    useEffect(() => {
    getExtraBed();
  }, []);

  const getExtraBed = async () => {
    try {
      showLoading();
      const response = await $axios.get(
        `/FalconQRScan/GetExtraBed?${searchParams.toString()}`
      );
      console.log(response);
      setRoomData(response);
    } catch (error) {
      toast.error("Failed to fetch extra bed details");
    } finally {
      hideLoading();
    }
  };

  const handleBedCount = (action) => {
    if (action === "increment") {
      setNumberOfBeds((prev) => prev + 1);
    } else if (action === "decrement" && numberOfBeds > 1) {
      setNumberOfBeds((prev) => prev - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      showLoading();
     const {RoomNo, GuestName, BranchCode, Checkinno, Mobileno, HotelId, PropertyId} = roomData;
      await $axios.post("/FalconQRScan/SaveExtraBedRequest", {
        RoomNo,
        GuestName,
        BranchCode,
        Checkinno,
        Mobileno,
        Noofbed: numberOfBeds,
        HotelId,
        PropertyId,
      });
      toast.success("Extra bed request submitted successfully", {position: "top-center", });
      setTimeout(() => {
        navigate(-1);
      }, 1000);
    } catch (error) {
      console.error("Error submitting extra bed request:", error);
      toast.error("Failed to submit request");
    } finally {
      hideLoading();
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 mx-3">
      <ToastContainer />

      <form
        className="shadow bg-white rounded-4 py-5 px-3 ms-1 me-1 w-100"
        style={{ maxWidth: "650px", padding: "1rem !important" }}
        onSubmit={handleSubmit}
      >
        <div className="text-center">
          <h4 className="fw-bold">Extra Bed Request</h4>
        </div>

        <div className="mb-3 mt-3">
          <div className="row align-items-center">
            <label className="col-3 col-form-label text-sm">Room No</label>
            <div className="col-9 ps-0 pe-2">
              <input
                type="text"
                className="form-control"
                value={roomData.RoomNo}
                readOnly
              />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <div className="row align-items-center">
            <label className="col-3 col-form-label text-sm">Mobile no</label>
            <div className="col-9 ps-0 pe-2">
              <input
                type="text"
                className="form-control"
                value={roomData.Mobileno}
                readOnly
              />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <div className="row align-items-center">
            <label className="col-3 col-form-label text-sm">Guest Name</label>
            <div className="col-9 ps-0 pe-2">
              <input
                type="text"
                className="form-control"
                value={roomData.GuestName}
                readOnly
              />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <div className="row align-items-center">
            <label className="col-3 col-form-label text-sm">Extra Beds</label>
            <div className="col-9 ps-0 pe-2">
              <div className="d-flex align-items-center">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => handleBedCount("decrement")}
                >
                  -
                </button>
                <span className="mx-3">{numberOfBeds}</span>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => handleBedCount("increment")}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="d-grid d-sm-flex justify-content-sm-center">
          <button
            type="submit"
            className="btn bg-dark mx-auto d-flex justify-content-center w-50 text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default ExtraBedRequest;
