import React, { useEffect, useState } from "react";
import $axios from "../utils/axios";
import { useSpinner } from "../hook/SpinnerContext";
import { toast, ToastContainer } from "react-toastify";

const Table = ({ rows }) => (
  <table className="table table-bordered ">
    <tbody>
      {rows?.map((row, index) => (
        <tr key={`r${index}`}>
          {row?.map((cell, cellIndex) => (
            <td
              className={cellIndex === 0 ? "w-50" : ""}
              key={`r${index}c${cellIndex}`}
            >
              {cell}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export const CheckoutDetails = () => {
  const { showLoading, hideLoading } = useSpinner();
  const [checkoutData, setCheckoutData] = useState({});

  useEffect(() => {
    getCheckoutDetails();
  }, []);

  const getCheckoutDetails = async () => {
    showLoading();
    try {
      const response = await $axios.get(`/FalconQRScan/GetGuestEntry`);
      setCheckoutData(response?.data);
    } catch (error) {
      console.error("Error fetching checkout details:", error);
      toast.error("Failed to load checkout details. Please try again.");
    } finally {
      hideLoading();
    }
  };

  const customerDetailsRows = [
    ["Name", checkoutData.name],
    ["Room No", checkoutData.roomNo],
    ["Booking No", checkoutData.bookingNo],
    ["Email ID", checkoutData.email],
    ["Mobile No", checkoutData.mobile],
    ["Address", checkoutData.address],
    ["Time Format", checkoutData.timeFormat],
  ];

  const billingDetailsRows = [
    ["Room Rent Amt", `$${checkoutData.roomRentAmt}`],
    ["Discount Amt", `$${checkoutData.discountAmt}`],
    ["Service Charge Amt", `$${checkoutData.serviceChargeAmt}`],
    ["Total Room Rent Amt", `$${checkoutData.totalRoomRentAmt}`],
    ["Room Amt With Tax", `$${checkoutData.roomAmtWithTax}`],
    ["Advance Amt", `$${checkoutData.advanceAmt}`],
    ["Payable Rent Amt", `$${checkoutData.payableRentAmt}`],
  ];

  const paymentDetailsRows = [
    ["Net Payable Amt", checkoutData.name],
    ["Special Discount Amt", checkoutData.roomNo],
  ];

  const billDetailsRows = [
    ["Bill No", checkoutData.billNo],
    ["Bill Date", checkoutData.billDate],
    ["Bill Time", checkoutData.billTime],
    ["Bill Amount", `$${checkoutData.billAmount}`],
  ];

  return (
    <div className="container py-4">
      <ToastContainer />
      <header className="text-center my-4">
        <h4>Check Out</h4>
      </header>

      <div className="row mb-4">
        <div className="col-12">
          <h5>Customer Details</h5>
          <Table rows={customerDetailsRows} />
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <h5>Billing Details</h5>
          <Table rows={billingDetailsRows} />
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <h5>Bill Details</h5>
          <Table rows={billDetailsRows} />
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <h5>Payments Details</h5>
          <Table rows={paymentDetailsRows} />
        </div>
      </div>
    </div>
  );
};
