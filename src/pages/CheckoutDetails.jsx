import React, { useEffect, useState } from "react";
import $axios from "../utils/axios";
import { useSpinner } from "../hook/SpinnerContext";
import { toast, ToastContainer } from "react-toastify";
import { useSearchParams } from "react-router-dom";

const UI_STRINGS = {
  CHECKOUT_TITLE: "Check Out",
  CUSTOMER_DETAILS: "Customer Details",
  BILLING_SUMMARY: "Billing Details",
  BILL_DETAILS: "Bill Details",
};

const Table = ({ rows, title }) => (
  <table
    className="table table-bordered"
    aria-labelledby={`table-title-${title
      ?.replace(/\s+/g, "-")
      ?.toLowerCase()}`}
  >
    <tbody>
      <tr className="border-0">
        <th
          colSpan={2}
          className="border-0 bg-primary text-white"
          id={`table-title-${title?.replace(/\s+/g, "-")?.toLowerCase()}`}
        >
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

const BillInfomration = ({ title, rows, summary }) => (
  <table className="table table-bordered">
    <thead>
      <tr className="border-0">
        <th colSpan={16} className="border-0 bg-primary text-white">
          {title}
        </th>
      </tr>
      <tr>
        <th>Day</th>
        <th>Date</th>
        <th>Pax</th>
        <th>Rate</th>
        <th>Room Tax</th>
        <th>Plan</th>
        <th>Food</th>
        <th>Post Bill</th>
        <th>Tele Bill</th>
        <th>Extra Bed</th>
        <th>Tri Bill</th>
        <th>Advance</th>
        <th>Discount</th>
        <th>Net</th>
        <th>Balance</th>
        <th>Room No</th>
      </tr>
    </thead>
    <tbody>
      {rows.map((row, rowIndex) => (
        <tr key={`row-${rowIndex}`}>
          {row.map((cell, cellIndex) => (
            <td key={`cell-${rowIndex}-${cellIndex}`}>{cell}</td>
          ))}
        </tr>
      ))}
      <tr>
        <td colSpan={3} className="border-0 bg-success text-white">
          Total Amount
        </td>
        <td className="bg-success text-white">{summary?.Rate}</td>
        <td className="bg-success text-white">{summary?.RoomTax}</td>
        <td className="bg-success text-white">{summary?.PlanAmount}</td>
        <td className="bg-success text-white">{summary?.FoodBill}</td>
        <td className="bg-success text-white">{summary?.PostBill}</td>
        <td className="bg-success text-white">{summary?.TeleBill}</td>
        <td className="bg-success text-white">{summary?.ExtraBed}</td>
        <td className="bg-success text-white">{summary?.TrBill}</td>
        <td className="bg-success text-white">{summary?.Advance}</td>
        <td className="bg-success text-white">{summary?.Discount}</td>
        <td className="bg-success text-white">{summary?.NetAmt}</td>
        <td className="bg-success text-white">{summary?.Balance}</td>
        <td className="bg-success text-white"></td>
      </tr>
    </tbody>
  </table>
);

export const CheckoutDetails = () => {
  const [searchParams] = useSearchParams();
  const branchCode = searchParams.get("branchCode");
  const hotelId = searchParams.get("hotelId");
  const propertyId = searchParams.get("propertyId");
  const roomNo = searchParams.get("RoomNo");
  const { showLoading, hideLoading } = useSpinner();
  const [checkoutData, setCheckoutData] = useState({});
  const [billData, setBillData] = useState([]);
  const [summary, setSummary] = useState({});

  useEffect(() => {
    getCheckoutDetails();
  }, []);

  const getCheckoutDetails = async () => {
    showLoading();
    try {
      const response = await $axios.get(
        `/FalconQRScan/GetGuestBillInformation?BranchCode=${branchCode}&PropertyId=${propertyId}&HotelId=${hotelId}&RoomNo=${roomNo}`
      );
      setCheckoutData(response);
      setBillData(response.Details);
      setSummary(response.Summary);
    } catch (error) {
      console.error("Error fetching checkout details:", error);
      toast.error("Failed to load checkout details. Please try again.");
    } finally {
      hideLoading();
    }
  };

  const customerDetailsRows = [
    ["Name", `${checkoutData.GuestTittle}. ${checkoutData.GuestName}`],
    ["Room No", roomNo],
    ["Room Code", checkoutData.RoomCode],
    ["Booking No", checkoutData.OrgCheckInNo],
    ["Arrival Date", checkoutData.ArrivalDate?.split("T")[0]],
    ["Arrival TIme", checkoutData.ArrivalTime],
    ["Departure Date", checkoutData.DepartureDate?.split("T")[0]],
    ["Departure Time", checkoutData.DepartureTime],
    ["Plan", checkoutData.PlanId],
  ];

  const billingSummaryRows = [
    ["Rate", summary.Rate],
    ["Room Tax", summary.RoomTax],
    ["Plan", summary.PlanAmount],
    ["Food Bill", summary.FoodBill],
    ["Post Bill", summary.PostBill],
    ["Tele Bill", summary.TeleBill],
    ["Extra Bed", summary.ExtraBed],
    ["TrBill", summary.TrBill],
    ["Advance", summary.Advance],
    ["Discount", summary.Discount],
    ["Net Amount", summary.NetAmt],
    ["Balance", summary.Balance],
    ["No Of Days", summary.Day],
  ];

  const billingDetailsRows = Array.from({ length: billData.length }, (_, i) => [
    `${i + 1}`,
    billData[i]["Date"].split("T")[0],
    billData[i]["Pax"],
    billData[i]["Rate"],
    billData[i]["RoomTax"],
    billData[i]["PlanAmount"],
    billData[i]["FoodBill"],
    billData[i]["PostBill"],
    billData[i]["TeleBill"],
    billData[i]["ExtraBed"],
    billData[i]["TrBill"],
    billData[i]["Advance"],
    billData[i]["Discount"],
    billData[i]["NetAmt"],
    billData[i]["Balance"],
    billData[i]["StayIn"],
  ]);

  return (
    <div className="container py-4">
      <ToastContainer />
      <header className="text-center my-4 bg-secondary text-white p-3 rounded">
        <p className="fs-4 fw-bold">{UI_STRINGS.CHECKOUT_TITLE}</p>
      </header>

      <div className="mb-12 p-10 bg-white rounded-2">
        <Table rows={customerDetailsRows} title={UI_STRINGS.CUSTOMER_DETAILS} />
      </div>

      <div className="mb-12 p-10 bg-white rounded-2">
        <Table rows={billingSummaryRows} title={UI_STRINGS.BILLING_SUMMARY} />
      </div>

      <div className="mb-12 p-10 bg-white rounded-2">
        <BillInfomration
          rows={billingDetailsRows}
          title={UI_STRINGS.BILL_DETAILS}
          summary={checkoutData.Summary}
        />
      </div>
    </div>
  );
};
