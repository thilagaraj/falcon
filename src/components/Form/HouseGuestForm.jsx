import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import $axios from "../../utils/axios";
import { toast } from "react-toastify";

const HouseGuestForm = ({ roomNo, onSave = () => {}}) => {
  const [houseGuest, setHouseGuest] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});

  const getHouseGuestMaster = async () => {
    const searchParams = {
      BranchCode: localStorage.getItem("FALCON_BRANCH_CODE"),
      PropertyId: localStorage.getItem("FALCON_PROPERTY_ID"),
      HotelId: localStorage.getItem("FALCON_HOTEL_ID"),
      RoomNo: roomNo,
    };
    try {
      const response = await $axios.get("/FalconQRScan/GetHouseGuestMaster", {
        params: searchParams,
      });
      setHouseGuest({ Reason: "", ...response });
    } catch (error) {
      console.error("Failed to fetch house guest master:", error);
      toast.error("Could not load guest details.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getHouseGuestMaster();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});

    const isReasonValid = houseGuest?.Reason?.trim();
    const isTariffValid = !(houseGuest?.IsHouseGuest === 1 && (!houseGuest?.Tariff || houseGuest?.Tariff <= 0));

    if (!isReasonValid || !isTariffValid) {
      setErrors({
        Reason: !isReasonValid ? "Reason is required." : "",
        Tariff: !isTariffValid ? "Tariff must be greater than 0." : "",
      });
      return;
    }

    const payload = {
      ...houseGuest,
      Reason: houseGuest?.Reason,
      Tariff: houseGuest?.Tariff,
      IsHouseGuest: houseGuest?.IsHouseGuest === 1 ? 0 : 1,
    };

    try {
      const response = await $axios.post(
        "/FalconQRScan/SaveHouseGuestMaster",
        payload
      );
      if (response) {
        toast.success("House Guest saved successfully!");
        onSave();
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <div>Loading guest details...</div>;
  }

  return (
    <div>
      <h6>House Guest Form</h6>
      <Form noValidate onSubmit={handleSubmit}>
        <Row className="gx-1">
          <Col md={8}>
            <Form.Group className="mb-2">
              <Form.Label className="ri-sm">Guest Name</Form.Label>
              <Form.Control
                type="text"
                value={houseGuest?.GuestName}
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
                value={houseGuest?.RoomNo}
                disabled
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Label className="ri-sm mt-2">Change Guest:</Form.Label>
        <Row className="gx-3 ms-2">
          <Col
            xs={5}
            className=" ri-sm form-check d-flex align-items-center gap-1"
          >
            <input
              name="formHorizontalRadios"
              type="radio"
              id="formHorizontalRadios1"
              className="form-check-input mt-0"
              checked={houseGuest?.IsHouseGuest === 0}
              disabled={houseGuest?.IsHouseGuest === 1}
              onChange={() => setHouseGuest({ ...houseGuest, IsHouseGuest: 0 })}
            />
            <label>Click to House Guest</label>
          </Col>
          <Col
            xs={7}
            className=" ri-sm form-check  d-flex align-items-center gap-1"
          >
            <input
              name="formHorizontalRadios"
              type="radio"
              id="formHorizontalRadios2"
              className="form-check-input mt-0"
              checked={houseGuest?.IsHouseGuest === 1}
              onChange={() => setHouseGuest({ ...houseGuest, IsHouseGuest: 1 })}
              disabled={houseGuest?.IsHouseGuest === 0}
            />
            <label>
              Click to remove House Guest
            </label>
          </Col>
        </Row>

        <Row className="gx-1 mt-3">
          <Col>
            <Form.Group className="mb-2">
              <Form.Label className="ri-sm">Tariff</Form.Label>
              <Form.Control
                type="number"
                value={houseGuest.Tariff}
                className="ri-sm"
                disabled={houseGuest?.IsHouseGuest === 0}
                onChange={(e) =>
                  setHouseGuest({ ...houseGuest, Tariff: e.target.value })
                }
                isInvalid={!!errors?.Tariff}
              />
              {errors?.Tariff && <Form.Control.Feedback type="invalid">{errors?.Tariff}</Form.Control.Feedback>}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-2">
              <Form.Label className="ri-sm">Room Code</Form.Label>
              <Form.Control
                type="text"
                value={houseGuest.RoomCode}
                className="ri-sm"
                disabled
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-2">
          <Form.Label className="ri-sm">Reason</Form.Label>
          <Form.Control
            className="ri-sm"
            as="textarea"
            rows={2}
            value={houseGuest?.Reason || ""}
            required
            onChange={(e) =>
              setHouseGuest({ ...houseGuest, Reason: e.target.value })
            }
            isInvalid={!!errors?.Reason}
          />
          {errors?.Reason && <Form.Control.Feedback type="invalid">{errors?.Reason}</Form.Control.Feedback>}
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

HouseGuestForm.propTypes = {
  roomNo: PropTypes.string,
  onSave: PropTypes.func,
};

export default HouseGuestForm;
