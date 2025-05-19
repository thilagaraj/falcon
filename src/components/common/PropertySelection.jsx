import { useState, useEffect } from "react";
import $axios from "../../utils/axios";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

import { useNavigate } from "react-router-dom";
import { useSpinner } from "../../hook/SpinnerContext";

const PropertySelection = () => {
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useSpinner();
  const [properties, setProperties] = useState([]);

  const loadProperties = async () => {
    try {
      const payload = {
        BranchCode: localStorage.getItem("FALCON_BRANCH_CODE"),
        PropertyId: localStorage.getItem("FALCON_PROPERTY_ID"),
      };
      showLoading();
      const response = await $axios.get("/FalconLogin/GetPropertyDetail", {
        params: payload,
      });
      if (response?.length) {
        setProperties(response);
        return true;
      }

      throw response;
    } catch (error) {
      console.error(error);
    } finally {
      hideLoading();
    }
  };

  const onPropertySelect = (hotelId) => {
    localStorage.setItem("FALCON_HOTEL_ID", hotelId);
    navigate("/dashboard");
  };

  useEffect(() => {
    loadProperties();
  }, []);

  return (
    <section className="auth bg-base d-flex align-items-center justify-content-center p-28">
      <div className="auth-right">
        <div className="max-w-500-px m-auto w-100">
          <div className="mb-40">
            <h4 className="mb-12"> Select your property</h4>
            <p className="mb-32 text-secondary-light text-lg">
              You can switch the property later
            </p>
          </div>
          {properties.map((property) => (
            <div className="card px-24 py-16 radius-8 border bg-gradient-start-5 cursor-pointer mb-20" key={property.HotelId} onClick={() => onPropertySelect(property.HotelId)}>
              <div className="card-body p-0">
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-1 ">
                  <div className="d-flex align-items-center w-100">
                    <div className="w-64-px h-64-px radius-16 d-flex justify-content-center align-items-center me-20">
                      <span className="mb-0 w-50-px h-50-px bg-red flex-shrink-0 text-white d-flex justify-content-center align-items-center radius-50 h6 mb-0">
                        <Icon
                          icon="mage:building-a"
                          className="text-white text-2xl mb-0"
                        />
                      </span>
                    </div>

                    <div>
                      <h6 className="fw-semibold my-1">
                        {" "}
                        {property.HotelName}
                      </h6>
                      <span className="mb-2 fw-medium text-secondary-light text-md">
                        {property.HotelLocation}
                      </span>
                    </div>
                    <div className="w-64-px h-64-px radius-16 d-flex justify-content-end align-items-center ml-auto">
                      <span className="mb-0 w-50-px h-50-px flex-shrink-0 d-flex justify-content-center align-items-center radius-50 h6 mb-0">
                        <Icon
                          icon="mage:chevron-right"
                          className="text-2xl mb-0"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertySelection;
