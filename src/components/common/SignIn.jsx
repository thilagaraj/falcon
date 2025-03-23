import { useState } from "react";
import $axios from "../../utils/axios";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useSpinner } from "../../hook/SpinnerContext";

const SignInLayer = () => {
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useSpinner();

  const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
    propertyId: yup.number().required(),
  });

  const onSubmit = async (values) => {
    try {
      if (values.username && values.password && values.propertyId) {
        showLoading();
        const payload = {
          UserName: values.username,
          Password: values.password,
          PropertyId: values.propertyId,
        };
        const response = await $axios.post(
          "/FalconLogin/authenticate",
          payload
        );
        if (response.TokenId) {
          localStorage.setItem("FALCON_TOKEN", response.TokenId);
          localStorage.setItem("FALCON_BRANCH_CODE", response.BranchCode);
          localStorage.setItem("FALCON_PROPERTY_ID", response.PropertyId);
          navigate("/property-selection");
        }
        return true;
      }
      throw response;
    } catch (error) {
      console.error(error);
    } finally {
      hideLoading();
    }
  };

  return (
    <section className="auth bg-base d-flex flex-wrap">
      <div className="auth-left d-lg-block d-none">
        <div className="d-flex align-items-center flex-column h-100 justify-content-center">
          <img
            id="auth-img"
            src="assets/images/auth/auth-img.png"
            alt="Falcon Login"
          />
        </div>
      </div>
      <div className="auth-right py-32 px-24 d-flex flex-column justify-content-center">
        <div className="max-w-464-px mx-auto w-100">
          <div>
            <Link to="/index" className="mb-40 max-w-290-px">
              <img src="assets/images/logo.png" alt="Falcon" />
            </Link>
            <h4 className="mb-12">Sign In to your Account</h4>
            <p className="mb-32 text-secondary-light text-lg">
              Welcome back! please enter your detail
            </p>
          </div>
          <Formik
            validationSchema={schema}
            onSubmit={onSubmit}
            initialValues={{
              username: "",
              password: "",
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit} autoComplete="off">
                <Row className="mb-3">
                  <Col>
                    <Form.Group as={Col} controlId="username">
                      <div className="icon-field mb-1">
                        <span
                          className={
                            "icon translate-middle-y" +
                            (errors.username ? " top-35 " : " top-50 ")
                          }
                        >
                          <Icon icon="mage:user" />
                        </span>
                        <Form.Control
                          required
                          type="Username"
                          placeholder="username"
                          onChange={handleChange}
                          isValid={touched.username && !errors.username}
                          isInvalid={!!errors.username}
                          className="form-control h-56-px bg-neutral-50 radius-12"
                          autoComplete="off"
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your valid username.
                        </Form.Control.Feedback>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <Form.Group as={Col} controlId="password">
                      <div className="icon-field mb-1">
                        <span
                          className={
                            "icon translate-middle-y" +
                            (errors.password ? " top-35 " : " top-50 ")
                          }
                        >
                          <Icon icon="mage:lock" />
                        </span>
                        <Form.Control
                          required
                          type="password"
                          placeholder="Password"
                          onChange={handleChange}
                          isValid={touched.password && !errors.password}
                          isInvalid={!!errors.password}
                          className="form-control h-56-px bg-neutral-50 radius-12"
                          autoComplete="off"
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your password.
                        </Form.Control.Feedback>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <Form.Group as={Col} controlId="propertyId">
                      <div className="icon-field mb-1">
                        <span
                          className={
                            "icon translate-middle-y" +
                            (errors.propertyId ? " top-35 " : " top-50 ")
                          }
                        >
                          <Icon icon="mage:building-a" />
                        </span>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Property Id"
                          onChange={handleChange}
                          isValid={touched.propertyId && !errors.propertyId}
                          isInvalid={!!errors.propertyId}
                          className="form-control h-56-px bg-neutral-50 radius-12"
                          autoComplete="off"
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your property Id.
                        </Form.Control.Feedback>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col>
                    <Button
                      type="submit"
                      className="btn btn-primary text-sm btn-sm px-12 py-12 w-100 radius-12 mt-20"
                    >
                      Sign In
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default SignInLayer;
