import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { Button, Col, Form, Row, Modal } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";

const Filters = ({setDates}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const schema = yup.object().shape({
    fromDate: yup
      .date()
      .required("From date is required")
      .typeError("From date is required"),
    toDate: yup
      .date()
      .required("To date is required")
      .min(yup.ref("fromDate"), "To date cannot be before from date")
      .typeError("To date is required"),
  });

  const onSubmit = (values) => {
    setDates(values.fromDate, values.toDate);
    handleClose();
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24">
        <h6 className="text-lg fw-semibold mb-0">Filter</h6>
      </div>

      <div className="card-body p-24">
        <div className="d-flex flex-wrap align-items-center gap-3">
          <div>
            <Button className="btn btn-warning-900 radius-8 px-16 py-9 d-flex align-items-center gap-2">
              Today
              <Icon icon="iconoir:filter" className="text-xl" />
            </Button>
          </div>
          <div>
            <Button className="btn btn-outline-warning-900 radius-8 px-16 py-9 d-flex align-items-center gap-2">
              This week
              <Icon icon="iconoir:filter" className="text-xl" />
            </Button>
          </div>
          <div>
            <Button className="btn btn-outline-warning-900 radius-8 px-16 py-9 d-flex align-items-center gap-2">
              This Month
              <Icon icon="iconoir:filter" className="text-xl" />
            </Button>
          </div>
          <div>
            <Button className="btn btn-outline-warning-900 radius-8 px-16 py-9 d-flex align-items-center gap-2 ">
              Last Month
              <Icon icon="iconoir:filter" className="text-xl" />
            </Button>
          </div>
          <div>
            <Button
              className="btn btn-outline-warning-900 radius-8 px-16 py-9 d-flex align-items-center gap-2"
              onClick={handleShow}
            >
              Custom dates
              <Icon icon="iconoir:filter" className="text-xl" />
            </Button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Body className="p-24">
          <Formik
            validationSchema={schema}
            onSubmit={onSubmit}
            initialValues={{
              fromDate: "",
              toDate: "",
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit} autoComplete="off">
                <Row className="mb-3">
                  <Col>
                    <Form.Group controlId="fromDate">
                      <Form.Label>From Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="fromDate"
                        value={values.fromDate}
                        onChange={handleChange}
                        isInvalid={!!errors.fromDate && touched.fromDate}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.fromDate}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <Form.Group controlId="toDate">
                      <Form.Label>To Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="toDate"
                        value={values.toDate}
                        onChange={handleChange}
                        isInvalid={!!errors.toDate && touched.toDate}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.toDate}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mt-5">
                  <Col className="d-flex justify-content-end gap-3">
                    <Button variant="outline-secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button
                      type="submit"
                      className="btn btn-warning-900 radius-8 px-16 py-9 d-flex align-items-center gap-2"
                    >
                      Apply Filter
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Filters;
