import { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import $axios from "../utils/axios";
import { useSearchParams } from "react-router-dom";
import { useSpinner } from "../hook/SpinnerContext";
import { toast } from "react-toastify";

const ExtraBedRequestLayer = ({ show, handleClose }) => {
  const { showLoading, hideLoading } = useSpinner();
  const [roomData, setRoomData] = useState({
    RoomNo: "",
    Mobileno: "",
    GuestName: "",
    BranchCode: "",
    Checkinno: "",
    HotelId: "",
    PropertyId: "",
  });
  const [numberOfBeds, setNumberOfBeds] = useState(1);
  const [searchParams] = useSearchParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      showLoading();
      const {
        RoomNo,
        GuestName,
        BranchCode,
        Checkinno,
        Mobileno,
        HotelId,
        PropertyId,
      } = roomData;
      const response = await $axios.post("/FalconQRScan/SaveExtraBedRequest", {
        RoomNo,
        GuestName,
        BranchCode,
        Checkinno,
        Mobileno,
        Noofbed: numberOfBeds,
        HotelId,
        PropertyId,
      });
      
      if (response) {
        toast.success("Extra bed request submitted successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        handleClose();
      }
    } catch (error) {
      console.error("Error submitting extra bed request:", error);
      toast.error("Failed to submit request. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      hideLoading();
    }
  };
  useEffect(() => {
    getExtraBed();
  }, []);

  const getExtraBed = async () => {
    try {
      showLoading();
      const response = await $axios.get(
        `/FalconQRScan/GetExtraBed?${searchParams.toString()}`
      );
      if (response) {
        setRoomData({
          RoomNo: response?.RoomNo || "",
          Mobileno: response?.Mobileno || "",
          GuestName: response?.GuestName || "",
          BranchCode: response?.BranchCode || "",
          Checkinno: response?.Checkinno || "",
          HotelId: response?.HotelId || "",
          PropertyId: response?.PropertyId || "",
        });
      }
    } catch (error) {
      toast.error("Failed to fetch extra bed details", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      hideLoading();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Extra Bed Request</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Room No</Form.Label>
            <Form.Control readOnly
              type="text"
              name="RoomNo"
              value={roomData.RoomNo}
            />
          </Form.Group>
           <Form.Group className="mb-3">
            <Form.Label>Guest Name</Form.Label>
            <Form.Control readOnly
              type="text"
              name="GuestName"
              value={roomData.GuestName}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mobile no</Form.Label>
            <Form.Control readOnly
              type="text"
              name="RoomNo"
              value={roomData.Mobileno}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Number of Extra Beds</Form.Label>
            <Form.Control
              type="number" autoFocus
              name="numberOfBeds"
              min="1"
              value={numberOfBeds}
              onChange={(e) => setNumberOfBeds(e.target.value)}
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Submit Request
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ExtraBedRequestLayer;
