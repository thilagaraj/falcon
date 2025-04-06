import React, { useEffect, useState } from "react";
import $axios from "../utils/axios";
import { useSpinner } from "../hook/SpinnerContext";
import { toast, ToastContainer } from "react-toastify";
import { v4 as uuid } from "uuid";

const Table = ({ rows, title }) => (
  <table className="table table-bordered">
    <tbody>
      <th colSpan={2} className="fs-6 border-0 p-10 w-100">
        {title}
      </th>
      {rows?.map((row) => (
        <tr key={uuid()}>
          {row?.map((cell, cellIndex) => (
            <td
              className={cellIndex === 0 ? "w-50 fs-6 fw-bold" : ""}
              key={uuid()}
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
        <p className="fs-4 fw-bold">Check Out</p>
      </header>

      <div className="mb-12 p-10 bg-white rounded-2">
        <Table rows={customerDetailsRows} title="Customer Details" />
      </div>

      <div className="mb-12 p-10 bg-white rounded-2">
        <Table rows={billingDetailsRows} title="Billing Details" />
      </div>

      <div className="mb-12 p-10 bg-white rounded-2">
        <Table rows={billDetailsRows} title="Bill Details" />
      </div>

      <div className="mb-12 p-10 bg-white rounded-2">
        <Table rows={paymentDetailsRows} title="Payment Details" />
      </div>
    </div>
  );
};
