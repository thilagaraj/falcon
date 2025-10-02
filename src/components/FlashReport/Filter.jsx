import { Button, Col, Form, Row, Dropdown } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { getCurrentDate } from "../../utils/date";
import { downloadExcel, downloadPDF } from "../../utils/download";

const Filter = ({ onFilter, tableData = [], columns }) => {
  const schema = yup.object().shape({
    reportDate: yup
      .date()
      .required("From date is required")
      .typeError("From date is required"),
  });

  const onSubmit = (values) => {
    onFilter(values.reportDate);
  };
  
  const handleDownloadPDF = () => {
    downloadPDF(columns, tableData);
  };

  const handleDownloadExcel = () => {
    downloadExcel(columns, tableData);
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={onSubmit}
      initialValues={{
        reportDate: getCurrentDate("YYYY-MM-DD"),
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit} autoComplete="off">
          <Row xs={2} md={4} lg={6} className="align-items-end">
            <Col>
              <Form.Group controlId="reportDate">
                <Form.Label>Report date</Form.Label>
                <Form.Control
                  type="date"
                  name="reportDate"
                  value={values.reportDate}
                  onChange={handleChange}
                  style={{ paddingRight: 0, paddingLeft: '2px' }}
                  isInvalid={!!errors.reportDate && touched.reportDate}
                  onClick={(e) => {
                    if (typeof e.target.showPicker === "function") {
                      e.target.showPicker();
                    }
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.reportDate}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <div className="w-[100px]">
              <Button
                type="submit"
                className="btn btn-warning-900 radius-8 px-4 py-9"
              > 
                Apply Filter
              </Button>
              </div>
            </Col>
            <Col>
              <div className="mt-3 mt-md-0 ">
              <Dropdown align="end">
                <Dropdown.Toggle
                  as={Button}
                  variant="warning-900"
                  className="radius-8 px-4 py-9 d-flex align-items-center"
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
              </div>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default Filter;
