import { Col, Form, Row, Dropdown, Button } from "react-bootstrap";
import { Formik } from "formik";
import { getCurrentDate } from "../../utils/date";
import { downloadExcel, downloadPDF } from "../../utils/download";

const Filter = ({tableData = [], columns}) => {
  
  const handleDownloadPDF = () => {
    downloadPDF(columns, tableData);
  };

  const handleDownloadExcel = () => {
    downloadExcel(columns, tableData);
  };
  return (
    <Formik
      initialValues={{
        reportDate: getCurrentDate('YYYY-MM-DD'),
      }}
    >
      {({ handleSubmit, values}) => (
        <Form noValidate onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-3 d-flex align-items-center gap-2">
              <Form.Group controlId="reportDate">
                <Form.Label>Report date</Form.Label>
                <Form.Control
                  type="date"
                  name="reportDate"
                  value={values.reportDate}
                  readOnly
                />
              </Form.Group>
              <Dropdown align="end">
                <Dropdown.Toggle
                  as={Button}
                  variant="warning-900"
                  className="radius-8 px-16 py-9 d-flex align-items-center gap-2 mt-36"
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
        </Form>
      )}
    </Formik>
  );
};

export default Filter;
