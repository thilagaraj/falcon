import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import $axios from "../../utils/axios";
import { toast } from "react-toastify";
import { format } from "date-fns";

const ExtraPaxForm = ({ roomNo, onSave = () => {} }) => {
  const [extraPax, setExtraPax] = useState();
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const GetExtraPaxMaster = async () => {
    const searchParams = {
      BranchCode: localStorage.getItem("FALCON_BRANCH_CODE"),
      PropertyId: localStorage.getItem("FALCON_PROPERTY_ID"),
      HotelId: localStorage.getItem("FALCON_HOTEL_ID"),
      RoomNo: roomNo,
    };
    try {
      const response = await $axios.get("/FalconQRScan/GetExtraPaxMaster", {
        params: searchParams,
      });
      const formattedResponse = {
        ...response,
        ArrivalDate: response.ArrivalDate ? new Date(response?.ArrivalDate)?.toISOString()?.split("T")[0] : "",
        EntryDate: response.EntryDate ? new Date(response?.EntryDate)?.toISOString()?.split("T")[0] : "",
      };
      setExtraPax({ NewPax: 2, ...formattedResponse });
    } catch (error) {
      console.error("Failed to fetch Extra Pax master:", error);
      toast.error("Could not load guest details.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    GetExtraPaxMaster();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidated(true);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (form.checkValidity() === false) {
      return;
    }

    const payload = {
      ...extraPax,
      Reason: extraPax?.Reason,
      Tariff: extraPax?.Tariff,
      ArrivalDate: extraPax.ArrivalDate ? format(new Date(extraPax.ArrivalDate), "yyyy-MM-dd'T'HH:mm:ss") : null,
      EntryDate: extraPax.EntryDate ? format(new Date(extraPax.EntryDate), "yyyy-MM-dd'T'HH:mm:ssXXX") : null,
      NewPax: extraPax?.NewPax,
      oldPax: extraPax?.oldPax,
    };

    try {
      const response = await $axios.post(
        "/FalconQRScan/SaveExtraPaxMaster",
        payload
      );
      toast.success("Extra Pax saved successfully!");
      onSave();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <div>Loading Extra Pax details...</div>;
  }

  return (
    <div>
      <h6>Extra Pax Form</h6>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="gx-1">
          <Col md={8}>
            <Form.Group className="mb-2">
              <Form.Label className="ri-sm">Guest Name</Form.Label>
              <Form.Control
                type="text"
                value={extraPax?.GuestName}
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
                value={extraPax?.RoomNo}
                disabled
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="gx-1">
          <Col>
            <Form.Group className="mb-2">
              <Form.Label className="ri-sm">Old Pax</Form.Label>
              <Form.Control
                type="text"
                value={extraPax?.oldPax}
                className="ri-sm"
                disabled
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Label className="ri-sm mt-2">New Pax</Form.Label>

            <Form.Select
              value={extraPax.NewPax}
              onChange={(e) =>
                setExtraPax({
                  ...extraPax,
                  NewPax: parseInt(e.target.value, 10) || 0,
                })
              }
            >
              {Array.from({ length: 6 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>

        <Row className="gx-1">
          <Col>
            <Form.Group className="mb-2">
              <Form.Label className="ri-sm">Checkin Date</Form.Label>
              <Form.Control
                className="ri-sm"
                type="date"
                value={extraPax.ArrivalDate}
                onChange={(e) =>
                  setExtraPax({ ...extraPax, ArrivalDate: e.target.value })
                }
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label className="ri-sm">Entry Date</Form.Label>
              <Form.Control
                className="ri-sm"
                type="date"
                value={extraPax.EntryDate}
                isInvalid={
                  validated && new Date(extraPax.EntryDate) < new Date(extraPax.ArrivalDate)
                }
                onChange={(e) =>
                  setExtraPax({ ...extraPax, EntryDate: e.target.value })
                }
                min={extraPax.ArrivalDate}
              />
              <Form.Control.Feedback type="invalid">
                Entry date cannot be before the check-in date.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="gx-1 mt-3">
          <Col>
            <Form.Group className="mb-2">
              <Form.Label className="ri-sm">Tariff</Form.Label>
              <Form.Control
                type="number"
                value={extraPax.Tariff}
                className="ri-sm"
                min={0}
                isInvalid={
                  validated && extraPax?.Tariff < 0
                }
                onChange={(e) =>
                  setExtraPax({ ...extraPax, Tariff: e.target.value })
                }
              />
              <Form.Control.Feedback type="invalid">
                Tariff should be greater than or equal to zero
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-2">
              <Form.Label className="ri-sm">Room Code</Form.Label>
              <Form.Control
                type="text"
                value={extraPax.RoomCode}
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
            rows={1}
            value={extraPax?.Reason || ""}
            isInvalid={validated && !extraPax?.Reason?.trim()}
            required
            onChange={(e) =>
              setExtraPax({ ...extraPax, Reason: e.target.value })
            }
          />
          <Form.Control.Feedback type="invalid">
            Reason should not be empty.
          </Form.Control.Feedback>
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

ExtraPaxForm.propTypes = {
  roomNo: PropTypes.string,
  onSave: PropTypes.func.isRequired,
};

export default ExtraPaxForm;
