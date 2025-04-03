import { useEffect, useState } from "react";
import { useSpinner } from "../hook/SpinnerContext";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import $axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { processImage } from "../utils/imageUtils";

const validationSchema = yup.object().shape({
  guestName: yup
    .string()
    .required("Guest Name is required")
    .min(3, "Guest Name must be at least 3 characters"),
  mobileNo: yup
    .string()
    .required("Mobile No is required")
    .matches(/^\d{10}$/, "Mobile No must be exactly 10 digits"),
  idProofType: yup.string().required("ID Proof Type is required"),
  idNumber: yup.string().required("ID Number is required"),
});

const fileNameMaxLetter = 16;

const initFormValues = {
  guestTitle: "",
  guestName: "",
  gender: "",
  mobileNo: "",
  address: "",
  email: "",
  city: "",
  state: "",
  idProofType: "",
  idNumber: "",
  guestPhoto: null,
  frontIdProof: null,
  backIdProof: null,
  bookingNo: "",
  gstNumber: "",
  companyName: "",
  pinCode: "",
};

const GuestInformationForm = () => {
  const navigate = useNavigate();
  const [proofTypes, setProofTypes] = useState([]);
  const [branchCode, setBranchCode] = useState("HMS_1001");
  const [hotelId, setHotelId] = useState("THAI_1001");
  const [propertyId, setPropertyId] = useState("10001");
  const [hotelName, setHotelName] =  useState('')
  const [guestGender, setGuestGender] = useState([]);
  const [guestTitles, setGuestTitles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(initFormValues);
  const [fieldErrors, setFieldErrors] = useState({});
  const { showLoading, hideLoading } = useSpinner();

  const getCustomEntryData = async () => {
    showLoading();
    try {
      const response = await $axios.get(
        `/FalconQRScan/GetGuestEntry?BranchCode=${branchCode}&PropertyId=${propertyId}&HotelId=${hotelId}`
      );
      setProofTypes(response?.GuestIdProof);
      setBranchCode(response?.BranchCode);
      setHotelId(response?.HotelId);
      setHotelName(response?.HotelName)
      setPropertyId(response?.PropertyId);
      setGuestGender(response?.GuestGender);
      setGuestTitles(response?.GuestTittle);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load form data. Please refresh and try again.");
    } finally {
      hideLoading();
      setLoading(false);
    }
  };

  useEffect(() => {
    getCustomEntryData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleFileChange = async (e) => {
    const name = e.target.name;
    const files = e.target.files;
    if (!files || files.length === 0) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: "Please select a photo.",
      }));
      setFormData((prevData) => ({ ...prevData, [name]: null }));
      return;
    }

    let file = files[0];
    const supportedFiles = ['image/jpeg', 'image/png', 'image/webp', 'image/bmp']
    if(!supportedFiles.includes(file.type)) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: "Image must be in a valid format (png, jpg, webp, bmp)",
      }));
      setFormData((prevData) => ({ ...prevData, [name]: null }));
      return;
    }

    if (file) {
      showLoading();
      const base64data = await processImage(file);
      setFormData((prevData) => ({
        ...prevData,
        [name]: base64data,
        [`${name}FileName`]: file.name,
      }));
      hideLoading();
      setFieldErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async () => {
    showLoading();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      const updatedFormData = {
        BranchCode: branchCode,
        PropertyId: propertyId,
        HotelId: hotelId,
        GuestTitle: formData.guestTitle,
        GuestName: formData.guestName,
        Gender: formData.gender,
        MobileNo: formData.mobileNo,
        Address: formData.address,
        Email: formData.email,
        City: formData.city,
        State: formData.state,
        PinCode: formData.pinCode,
        IdProof: formData.idProofType,
        IdNumber: formData.idNumber,
        GuestPhoto: formData.guestPhoto,
        FrontPhoto: formData.frontIdProof,
        BackPhoto: formData.backIdProof,
        OnlineBookingNo: formData.bookingNo,
        GSTNO: formData.gstNumber,
        CompanyName: formData.companyName,
      };
      await $axios.post("/FalconQRScan/SaveGuestEntryData", updatedFormData);
      toast.success("Guest Information Submitted Successfully");
      resetFormFields();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newFieldErrors = {};
        error.inner.forEach((err) => {
          newFieldErrors[err.path] = err.message;
        });
        setFieldErrors(newFieldErrors);
        console.error("Validation errors:", newFieldErrors);
      } else {
        console.error("Submission error:", error);
        toast.error("Something went wrong, plese try again later");
      }
    } finally {
      hideLoading();
    }
  };

  const verifyGST = async (event) => {
    event.preventDefault();
    const url = `https://api.gst.gov.in/v1/verify?gstin=${formData.gstNumber}`;
    //it will be implemented later
  };

  const resetFormFields = () => {
    setFormData(initFormValues);
    setFieldErrors({})
    const attachments = ["guestPhoto", "frontIdProof", "backIdProof"];
    for (const attachment of attachments) {
      document.getElementById(attachment).value = null;
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const getInputClass = (fieldName) => {
    return fieldErrors[fieldName] ? "form-control is-invalid" : "form-control";
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <ToastContainer />
      <div className="card p-24 form-card w-100 rounded-3 max-w-500-px">
        <div className="text-center mb-4">
          <img
            src="assets/images/logo.jpg"
            alt="Logo"
            className="rounded-circle w-100-px"
          />
        </div>
        <h3 className="text-center mb-10 fs-2 text-black fw-bold">
          Welcome To {hotelName}
        </h3>
        <h3 className="text-center mt-4 mb-4 fs-4 text-black">
          Guest Information Form
        </h3>
        <form>
          <div className="mb-3">
            <label htmlFor="guestTitle" className="form-label">
              Title:
            </label>
            <select
              className={
                fieldErrors.guestTitle
                  ? "form-select is-invalid"
                  : "form-select"
              }
              id="guestTitle"
              name="guestTitle"
              value={formData.guestTitle}
              onChange={handleChange}
            >
              <option value="">Select</option>
              {guestTitles.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
            {fieldErrors.guestTitle && (
              <div className="text-danger mt-1">{fieldErrors.guestTitle}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="guestName" className="form-label">
              Guest Name: <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className={getInputClass("guestName")}
              id="guestName"
              name="guestName"
              value={formData.guestName}
              onChange={handleChange}
            />
            {fieldErrors.guestName && (
              <div className="text-danger mt-1">{fieldErrors.guestName}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="gender" className="form-label">
              Gender:
            </label>
            <select
              className={
                fieldErrors.gender ? "form-select is-invalid" : "form-select"
              }
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              {guestGender.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
            {fieldErrors.gender && (
              <div className="text-danger mt-1">{fieldErrors.gender}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="mobileNo" className="form-label">
              Mobile No: <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className={getInputClass("mobileNo")}
              id="mobileNo"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
            />
            {fieldErrors.mobileNo && (
              <div className="text-danger mt-1">{fieldErrors.mobileNo}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address:
            </label>
            <textarea
              className={getInputClass("address")}
              id="address"
              name="address"
              rows="3"
              value={formData.address}
              onChange={handleChange}
            ></textarea>
            {fieldErrors.address && (
              <div className="text-danger mt-1">{fieldErrors.address}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className={getInputClass("email")}
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {fieldErrors.email && (
              <div className="text-danger mt-1">{fieldErrors.email}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="city" className="form-label">
              City:
            </label>
            <input
              type="text"
              className={getInputClass("city")}
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
            {fieldErrors.city && (
              <div className="text-danger mt-1">{fieldErrors.city}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="state" className="form-label">
              State:
            </label>
            <input
              type="text"
              className={getInputClass("state")}
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
            {fieldErrors.state && (
              <div className="text-danger mt-1">{fieldErrors.state}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="pinCode" className="form-label">
              Pin Code:
            </label>
            <input
              type="text"
              className={getInputClass("pinCode")}
              id="pinCode"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
            />
            {fieldErrors.pinCode && (
              <div className="text-danger mt-1">{fieldErrors.pinCode}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="bookingNo" className="form-label">
              Booking No:
            </label>
            <input
              type="text"
              className={getInputClass("bookingNo")}
              id="bookingNo"
              name="bookingNo"
              value={formData.bookingNo}
              onChange={handleChange}
            />
            {fieldErrors.bookingNo && (
              <div className="text-danger mt-1">{fieldErrors.bookingNo}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="companyName" className="form-label">
              Company Name:
            </label>
            <input
              type="text"
              className={getInputClass("companyName")}
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
            />
            {fieldErrors.companyName && (
              <div className="text-danger mt-1">{fieldErrors.companyName}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="gstNumber" className="form-label">
              GST No:
            </label>
            <div className="d-flex align-items-center">
              <input
                type="text"
                className={getInputClass("gstNumber")}
                id="gstNumber"
                name="gstNumber"
                value={formData.gstNumber}
                onChange={handleChange}
              />
              <button
                className="btn btn-link"
                onClick={(e) => {
                  verifyGST(e);
                }}
              >
                Verify
              </button>
            </div>
            {fieldErrors.gstNumber && (
              <div className="text-danger mt-1">{fieldErrors.gstNumber}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="idProofType" className="form-label">
              ID Proof Type: <span className="text-danger">*</span>
            </label>
            <select
              className={
                fieldErrors.idProofType
                  ? "form-select is-invalid"
                  : "form-select"
              }
              id="idProofType"
              name="idProofType"
              value={formData.idProofType}
              onChange={handleChange}
            >
              <option value="">Select ID Proof Type</option>
              {proofTypes.map((proofType) => (
                <option key={proofType} value={proofType}>
                  {proofType}
                </option>
              ))}
            </select>
            {fieldErrors.idProofType && (
              <div className="text-danger mt-1">{fieldErrors.idProofType}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="idNumber" className="form-label">
              ID Number: <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className={getInputClass("idNumber")}
              id="idNumber"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
            />
            {fieldErrors.idNumber && (
              <div className="text-danger mt-1">{fieldErrors.idNumber}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="guestPhoto" className="form-label">
              Guest Photo:
            </label>
            <input
              type="file"
              accept="image/*"
              className={
                fieldErrors.guestPhoto
                  ? "form-control is-invalid"
                  : "form-control"
              }
              id="guestPhoto"
              name="guestPhoto"
              onChange={handleFileChange}
            />
            {formData.guestPhotoFileName && (
              <div className="mt-1 text-success">
                {formData.guestPhotoFileName?.length > fileNameMaxLetter
                  ? `${formData.guestPhotoFileName.substring(0, fileNameMaxLetter)}...`
                  : formData.guestPhotoFileName}
              </div>
            )}
            {fieldErrors.guestPhoto && (
              <div className="text-danger mt-1">{fieldErrors.guestPhoto}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="frontIdProof" className="form-label">
              Id Card Front Photo:
            </label>
            <input
              type="file"
              accept="image/*"            
              className={
                fieldErrors.frontIdProof
                  ? "form-control is-invalid"
                  : "form-control"
              }
              id="frontIdProof"
              name="frontIdProof"
              onChange={handleFileChange}
            />
            {formData.frontIdProofFileName && (
              <div className="mt-1 text-success">
                {formData.frontIdProofFileName?.length > fileNameMaxLetter
                  ? `${formData.frontIdProofFileName.substring(0, fileNameMaxLetter)}...`
                  : formData.frontIdProofFileName}
              </div>
            )}
            {fieldErrors.frontIdProof && (
              <div className="text-danger mt-1">{fieldErrors.frontIdProof}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="backIdProof" className="form-label">
              Id Card Back Photo:
            </label>
            <input
              type="file"
              accept="image/*"
              className={
                fieldErrors.backIdProof
                  ? "form-control is-invalid"
                  : "form-control"
              }
              id="backIdProof"
              name="backIdProof"
              onChange={handleFileChange}
            />
            {formData.backIdProofFileName && (
              <div className="mt-1 text-success">
                {formData.backIdProofFileName?.length > fileNameMaxLetter
                  ? `${formData.backIdProofFileName.substring(0, fileNameMaxLetter)}...`
                  : formData.backIdProofFileName}
              </div>
            )}
            {fieldErrors.backIdProof && (
              <div className="text-danger mt-1">{fieldErrors.backIdProof}</div>
            )}
          </div>

          <div className="d-flex gap-4">
            <button
              type="button"
              className="btn btn-primary mx-auto d-flex justify-content-center w-50"
              onClick={resetFormFields}
            >
              Reset
            </button>
            <button
              type="button"
              className="btn btn-warning mx-auto d-flex justify-content-center w-50"
              onClick={handleSubmit}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GuestInformationForm;
