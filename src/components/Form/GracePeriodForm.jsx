import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import $axios from "../../utils/axios";
import { toast } from "react-toastify";
import { format } from "date-fns";

const GracePeriodForm = ({ roomNo, onSave = () => {} }) => {
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState({});

  const getGracePeriodMaster = async () => {
    const searchParams = {
      BranchCode: localStorage.getItem("FALCON_BRANCH_CODE"),
      PropertyId: localStorage.getItem("FALCON_PROPERTY_ID"),
      HotelId: localStorage.getItem("FALCON_HOTEL_ID"),
      RoomNo: roomNo,
      username: localStorage.getItem("FALCON_USERNAME"),
    };
    try {
      const response = await $axios.get("/FalconQRScan/GetGracePeriodMaster", {
        params: searchParams,
      });
      const formattedResponse = {
        ...response,
        ArrivalDate: response.ArrivalDate
          ? new Date(response?.ArrivalDate)?.toISOString()?.split("T")[0]
          : "",
        EntryDate: response.EntryDate
          ? new Date(response?.EntryDate)?.toISOString()?.split("T")[0]
          : "",
        Reason: response.Reason === "0" ? "" : response.Reason,
      };
      setForm({ ...formattedResponse });
    } catch (error) {
      toast.error("Could not load Grace Period details.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getGracePeriodMaster();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    if (!form?.Reason?.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        Reason: "Reason should not be empty.",
      }));
      return;
    }
    if (
      form?.GracePeriod < 1 ||
      !form?.GracePeriod ||
      form?.GracePeriod > form.UserAllowedTime
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        GracePeriod:
          "Grace Period should be less than Allowed Time and greater than 0.",
      }));
      return;
    }
    const payload = {
      ...form,
      Reason: form?.Reason,
      GracePeriod: Number(form?.GracePeriod),
      ArrivalDate: form.ArrivalDate
        ? format(new Date(form.ArrivalDate), "yyyy-MM-dd'T'HH:mm:ssXXX")
        : null,
    };

    try {
      const response = await $axios.post(
        "/FalconQRScan/SaveGracePeriodMaster",
        payload
      );
      if (!response) {
        toast.error("Failed to save Grace Period details.");
        return;
      }
      toast.success("Grace Period saved successfully!");
      onSave();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <div>Loading Grace Period details...</div>;
  }

  return (
    <div>
      <h6>Grace Period Form</h6>
      <Form noValidate onSubmit={handleSubmit}>
        <Row className="gx-1">
          <Col md={8}>
            <Form.Group className="mb-2">
              <Form.Label className="ri-sm">Guest Name</Form.Label>
              <Form.Control
                type="text"
                value={form?.GuestName}
                className="ri-sm"
                disabled
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-2">
              <Form.Label className="ri-sm">Room No</Form.Label>
              <Form.Control
                className="ri-sm"
                type="text"
                value={form?.RoomNo}
                disabled
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="gx-1 mb-2">
          <Col xs={5}>
            <Form.Group>
              <Form.Label className="ri-sm">Arrival Date</Form.Label>
              <Form.Control
                className="ri-sm"
                type="date"
                value={form.ArrivalDate}
                disabled
              />
            </Form.Group>
          </Col>
          <Col xs={4}>
            <Form.Group>
              <Form.Label className="ri-sm">Allowed Time</Form.Label>
              <Form.Control
                type="text"
                value={form?.UserAllowedTime}
                className="ri-sm"
                disabled
              />
            </Form.Group>
          </Col>

          <Col xs={3}>
            <Form.Group>
              <Form.Label className="ri-sm">Grace Time</Form.Label>
              <Form.Control
                type="number"
                value={form.GracePeriod}
                className="ri-sm"
                min={1}
                max={form?.UserAllowedTime}
                onChange={(e) =>
                  setForm({ ...form, GracePeriod: e.target.value })
                }
              />
            </Form.Group>
          </Col>
        </Row>
        {errors.GracePeriod && (
          <div className="invalid-feedback d-block">
            {errors.GracePeriod}
          </div>
        )}
        <Form.Group className="mb-2">
          <Form.Label className="ri-sm">Reason</Form.Label>
          <Form.Control
            className="ri-sm"
            as="textarea"
            rows={1}
            value={form?.Reason || ""}
            isInvalid={!!errors.Reason}
            required
            onChange={(e) => setForm({ ...form, Reason: e.target.value })}
          />
          {errors.Reason && (
            <Form.Control.Feedback type="invalid">
              {errors.Reason}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <div className="d-flex justify-content-end">
          <Button
            style={{ fontSize: "0.8rem" }}
            variant="primary"
            type="submit"
          >
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

GracePeriodForm.propTypes = {
  roomNo: PropTypes.string,
  onSave: PropTypes.func.isRequired,
};

export default GracePeriodForm;
