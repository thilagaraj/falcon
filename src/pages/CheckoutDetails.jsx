import { useEffect, useState } from "react";
import $axios from "../utils/axios";
import { useSpinner } from "../hook/SpinnerContext";
import { toast, ToastContainer } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import { formatDateForDisplay } from "../utils/date";

const UI_STRINGS = {
  CHECKOUT_TITLE: "Check Out",
  CUSTOMER_DETAILS: "Customer Details",
  BILLING_SUMMARY: "Bill Summary",
  BILL_DETAILS: "Bill Details",
  TOTAL_AMOUNT: "Total Amount",
};

const Table = ({ rows, title }) => (
  <div className="table-responsive mb-4">
    <table className="table table-bordered">
      <tbody>
        <tr className="border-0">
          <th
            colSpan={2}
            className="border-0 bg-primary text-white text-center"
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
  </div>
);

Table.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)).isRequired,
  title: PropTypes.string.isRequired,
};

const BillInformation = ({ title, rows, summary }) => (
  <div className="table-responsive">
    <table className="table table-bordered">
      <thead>
        <tr className="border-0">
          <th
            colSpan={16}
            className="border-0 bg-primary text-white text-center"
          >
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
          <th>TrBill</th>
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
            {UI_STRINGS.TOTAL_AMOUNT}
          </td>
          <td className="bg-success text-white">{summary.Rate}</td>
          <td className="bg-success text-white">{summary.RoomTax}</td>
          <td className="bg-success text-white">{summary.PlanAmount}</td>
          <td className="bg-success text-white">{summary.FoodBill}</td>
          <td className="bg-success text-white">{summary.PostBill}</td>
          <td className="bg-success text-white">{summary.TeleBill}</td>
          <td className="bg-success text-white">{summary.ExtraBed}</td>
          <td className="bg-success text-white">{summary.TrBill}</td>
          <td className="bg-success text-white">{summary.Advance}</td>
          <td className="bg-success text-white">{summary.Discount}</td>
          <td className="bg-success text-white">{summary.NetAmt}</td>
          <td className="bg-success text-white">{summary.Balance}</td>
          <td className="bg-success text-white"></td>
        </tr>
      </tbody>
    </table>
  </div>
);

BillInformation.propTypes = {
  title: PropTypes.string.isRequired,
  rows: PropTypes.arrayOf(PropTypes.array.isRequired).isRequired,
  summary: PropTypes.object.isRequired
};

export const CheckoutDetails = ({RoomNo}) => {
  CheckoutDetails.propTypes = {
    RoomNo: PropTypes.string
  };
  const [searchParams] = useSearchParams();
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
      const params = new URLSearchParams(searchParams);
      if (!params.has('RoomNo') && RoomNo) {
        params.append('RoomNo', RoomNo);
      }
      const response = await $axios.get(
        `/FalconQRScan/GetGuestBillInformation?${params.toString()}`
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
    [
      "Name",checkoutData?.GuestTittle ? `${checkoutData.GuestTittle}. ${checkoutData?.GuestName || ""}` : checkoutData.GuestName || "",
    ],
    ["Room No", searchParams.get("RoomNo") || RoomNo],
    ["Room Code", checkoutData.RoomCode],
    ["Booking No", checkoutData.OrgCheckInNo],
    ["Arrival Date", formatDateForDisplay(checkoutData.ArrivalDate, 'DD/MM/yyyy'),],
    ["Arrival TIme", checkoutData.ArrivalTime],
    ["Departure Date", formatDateForDisplay(checkoutData.DepartureDate, 'DD/MM/yyyy')],
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
    formatDateForDisplay(billData[i]["Date"], 'DD/MM/yyyy'),
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
    <div className="container-fluid py-4">
      <ToastContainer />
      <div className="my-4 bg-secondary text-white px-3 py-2 rounded d-flex align-items-center justify-content-center">
        <div className="fs-4 fw-bold">{UI_STRINGS.CHECKOUT_TITLE}</div>
      </div>

      <div className="row">
        <div className="col-12 col-lg-6 mb-4">
          <Table
            rows={customerDetailsRows}
            title={UI_STRINGS.CUSTOMER_DETAILS}
          />
        </div>

        <div className="col-12 col-lg-6 mb-4">
          <Table rows={billingSummaryRows} title={UI_STRINGS.BILLING_SUMMARY} />
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <BillInformation
            rows={billingDetailsRows}
            title={UI_STRINGS.BILL_DETAILS}
            summary={summary}
          />
        </div>
      </div>
    </div>
  );
};
