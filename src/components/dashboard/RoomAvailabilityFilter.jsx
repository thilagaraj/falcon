import { Col, Form, Row, Button } from "react-bootstrap";
import { Formik } from "formik";
import { getCurrentDate } from "../../utils/date";
import * as yup from "yup";

 const RoomAvailabilityFilter = ({ onFilter, tableData = [], columns, toDate }) => {
  const schema = yup.object().shape({
    startDate: yup
      .date(),
    toDate: yup
      .date()
      .required("To date is required")
      .typeError("To date is required"),
  });

  const onSubmit = (values) => {
    onFilter(values.startDate, values.toDate);
  };

  // Get current date for initial values
  const currentDate = getCurrentDate("YYYY-MM-DD");
  // Format toDate if it's a moment object
  let initialToDate = toDate;
  if (toDate && typeof toDate === 'object' && typeof toDate.format === 'function') {
    initialToDate = toDate.format("YYYY-MM-DD");
  }

  return (
    <Formik
      validationSchema={schema}
      onSubmit={onSubmit}
      initialValues={{
        startDate: currentDate,
        toDate: initialToDate,
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit} autoComplete="off">
          <Row xs={1} md={4} lg={6} className="mb-3">
            <Col>
              <Form.Group controlId="startDate">
                <Form.Label>From Date</Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={values.startDate}
                  readOnly
                />
                <Form.Control.Feedback type="invalid">
                  {errors.startDate}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="toDate">
                <Form.Label>To Date</Form.Label>
                <Form.Control
                  type="date"
                  name="toDate"
                  value={values.toDate}
                  onChange={handleChange}
                  isInvalid={!!errors.toDate && touched.toDate}
                  onClick={(e) => {
                    if (typeof e.target.showPicker === "function") {
                      e.target.showPicker();
                    }
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.toDate}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col className="d-contents">
              <Button
                type="submit"
                className="btn btn-warning-900 radius-8 px-16 py-9 d-flex align-items-center gap-2 mt-36"
              >
                Apply Filter
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};
export default RoomAvailabilityFilter;