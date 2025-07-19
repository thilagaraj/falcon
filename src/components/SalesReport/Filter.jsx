import { Button, Col, Form, Row, Dropdown } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { getCurrentDate } from "../../utils/date";
import { downloadExcel, downloadPDF } from "../../utils/download";

const Filter = ({ onFilter, tableData = [], columns }) => {
  
  const handleDownloadPDF = () => {
    downloadPDF(columns, tableData);
  };

  const handleDownloadExcel = () => {
    downloadExcel(columns, tableData);
  };

  const schema = yup.object().shape({
    reportDate: yup
      .date()
      .required("From date is required")
      .typeError("From date is required"),
  });

  const onSubmit = (values) => {
    onFilter(values.reportDate);
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={onSubmit}
      initialValues={{
        reportDate: getCurrentDate('YYYY-MM-DD'),
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit} autoComplete="off">
          <Row xs={1} md={4} lg={6} className="mb-3">
            <Col>
              <Form.Group controlId="reportDate">
                <Form.Label>Report date</Form.Label>
                <Form.Control
                  type="date"
                  name="reportDate"
                  value={values.reportDate}
                  onChange={handleChange}
                  isInvalid={!!errors.reportDate && touched.reportDate}
                  onClick={(e) => {
                    if (typeof e.target.showPicker === 'function') {
                      e.target.showPicker();
                    }
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.reportDate}
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
            <Col className="btn-ps-0">
              <Dropdown align="end">
                <Dropdown.Toggle
                  as={Button}
                  variant="warning-900"
                  className="radius-8 px-16 py-9 d-flex align-items-center mt-36"
                  id="download-dropdown"
                >
                  Download As
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleDownloadPDF}>PDF</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleDownloadExcel}>Excel</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default Filter;
