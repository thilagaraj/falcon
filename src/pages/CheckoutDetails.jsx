import React, { useEffect, useState } from "react";
import $axios from "../utils/axios";
import { useSpinner } from "../hook/SpinnerContext";
import { toast, ToastContainer } from "react-toastify";

const UI_STRINGS = {
  CHECKOUT_TITLE: "Check Out",
  CUSTOMER_DETAILS: "Customer Details",
  BILLING_DETAILS: "Billing Details",
  BILL_DETAILS: "Bill Details",
  PAYMENT_DETAILS: "Payment Details",
}

const Table = ({ rows, title }) => (
  <table className="table table-bordered" aria-labelledby={`table-title-${title?.replace(/\s+/g, '-')?.toLowerCase()}`}>
    <tbody>
      <tr className="border-0">
        <th colSpan={2} className="border-0" id={`table-title-${title?.replace(/\s+/g, '-')?.toLowerCase()}`}>
          {title}
        </th>
      </tr>
      {rows.map((row, rowIndex) => (
        <tr key={`row-${rowIndex}`}>
          {row.map((cell, cellIndex) => (
            <td
              className={`fs-6 ${cellIndex === 0 ? "w-50 fw-bold" : ""}`}
              key={`cell-${rowIndex}-${cellIndex}`}
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
    ["Net Payable Amt", checkoutData.netPayableAmt],
    ["Special Discount Amt", checkoutData.specialDiscountAmt],
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
        <p className="fs-4 fw-bold">{UI_STRINGS.CHECKOUT_TITLE}</p>
      </header>

      <div className="mb-12 p-10 bg-white rounded-2">
        <Table rows={customerDetailsRows} title={UI_STRINGS.CUSTOMER_DETAILS} />
      </div>

      <div className="mb-12 p-10 bg-white rounded-2">
        <Table rows={billingDetailsRows} title={UI_STRINGS.BILLING_DETAILS} />
      </div>

      <div className="mb-12 p-10 bg-white rounded-2">
        <Table rows={billDetailsRows} title={UI_STRINGS.BILL_DETAILS} />
      </div>

      <div className="mb-12 p-10 bg-white rounded-2">
        <Table rows={paymentDetailsRows} title={UI_STRINGS.PAYMENT_DETAILS} />
      </div>
    </div>
  );
};
