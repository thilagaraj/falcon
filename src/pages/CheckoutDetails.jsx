import React, { useEffect, useState } from "react";
import $axios from "../utils/axios";
import { useSpinner } from "../hook/SpinnerContext";
import { toast, ToastContainer } from "react-toastify";
import { useSearchParams } from "react-router-dom";

const UI_STRINGS = {
  CHECKOUT_TITLE: "Check Out",
  CUSTOMER_DETAILS: "Customer Details",
  BILL_INFOMATION: "Billing Details",
};

const RoomData = ({ rows, title }) => (
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

const BillInfomration = ({title, rows, summary }) => (
  <table className="table table-bordered">
    <thead>
    <tr className="border-0">
        <th
          colSpan={2}
          className="border-0 bg-success text-white"
        >
          {title}
        </th>
      </tr>
      <tr>
        <th>Day</th>
        <th>Date</th>
        <th>Pax</th>
        <th>Rate</th>
        <th>Tax</th>
        <th>Plan</th>
        <th>Food</th>
        <th>Post Bill</th>
        <th>Tele Bill</th>
        <th>Extra Bed</th>
        <th>Tri Bill</th>
        <th>Advance</th>
        <th>Discount</th>
        <th>NetAmount</th>
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
        <td colSpan={3}>Total</td>
        <td>{summary?.Rate}</td>
        <td>{summary?.RoomTax}</td>
        <td>{summary?.Plan}</td>
        <td>{summary?.FoodBill}</td>
        <td>{summary?.PostBill}</td>
        <td>{summary?.TeleBill}</td>
        <td>{summary?.ExtraBed}</td>
        <td>{summary?.TrBill}</td>
        <td>{summary?.Advance}</td>
        <td>{summary?.Discount}</td>
        <td>{summary?.NetAmt}</td>
        <td>{summary?.Balance}</td>
        <td>{summary?.StayIn}</td>
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
    ["Org CheckIn No", checkoutData.OrgCheckInNo],
    [
      "Arrival Date / TIme",
      `${checkoutData.ArrivalDate?.split("T")[0]} / ${
        checkoutData.ArrivalTime
      }`,
    ],
    [
      "DepartureDate / TIme",
      `${checkoutData.DepartureDate?.split("T")[0]} / ${
        checkoutData.DepartureTime
      }`,
    ],
    ["Plan Name", checkoutData.PlanId],
    ["Pax", checkoutData.Pax],
  ];

  const billingDetailsRows = Array.from({ length: billData.length }, (_, i) => [
    `${i + 1}`,
    billData[i]["Date"].split("T")[0],
    billData[i]["Pax"],
    billData[i]["Rate"],
    billData[i]["RoomTax"],
    billData[i]["Plan"],
    billData[i]["FoodBill"],
    billData[i]["PostBill"],
    billData[i]["TeleBill"],
    billData[i]["ExtraBed"],
    billData[i]["TrBill"],
    billData[i]['Advance'],
    billData[i]['Discount'],
    billData[i]['NetAmt'],
    billData[i]['Balance'],
    billData[i]['StayIn'],
  ]);

  return (
    <div className="container py-4">
      <ToastContainer />
      <header className="text-center my-4">
        <p className="fs-4 fw-bold">{UI_STRINGS.CHECKOUT_TITLE}</p>
      </header>

      <div className="mb-12 p-10 bg-white rounded-2">
        <RoomData
          rows={customerDetailsRows}
          title={UI_STRINGS.CUSTOMER_DETAILS}
        />
      </div>

      <div className="mb-12 p-10 bg-white rounded-2">
        <BillInfomration rows={billingDetailsRows} title={UI_STRINGS.BILL_INFOMATION} summary={checkoutData.Summary} />
      </div>
    </div>
  );
};
